import { useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';

/**
 * Copiar para a área de transferência com aviso na tela.
 *
 * A API moderna exige contexto seguro (https ou localhost). Fora disso —
 * abrindo do disco, por exemplo — cai no método antigo, que ainda funciona em
 * todo lugar. Se nem isso der, avisa em vez de fingir que copiou.
 */
export function useCopy() {
  const { toast } = useToast();

  return useCallback(
    async (text: string, message = 'Copiado!') => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          toast(message);
          return true;
        }
        throw new Error('sem clipboard API');
      } catch {
        try {
          const area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          const ok = document.execCommand('copy');
          document.body.removeChild(area);
          toast(ok ? message : 'Não foi possível copiar — selecione e copie à mão.');
          return ok;
        } catch {
          toast('Não foi possível copiar — selecione e copie à mão.');
          return false;
        }
      }
    },
    [toast],
  );
}
