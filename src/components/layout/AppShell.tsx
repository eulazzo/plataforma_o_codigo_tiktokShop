import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import styles from './AppShell.module.css';

/** Casca da aplicação: sidebar no desktop, barra inferior no celular. */
export function AppShell() {
  const { pathname, hash } = useLocation();

  /**
   * Trocou de rota, volta ao topo.
   * Exceto quando a rota traz âncora (ex.: /plano#dia-3): nesse caso quem
   * manda é a página de destino, que rola até o item pedido. Efeitos de filho
   * rodam antes dos do pai — sem esta guarda, o topo venceria a âncora.
   */
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
