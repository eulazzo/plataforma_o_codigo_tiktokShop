import { useEffect, useMemo, useRef, useState } from 'react';
import { isComplete, planContent } from '@/plan';
import type { AiPrompt, PromptCategory, PromptTool, PromptVar } from '@/data/types';
import {
  EMPTY_SHEET,
  EMPTY_SHOT,
  FRAMINGS,
  SHEET_FIELDS,
  SHOT_FIELDS,
  buildAvatarJson,
  sheetIsReady,
} from '@/data/avatar';
import {
  EMPTY_POV,
  POV_CAMERAS,
  POV_FABRICS,
  POV_LIGHTS,
  POV_PLACES,
  buildPovPrompt,
  povIsReady,
} from '@/data/pov';
import type { AvatarSheet, AvatarShot, PovSettings } from '@/data/types';
import { useCopy } from '@/hooks/useCopy';
import { Button } from '@/components/ui/Button';
import { demoAngleById, demoReason, rankDemoAngles } from '@/data/demo';
import {
  PACK_SIZE,
  buildVariationsPrompt,
  packToText,
  parseHookPack,
} from '@/data/hookPack';
import { Icon } from '@/components/ui/Icon';
import { useConfirm } from '@/components/ui/Confirm';
import styles from './AiLab.module.css';

/**
 * LABORATÓRIO DE IA
 * ============================================================================
 * A tela é uma BANCADA que gera, não um catálogo que se folheia.
 *
 * O fluxo: o aluno preenche quatro campos — produto, público, benefício e tom —
 * e clica em "Gerar prompt". Um prompt aparece na lista abaixo, já escrito com
 * o caso dele dentro. Clicou de novo, vem outro. A lista vai crescendo.
 *
 * O QUE ESTÁ ACONTECENDO POR BAIXO (e por que está certo assim):
 * Os prompts são ESCRITOS À MÃO, não gerados por modelo nenhum. A "geração" é a
 * entrega de um prompt curado com as variáveis do aluno substituídas. Isso é
 * melhor do que parece: um prompt escrito e testado vale mais que um improviso
 * de máquina — e nada aqui promete o contrário. A tela diz "gerar", que é o que
 * o aluno recebe: um prompt pronto que antes não existia na tela dele.
 *
 * A pausa de ~1,2s é encenação de processamento e está isolada em GENERATION_MS.
 * Se um dia isso incomodar, é uma linha.
 *
 * MEMÓRIA DA GERAÇÃO: cada prompt gerado guarda os valores da bancada NAQUELE
 * momento. Mudar a bancada depois não reescreve o que já foi gerado — o que
 * está na lista é o que foi copiado, sempre.
 *
 * VERSÃO: área exclusiva da Completa. Na Essencial os prompts nem estão no
 * bundle (ver vite.config.ts) — a tela mostra o convite, não um bloqueio por
 * cima de conteúdo carregado.
 */

/** Encenação do processamento, em milissegundos. */
const GENERATION_MS = 1200;

/* ---------------------------------------------------------------------------
   Bancada
   --------------------------------------------------------------------------- */

type Bench = Record<PromptVar, string>;

interface FieldDef {
  key: PromptVar;
  label: string;
  hint: string;
  placeholder: string;
}

const FIELDS: FieldDef[] = [
  {
    key: 'produto',
    label: 'Produto',
    hint: 'o que você está vendendo, em poucas palavras',
    placeholder: 'organizador de gaveta com divisórias',
  },
  {
    key: 'publico',
    label: 'Para quem',
    hint: 'quem compra — situação, não faixa etária',
    placeholder: 'quem mora em apartamento pequeno',
  },
  {
    key: 'beneficio',
    label: 'Benefício',
    hint: 'o que muda na vida de quem usa',
    placeholder: 'a gaveta para de virar bagunça em um dia',
  },
  {
    key: 'tom',
    label: 'Tom',
    hint: 'como você fala com essa pessoa',
    placeholder: 'direto, de amiga para amiga',
  },
];

const FIELD_BY_KEY = Object.fromEntries(FIELDS.map((f) => [f.key, f])) as Record<
  PromptVar,
  FieldDef
>;

const EMPTY_BENCH: Bench = { produto: '', publico: '', beneficio: '', tom: '' };

const benchFieldId = (key: PromptVar) => `bancada-${key}`;

/* ---------------------------------------------------------------------------
   Persistência
   ----------------------------------------------------------------------------
   Bancada e lista de gerados vivem neste navegador, como o progresso do plano.
   Não há backend: trocar de aparelho recomeça. É dito na tela, não escondido.
   --------------------------------------------------------------------------- */

const STORAGE_BENCH = 'ocodigo:laboratorio-ia:bancada';
const STORAGE_GENERATED = 'ocodigo:laboratorio-ia:gerados';
const STORAGE_SHEET = 'ocodigo:laboratorio-ia:avatar-ficha';
const STORAGE_SHOT = 'ocodigo:laboratorio-ia:avatar-cena';
const STORAGE_POV = 'ocodigo:laboratorio-ia:pov';

function loadPov(): PovSettings {
  try {
    const raw = localStorage.getItem(STORAGE_POV);
    return raw ? { ...EMPTY_POV, ...(JSON.parse(raw) as Partial<PovSettings>) } : EMPTY_POV;
  } catch {
    return EMPTY_POV;
  }
}

