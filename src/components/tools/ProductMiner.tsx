import { useEffect, useMemo, useState } from 'react';
import {
  APPROVAL_SCORE,
  MAX_SCORE,
  candidatesToCsv,
  downloadCsv,
  emptyScores,
  PRODUCTS_KEY,
  isApproved,
  loadCandidates,
  miningPillars,
  totalScore,
} from '@/data/tools';
import type { PillarId, PillarScore, ProductCandidate } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/Confirm';
import styles from './ProductMiner.module.css';

/**
 * CENTRAL DE MINERAÇÃO — validador 10/10
 * ============================================================================
 * O aluno cadastra os produtos que está pensando em promover, dá nota de 0 a 2
 * para os cinco pilares do módulo 03, e a ferramenta soma. Oito ou mais e o
 * produto vale o tempo de gravação.
 *
 * POR QUE ISTO SUBSTITUI UMA PLANILHA:
 * A planilha faria a mesma soma. O que ela não faz é MOSTRAR A RÉGUA no momento
 * de dar a nota — e é aí que a nota deixa de ser chute. Cada pilar mostra o que
 * significa 0, 1 e 2 enquanto a pessoa escolhe.
 *
 * O botão de exportar continua entregando a planilha, só que pronta: o trabalho
 * acontece aqui e o CSV é o que sai, não o que a pessoa precisa preencher.
 *
 * ONDE OS DADOS FICAM: no navegador do aluno. Não há backend nesta plataforma —
 * a lista é dele e some se ele limpar o navegador. Por isso o exportar não é
 * enfeite: é a cópia de segurança do trabalho dele.
 */

/* a lista mora em src/data/tools.ts: o painel de consistência lê a mesma */

type Filter = 'todos' | 'aprovados' | 'reprovados';

/** O rascunho que está dentro do modal. `id` vazio = produto novo. */
interface Draft {
  id: string;
  name: string;
  link: string;
  category: string;
  scores: Record<PillarId, PillarScore>;
}

const EMPTY_DRAFT: Draft = { id: '', name: '', link: '', category: '', scores: emptyScores };

/* ---------------------------------------------------------------------------
   Medidor dos cinco pilares — cabe numa linha da tabela
   --------------------------------------------------------------------------- */

