import { planContent } from '@plan-content';
import type { ProductPlan } from './data/types';

/**
 * Versão do produto deste build. Definida em vite.config.ts a partir da
 * variável de ambiente PLAN — não é um estado da aplicação e não pode ser
 * trocada em tempo de execução.
 *
 *   npm run dev              → Completo
 *   npm run dev:essential    → Essencial
 */
export const PLAN: ProductPlan = __PLAN__;

export const isComplete = PLAN === 'complete';
export const isEssential = PLAN === 'essential';

export const planLabel = isComplete ? 'Completo' : 'Essencial';

export { planContent };