function loadSheet(): AvatarSheet {
  try {
    const raw = localStorage.getItem(STORAGE_SHEET);
    return raw ? { ...EMPTY_SHEET, ...(JSON.parse(raw) as Partial<AvatarSheet>) } : EMPTY_SHEET;
  } catch {
    return EMPTY_SHEET;
  }
}

function loadShot(): AvatarShot {
  try {
    const raw = localStorage.getItem(STORAGE_SHOT);
    return raw ? { ...EMPTY_SHOT, ...(JSON.parse(raw) as Partial<AvatarShot>) } : EMPTY_SHOT;
  } catch {
    return EMPTY_SHOT;
  }
}

/** Um prompt entregue ao aluno, com os valores usados naquela geração. */
interface Generated {
  /* ficha e cena do momento da geração, quando o prompt é de imagem. Guardar
     junto é o que faz o JSON do card continuar valendo depois que o aluno
     mudar a cena para gerar a próxima. */
  sheet?: AvatarSheet;
  shot?: AvatarShot;
  pov?: PovSettings;
  /**
   * A resposta que o aluno colou de volta, quando o prompt é de pacote de
   * ganchos. Guardar o texto CRU e reprocessar na hora de exibir mantém a
   * lista corrigível: mudar o leitor conserta pacotes antigos.
   */
  pack?: string;
  /** Chave única da geração — o mesmo prompt pode ser gerado mais de uma vez. */
  key: string;
  promptId: string;
  bench: Bench;
  at: number;
}

function loadBench(): Bench {
  try {
    const raw = localStorage.getItem(STORAGE_BENCH);
    if (!raw) return EMPTY_BENCH;
    return { ...EMPTY_BENCH, ...(JSON.parse(raw) as Partial<Bench>) };
  } catch {
    return EMPTY_BENCH;
  }
}

