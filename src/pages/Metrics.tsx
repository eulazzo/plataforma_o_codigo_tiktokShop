import { useEffect, useMemo, useState } from 'react';
import {
  emptyVideo,
  formatCount,
  formatDecimal,
  formatPercent,
  hasNumbers,
  lateralSignals,
  metricStages,
  readVideo,
} from '@/data/metrics';
import type { VideoNumbers, VideoRates } from '@/data/metrics';
import type { MetricStage } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import styles from './Metrics.module.css';

/**
 * MÉTRICAS
 * ============================================================================
 * A pergunta que traz alguém aqui é sempre a mesma: "isso é bom?".
 *
 * A resposta honesta é que não dá para saber sozinho — número bom depende de
 * nicho, preço e público, e qualquer referência que a tela publicasse seria
 * inventada. Então a tela responde a outra pergunta, que é a útil de verdade:
 * ONDE você perde as pessoas, e o que fazer naquele ponto.
 *
 * COMO ISSO VIRA TELA:
 *   1. o aluno digita os números do vídeo (e, se quiser, do anterior);
 *   2. as barras do funil passam a desenhar o vídeo DELE, em proporção real —
 *      inclusive o tombo entre "assistiu" e "comprou", que é o normal e é
 *      justamente a lição;
 *   3. cada etapa abre e diz o que costuma estar acontecendo ali e o que mexer.
 *
 * Sem números digitados, as barras ficam tracejadas e vazias. Nada de barra de
 * exemplo: gráfico com dado fictício é a forma mais fácil de mentir sem querer.
 *
 * A comparação com o vídeo anterior é o que substitui o benchmark: é a única
 * referência honesta que existe sem dados de mercado — você contra você.
 */

const STORAGE_KEY = 'ocodigo:metricas:numeros';

interface Board {
  current: VideoNumbers;
  previous: VideoNumbers;
}

const EMPTY_BOARD: Board = { current: emptyVideo, previous: emptyVideo };

function loadBoard(): Board {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_BOARD;
    const saved = JSON.parse(raw) as Partial<Board>;
    return {
      current: { ...emptyVideo, ...saved.current },
      previous: { ...emptyVideo, ...saved.previous },
    };
  } catch {
    return EMPTY_BOARD;
  }
}

interface FieldDef {
  key: keyof VideoNumbers;
  label: string;
  hint: string;
  placeholder: string;
  suffix?: string;
}

const FIELDS: FieldDef[] = [
  {
    key: 'views',
    label: 'Visualizações',
    hint: 'quantas pessoas viram o vídeo',
    placeholder: '12.480',
  },
  {
    key: 'finished',
    label: 'Assistiram até o fim',
    hint: 'o percentual que o painel mostra',
    placeholder: '18,5',
    suffix: '%',
  },
  {
    key: 'clicks',
    label: 'Cliques no produto',
    hint: 'quantos tocaram na vitrine',
    placeholder: '210',
  },
  { key: 'orders', label: 'Pedidos', hint: 'quantos compraram', placeholder: '7' },
];

/* ---------------------------------------------------------------------------
   O valor de cada etapa dentro do funil
   ----------------------------------------------------------------------------
   `share` é a fatia das visualizações que chega ali — é o que dá largura à
   barra. `null` em toda parte significa "ainda não dá para calcular", e a
   etapa aparece vazia em vez de aparecer com um número de mentira.

   A etapa 02 é `null` de propósito, sempre: "quantos passaram dos três
   segundos" não é um campo do painel, é uma curva. A tela diz isso em vez de
   fingir que tem o número.
   --------------------------------------------------------------------------- */
interface StageValue {
  /** Fatia das visualizações que chega aqui — é o que dá largura à barra. */
  share: number | null;
  /** O que aparece escrito na etapa. */
  label: string | null;
  /**
   * O valor que entra na comparação com o vídeo anterior.
   *
   * Não é sempre o mesmo que `share`: no Alcance a fatia é 100% por definição,
   * então comparar fatias diria "igual ao anterior" mesmo com o dobro de
   * visualizações. Ali quem compara é o número absoluto.
   */
  compare: number | null;
  /** Sufixo do delta: " pt" para pontos percentuais, vazio para contagem. */
  unit: string;
}

