import { NavLink } from 'react-router-dom';
import { navItems } from '@/data/navigation';
import { isComplete, planLabel } from '@/plan';
import { Icon } from '@/components/ui/Icon';
import { ProgressMeter } from '@/components/ui/ProgressMeter';
import { useProgress } from '@/hooks/useProgress';
import { Logo } from './Logo';
import styles from './Sidebar.module.css';

/** Navegação fixa do desktop. No celular, ver MobileNav. */
export function Sidebar() {
  const { daysDone, currentDay } = useProgress();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Logo />
      </div>

      <nav className={styles.nav} aria-label="Seções da plataforma">
        <ul>
          {navItems.map((item) => {
            const locked = item.completeOnly && !isComplete;
            const soon = item.status === 'soon';

            if (soon || locked) {
              return (
                <li key={item.to}>
                  <span className={styles.disabled} aria-disabled="true">
                    <Icon name={locked ? 'lock' : item.icon} size={18} />
                    <span className={styles.label}>{item.label}</span>
                    <span className={`mono ${styles.tag}`}>{locked ? 'completo' : 'em breve'}</span>
                  </span>
                </li>
              );
            }

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
                  }
                >
                  <Icon name={item.icon} size={18} />
                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.foot}>
        <div className={styles.planCard}>
          <span className={`mono ${styles.planName}`}>Versão {planLabel}</span>
          <p className={styles.planText}>
            {isComplete
              ? 'Você tem acesso a todo o material, incluindo o Kit Vídeos com IA.'
              : 'Você tem acesso ao método e ao plano de 7 dias.'}
          </p>
          <ProgressMeter done={daysDone} current={currentDay} size="sm" />
          <span className={`mono ${styles.planProgress}`}>
            {daysDone} de 7 dias concluídos
          </span>
        </div>
      </div>
    </aside>
  );
}
