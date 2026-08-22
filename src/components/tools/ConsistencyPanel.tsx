import { useEffect, useMemo, useState } from 'react';
import {
  CYCLE_DAYS,
  MIN_SAMPLE,
  addDays,
  analyzeHooks,
  bestStreak,
  currentStreak,
  downloadCsv,
  formatDayLabel,
  isApproved,
  loadCandidates,
  postHooks,
  postsToCsv,
  TRACKER_KEY,
  loadTracker,
  todayIso,
} from '@/data/tools';
import { formatCount, formatDecimal, parseNumber } from '@/data/metrics';
import type { Tracker } from '@/data/tools';
import type { VideoPost } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/Confirm';
import styles from './ConsistencyPanel.module.css';

/**
 * PAINEL DE CONSISTÊNCIA — regra dos 21 dias e escala vertical
 * ============================================================================
 * Duas ideias do capítulo 5 numa tela só:
 *
 *   · REGRA DOS 21 DIAS — a grade é o ciclo inteiro à vista. Dia publicado
 *     acende, dia perdido fica marcado, e a sequência conta sozinha. O valor
 *     não está na contagem: está em ver o buraco de ontem antes de repetir.
 *
 *   · ESCALA VERTICAL — vários vídeos do mesmo produto variando o formato. Por
 *     isso um dia aceita quantas postagens o aluno quiser, e a comparação
 *     embaixo é POR FORMATO, não por vídeo.
 *
 * O QUE A TELA NÃO FAZ: apontar vencedor com dois registros. Média de duas
 * postagens é ruído com cara de conclusão — e a plataforma inventando um dado
 * é exatamente o que ela não pode fazer. Abaixo de MIN_SAMPLE a tabela aparece
 * e o veredito não.
 *
 * DEPENDÊNCIA: o seletor de produto lê a lista da central de mineração. Guarda
 * o NOME, não o id — apagar um produto de lá não pode apagar o histórico do que
 * já foi publicado.
 */

/* o estado mora em src/data/tools.ts: o painel de controle lê o mesmo */

/** O formulário dentro do modal. `id` vazio = postagem nova. */
interface Draft {
  id: string;
  product: string;
  /** true = o aluno digitou um produto que não está na central de mineração. */
  freeProduct: boolean;
  hook: string;
  link: string;
  views: string;
  sales: string;
}

const OTHER = '__outro__';

function emptyDraft(hasProducts: boolean): Draft {
  return {
    id: '',
    product: '',
    freeProduct: !hasProducts,
    hook: postHooks[0],
    link: '',
    views: '',
    sales: '',
  };
}

/** Número guardado volta para o campo no formato que o parser reconhece. */
function toField(value: number | null): string {
  return value === null ? '' : formatCount(value);
}