function stageValue(stage: MetricStage, rates: VideoRates): StageValue {
  const none: StageValue = { share: null, label: null, compare: null, unit: '' };

  switch (stage.id) {
    case 'alcance':
      return rates.views === null
        ? none
        : { share: 100, label: formatCount(rates.views), compare: rates.views, unit: '' };

    case 'ate-o-fim':
      return rates.finished === null
        ? none
        : {
            share: rates.finished,
            label: formatPercent(rates.finished),
            compare: rates.finished,
            unit: ' pt',
          };

    case 'toque':
      return rates.clickRate === null
        ? none
        : {
            share: rates.clickRate,
            label: formatPercent(rates.clickRate),
            compare: rates.clickRate,
            unit: ' pt',
          };

    case 'pedido': {
      if (rates.perThousand === null) return none;
      const share = rates.perThousand / 10;
      return { share, label: formatPercent(share), compare: share, unit: ' pt' };
    }

    /* 'tres-segundos' e qualquer etapa nova sem número próprio */
    default:
      return none;
  }
}

/**
 * Piso da barra em PIXELS, não em porcentagem.
 *
 * Um funil real desaba: de 12.480 visualizações para 7 pedidos são três ordens
 * de grandeza, e a barra do pedido daria fração de pixel. Um piso percentual
 * resolveria a visibilidade e criaria um problema pior — 1,7% e 0,06% ficariam
 * do mesmo tamanho, apagando justamente a diferença que interessa. Com piso em
 * pixel, só o que já era invisível é ajustado, e o número ao lado carrega a
 * verdade.
 */
const MIN_BAR = '3px';

/* ---------------------------------------------------------------------------
   Variação entre o vídeo e o anterior
   --------------------------------------------------------------------------- */

