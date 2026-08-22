import { LogoMark } from '@/components/layout/LogoMark';
import styles from './Splash.module.css';

/**
 * Cobertura de tela inteira durante uma transição de acesso.
 *
 * Usa a própria marca como elemento de espera: o desvio cromático abre e fecha
 * sozinho, o que dá movimento sem precisar de mais um símbolo na interface.
 * A barra embaixo é indeterminada de propósito — não existe progresso real
 * para medir, e uma barra que finge porcentagem mentiria sobre o que sabe.
 */
export function Splash({ label }: { label: string }) {
  return (
    <div className={styles.splash} role="status" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.mark}>
          <LogoMark size={56} />
        </div>

        <p className={styles.label}>{label}</p>

        <span className={styles.bar} aria-hidden="true">
          <i />
        </span>
      </div>
    </div>
  );
}
