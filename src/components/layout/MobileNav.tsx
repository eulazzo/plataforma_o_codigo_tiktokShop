import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { mobilePrimary, navItems } from '@/data/navigation';
import { isComplete, planLabel } from '@/plan';
import { Icon } from '@/components/ui/Icon';
import styles from './MobileNav.module.css';

/**
 * Barra inferior do celular: só as áreas prontas, mais um botão "Mais" que
 * abre uma folha com o restante. Nove itens não cabem numa bottom nav — e
 * espremer tudo é o caminho mais curto para uma navegação ruim no toque.
 */
export function MobileNav() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const primary = navItems.filter((item) => mobilePrimary.includes(item.to));
  const rest = navItems.filter((item) => !mobilePrimary.includes(item.to));

  return (
    <>
      <nav className={styles.bar} aria-label="Navegação principal">
        {primary.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              [styles.item, isActive ? styles.active : ''].filter(Boolean).join(' ')
            }
          >
            <Icon name={item.icon} size={21} />
            <span>{item.label === 'Plano de 7 dias' ? 'Plano' : item.label}</span>
          </NavLink>
        ))}

        <button
          className={[styles.item, sheetOpen ? styles.active : ''].filter(Boolean).join(' ')}
          onClick={() => setSheetOpen(true)}
          aria-expanded={sheetOpen}
        >
          <Icon name="menu" size={21} />
          <span>Mais</span>
        </button>
      </nav>

      {sheetOpen && (
        <div className={styles.overlay} onClick={() => setSheetOpen(false)}>
          <div
            className={styles.sheet}
            role="dialog"
            aria-label="Outras áreas"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.grab} aria-hidden="true" />
            <div className={styles.sheetHead}>
              <strong>Outras áreas</strong>
              <button onClick={() => setSheetOpen(false)} aria-label="Fechar">
                <Icon name="close" size={20} />
              </button>
            </div>

            <ul className={styles.list}>
              {rest.map((item) => {
                const locked = item.completeOnly && !isComplete;
                const soon = item.status === 'soon';

                /* área pronta e liberada vira link de verdade; o resto informa por que não */
                if (!soon && !locked) {
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          [styles.listItem, styles.listLink, isActive ? styles.listActive : '']
                            .filter(Boolean)
                            .join(' ')
                        }
                        onClick={() => setSheetOpen(false)}
                      >
                        <Icon name={item.icon} size={19} />
                        <span className={styles.listLabel}>{item.label}</span>
                        <Icon name="arrowRight" size={16} />
                      </NavLink>
                    </li>
                  );
                }

                return (
                  <li key={item.to}>
                    <span className={styles.listItem} aria-disabled="true">
                      <Icon name={locked ? 'lock' : item.icon} size={19} />
                      <span className={styles.listLabel}>{item.label}</span>
                      <span className={`mono ${styles.tag}`}>
                        {locked ? 'completo' : 'em breve'}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className={styles.note}>
              As áreas marcadas entram na próxima etapa da plataforma. Versão {planLabel}.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