function Delta({ now, before, unit }: { now: number | null; before: number | null; unit: string }) {
  if (now === null || before === null) return null;

  const diff = now - before;
  if (Math.abs(diff) < 0.005) {
    return <span className={`mono ${styles.deltaFlat}`}>igual ao anterior</span>;
  }

  const up = diff > 0;
  return (
    <span className={`mono ${up ? styles.deltaUp : styles.deltaDown}`}>
      <Icon name={up ? 'arrowUp' : 'arrowDown'} size={12} />
      {up ? '+' : '−'}
      {formatDecimal(Math.abs(diff))}
      {unit}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Uma etapa do funil
   --------------------------------------------------------------------------- */

interface StageRowProps {
  stage: MetricStage;
  value: StageValue;
  before: StageValue;
  index: number;
  total: number;
}

function StageRow({ stage, value, before, index, total }: StageRowProps) {
  const [open, setOpen] = useState(false);

  /* a barra vai do ciano ao magenta ao longo do funil, como o fio da bancada */
  const tint = `color-mix(in srgb, var(--accent) ${100 - (index / (total - 1)) * 100}%, var(--magenta))`;

  return (
    <li className={styles.stage}>
      <button
        className={styles.stageHead}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`mono ${styles.stageNum}`} aria-hidden="true">
          {stage.number}
        </span>

        <span className={styles.stageBody}>
          <span className={styles.stageTop}>
            <span className={styles.stageName}>{stage.name}</span>
            {value.label ? (
              <span className={`mono ${styles.stageValue}`}>{value.label}</span>
            ) : (
              <span className={`mono ${styles.stageEmpty}`}>
                {stage.id === 'tres-segundos' ? 'na curva' : '—'}
              </span>
            )}
          </span>

          <span className={styles.rail}>
            {value.share === null ? (
              <span className={styles.railEmpty} aria-hidden="true" />
            ) : (
              <span
                className={styles.bar}
                style={{ width: `max(${value.share}%, ${MIN_BAR})`, background: tint }}
                aria-hidden="true"
              />
            )}
          </span>

          <span className={styles.stageFoot}>
            <span className={styles.stageWhat}>{stage.what}</span>
            <Delta now={value.compare} before={before.compare} unit={value.unit} />
          </span>
        </span>

        <span className={[styles.stageChevron, open ? styles.stageChevronOpen : ''].filter(Boolean).join(' ')}>
          <Icon name="chevronDown" size={16} />
        </span>
      </button>

      {open && (
        <div className={styles.detail}>
          <div className={styles.detailBlock}>
            <h3 className="eyebrow">Quando trava aqui</h3>
            <p>{stage.whenLow}</p>
            <p className={styles.alias}>No painel, {stage.alias}.</p>
          </div>

          <div className={styles.detailBlock}>
            <h3 className="eyebrow">O que mexer</h3>
            <ul className={styles.fixes}>
              {stage.fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

/* ---------------------------------------------------------------------------
   Tela
   --------------------------------------------------------------------------- */

export function Metrics() {
  const [board, setBoard] = useState<Board>(loadBoard);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    } catch {
      /* sem armazenamento a conta funciona igual, só recomeça vazia */
    }
  }, [board]);

  const rates = useMemo(() => readVideo(board.current), [board.current]);
  const before = useMemo(() => readVideo(board.previous), [board.previous]);

  const filled = hasNumbers(board.current);
  const comparing = hasNumbers(board.previous);
  const dirty = filled || comparing;

  function setField(column: keyof Board, key: keyof VideoNumbers, value: string) {
    setBoard((prev) => ({ ...prev, [column]: { ...prev[column], [key]: value } }));
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Métricas</p>
        <h1>Onde o vídeo perde a pessoa</h1>
        <p>
          Ponha os números do seu vídeo e o funil abaixo passa a desenhar o seu caso. Cada etapa
          diz o que costuma estar acontecendo quando é ali que a coisa trava.
        </p>
      </header>

      {/* ---------- os números ---------- */}
      <section className={styles.board} aria-labelledby="numeros-titulo">
        <header className={styles.boardHead}>
          <div>
            <p className="eyebrow">Seus números</p>
            <h2 id="numeros-titulo">Copie do painel do vídeo</h2>
          </div>

          <button
            className={styles.reset}
            onClick={() => setBoard(EMPTY_BOARD)}
            disabled={!dirty}
            title="Limpar os campos"
          >
            <Icon name="refresh" size={15} />
            <span className="sr-only">Limpar os campos</span>
          </button>
        </header>

        <div className={styles.grid}>
          <span className={`eyebrow ${styles.colHead}`}>Este vídeo</span>
          <span className={`eyebrow ${styles.colHead} ${styles.colHeadQuiet}`}>
            Vídeo anterior
          </span>

          {FIELDS.map((field) => (
            <div key={field.key} className={styles.fieldRow}>
              <span className={styles.fieldLabel}>
                {field.label}
                <small>{field.hint}</small>
              </span>

              {(['current', 'previous'] as const).map((column) => (
                <span
                  key={column}
                  className={[
                    styles.input,
                    column === 'previous' ? styles.inputQuiet : '',
                    board[column][field.key].trim() ? styles.inputOn : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={board[column][field.key]}
                    placeholder={field.placeholder}
                    onChange={(e) => setField(column, field.key, e.target.value)}
                    aria-label={`${field.label} — ${column === 'current' ? 'este vídeo' : 'vídeo anterior'}`}
                  />
                  {field.suffix && <span className={`mono ${styles.suffix}`}>{field.suffix}</span>}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* o número que junta o funil inteiro */}
        <div className={styles.summary}>
          <div>
            <p className="eyebrow">Pedidos a cada mil visualizações</p>
            <p className={`mono ${styles.summaryValue}`}>
              {rates.perThousand === null ? '—' : formatDecimal(rates.perThousand)}
            </p>
          </div>

          <div className={styles.summarySide}>
            <Delta now={rates.perThousand} before={before.perThousand} unit="" />
            <p className={styles.summaryNote}>
              Não existe número bom universal: ele muda com nicho, preço e público. O que interessa
              é como este se compara com o seu vídeo anterior.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- o funil ---------- */}
      <div className={styles.funnelHead}>
        <h2>O caminho até o pedido</h2>
        <p>
          {filled
            ? 'As barras estão na proporção real das suas visualizações. O tombo entre assistir e comprar é esperado — o que importa é em qual degrau ele acontece.'
            : 'Preencha os números acima para ver as barras na proporção do seu vídeo. Abra qualquer etapa para ler o que fazer nela.'}
        </p>
      </div>

      <ul className={styles.funnel}>
        {metricStages.map((stage, index) => (
          <StageRow
            key={stage.id}
            stage={stage}
            value={stageValue(stage, rates)}
            before={stageValue(stage, before)}
            index={index}
            total={metricStages.length}
          />
        ))}
      </ul>

      {/* ---------- sinais que não são etapa ---------- */}
      <div className={styles.signalsHead}>
        <h2>Sinais que não estão no funil</h2>
        <p>Dizem outra coisa sobre quem assistiu — e nenhum substitui a leitura das cinco etapas.</p>
      </div>

      <div className={styles.signals}>
        {lateralSignals.map((signal) => (
          <article key={signal.id} className={styles.signal}>
            <h3>{signal.name}</h3>
            <p>{signal.reading}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
