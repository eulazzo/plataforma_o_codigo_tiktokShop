import { useMemo, useState } from 'react';
import { contentCategories, contentFormats, formatDuration, formatToScript } from '@/data/contentLibrary';
import { planContent, isEssential } from '@/plan';
import type { ContentFormat } from '@/data/types';
import { useCopy } from '@/hooks/useCopy';
import { BeatStrip } from '@/components/ui/BeatStrip';
import { Icon } from '@/components/ui/Icon';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import styles from './ContentLibrary.module.css';

/**
 * BIBLIOTECA DE CONTEÚDO
 *
 * Tudo no card, sem tela de detalhe: quem abre esta tela está decidindo o que
 * gravar hoje e precisa comparar formatos de relance. Esconder a estrutura
 * atrás de um clique só adiciona atrito.
 *
 * A faixa fina no topo de cada card codifica a duração de cada trecho — dá para
 * ver onde o vídeo gasta o tempo sem ler nada.
 */
export function ContentLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [onlyFaceless, setOnlyFaceless] = useState(false);
  const copy = useCopy();

  /* base (nas duas versões) + estruturas exclusivas da Completa */
  const all = useMemo<ContentFormat[]>(
    () => [...contentFormats, ...planContent.contentLibrary],
    [],
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return all.filter((format) => {
      if (category && format.category !== category) return false;
      if (onlyFaceless && !format.faceless) return false;
      if (!term) return true;
      return (
        format.name.toLowerCase().includes(term) ||
        format.objective.toLowerCase().includes(term) ||
        format.category.toLowerCase().includes(term) ||
        format.beats.some((beat) => beat.label.toLowerCase().includes(term))
      );
    });
  }, [all, category, onlyFaceless, query]);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Biblioteca</p>
        <h1>Biblioteca de conteúdo</h1>
        <p>Estruturas de roteiro prontas para adaptar ao seu produto.</p>
      </header>

      {/* ---------- filtros ---------- */}
      <div className={styles.controls}>
        <div className={styles.search}>
          <Icon name="search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar estrutura, categoria ou trecho..."
            aria-label="Buscar estrutura"
          />
        </div>

        <div className={styles.chips} role="group" aria-label="Filtrar por categoria">
          <button
            className={[styles.chip, category === null ? styles.chipOn : ''].filter(Boolean).join(' ')}
            onClick={() => setCategory(null)}
          >
            Todos
          </button>
          {contentCategories.map((item) => (
            <button
              key={item}
              className={[styles.chip, category === item ? styles.chipOn : ''].filter(Boolean).join(' ')}
              onClick={() => setCategory(category === item ? null : item)}
            >
              {item}
            </button>
          ))}
          <button
            className={[styles.chip, styles.chipToggle, onlyFaceless ? styles.chipOn : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => setOnlyFaceless((v) => !v)}
            aria-pressed={onlyFaceless}
          >
            <Icon name="hide" size={14} /> Sem aparecer
          </button>
        </div>
      </div>

      {/* ---------- cards ---------- */}
      {results.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nenhuma estrutura com esses filtros.</p>
          <button
            className={styles.emptyReset}
            onClick={() => {
              setQuery('');
              setCategory(null);
              setOnlyFaceless(false);
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className={`stagger ${styles.grid}`}>
          {results.map((format) => {
            /* tempo acumulado, para mostrar em que segundo cada trecho começa */
            let elapsed = 0;
            const steps = format.beats.map((beat) => {
              const start = elapsed;
              elapsed += beat.seconds;
              return { beat, start, end: elapsed };
            });

            return (
              <article key={format.id} className={styles.card}>
                {/* proporção dos trechos, sem legenda: é acento, não tabela */}
                <BeatStrip beats={format.beats} compact />

                <div className={styles.cardTop}>
                  <span className={`mono ${styles.category}`}>{format.category}</span>
                  <span className={`mono ${styles.duration}`}>~{formatDuration(format)}s</span>
                </div>

                <h2 className={styles.name}>{format.name}</h2>

                <div className={styles.block}>
                  <h3 className="eyebrow">Objetivo</h3>
                  <p className={styles.objective}>{format.objective}</p>
                </div>

                <div className={styles.block}>
                  <h3 className="eyebrow">Estrutura</h3>
                  <ol className={styles.steps}>
                    {steps.map(({ beat, start, end }, index) => (
                      <li key={beat.id} title={beat.purpose}>
                        <span className={`mono ${styles.stepNum}`}>{index + 1}.</span>
                        <span className={styles.stepLabel}>{beat.label}</span>
                        <span className={`mono ${styles.stepTime}`}>
                          {start}–{end}s
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={styles.block}>
                  <h3 className="eyebrow">Exemplo</h3>
                  {format.example ? (
                    <blockquote className={styles.example}>“{format.example}”</blockquote>
                  ) : (
                    <p className={styles.examplePending}>
                      <span className={`mono ${styles.pendingTag}`}>a escrever</span>
                    </p>
                  )}
                </div>

                <div className={styles.cardFoot}>
                  <button
                    className={styles.copy}
                    onClick={() => copy(formatToScript(format), 'Roteiro copiado!')}
                  >
                    <Icon name="copy" size={15} /> Copiar roteiro
                  </button>

                  <div className={styles.tags}>
                    {format.faceless && (
                      <span className={`mono ${styles.tagFaceless}`}>
                        <Icon name="hide" size={11} /> sem aparecer
                      </span>
                    )}
                    <span className={`mono ${styles.tag}`}>esforço {format.effort}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className={styles.note}>
        O botão copia o molde com os tempos e as instruções de cada trecho, para você preencher com
        o seu produto.
      </p>

      {isEssential && (
        <div className={styles.bannerSlot}>
          <UpgradeBanner />
        </div>
      )}
    </div>
  );
}
