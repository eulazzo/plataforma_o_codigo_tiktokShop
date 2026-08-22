import { useEffect, useMemo, useState } from 'react';
import { hookKindOrder, hookKinds, hooks, isBlank, splitHook } from '@/data/hooks';
import { planContent, isEssential } from '@/plan';
import type { Hook, HookKind } from '@/data/types';
import { useCopy } from '@/hooks/useCopy';
import { Icon } from '@/components/ui/Icon';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import styles from './HookLibrary.module.css';

/**
 * BIBLIOTECA DE GANCHOS
 * ============================================================================
 * Cinquenta primeiras frases, prontas para copiar.
 *
 * A tela é uma LISTA, não uma grade de cards. São itens curtos, lidos em voz
 * alta, e o trabalho de quem chega aqui é varrer tudo e escolher três para
 * testar hoje. Grade quebraria a leitura em colunas; a lista deixa o olho
 * descer por 50 frases sem parar.
 *
 * A linha inteira é o botão de copiar — alvo grande, uma intenção só. A
 * estrela fica de fora dele, porque é a outra intenção: separar o que interessa
 * do que não interessa. Sem essa separação, 50 frases viram 50 frases; com ela,
 * viram uma lista de três.
 *
 * Os colchetes ficam em âmbar na tela E no texto copiado, de propósito: é o que
 * impede alguém de gravar dizendo "quando você abre a gaveta" quando o produto
 * dele não tem gaveta nenhuma.
 *
 * VERSÃO: os 20 da base estão nas duas; os outros 30 só existem no bundle da
 * Completa (ver plan-content.complete.ts).
 */

const STORAGE_MARKED = 'ocodigo:ganchos:marcados';

function loadMarked(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_MARKED);
    if (!raw) return [];
    const saved = JSON.parse(raw) as string[];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

/* ---------------------------------------------------------------------------
   Uma linha
   --------------------------------------------------------------------------- */

interface HookRowProps {
  hook: Hook;
  marked: boolean;
  copied: boolean;
  onCopy: () => void;
  onToggle: () => void;
}

function HookRow({ hook, marked, copied, onCopy, onToggle }: HookRowProps) {
  return (
    <li className={[styles.row, copied ? styles.rowCopied : ''].filter(Boolean).join(' ')}>
      <button className={styles.pick} onClick={onCopy} title="Copiar este gancho">
        <span className={`mono ${styles.num}`} aria-hidden="true">
          {hook.number}
        </span>

        <span className={styles.text}>
          {splitHook(hook.text).map((part, index) =>
            isBlank(part) ? (
              <span key={index} className={styles.blank}>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            ),
          )}
        </span>

        <span className={`mono ${styles.kind}`}>{hook.kind}</span>

        <span className={styles.copyIcon} aria-hidden="true">
          <Icon name={copied ? 'check' : 'copy'} size={16} />
        </span>
      </button>

      <button
        className={[styles.star, marked ? styles.starOn : ''].filter(Boolean).join(' ')}
        onClick={onToggle}
        aria-pressed={marked}
        title={marked ? 'Tirar da seleção' : 'Separar para testar'}
      >
        <Icon name="star" size={17} />
        <span className="sr-only">
          {marked ? 'Tirar da seleção' : 'Separar para testar'}
        </span>
      </button>
    </li>
  );
}

/* ---------------------------------------------------------------------------
   Tela
   --------------------------------------------------------------------------- */

