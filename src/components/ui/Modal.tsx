import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Modal.module.css';

/**
 * MODAL
 * ----------------------------------------------------------------------------
 * Primitiva das ferramentas: no desktop abre centralizado, no celular sobe
 * como folha a partir da base — o mesmo gesto do menu "Mais".
 *
 * O que ele cuida sozinho, porque toda ferramenta vai precisar:
 *   · Escape fecha;
 *   · clique no fundo fecha (clique DENTRO do painel não vaza para o fundo);
 *   · a página atrás para de rolar enquanto está aberto;
 *   · o foco entra no painel ao abrir e volta para quem abriu ao fechar.
 *
 * Não é um focus trap completo — para um formulário curto, devolver o foco já
 * resolve o essencial sem arrastar dependência nova para dentro do projeto.
 *
 * POR QUE SÃO DOIS EFEITOS SEPARADOS, e não um só:
 * `onClose` costuma chegar como função criada no corpo do componente pai
 * (`onClose={() => setDraft(null)}`), ou seja, com identidade nova a cada
 * render. Um efeito único dependendo dela re-executava a cada tecla digitada —
 * e como ele chama `panel.focus()`, o foco saía do input a cada letra. Quem
 * digitava conseguia um caractere por clique.
 *
 * Então: abertura e fechamento rodam UMA vez; só o ouvinte do Escape acompanha
 * o `onClose`.
 */
interface ModalProps {
  title: string;
  /** Linha curta abaixo do título. Opcional. */
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  /** Barra fixa no rodapé — botões de ação, resumo do que foi preenchido. */
  footer?: ReactNode;
  /** Caixa estreita, para confirmação. Sem botão de fechar no cabeçalho. */
  compact?: boolean;
}

export function Modal({ title, subtitle, onClose, children, footer, compact }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* montagem e desmontagem: trava a rolagem e cuida do foco */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    /*
     * Só puxa o foco se nada dentro do painel já o tiver. Campo com `autoFocus`
     * é atendido antes deste efeito rodar — roubar dele deixaria o formulário
     * abrindo sem cursor em lugar nenhum.
     */
    const panel = panelRef.current;
    if (panel && !panel.contains(document.activeElement)) panel.focus();

    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  /* o único efeito que acompanha o onClose */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        ref={panelRef}
        className={[styles.panel, compact ? styles.compact : ''].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className={styles.head}>
          <div className={styles.headText}>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {/* na versão estreita o "Não" já é a saída: um X ao lado seria
              duas formas de fazer a mesma coisa na mesma caixa */}
          {!compact && (
            <button className={styles.close} onClick={onClose} aria-label="Fechar">
              <Icon name="close" size={19} />
            </button>
          )}
        </header>

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.foot}>{footer}</footer>}
      </div>
    </div>
  );
}
