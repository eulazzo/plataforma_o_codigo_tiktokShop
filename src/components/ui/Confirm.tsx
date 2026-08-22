import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import styles from './Confirm.module.css';

/**
 * CONFIRMAÇÃO
 * ============================================================================
 * Substitui o `window.confirm` do navegador em toda ação que apaga coisa.
 *
 * POR QUE TROCAR: a caixa do navegador aparece fora da plataforma, com a
 * tipografia e as cores do sistema operacional. No meio de uma interface
 * escura e desenhada, ela parece um erro — e no celular ela chega grudada no
 * topo, longe do dedo. Além disso não dá para dizer O QUE vai ser apagado.
 *
 * COMO USAR:
 *
 *   const { ask, dialog } = useConfirm();
 *   ...
 *   <button onClick={() => ask({ detail: item.name, onConfirm: () => remove(item) })} />
 *   ...
 *   {dialog}
 *
 * O `dialog` precisa estar no JSX do componente — é ele que desenha a caixa.
 */

export interface ConfirmRequest {
  /** A pergunta. O padrão serve para exclusão de item. */
  message?: string;
  /** O que exatamente será apagado. Aparece destacado abaixo da pergunta. */
  detail?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 'danger' pinta o botão de confirmar de vermelho. É o padrão. */
  tone?: 'danger' | 'neutral';
  onConfirm: () => void;
}

export function useConfirm() {
  const [request, setRequest] = useState<ConfirmRequest | null>(null);

  const ask = useCallback((next: ConfirmRequest) => setRequest(next), []);
  const close = useCallback(() => setRequest(null), []);

  const dialog = request ? <ConfirmDialog request={request} onClose={close} /> : null;

  return { ask, dialog };
}

function ConfirmDialog({
  request,
  onClose,
}: {
  request: ConfirmRequest;
  onClose: () => void;
}) {
  const {
    message = 'Deseja deletar esse item?',
    detail,
    confirmLabel = 'Sim',
    cancelLabel = 'Não',
    tone = 'danger',
    onConfirm,
  } = request;

  const cancelRef = useRef<HTMLButtonElement>(null);

  /*
   * O foco vai para "Não" DEPOIS que o Modal se posiciona. Quando esta caixa
   * abre no lugar de outra que acabou de fechar, a que saiu devolve o foco
   * para o botão que a abriu — botão que já não existe. Sem isto o foco cairia
   * no corpo da caixa e o teclado começaria fora dos dois botões.
   */
  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  return (
    <Modal title={message} onClose={onClose} compact>
      <div className={styles.body}>
        {detail && <p className={styles.detail}>{detail}</p>}
        <p className={styles.note}>Esta ação não tem como ser desfeita.</p>
      </div>

      <div className={styles.actions}>
        {/*
          "Não" vem primeiro e leva o foco: numa caixa que apaga, o caminho
          fácil tem que ser o de não apagar.
        */}
        <button ref={cancelRef} className={styles.cancel} onClick={onClose}>
          {cancelLabel}
        </button>
        <button
          className={[styles.confirm, tone === 'danger' ? styles.danger : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
