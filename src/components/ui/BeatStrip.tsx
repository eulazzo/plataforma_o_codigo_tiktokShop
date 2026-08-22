import type { ContentBeat } from '@/data/types';
import styles from './BeatStrip.module.css';

/**
 * A FAIXA DE TEMPOS — assinatura da biblioteca de conteúdo.
 *
 * Cada trecho do roteiro vira um bloco com largura proporcional à sua duração.
 * Quem bate o olho entende a forma do vídeo antes de ler uma palavra: onde o
 * gancho é curto, onde a demonstração ocupa metade do tempo.
 *
 * As cores caminham do ciano ao magenta ao longo do roteiro, então a faixa
 * também comunica progressão temporal — começo frio, fim quente.
 */

/** Interpola ciano → magenta conforme a posição do beat no roteiro. */
function toneAt(position: number): string {
  const from = [37, 244, 238];
  const to = [254, 44, 85];
  const mix = from.map((channel, i) => Math.round(channel + (to[i] - channel) * position));
  return `rgb(${mix.join(', ')})`;
}

interface BeatStripProps {
  beats: ContentBeat[];
  /** id do beat destacado */
  activeId?: string;
  compact?: boolean;
  onSelect?: (id: string) => void;
}

export function BeatStrip({ beats, activeId, compact, onSelect }: BeatStripProps) {
  const total = beats.reduce((sum, beat) => sum + beat.seconds, 0) || 1;

  return (
    <div
      className={[styles.strip, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      role={onSelect ? 'tablist' : 'img'}
      aria-label={onSelect ? undefined : `Estrutura em ${beats.length} trechos, ${total} segundos`}
    >
      {beats.map((beat, index) => {
        const position = beats.length === 1 ? 0 : index / (beats.length - 1);
        const active = beat.id === activeId;
        const share = (beat.seconds / total) * 100;

        const content = (
          <>
            <span className={styles.bar} style={{ background: toneAt(position) }} />
            {!compact && (
              <span className={styles.caption}>
                <span className={styles.label}>{beat.label}</span>
                <span className={`mono ${styles.secs}`}>{beat.seconds}s</span>
              </span>
            )}
          </>
        );

        const className = [styles.beat, active ? styles.active : ''].filter(Boolean).join(' ');

        return onSelect ? (
          <button
            key={beat.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={className}
            style={{ flexBasis: `${share}%` }}
            onClick={() => onSelect(beat.id)}
            title={`${beat.label} · ${beat.seconds}s`}
          >
            {content}
          </button>
        ) : (
          <span
            key={beat.id}
            className={className}
            style={{ flexBasis: `${share}%` }}
            title={`${beat.label} · ${beat.seconds}s`}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

export { toneAt };
