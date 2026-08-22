import { Link } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import styles from './Logo.module.css';

/**
 * Marca da área do aluno: símbolo + assinatura.
 *
 * "O CÓDIGO" em mono, com espaçamento largo, funciona como carimbo;
 * "TikTok Shop" no display carrega o peso. O símbolo à esquerda repete os três
 * elementos do nome em desenho — sacola, nota e código.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className={[styles.logo, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      aria-label="O Código TikTok Shop — início"
    >
      <LogoMark size={compact ? 30 : 36} />

      <span className={styles.words}>
        <span className={`mono ${styles.kicker}`}>O Código</span>
        <span className={styles.name}>TikTok Shop</span>
      </span>
    </Link>
  );
}