function PillarMeter({ scores }: { scores: Record<PillarId, PillarScore> }) {
  return (
    <span className={styles.meter} aria-hidden="true">
      {miningPillars.map((pillar) => (
        <i
          key={pillar.id}
          className={styles[`lv${scores[pillar.id] ?? 0}` as 'lv0' | 'lv1' | 'lv2']}
          title={`${pillar.name}: ${scores[pillar.id] ?? 0}`}
        />
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Ferramenta
   --------------------------------------------------------------------------- */

export function ProductMiner() {
  const [items, setItems] = useState<ProductCandidate[]>(loadCandidates);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('todos');
  const { toast } = useToast();
  const { ask, dialog } = useConfirm();

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
    } catch {
      /* sem armazenamento a ferramenta funciona na sessão e não guarda */
    }
  }, [items]);

  /* melhor nota primeiro: é a ordem em que a decisão é tomada */
  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter((item) => {
        const approved = isApproved(item.scores);
        if (filter === 'aprovados' && !approved) return false;
        if (filter === 'reprovados' && approved) return false;
        if (!term) return true;
        return (
          item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => totalScore(b.scores) - totalScore(a.scores) || b.createdAt - a.createdAt);
  }, [items, filter, query]);

  const approvedCount = useMemo(
    () => items.filter((item) => isApproved(item.scores)).length,
    [items],
  );

  function save() {
    if (!draft) return;
    const name = draft.name.trim();
    if (!name) return;

    if (draft.id) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === draft.id
            ? { ...item, name, link: draft.link.trim(), category: draft.category.trim(), scores: draft.scores }
            : item,
        ),
      );
      toast('Produto atualizado.');
    } else {
      setItems((prev) => [
        {
          id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name,
          link: draft.link.trim(),
          category: draft.category.trim(),
          scores: draft.scores,
          createdAt: Date.now(),
        },
        ...prev,
      ]);
      toast(
        isApproved(draft.scores)
          ? `${name} entrou aprovado com ${totalScore(draft.scores)}/${MAX_SCORE}.`
          : `${name} salvo com ${totalScore(draft.scores)}/${MAX_SCORE}.`,
      );
    }

    setDraft(null);
  }

  function remove(item: ProductCandidate) {
    ask({
      detail: item.name,
      onConfirm: () => setItems((prev) => prev.filter((row) => row.id !== item.id)),
    });
  }

  function exportCsv() {
    if (items.length === 0) return;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`mineracao-${stamp}.csv`, candidatesToCsv(items));
    toast('Planilha exportada.');
  }

  const draftTotal = draft ? totalScore(draft.scores) : 0;
  const draftApproved = draftTotal >= APPROVAL_SCORE;

  return (
    <section className={styles.tool} aria-labelledby="mineracao-titulo">
      {dialog}
      {/* ---------- cabeçalho da ferramenta ---------- */}
      <header className={styles.head}>
        <div>
          <h2 id="mineracao-titulo">Central de mineração</h2>
          <p className={styles.lead}>
            Dê nota de 0 a 2 para os cinco pilares antes de gravar. {APPROVAL_SCORE} ou mais e o
            produto vale o seu tempo.
          </p>
        </div>

        <div className={styles.headActions}>
          <button
            className={styles.export}
            onClick={exportCsv}
            disabled={items.length === 0}
            title="Baixar a lista em CSV"
          >
            <Icon name="download" size={15} /> Exportar
          </button>
          <button className={styles.add} onClick={() => setDraft(EMPTY_DRAFT)}>
            <Icon name="sparkle" size={17} /> Adicionar produto
          </button>
        </div>
      </header>

      {items.length > 0 && (
        <>
          {/* ---------- resumo e filtros ---------- */}
          <div className={styles.stats}>
            <span className={`mono ${styles.stat}`}>
              <strong>{items.length}</strong> {items.length === 1 ? 'produto' : 'produtos'}
            </span>
            <span className={`mono ${styles.stat} ${styles.statOk}`}>
              <strong>{approvedCount}</strong> aprovados
            </span>
          </div>

          <div className={styles.controls}>
            <div className={styles.search}>
              <Icon name="search" size={16} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produto ou categoria..."
                aria-label="Buscar produto"
              />
            </div>

            <div className={styles.chips} role="group" aria-label="Filtrar por situação">
              {(['todos', 'aprovados', 'reprovados'] as const).map((item) => (
                <button
                  key={item}
                  className={[styles.chip, filter === item ? styles.chipOn : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setFilter(item)}
                >
                  {item === 'todos' ? 'Todos' : item === 'aprovados' ? 'Aprovados' : 'Reprovados'}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ---------- a lista ---------- */}
      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <Icon name="table" size={22} />
          </span>
          <p className={styles.emptyTitle}>Sua lista está vazia.</p>
          <p className={styles.emptyText}>
            Cada produto que você está pensando em promover entra aqui com uma nota. Em vez de
            decidir pela intuição, você compara os candidatos lado a lado.
          </p>
          <button className={styles.add} onClick={() => setDraft(EMPTY_DRAFT)}>
            <Icon name="sparkle" size={17} /> Adicionar o primeiro
          </button>
        </div>
      ) : rows.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nenhum produto com esses filtros.</p>
          <button
            className={styles.emptyReset}
            onClick={() => {
              setQuery('');
              setFilter('todos');
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {rows.map((item) => {
            const total = totalScore(item.scores);
            const approved = total >= APPROVAL_SCORE;

            return (
              <li
                key={item.id}
                className={[styles.row, approved ? styles.rowOk : styles.rowNo].join(' ')}
              >
                <div className={styles.rowMain}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <div className={styles.rowMeta}>
                    {item.category && (
                      <span className={`mono ${styles.category}`}>{item.category}</span>
                    )}
                    {item.link && (
                      <a
                        className={styles.link}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="external" size={13} /> referência
                      </a>
                    )}
                  </div>
                </div>

                <PillarMeter scores={item.scores} />

                <span className={`mono ${styles.score}`}>
                  {total}
                  <small>/{MAX_SCORE}</small>
                </span>

                <span className={`mono ${approved ? styles.tagOk : styles.tagNo}`}>
                  <Icon name={approved ? 'check' : 'close'} size={12} />
                  {approved ? 'Aprovado' : 'Reprovado'}
                </span>

                <div className={styles.rowActions}>
                  <button
                    onClick={() =>
                      setDraft({
                        id: item.id,
                        name: item.name,
                        link: item.link,
                        category: item.category,
                        scores: item.scores,
                      })
                    }
                    aria-label={`Editar ${item.name}`}
                  >
                    <Icon name="edit" size={16} />
                  </button>
                  <button onClick={() => remove(item)} aria-label={`Excluir ${item.name}`}>
                    <Icon name="close" size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* ---------- o formulário ---------- */}
      {draft && (
        <Modal
          title={draft.id ? 'Editar produto' : 'Novo produto candidato'}
          subtitle="A nota aparece embaixo enquanto você responde."
          onClose={() => setDraft(null)}
          footer={
            <div className={styles.footBar}>
              <div className={styles.liveScore}>
                <span
                  className={[styles.liveValue, draftApproved ? styles.liveOk : '']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="mono">{draftTotal}</span>
                  <small className="mono">/{MAX_SCORE}</small>
                </span>
                <span className={`mono ${draftApproved ? styles.tagOk : styles.tagPending}`}>
                  <Icon name={draftApproved ? 'check' : 'close'} size={12} />
                  {draftApproved ? 'Aprovado' : `Faltam ${APPROVAL_SCORE - draftTotal}`}
                </span>
              </div>

              <div className={styles.footActions}>
                <button className={styles.cancel} onClick={() => setDraft(null)}>
                  Cancelar
                </button>
                <button className={styles.save} onClick={save} disabled={!draft.name.trim()}>
                  {draft.id ? 'Salvar alterações' : 'Salvar produto'}
                </button>
              </div>
            </div>
          }
        >
          <div className={styles.form}>
            <label className={styles.field}>
              <span className="eyebrow">Produto</span>
              <input
                type="text"
                value={draft.name}
                autoFocus
                placeholder="Organizador de gaveta com divisórias"
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>

            <div className={styles.fieldPair}>
              <label className={styles.field}>
                <span className="eyebrow">Categoria</span>
                <input
                  type="text"
                  value={draft.category}
                  placeholder="Casa e organização"
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                />
              </label>

              <label className={styles.field}>
                <span className="eyebrow">Link de referência</span>
                <input
                  type="url"
                  value={draft.link}
                  placeholder="cole o link do anúncio"
                  onChange={(e) => setDraft({ ...draft, link: e.target.value })}
                />
              </label>
            </div>
          </div>

          <div className={styles.pillars}>
            {miningPillars.map((pillar) => {
              const value = draft.scores[pillar.id];
              return (
                <fieldset key={pillar.id} className={styles.pillar}>
                  <legend className={styles.pillarHead}>
                    <span className={styles.pillarName}>{pillar.name}</span>
                    <span className={styles.pillarQuestion}>{pillar.question}</span>
                  </legend>

                  <div className={styles.notes} role="radiogroup" aria-label={pillar.question}>
                    {([0, 1, 2] as const).map((note) => (
                      <button
                        key={note}
                        type="button"
                        role="radio"
                        aria-checked={value === note}
                        className={[
                          styles.note,
                          value === note ? styles.noteOn : '',
                          value === note && note === 2 ? styles.noteFull : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() =>
                          setDraft({
                            ...draft,
                            scores: { ...draft.scores, [pillar.id]: note },
                          })
                        }
                      >
                        <span className="mono">{note}</span>
                      </button>
                    ))}
                  </div>

                  {/* a régua: é isto que impede a nota de virar chute */}
                  <p className={styles.level}>{pillar.levels[value]}</p>
                </fieldset>
              );
            })}
          </div>
        </Modal>
      )}
    </section>
  );
}