function loadGenerated(): Generated[] {
  try {
    const raw = localStorage.getItem(STORAGE_GENERATED);
    if (!raw) return [];
    const saved = JSON.parse(raw) as Generated[];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

/* ---------------------------------------------------------------------------
   Variáveis dentro do texto do prompt
   --------------------------------------------------------------------------- */

const VAR_TOKEN = /(\{\{(?:produto|publico|beneficio|tom)\}\})/g;
const VAR_NAME = /^\{\{(produto|publico|beneficio|tom)\}\}$/;

/** Quebra o corpo em pedaços de texto e variáveis, preservando a ordem. */
function splitBody(body: string): string[] {
  return body.split(VAR_TOKEN).filter((part) => part !== '');
}

/**
 * O texto que vai para a área de transferência.
 *
 * Copia só o corpo — nada de assinatura no fim. Isto é colado numa ferramenta
 * de IA: qualquer linha a mais vira instrução para a máquina.
 */
function fillPrompt(body: string, bench: Bench): string {
  return body.replace(
    /\{\{(produto|publico|beneficio|tom)\}\}/g,
    (_match, key: string) => bench[key as PromptVar].trim(),
  );
}

/** Carimbo da geração: "21/08/2026 · 10:51". */
function formatStamp(at: number): string {
  try {
    const moment = new Date(at);
    const date = moment.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const time = moment.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${date} · ${time}`;
  } catch {
    return '';
  }
}

/** Seletor curto do painel de POV. O valor guardado é o texto em inglês. */
function PovPick({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.avatarField}>
      <span className="eyebrow">{label}</span>
      <span className={styles.avatarSelect}>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={15} />
      </span>
    </label>
  );
}

/* ---------------------------------------------------------------------------
   Cards
   --------------------------------------------------------------------------- */

const TOOL_ICON: Record<PromptTool, string> = {
  'vídeo por texto': 'film',
  'avatar falante': 'user',
  'voz sintética': 'headphones',
  imagem: 'image',
  texto: 'book',
};

interface PromptCardProps {
  prompt: AiPrompt;
  entry: Generated;
  onDiscard: () => void;
  /** Guarda a resposta colada no pacote de ganchos. '' apaga o pacote. */
  onPack: (raw: string) => void;
}

function PromptCard({ prompt, entry, onDiscard, onPack }: PromptCardProps) {
  /* prompts longos ficam recolhidos: a lista precisa ser varrível de relance */
  const [open, setOpen] = useState(false);
  const copy = useCopy();

  /*
   * Prompt de imagem sai como JSON montado na hora, a partir da ficha e da cena
   * capturadas quando ele foi gerado. Mudar a cena para gerar a próxima foto
   * não pode reescrever o JSON que já está no card — é ele que foi copiado.
   */
  const isJson = prompt.output === 'avatar-json';
  const isPov = prompt.output === 'pov';

  /*
   * Prompt de demonstração é um molde só, com [[ANGULO]] no meio. O bloco do
   * ângulo entra aqui, na exibição, e as {{variáveis}} continuam intactas —
   * é isso que mantém o destaque do que veio da bancada.
   */
  const body =
    prompt.output === 'demo' && prompt.angle
      ? prompt.body.replace('[[ANGULO]]', demoAngleById(prompt.angle)?.block ?? '')
      : prompt.body;
  const builtBody = isJson
    ? buildAvatarJson(entry.sheet ?? EMPTY_SHEET, entry.shot ?? EMPTY_SHOT)
    : isPov
      ? buildPovPrompt(prompt.body, entry.pov ?? EMPTY_POV)
      : '';
  const montado = isJson || isPov;
  const textToCopy = montado ? builtBody : fillPrompt(body, entry.bench);

  return (
    <article className={styles.card}>
      <span className={styles.ghost} aria-hidden="true">
        {prompt.number}
      </span>

      <header className={styles.cardHead}>
        <span className={`mono ${styles.category}`}>{prompt.category}</span>
        <span className={`mono ${styles.tool}`}>
          <Icon name={TOOL_ICON[prompt.tool]} size={13} />
          {prompt.tool}
        </span>
        <span className={`mono ${styles.stamp}`}>gerado {formatStamp(entry.at)}</span>
      </header>

      <h2 className={styles.title}>{prompt.title}</h2>
      <p className={styles.objective}>{prompt.objective}</p>

      {/* ficha do que vai sair — o aluno sabe o formato antes de colar */}
      {prompt.spec && (
        <dl className={styles.spec}>
          <div>
            <dt className="mono">Formato</dt>
            <dd>{prompt.spec.format}</dd>
          </div>
          <div>
            <dt className="mono">Duração</dt>
            <dd>{prompt.spec.duration}</dd>
          </div>
          <div>
            <dt className="mono">Objetivo</dt>
            <dd>{prompt.spec.goal}</dd>
          </div>
        </dl>
      )}

      <div className={styles.split}>
        {/* ---------- o prompt ---------- */}
        <div className={styles.promptCol}>
          <div className={styles.promptHead}>
            <span className="eyebrow">Prompt</span>
            <span className={`mono ${styles.ready}`}>
              <Icon name="check" size={12} /> com os seus dados
            </span>
          </div>

          <div className={[styles.body, open ? styles.bodyOpen : ''].filter(Boolean).join(' ')}>
            <pre className={styles.bodyText}>
              {montado
                ? builtBody
                : splitBody(body).map((part, index) => {
                    const key = part.match(VAR_NAME)?.[1] as PromptVar | undefined;
                    if (!key) return <span key={index}>{part}</span>;

                    /* o que veio da bancada fica marcado: o aluno vê o que é dele */
                    return (
                      <mark
                        key={index}
                        className={styles.var}
                        title={`${FIELD_BY_KEY[key].label}, da sua bancada`}
                      >
                        {entry.bench[key].trim()}
                      </mark>
                    );
                  })}
            </pre>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.copy}
              onClick={() => copy(textToCopy, isJson ? 'JSON copiado!' : 'Prompt copiado!')}
            >
              <Icon name="copy" size={15} /> {isJson ? 'Copiar JSON' : 'Copiar prompt'}
            </button>
            <button
              className={[styles.expand, open ? styles.expandOpen : ''].filter(Boolean).join(' ')}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Recolher' : 'Ver inteiro'}
              <Icon name="chevronDown" size={14} />
            </button>
            <button className={styles.discard} onClick={onDiscard}>
              <Icon name="close" size={14} />
              <span>Descartar</span>
            </button>
          </div>

          <p className={`mono ${styles.personalized}`}>
            <Icon name="sparkle" size={12} />
            {isJson
              ? 'Montado com a ficha que você preencheu.'
              : isPov
                ? 'Montado com a cena que você escolheu.'
                : 'Personalizado para o produto que você informou.'}
          </p>
        </div>

        {/* ---------- o que fazer com o que a máquina devolveu ---------- */}
        <aside className={styles.notesCol}>
          <span className="eyebrow">Depois de gerar</span>
          <ul className={styles.notes}>
            {prompt.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </div>

      {prompt.output === 'ganchos' && <HookPack entry={entry} onPack={onPack} />}
    </article>
  );
}

/* ---------------------------------------------------------------------------
   Pacote de ganchos
   ----------------------------------------------------------------------------
   O prompt de gancho pede dez aberturas numeradas. Aqui o aluno cola o que a
   ferramenta devolveu e a lista vira pacote: cada gancho com o seu tipo, botão
   de copiar só dele e a opção de pedir cinco variações do mesmo ângulo.

   Nada aqui inventa gancho. A tela organiza a resposta do aluno — é por isso
   que ela consegue dizer o tipo de cada frase: a ordem foi pedida no prompt.
   --------------------------------------------------------------------------- */

interface HookPackProps {
  entry: Generated;
  onPack: (raw: string) => void;
}

function HookPack({ entry, onPack }: HookPackProps) {
  const copy = useCopy();
  /* o campo já nasce com o que foi colado: se a leitura não achar gancho
     nenhum, o texto continua ali para o aluno corrigir em vez de sumir */
  const [draft, setDraft] = useState(entry.pack ?? '');
  const [openVariations, setOpenVariations] = useState<number | null>(null);

  const items = useMemo(() => (entry.pack ? parseHookPack(entry.pack) : []), [entry.pack]);
  const packed = items.length > 0;

  return (
    <section className={styles.pack}>
      <header className={styles.packHead}>
        <span className={styles.packIcon} aria-hidden="true">
          <Icon name="magnet" size={16} />
        </span>
        <div>
          <h3 className={styles.packTitle}>
            {packed ? `${items.length} ganchos para testar` : '10 ganchos para testar'}
          </h3>
          <p className={styles.packLead}>
            {packed
              ? 'Separados por tipo, na ordem que o prompt pediu.'
              : 'Cole aqui a resposta da ferramenta de IA e o pacote se monta.'}
          </p>
        </div>
      </header>

      {/* a ficha do teste: é o caso do aluno, do jeito que ele escreveu */}
      <dl className={styles.packBench}>
        {FIELDS.map((field) => (
          <div key={field.key}>
            <dt className="mono">{field.label}</dt>
            <dd>{entry.bench[field.key]}</dd>
          </div>
        ))}
      </dl>

      {!packed && entry.pack && (
        <p className={styles.packWarn}>
          Não encontrei nenhum gancho nesse texto. A resposta precisa vir em linhas — uma frase
          por linha, numeradas como o prompt pede.
        </p>
      )}

      {!packed && (
        <div className={styles.packPaste}>
          <label className={styles.packLabel} htmlFor={`pacote-${entry.key}`}>
            Resposta da ferramenta
          </label>
          <textarea
            id={`pacote-${entry.key}`}
            className={styles.packInput}
            rows={5}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={'01. …\n02. …\n03. …'}
          />
          <button
            className={styles.packAction}
            onClick={() => onPack(draft)}
            disabled={!draft.trim()}
          >
            <Icon name="magnet" size={14} /> Montar o pacote
          </button>
        </div>
      )}

      {packed && (
        <>
          {items.length !== PACK_SIZE && (
            <p className={styles.packWarn}>
              A resposta trouxe {items.length} {items.length === 1 ? 'gancho' : 'ganchos'}. O
              prompt pede {PACK_SIZE}, dois de cada tipo — peça de novo se quiser o teste
              completo.
            </p>
          )}

          <ol className={styles.packList}>
            {items.map((item) => (
              <li key={item.index} className={styles.packItem}>
                <span className={`mono ${styles.packNum}`}>
                  {String(item.index).padStart(2, '0')}
                </span>

                <div className={styles.packMain}>
                  {item.kind && <span className={`mono ${styles.packKind}`}>{item.kind}</span>}
                  <p className={styles.packHook}>{item.text}</p>

                  {openVariations === item.index && (
                    <div className={styles.packVar}>
                      <pre className={styles.packVarText}>
                        {buildVariationsPrompt(item, entry.bench.produto)}
                      </pre>
                      <button
                        className={styles.packVarCopy}
                        onClick={() =>
                          copy(
                            buildVariationsPrompt(item, entry.bench.produto),
                            'Prompt de variações copiado!',
                          )
                        }
                      >
                        <Icon name="copy" size={13} /> Copiar prompt de variações
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.packButtons}>
                  <button
                    className={styles.packCopy}
                    onClick={() => copy(item.text, 'Gancho copiado!')}
                    aria-label={`Copiar gancho ${item.index}`}
                  >
                    <Icon name="copy" size={13} />
                  </button>
                  <button
                    className={[
                      styles.packMore,
                      openVariations === item.index ? styles.packMoreOpen : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() =>
                      setOpenVariations((prev) => (prev === item.index ? null : item.index))
                    }
                  >
                    <Icon name="refresh" size={13} />
                    <span>{openVariations === item.index ? 'Fechar' : 'Criar variações'}</span>
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.packFoot}>
            <button
              className={styles.packAction}
              onClick={() => copy(packToText(items), 'Pacote copiado!')}
            >
              <Icon name="copy" size={14} /> Copiar todos
            </button>
            <button
              className={styles.packRedo}
              onClick={() => {
                setDraft('');
                setOpenVariations(null);
                onPack('');
              }}
            >
              Colar outra resposta
            </button>
          </div>
        </>
      )}
    </section>
  );
}

/** Card fantasma durante a espera — ocupa o lugar exato do que vai chegar. */
function SkeletonCard() {
  return (
    <article className={styles.skeleton} aria-hidden="true">
      <span className={styles.skeletonSweep} />
      <div className={styles.skeletonHead}>
        <i style={{ width: '3.5rem' }} />
        <i style={{ width: '7rem' }} />
      </div>
      <i className={styles.skeletonTitle} />
      <i className={styles.skeletonLine} style={{ width: '62%' }} />
      <div className={styles.skeletonBody}>
        <i style={{ width: '88%' }} />
        <i style={{ width: '96%' }} />
        <i style={{ width: '74%' }} />
        <i style={{ width: '91%' }} />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   Tela
   --------------------------------------------------------------------------- */

export function AiLab() {
  const [bench, setBench] = useState<Bench>(loadBench);
  const [generated, setGenerated] = useState<Generated[]>(loadGenerated);
  const [generating, setGenerating] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PromptCategory | null>(null);
  /* tipo pedido na bancada — o que a pessoa quer que saia do próximo clique */
  const [wanted, setWanted] = useState<PromptCategory | null>(null);
  /* a ficha do avatar fica guardada; a cena também, para não se perder ao
     trocar de aba no meio do trabalho */
  const [sheet, setSheet] = useState<AvatarSheet>(loadSheet);
  const [shot, setShot] = useState<AvatarShot>(loadShot);
  const [pov, setPov] = useState<PovSettings>(loadPov);

  const { ask, dialog } = useConfirm();

  const timer = useRef<number | undefined>(undefined);
  const listRef = useRef<HTMLDivElement>(null);

  const prompts = planContent.prompts;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BENCH, JSON.stringify(bench));
    } catch {
      /* navegador sem armazenamento: funciona, só não sobrevive ao F5 */
    }
  }, [bench]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GENERATED, JSON.stringify(generated));
    } catch {
      /* idem */
    }
  }, [generated]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SHEET, JSON.stringify(sheet));
      localStorage.setItem(STORAGE_SHOT, JSON.stringify(shot));
      localStorage.setItem(STORAGE_POV, JSON.stringify(pov));
    } catch {
      /* sem armazenamento a ficha vale só nesta sessão */
    }
  }, [sheet, shot, pov]);

  /* a espera não pode continuar depois que a tela sai */
  useEffect(() => () => window.clearTimeout(timer.current), []);

  /* a lista precisa estar à vista quando o card fantasma aparece */
  useEffect(() => {
    if (!generating) return;
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [generating]);

  const byId = useMemo(() => new Map(prompts.map((p) => [p.id, p])), [prompts]);

  /**
   * Poda o que sobrou de uma versão anterior da biblioteca.
   *
   * Trocar o conteúdo de plan-content muda os ids dos prompts. Sem esta poda,
   * quem já usou a tela ficaria com cards órfãos contados na lista e com o
   * "restam N" errado. Devolve o mesmo array quando não há nada a remover, para
   * não disparar um render à toa.
   */
  useEffect(() => {
    setGenerated((prev) => {
      const kept = prev.filter((entry) => byId.has(entry.promptId));
      return kept.length === prev.length ? prev : kept;
    });
  }, [byId]);


  const usedIds = useMemo(() => new Set(generated.map((g) => g.promptId)), [generated]);

  /**
   * A fila do próximo clique: o que ainda não foi gerado, restrito ao tipo
   * pedido na bancada. Sem tipo escolhido, a fila é a biblioteca inteira.
   *
   * Fica na ordem do arquivo de dados de propósito — assim cada clique cobre um
   * prompt novo até esgotar, em vez de sortear e repetir.
   */
  /**
   * A fila do que ainda não foi gerado.
   *
   * Os prompts de Demonstração são REORDENADOS entre si: o ângulo que casa com
   * o benefício escrito na bancada vem primeiro. Os outros tipos ficam na
   * ordem da biblioteca — só a demonstração depende do que o aluno escreveu,
   * porque só nela o ângulo muda a cena inteira.
   */
  const pool = useMemo(() => {
    const queue = prompts.filter((p) => !usedIds.has(p.id) && (!wanted || p.category === wanted));

    const slots = queue.reduce<number[]>((acc, p, i) => {
      if (p.output === 'demo') acc.push(i);
      return acc;
    }, []);
    if (slots.length < 2) return queue;

    const order = rankDemoAngles(bench.produto, bench.beneficio).map((a) => a.id);
    const sorted = slots
      .map((i) => queue[i])
      .sort((a, b) => order.indexOf(a.angle ?? '') - order.indexOf(b.angle ?? ''));

    const out = [...queue];
    slots.forEach((slot, i) => {
      out[slot] = sorted[i];
    });
    return out;
  }, [prompts, usedIds, wanted, bench.produto, bench.beneficio]);
  const next = pool[0];
  const remaining = pool.length;

  /*
   * Prompt de imagem não usa a bancada: ele monta o JSON com a ficha e a cena.
   * Nesse caso os quatro campos aparecem vazios e travados.
   *
   * O valor NÃO é apagado do estado, só deixa de ser exibido. Apagar de fato
   * significaria perder o que o aluno digitou por ter mexido num seletor —
   * ele volta inteiro assim que o próximo prompt voltar a ser de texto.
   */
  const benchIdle = next?.output === 'avatar-json' || next?.output === 'pov';
  const shownBench = benchIdle ? EMPTY_BENCH : bench;

  const filled = FIELDS.filter((field) => shownBench[field.key].trim()).length;
  const complete = filled === FIELDS.length;

  /* o que libera o botão muda com o tipo de prompt que vem a seguir */
  const readyToGenerate =
    next?.output === 'pov'
      ? povIsReady(pov)
      : next?.output === 'avatar-json'
        ? sheetIsReady(sheet)
        : complete;

  /** Categorias que a biblioteca realmente tem, na ordem em que aparecem. */
  const libraryCategories = useMemo(
    () => [...new Set(prompts.map((p) => p.category))],
    [prompts],
  );

  /**
   * A linha ao lado do botão. Diz exatamente o que o próximo clique vai fazer —
   * inclusive quando não vai fazer nada, e por quê.
   */
  function generateHint(): string {
    /* o que falta depende do tipo do próximo prompt */
    if (next?.output === 'pov' && !povIsReady(pov))
      return 'Diga qual é a peça, abaixo, para montar o prompt do vídeo.';
    if (next?.output === 'avatar-json' && !sheetIsReady(sheet))
      return 'Preencha a ficha da apresentadora abaixo para montar o JSON.';
    if (!benchIdle && !complete)
      return 'Preencha os quatro campos da bancada para gerar o primeiro prompt.';

    if (!next) {
      return wanted
        ? `Você já gerou todos os prompts de ${wanted}. Escolha outro tipo ou limpe a lista abaixo.`
        : `Você já gerou os ${prompts.length} prompts da biblioteca. Limpe a lista abaixo para gerar de novo.`;
    }

    /*
     * Dizer QUAL prompt vem antes de clicar.
     *
     * Sem isto, quem escolhe Avatar preenche a ficha e pode receber o prompt do
     * roteiro falado, que não usa a ficha — o trabalho parece ter sido ignorado.
     * O nome do próximo remove a surpresa, e o aviso do JSON diz de onde ele vai
     * puxar o conteúdo.
     */
    /* na demonstração o ângulo é escolha da tela: ela diz qual e por quê */
    const angle = next.output === 'demo' && next.angle ? demoAngleById(next.angle) : undefined;
    const origem = angle
      ? `ângulo escolhido porque ${demoReason(angle, bench.produto, bench.beneficio)}`
      : next.output === 'avatar-json'
        ? 'monta o JSON com a ficha e a cena acima'
        : next.output === 'pov'
          ? 'monta o prompt com os ajustes acima'
          : 'já escrito com os seus dados';
    const quantos =
      remaining === 1 ? 'Resta 1' : `Restam ${remaining}`;
    const scope = wanted ? ` de ${wanted}` : '';

    return `${quantos}${scope}. Próximo: ${next.title} — ${origem}.`;
  }

  function handleGenerate() {
    const chosen = next;
    if (generating || !readyToGenerate || !chosen) return;

    /* filtro ativo esconderia justamente o que a pessoa acabou de pedir */
    setCategory(null);
    setQuery('');

    setGenerating(true);
    timer.current = window.setTimeout(() => {
      const at = Date.now();
      setGenerated((prev) => [
        {
          key: `${chosen.id}-${at}`,
          promptId: chosen.id,
          bench: { ...bench },
          at,
          ...(chosen.output === 'avatar-json' ? { sheet: { ...sheet }, shot: { ...shot } } : {}),
          ...(chosen.output === 'pov' ? { pov: { ...pov } } : {}),
        },
        ...prev,
      ]);
      setGenerating(false);
      timer.current = undefined;
    }, GENERATION_MS);
  }

  /**
   * Só entram na lista os gerados cujo prompt ainda existe na biblioteca. Sem
   * isso, trocar o conteúdo de plan-content deixaria cards órfãos no navegador
   * de quem já usou a tela.
   */
  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return generated
      .map((entry) => ({ entry, prompt: byId.get(entry.promptId) }))
      .filter((row): row is { entry: Generated; prompt: AiPrompt } => Boolean(row.prompt))
      .filter(({ prompt }) => {
        if (category && prompt.category !== category) return false;
        if (!term) return true;
        return (
          prompt.title.toLowerCase().includes(term) ||
          prompt.objective.toLowerCase().includes(term) ||
          prompt.category.toLowerCase().includes(term) ||
          prompt.tool.toLowerCase().includes(term) ||
          prompt.body.toLowerCase().includes(term)
        );
      });
  }, [generated, byId, category, query]);

  /* filtro só aparece quando há o que filtrar */
  const showControls = generated.length >= 3;
  const usedCategories = useMemo(() => {
    const found = new Set(
      generated.map((entry) => byId.get(entry.promptId)?.category).filter(Boolean),
    );
    return [...found] as PromptCategory[];
  }, [generated, byId]);

  /* --- versão Essencial: o material não existe neste bundle --- */
  if (!isComplete) {
    return (
      <div className="page">
        <LabHero />

        <div className={`card ${styles.locked}`}>
          <span className={styles.lockedIcon} aria-hidden="true">
            <Icon name="lock" size={22} />
          </span>
          <h2>O Laboratório faz parte da versão Completa</h2>
          <p>
            É onde ficam os prompts do Kit Vídeos com IA — UGC, avatar, demonstração, narração,
            ganchos e roteiro — gerados já com o seu produto dentro.
          </p>
          <Button to="/versao-completa" iconRight="arrowRight">
            Ver o que muda na versão Completa
          </Button>
        </div>
      </div>
    );
  }

  /* --- Completa, mas ainda sem material escrito --- */
  if (prompts.length === 0) {
    return (
      <div className="page">
        <LabHero />
        <div className={styles.pending}>
          <span className={`mono ${styles.pendingTag}`}>a escrever</span>
          <p>Os prompts desta área ainda estão em produção.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {dialog}
      <LabHero />

      {/* ---------- bancada: onde o prompt é encomendado ---------- */}
      <section className={styles.bench} aria-labelledby="bancada-titulo">
        <header className={styles.benchHead}>
          <div>
            <p className="eyebrow">Bancada</p>
            <h2 id="bancada-titulo">Descreva o seu produto uma vez</h2>
          </div>

          <div className={styles.benchMeter}>
            <span className={`mono ${styles.benchCount}`}>{filled}/4</span>
            <span className={styles.rail} aria-hidden="true">
              {FIELDS.map((field) => (
                <i
                  key={field.key}
                  className={bench[field.key].trim() ? styles.railOn : undefined}
                />
              ))}
            </span>
            <button
              className={styles.reset}
              onClick={() => setBench(EMPTY_BENCH)}
              disabled={filled === 0}
              title="Limpar os campos da bancada"
            >
              <Icon name="refresh" size={15} />
              <span className="sr-only">Limpar os campos da bancada</span>
            </button>
          </div>
        </header>

        <div className={styles.fields}>
          {FIELDS.map((field) => {
            const value = shownBench[field.key];
            return (
              <label
                key={field.key}
                className={[styles.field, value.trim() ? styles.fieldOn : '', benchIdle ? styles.fieldOff : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={`eyebrow ${styles.fieldLabel}`}>{field.label}</span>
                <input
                  id={benchFieldId(field.key)}
                  type="text"
                  value={value}
                  placeholder={field.placeholder}
                  autoComplete="off"
                  disabled={benchIdle}
                  onChange={(e) => setBench((prev) => ({ ...prev, [field.key]: e.target.value }))}
                />
                <small>{field.hint}</small>
              </label>
            );
          })}
        </div>

        {/* ---------- painel do POV: os ajustes que valem para as 10 cenas ---------- */}
        {wanted === 'Estilo POV' && (
          <div className={styles.pov}>
            <div className={styles.avatarHead}>
              <p className="eyebrow">Ajustes do vídeo</p>
              <span className={`mono ${povIsReady(pov) ? styles.sheetOk : styles.sheetOff}`}>
                {povIsReady(pov) ? 'pronto' : 'diga qual é a peça'}
              </span>
            </div>
            <p className={styles.avatarNote}>
              Isto vale para as dez cenas. Cada clique entrega uma cena diferente com estes mesmos
              ajustes — é assim que sai um produto em dez vídeos.
            </p>

            <div className={styles.povFields}>
              <label className={`${styles.avatarField} ${styles.povWide}`}>
                <span className="eyebrow">A peça</span>
                <input
                  type="text"
                  value={pov.item}
                  placeholder="camiseta oversized preta, gola careca"
                  autoComplete="off"
                  onChange={(e) => setPov({ ...pov, item: e.target.value })}
                />
                <small>como você descreveria no anúncio</small>
              </label>

              <PovPick
                label="Onde"
                value={pov.place}
                options={POV_PLACES}
                onChange={(value) => setPov({ ...pov, place: value })}
              />
              <PovPick
                label="Luz"
                value={pov.light}
                options={POV_LIGHTS}
                onChange={(value) => setPov({ ...pov, light: value })}
              />
              <PovPick
                label="Câmera"
                value={pov.camera}
                options={POV_CAMERAS}
                onChange={(value) => setPov({ ...pov, camera: value })}
              />
              <PovPick
                label="Tecido"
                value={pov.fabric}
                options={POV_FABRICS}
                onChange={(value) => setPov({ ...pov, fabric: value })}
              />

              <label className={`${styles.avatarField} ${styles.povWide}`}>
                <span className="eyebrow">Mais alguma coisa</span>
                <input
                  type="text"
                  value={pov.extra}
                  placeholder="opcional — ex.: fundo de tijolo aparente"
                  autoComplete="off"
                  onChange={(e) => setPov({ ...pov, extra: e.target.value })}
                />
                <small>entra no fim da primeira linha, em português ou inglês</small>
              </label>
            </div>
          </div>
        )}

        {/* ---------- painel do avatar: só quando o tipo é Avatar ---------- */}
        {wanted === 'Avatar' && (
          <div className={styles.avatar}>
            {/* a categoria Avatar tem prompts de imagem e de fala; só os de
                imagem usam estes campos. Quando o próximo é de fala, o painel
                diz — melhor que o aluno preencher e o texto ignorar. */}
            {next && next.output !== 'avatar-json' && (
              <p className={styles.avatarIdle}>
                O próximo prompt desta categoria é de <strong>texto falado</strong> e não usa estes
                campos. A ficha fica guardada para as próximas imagens.
              </p>
            )}

            <div className={styles.avatarBlock}>
              <div className={styles.avatarHead}>
                <p className="eyebrow">Ficha da apresentadora</p>
                <span className={`mono ${sheetIsReady(sheet) ? styles.sheetOk : styles.sheetOff}`}>
                  {sheetIsReady(sheet) ? 'identidade travada' : 'preencha uma vez'}
                </span>
              </div>
              <p className={styles.avatarNote}>
                Isto se repete idêntico em toda cena — é o que faz ser a mesma pessoa nas próximas
                fotos. Redescrever com outras palavras depois devolve outra pessoa.
              </p>

              <div className={styles.avatarFields}>
                {SHEET_FIELDS.map((field) => (
                  <label key={field.key} className={styles.avatarField}>
                    <span className="eyebrow">{field.label}</span>
                    <input
                      type="text"
                      value={sheet[field.key]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      onChange={(e) => setSheet({ ...sheet, [field.key]: e.target.value })}
                    />
                    <small>{field.hint}</small>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.avatarBlock}>
              <div className={styles.avatarHead}>
                <p className="eyebrow">Esta cena</p>
                <span className={`mono ${styles.sheetOff}`}>muda a cada foto</span>
              </div>
              <p className={styles.avatarNote}>
                Troque só o que está aqui embaixo entre uma geração e outra. Uma variável por vez
                ensina mais que mudar tudo de uma vez.
              </p>

              <div className={styles.avatarFields}>
                {SHOT_FIELDS.map((field) => (
                  <label key={field.key} className={styles.avatarField}>
                    <span className="eyebrow">{field.label}</span>
                    <input
                      type="text"
                      value={shot[field.key]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      onChange={(e) => setShot({ ...shot, [field.key]: e.target.value })}
                    />
                    <small>{field.hint}</small>
                  </label>
                ))}

                <label className={styles.avatarField}>
                  <span className="eyebrow">Enquadramento</span>
                  <span className={styles.avatarSelect}>
                    <select
                      value={shot.framing}
                      onChange={(e) => setShot({ ...shot, framing: e.target.value })}
                    >
                      {FRAMINGS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={15} />
                  </span>
                  <small>o resto da câmera já vai fixo no JSON</small>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className={styles.benchFoot}>
          <p className={styles.benchHint}>{generateHint()}</p>

          <div className={styles.benchActions}>
            {/* o tipo do que vai sair do próximo clique — não confundir com o
                filtro da listagem, que só mexe no que já foi gerado */}
            <label className={styles.picker}>
              <span className={`mono ${styles.pickerLabel}`}>Tipo</span>
              <select
                value={wanted ?? ''}
                onChange={(e) => setWanted((e.target.value || null) as PromptCategory | null)}
                aria-label="Tipo do prompt a gerar"
              >
                <option value="">Qualquer tipo</option>
                {libraryCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={15} />
            </label>

            <button
              className={styles.generate}
              onClick={handleGenerate}
              disabled={!readyToGenerate || !next || generating}
            >
              {generating ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <Icon name="sparkle" size={17} />
                  <span>Gerar prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- filtros: só quando já há o que filtrar ---------- */}
      {showControls && (
        <div className={styles.controls}>
          <div className={styles.search}>
            <Icon name="search" size={17} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nos prompts que você gerou..."
              aria-label="Buscar nos prompts gerados"
            />
          </div>

          <div className={styles.chips} role="group" aria-label="Filtrar por categoria">
            <button
              className={[styles.chip, category === null ? styles.chipOn : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setCategory(null)}
            >
              Todos
            </button>
            {usedCategories.map((item) => (
              <button
                key={item}
                className={[styles.chip, category === item ? styles.chipOn : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setCategory(category === item ? null : item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------- listagem do que foi gerado ---------- */}
      {generated.length > 0 && (
        <div className={styles.listHead}>
          <p className="eyebrow">Seus prompts</p>
          <span className={`mono ${styles.listCount}`}>
            {generated.length === 1 ? '1 gerado' : `${generated.length} gerados`}
          </span>
          <button
            className={styles.clear}
            onClick={() =>
              ask({
                message: 'Deseja limpar a lista?',
                detail: `${generated.length} ${generated.length === 1 ? 'prompt gerado' : 'prompts gerados'}`,
                confirmLabel: 'Limpar',
                onConfirm: () => {
                  setGenerated([]);
                  setCategory(null);
                  setQuery('');
                },
              })
            }
          >
            Limpar lista
          </button>
        </div>
      )}

      <div className={styles.list} ref={listRef}>
        {generating && <SkeletonCard />}

        {rows.map(({ entry, prompt }) => (
          <PromptCard
            key={entry.key}
            prompt={prompt}
            entry={entry}
            onDiscard={() => setGenerated((prev) => prev.filter((g) => g.key !== entry.key))}
            onPack={(raw) =>
              setGenerated((prev) =>
                prev.map((g) => (g.key === entry.key ? { ...g, pack: raw.trim() } : g)),
              )
            }
          />
        ))}

        {/* nada gerado ainda: o vazio aponta de volta para a bancada */}
        {!generating && generated.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <Icon name="flask" size={22} />
            </span>
            <p className={styles.emptyTitle}>Nenhum prompt gerado ainda.</p>
            <p className={styles.emptyText}>
              Preencha a bancada acima e clique em <strong>Gerar prompt</strong>. O que aparecer
              aqui já vem com o seu produto, o seu público e o seu tom dentro do texto.
            </p>
          </div>
        )}

        {/* gerou, mas o filtro escondeu tudo */}
        {!generating && generated.length > 0 && rows.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nenhum dos seus prompts bate com esses filtros.</p>
            <button
              className={styles.emptyReset}
              onClick={() => {
                setQuery('');
                setCategory(null);
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      <p className={styles.foot}>
        Os prompts descrevem o TIPO de ferramenta, não a marca — serviço de IA muda de nome e de
        recurso sozinho. O que a máquina devolve é rascunho: a lista “depois de gerar” é a parte que
        faz o vídeo parar de ter cara de IA.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Cabeçalho — o único lugar da plataforma com o desdobramento de cor da marca
   --------------------------------------------------------------------------- */

function LabHero() {
  return (
    <header className={styles.hero}>
      {/* varredura única no carregamento — o gesto de ligar a bancada */}
      <span className={styles.scan} aria-hidden="true" />

      <div className={styles.heroInner}>
        <p className={`eyebrow ${styles.heroEyebrow}`}>
          <Icon name="flask" size={13} /> Kit Vídeos com IA
        </p>

        <h1 className={styles.heroTitle} data-text="Laboratório IA">
          <span>Laboratório IA</span>
        </h1>

        <p className={styles.heroText}>
          Descreva o seu produto uma vez e gere os prompts de cena, fala e roteiro — cada um já
          escrito com o seu caso dentro, pronto para colar na ferramenta.
        </p>
      </div>
    </header>
  );
}
