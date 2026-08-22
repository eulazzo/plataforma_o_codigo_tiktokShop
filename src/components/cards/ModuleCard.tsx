import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Module } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import styles from './ModuleCard.module.css';

/**
 * Card do módulo com capa.
 *
 * A imagem vive em public/modulos/ e é referenciada pelo campo `cover` do
 * módulo. Enquanto o arquivo não existir, entra uma capa tipográfica gerada
 * aqui — número grande sobre um degradê próprio de cada módulo. Não é "imagem
 * quebrada": é um estado que também foi desenhado, e some assim que o arquivo
 * for colocado na pasta.
 */

/** Um par de cores por módulo, do ciano ao magenta, para as capas geradas. */
const COVER_TONES: [string, string][] = [
  ['#25f4ee', '#0e8f96'],
  ['#25d8f4', '#0b6f9c'],
  ['#3ab6f0', '#1d4fa8'],
  ['#6a8ef0', '#3c34a6'],
  ['#9a6ee8', '#6a1f9c'],
  ['#cf5ad0', '#8d1275'],
  ['#f2417f', '#a80b3f'],
  ['#fe2c55', '#8f0020'],
];

interface ModuleCardProps {
  module: Module;
  index: number;
  done: boolean;
}

export function ModuleCard({ module, index, done }: ModuleCardProps) {
  const [coverFailed, setCoverFailed] = useState(false);

  const pending = module.blocks.filter((b) => b.kind === 'placeholder').length;

  /*
   * Quando o módulo tem divisores de seção, são ELES a contagem que faz
   * sentido: dizer "13 seções" num módulo de três partes conta o número de
   * blocos do arquivo de dados, que não é informação para o aluno.
   */
  const sections = module.blocks.filter((b) => b.kind === 'heading').length;
  const total = sections || module.blocks.length;
  const [from, to] = COVER_TONES[index % COVER_TONES.length];

  return (
    <Link
      to={`/modulos/${module.id}`}
      className={[styles.card, done ? styles.done : ''].filter(Boolean).join(' ')}
    >
      <div
        className={styles.cover}
        style={{ '--from': from, '--to': to } as React.CSSProperties}
      >
        {module.cover && !coverFailed && (
          <img
            className={styles.image}
            src={`${import.meta.env.BASE_URL}modulos/${module.cover}`}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setCoverFailed(true)}
          />
        )}

        {/* capa gerada — fica atrás da imagem quando ela existir */}
        <span className={`mono ${styles.coverNumber}`} aria-hidden="true">
          {module.number}
        </span>

        <span className={`mono ${styles.coverTag}`}>Módulo {module.number}</span>

        {done && (
          <span className={styles.doneBadge} title="Concluído">
            <Icon name="check" size={13} />
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{module.title}</h3>
        <p className={styles.summary}>{module.summary}</p>

        <div className={styles.meta}>
          <span className="mono">
            {total} {total === 1 ? 'seção' : 'seções'}
          </span>
          {module.duration && <span className="mono">{module.duration}</span>}
          {module.audio && (
            <span className={`mono ${styles.audioTag}`}>
              <Icon name="headphones" size={11} /> áudio
            </span>
          )}
          {pending > 0 && <span className={`mono ${styles.pending}`}>{pending} em produção</span>}
        </div>

        <span className={styles.action}>
          {done ? 'Revisar módulo' : 'Abrir módulo'}
          <Icon name="arrowRight" size={15} />
        </span>
      </div>
    </Link>
  );
}
