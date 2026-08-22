import { isComplete } from '@/plan';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import styles from './UpgradeBanner.module.css';

/**
 * Só aparece no build da versão Essencial. Convite discreto, sem contagem
 * regressiva e sem promessa — descreve o que a outra versão contém, só isso.
 */
export function UpgradeBanner() {
  if (isComplete) return null;

  return (
    <aside className={styles.banner}>
      <span className={styles.icon} aria-hidden="true">
        <Icon name="sparkle" size={19} />
      </span>

      <div className={styles.text}>
        <strong>Quer acessar o Laboratório de IA?</strong>
        <p>
          A versão Completa inclui o Kit Vídeos com IA, 50 ganchos, a biblioteca de conteúdo e as
          ferramentas de controle.
        </p>
      </div>

      <Button to="/versao-completa" variant="secondary" size="sm">
        Conhecer a versão Completa
      </Button>
    </aside>
  );
}