export function ConsistencyPanel() {
  const [tracker, setTracker] = useState<Tracker>(loadTracker);
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const { toast } = useToast();
  const { ask, dialog } = useConfirm();

  /* a lista da ferramenta 01, lida na montagem: trocar de aba remonta */
  const products = useMemo(() => loadCandidates(), []);
  const today = todayIso();

  useEffect(() => {
    try {
      localStorage.setItem(TRACKER_KEY, JSON.stringify(tracker));
    } catch {
      /* sem armazenamento o painel funciona na sessão e não guarda */
    }
  }, [tracker]);

  const postedDates = useMemo(
    () => new Set(tracker.posts.map((post) => post.date)),
    [tracker.posts],
  );

  const days = useMemo(
    () =>
      Array.from({ length: CYCLE_DAYS }, (_, index) => {
        const date = addDays(tracker.startDate, index);
        return { index, date, posts: tracker.posts.filter((post) => post.date === date) };
      }),
    [tracker.startDate, tracker.posts],
  );

  const streak = currentStreak(postedDates, today);
  const best = bestStreak(postedDates);
  const daysDone = days.filter((day) => day.posts.length > 0).length;
  const cycleOver = addDays(tracker.startDate, CYCLE_DAYS - 1) < today;

  const stats = useMemo(() => analyzeHooks(tracker.posts), [tracker.posts]);
  const rated = stats.filter((stat) => stat.avgViews !== null);
  const winner = rated[0] && rated[0].posts >= MIN_SAMPLE ? rated[0] : null;

  const dayPosts = openDay ? tracker.posts.filter((post) => post.date === openDay) : [];

  function savePost() {
    if (!draft || !openDay) return;
    const product = draft.product.trim();
    if (!product) return;

    const values = {
      product,
      hook: draft.hook,
      link: draft.link.trim(),
      views: parseNumber(draft.views),
      sales: parseNumber(draft.sales),
    };

    if (draft.id) {
      setTracker((prev) => ({
        ...prev,
        posts: prev.posts.map((post) => (post.id === draft.id ? { ...post, ...values } : post)),
      }));
      toast('Postagem atualizada.');
    } else {
      setTracker((prev) => ({
        ...prev,
        posts: [
          ...prev.posts,
          {
            id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            date: openDay,
            createdAt: Date.now(),
            ...values,
          },
        ],
      }));
      toast('Postagem registrada.');
    }

    setDraft(null);
  }

  function removePost(post: VideoPost) {
    // O modal do dia sai de cena antes da pergunta: duas caixas empilhadas
    // escondem a de baixo e deixam dúvida sobre qual delas o botão fecha.
    setOpenDay(null);
    ask({
      message: 'Deseja deletar esta postagem?',
      detail: `${post.product} — ${post.hook}`,
      onConfirm: () =>
        setTracker((prev) => ({
          ...prev,
          posts: prev.posts.filter((item) => item.id !== post.id),
        })),
    });
  }

  function restart() {
    ask({
      message: 'Recomeçar o ciclo a partir de hoje?',
      detail: 'A grade dos 21 dias volta ao começo.',
      confirmLabel: 'Recomeçar',
      tone: 'neutral',
      onConfirm: () => {
        setTracker((prev) => ({ ...prev, startDate: today }));
        toast('Novo ciclo de 21 dias começou hoje.');
      },
    });
  }

  function exportCsv() {
    if (tracker.posts.length === 0) return;
    downloadCsv(`postagens-${today}.csv`, postsToCsv(tracker.posts));
    toast('Planilha exportada.');
  }

  return (
    <section className={styles.tool} aria-labelledby="consistencia-titulo">
      <header className={styles.head}>
        <div>
          <h2 id="consistencia-titulo">Painel de consistência</h2>
          <p className={styles.lead}>
            Vinte e um dias publicando sem falhar. Registre cada vídeo e a tela mostra a sua
            sequência e qual formato está rendendo mais.
          </p>
        </div>

        <div className={styles.headActions}>
          <button
            className={styles.export}
            onClick={exportCsv}
            disabled={tracker.posts.length === 0}
            title="Baixar o histórico em CSV"
          >
            <Icon name="download" size={15} /> Exportar
          </button>
          <button
            className={styles.add}
            onClick={() => {
              setOpenDay(today);
              setDraft(emptyDraft(products.length > 0));
            }}
          >
            <Icon name="sparkle" size={17} /> Registrar hoje
          </button>
        </div>
      </header>

      {/* ---------- placar ---------- */}
      <div className={styles.scoreboard}>
        <div className={[styles.score, streak > 0 ? styles.scoreLive : ''].filter(Boolean).join(' ')}>
          <span className={`mono ${styles.scoreValue}`}>{streak}</span>
          <span className={styles.scoreLabel}>
            {streak === 1 ? 'dia seguido' : 'dias seguidos'}
          </span>
        </div>
        <div className={styles.score}>
          <span className={`mono ${styles.scoreValue}`}>{best}</span>
          <span className={styles.scoreLabel}>melhor sequência</span>
        </div>
        <div className={styles.score}>
          <span className={`mono ${styles.scoreValue}`}>
            {daysDone}
            <small>/{CYCLE_DAYS}</small>
          </span>
          <span className={styles.scoreLabel}>dias do ciclo</span>
        </div>
        <div className={styles.score}>
          <span className={`mono ${styles.scoreValue}`}>{tracker.posts.length}</span>
          <span className={styles.scoreLabel}>
            {tracker.posts.length === 1 ? 'postagem' : 'postagens'}
          </span>
        </div>
      </div>

      {/* ---------- a grade dos 21 dias ---------- */}
      <div className={styles.gridHead}>
        <p className="eyebrow">Ciclo de {CYCLE_DAYS} dias</p>
        <button className={styles.restart} onClick={restart}>
          <Icon name="refresh" size={14} /> Recomeçar ciclo
        </button>
      </div>

      {cycleOver && (
        <p className={styles.cycleNote}>
          Este ciclo terminou em {formatDayLabel(addDays(tracker.startDate, CYCLE_DAYS - 1))}.
          Recomece para acompanhar os próximos {CYCLE_DAYS} dias — o histórico continua salvo.
        </p>
      )}

      <div className={styles.grid}>
        {days.map((day) => {
          const done = day.posts.length > 0;
          const isToday = day.date === today;
          const future = day.date > today;
          const missed = !done && !future && !isToday;

          return (
            <button
              key={day.date}
              className={[
                styles.cell,
                done ? styles.cellDone : '',
                missed ? styles.cellMissed : '',
                isToday ? styles.cellToday : '',
                future ? styles.cellFuture : '',
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={future}
              onClick={() => {
                setOpenDay(day.date);
                setDraft(null);
              }}
              title={`Dia ${day.index + 1} · ${formatDayLabel(day.date)}`}
            >
              <span className={`mono ${styles.cellDay}`}>{day.index + 1}</span>
              <span className={`mono ${styles.cellDate}`}>{formatDayLabel(day.date)}</span>
              {day.posts.length > 1 && (
                <span className={`mono ${styles.cellCount}`}>{day.posts.length}</span>
              )}
              {done && day.posts.length === 1 && (
                <span className={styles.cellTick} aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ---------- comparação entre formatos ---------- */}
      <div className={styles.analysis}>
        <div className={styles.analysisHead}>
          <p className="eyebrow">Escala vertical</p>
          <h3>Qual formato está rendendo mais</h3>
        </div>

        {stats.length === 0 ? (
          <p className={styles.analysisEmpty}>
            Registre postagens variando o formato do mesmo produto. A comparação aparece aqui.
          </p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Formato</th>
                  <th>Vídeos</th>
                  <th>Média de views</th>
                  <th>Média de vendas</th>
                  <th>Vendas</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr
                    key={stat.hook}
                    className={winner?.hook === stat.hook ? styles.tableWinner : undefined}
                  >
                    <td>{stat.hook}</td>
                    <td className="mono">{stat.posts}</td>
                    <td className="mono">
                      {stat.avgViews === null ? '—' : formatCount(Math.round(stat.avgViews))}
                    </td>
                    <td className="mono">
                      {stat.avgSales === null ? '—' : formatDecimal(stat.avgSales)}
                    </td>
                    <td className="mono">{stat.totalSales}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* veredito só com amostra: média de dois vídeos não decide nada */}
            <p className={winner ? styles.verdict : styles.verdictWaiting}>
              {winner ? (
                <>
                  <Icon name="check" size={14} />
                  <span>
                    <strong>{winner.hook}</strong> está com a maior média de visualizações nos seus{' '}
                    {winner.posts} vídeos desse formato. Vale insistir nele antes de trocar.
                  </span>
                </>
              ) : (
                <span>
                  Ainda são poucos registros para apontar um vencedor. A partir de {MIN_SAMPLE}{' '}
                  vídeos do mesmo formato, a média começa a dizer alguma coisa.
                </span>
              )}
            </p>
          </>
        )}
      </div>

      {/* ---------- o dia aberto ---------- */}
      {openDay && (
        <Modal
          title={`Dia ${days.findIndex((day) => day.date === openDay) + 1 || ''} · ${formatDayLabel(openDay)}`}
          subtitle={
            dayPosts.length === 0
              ? 'Nenhuma postagem neste dia ainda.'
              : `${dayPosts.length} ${dayPosts.length === 1 ? 'postagem' : 'postagens'} — vários vídeos no mesmo dia é escala vertical, não excesso.`
          }
          onClose={() => {
            setOpenDay(null);
            setDraft(null);
          }}
          footer={
            draft ? (
              <div className={styles.footBar}>
                <button className={styles.cancel} onClick={() => setDraft(null)}>
                  Cancelar
                </button>
                <button
                  className={styles.save}
                  onClick={savePost}
                  disabled={!draft.product.trim()}
                >
                  {draft.id ? 'Salvar alterações' : 'Registrar postagem'}
                </button>
              </div>
            ) : (
              <button
                className={styles.addInline}
                onClick={() => setDraft(emptyDraft(products.length > 0))}
              >
                <Icon name="sparkle" size={16} /> Registrar postagem
              </button>
            )
          }
        >
          {dayPosts.length > 0 && (
            <ul className={styles.dayList}>
              {dayPosts.map((post) => (
                <li key={post.id} className={styles.dayPost}>
                  <div className={styles.dayPostMain}>
                    <strong>{post.product}</strong>
                    <span className={`mono ${styles.dayHook}`}>{post.hook}</span>
                  </div>

                  <div className={`mono ${styles.dayNumbers}`}>
                    <span>{post.views === null ? '— views' : `${formatCount(post.views)} views`}</span>
                    <span>{post.sales === null ? '— vendas' : `${post.sales} vendas`}</span>
                  </div>

                  <div className={styles.dayActions}>
                    {post.link && (
                      <a href={post.link} target="_blank" rel="noopener noreferrer" aria-label="Abrir o vídeo">
                        <Icon name="external" size={15} />
                      </a>
                    )}
                    <button
                      onClick={() =>
                        setDraft({
                          id: post.id,
                          product: post.product,
                          freeProduct: !products.some((item) => item.name === post.product),
                          hook: post.hook,
                          link: post.link,
                          views: toField(post.views),
                          sales: toField(post.sales),
                        })
                      }
                      aria-label="Editar postagem"
                    >
                      <Icon name="edit" size={15} />
                    </button>
                    <button onClick={() => removePost(post)} aria-label="Excluir postagem">
                      <Icon name="close" size={15} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {draft && (
            <div className={styles.form}>
              <label className={styles.field}>
                <span className="eyebrow">Produto</span>
                {draft.freeProduct ? (
                  <input
                    type="text"
                    value={draft.product}
                    autoFocus
                    placeholder="Nome do produto"
                    onChange={(e) => setDraft({ ...draft, product: e.target.value })}
                  />
                ) : (
                  <span className={styles.select}>
                    <select
                      value={draft.product}
                      onChange={(e) =>
                        e.target.value === OTHER
                          ? setDraft({ ...draft, freeProduct: true, product: '' })
                          : setDraft({ ...draft, product: e.target.value })
                      }
                    >
                      <option value="">Escolha um produto</option>
                      {products.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                          {isApproved(item.scores) ? ' · aprovado' : ''}
                        </option>
                      ))}
                      <option value={OTHER}>Outro produto...</option>
                    </select>
                    <Icon name="chevronDown" size={15} />
                  </span>
                )}
                {products.length === 0 && (
                  <small>
                    A central de mineração ainda está vazia. Cadastre lá e os produtos aparecem
                    aqui.
                  </small>
                )}
              </label>

              <label className={styles.field}>
                <span className="eyebrow">Gancho</span>
                <span className={styles.select}>
                  <select
                    value={draft.hook}
                    onChange={(e) => setDraft({ ...draft, hook: e.target.value })}
                  >
                    {postHooks.map((hook) => (
                      <option key={hook} value={hook}>
                        {hook}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={15} />
                </span>
              </label>

              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span className="eyebrow">Link do vídeo</span>
                <input
                  type="url"
                  value={draft.link}
                  placeholder="cole o link da publicação"
                  onChange={(e) => setDraft({ ...draft, link: e.target.value })}
                />
              </label>

              <label className={styles.field}>
                <span className="eyebrow">Visualizações</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={draft.views}
                  placeholder="deixe vazio se ainda não olhou"
                  onChange={(e) => setDraft({ ...draft, views: e.target.value })}
                />
              </label>

              <label className={styles.field}>
                <span className="eyebrow">Vendas geradas</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={draft.sales}
                  placeholder="deixe vazio se ainda não olhou"
                  onChange={(e) => setDraft({ ...draft, sales: e.target.value })}
                />
              </label>
            </div>
          )}
        </Modal>
      )}

      {dialog}
    </section>
  );
}
