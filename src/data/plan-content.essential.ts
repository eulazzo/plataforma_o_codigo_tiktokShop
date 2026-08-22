import type { PlanContent } from './types';

/**
 * CONTEÚDO DA VERSÃO ESSENCIAL (R$19,90)
 * ----------------------------------------------------------------------------
 * Este arquivo é o que o alias "@plan-content" resolve quando o build roda com
 * PLAN=essential. O material exclusivo da versão Completa não é importado aqui
 * e, portanto, NÃO EXISTE no bundle da versão Essencial.
 *
 * Não copie conteúdo do plan-content.complete.ts para cá — é justamente essa
 * separação que faz o bloqueio ser real, e não uma tela por cima.
 *
 * O que isso significa em cada tela:
 *   · Laboratório de IA  → sem nenhum prompt no bundle; a tela mostra o convite
 *                          para a Completa, não um cadeado sobre conteúdo já
 *                          carregado.
 *   · Ganchos            → funciona, com os 20 da biblioteca base
 *                          (src/data/hooks.ts). Os outros 30 não existem aqui.
 */
export const planContent: PlanContent = {
  plan: 'essential',
  prompts: [],
  extraHooks: [],
  contentLibrary: [],
};
