/// <reference types="vite/client" />

/** Versão do produto injetada no build (ver vite.config.ts). */
declare const __PLAN__: 'essential' | 'complete';

declare module '@plan-content' {
  import type { PlanContent } from '@/data/types';
  export const planContent: PlanContent;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