export function HookLibrary() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<HookKind | null>(null);
  const [onlyMarked, setOnlyMarked] = useState(false);
  const [marked, setMarked] = useState<string[]>(loadMarked);
  /* confirmação visual na própria linha; o toast avisa, isto mostra ONDE */
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCopy();

  /* base (nas duas versões) + os exclusivos da Completa */
  const all = useMemo<Hook[]>(() => [...hooks, ...planContent.extraHooks], []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MARKED, JSON.stringify(marked));
    } catch {
      /* sem armazenamento a tela funciona igual, só não guarda a seleção */
    }
  }, [marked]);

  useEffect(() => {
    if (!copiedId) return;
    const id = window.setTimeout(() => setCopiedId(null), 1400);
    return () => window.clearTimeout(id);
  }, [copiedId]);

  const markedSet = useMemo(() => new Set(marked), [marked]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return all.filter((hook) => {
      if (kind && hook.kind !== kind) return false;
      if (onlyMarked && !markedSet.has(hook.id)) return false;
      if (!term) return true;
      return hook.text.toLowerCase().includes(term) || hook.kind.toLowerCase().includes(term);
    });
  }, [all, kind, onlyMarked, markedSet, query]);

  /** Só oferece filtro de tipo que a versão do aluno realmente tem. */
  const kindsAvailable = useMemo(() => {
    const found = new Set(all.map((hook) => hook.kind));
    return hookKindOrder.filter((item) => found.has(item));
  }, [all]);

  function toggleMark(id: string) {
    setMarked((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function handleCopy(hook: Hook) {
    copy(hook.text, 'Gancho copiado!');
    setCopiedId(hook.id);
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Ganchos</p>
        <h1>Biblioteca de ganchos</h1>
        <p>
          {all.length} primeiras frases prontas para copiar. O gancho é o que decide se alguém
          assiste o resto.
        </p>
      </header>

      {/* como usar, antes de a pessoa começar a copiar — não depois */}
      <aside className={styles.intro}>
        <span className={styles.introIcon} aria-hidden="true">
          <Icon name="magnet" size={18} />
        </span>
        <p>
          O que está entre colchetes é o que você troca pelo seu caso — e vai junto no texto
          copiado, para não sobrar na fala. Grave o mesmo vídeo com três aberturas diferentes e
          publique separado: é o teste mais barato que existe.
        </p>
      </aside>

      {/* ---------- filtros ---------- */}
      <div className={styles.controls}>
        <div className={styles.search}>
          <Icon name="search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar palavra dentro do gancho..."
            aria-label="Buscar gancho"
          />
        </div>

        <div className={styles.chips} role="group" aria-label="Filtrar por tipo">
          <button
            className={[styles.chip, kind === null ? styles.chipOn : ''].filter(Boolean).join(' ')}
            onClick={() => setKind(null)}
          >
            Todos
          </button>
          {kindsAvailable.map((item) => (
            <button
              key={item}
              className={[styles.chip, kind === item ? styles.chipOn : ''].filter(Boolean).join(' ')}
              onClick={() => setKind(kind === item ? null : item)}
            >
              {item}
            </button>
          ))}
          <button
            className={[styles.chip, styles.chipToggle, onlyMarked ? styles.chipOn : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => setOnlyMarked((v) => !v)}
            aria-pressed={onlyMarked}
          >
            <Icon name="star" size={14} /> Separados
            {marked.length > 0 && <span className="mono">{marked.length}</span>}
          </button>
        </div>

        {/* o tipo escolhido se explica: cinco linhas ensinam mais que cinquenta */}
        <p className={styles.kindNote}>
          {kind
            ? hookKinds[kind]
            : 'Cinco tipos de abertura. Escolha um acima para ver quando ele funciona.'}
        </p>
      </div>

      {/* ---------- a lista ---------- */}
      {results.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            {onlyMarked && marked.length === 0
              ? 'Você ainda não separou nenhum gancho.'
              : 'Nenhum gancho com esses filtros.'}
          </p>
          <p className={styles.emptyText}>
            {onlyMarked && marked.length === 0
              ? 'Toque na estrela ao lado de um gancho para guardá-lo aqui.'
              : 'Tente outra palavra ou outro tipo.'}
          </p>
          <button
            className={styles.emptyReset}
            onClick={() => {
              setQuery('');
              setKind(null);
              setOnlyMarked(false);
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <div className={styles.listHead}>
            <span className={`mono ${styles.count}`}>
              {results.length === all.length
                ? `${all.length} ganchos`
                : `${results.length} de ${all.length}`}
            </span>
          </div>

          <ul className={styles.list}>
            {results.map((hook) => (
              <HookRow
                key={hook.id}
                hook={hook}
                marked={markedSet.has(hook.id)}
                copied={copiedId === hook.id}
                onCopy={() => handleCopy(hook)}
                onToggle={() => toggleMark(hook.id)}
              />
            ))}
          </ul>
        </>
      )}

      {isEssential && (
        <div className={styles.bannerSlot}>
          <UpgradeBanner />
        </div>
      )}
    </div>
  );
}
