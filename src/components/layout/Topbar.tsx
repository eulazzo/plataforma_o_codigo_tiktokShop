import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { useAccess } from '@/hooks/useAccess';
import { planLabel } from '@/plan';
import { Icon } from '@/components/ui/Icon';
import { ProgressMeter } from '@/components/ui/ProgressMeter';
import { useConfirm } from '@/components/ui/Confirm';
import { Logo } from './Logo';
import styles from './Topbar.module.css';

/**
 * Barra superior: no desktop mostra o progresso resumido; no celular carrega
 * a marca. O menu do perfil traz progresso, saída e o aviso de que a marcação
 * vive só neste navegador.
 */
export function Topbar() {
  const { percent, daysDone, currentDay, reset } = useProgress();
  const { signOut } = useAccess();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { ask, dialog } = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={styles.topbar}>
      {dialog}
      <div className={styles.mobileBrand}>
        <Logo compact />
      </div>

      <div className={styles.progress}>
        <ProgressMeter done={daysDone} current={currentDay} size="sm" />
        <span className={`mono ${styles.percent}`}>{percent}%</span>
      </div>

      <div className={styles.profile} ref={menuRef}>
        <button
          className={styles.avatarBtn}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className={styles.avatar} aria-hidden="true">
            <Icon name="user" size={16} />
          </span>
          <span className={styles.who}>Aluno</span>
          <Icon name="dots" size={16} />
        </button>

        {open && (
          <div className={styles.menu} role="menu">
            <div className={styles.menuHead}>
              <strong>Seu acesso</strong>
              <span className={`mono ${styles.menuPlan}`}>Versão {planLabel}</span>
            </div>

            <div className={styles.menuBlock}>
              <div className={styles.menuRow}>
                <span>Progresso</span>
                <span className="mono">{percent}%</span>
              </div>
              <div className={styles.menuRow}>
                <span>Dias concluídos</span>
                <span className="mono">{daysDone}/7</span>
              </div>
            </div>

            <button
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate('/plano');
              }}
            >
              Ver meu plano
            </button>
            <button
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                ask({
                  message: 'Deseja zerar o seu progresso?',
                  detail: 'Todas as tarefas e módulos concluídos voltam a ficar em aberto.',
                  confirmLabel: 'Zerar',
                  onConfirm: () => {
                    reset();
                    navigate('/');
                  },
                });
              }}
            >
              Zerar meu progresso
            </button>

            <button
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                signOut();
              }}
            >
              Sair
            </button>

          </div>
        )}
      </div>
    </header>
  );
}
