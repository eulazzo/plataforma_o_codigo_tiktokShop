import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * SEPARAÇÃO REAL ENTRE ESSENCIAL E COMPLETO
 * ------------------------------------------------------------------
 * O alias "@plan-content" resolve para um arquivo diferente conforme a
 * variável de ambiente PLAN. O conteúdo exclusivo da versão Completa mora
 * em plan-content.complete.ts e NÃO É INCLUÍDO no bundle da versão
 * Essencial — não é um bloqueio de tela, é ausência do arquivo.
 *
 *   npm run build:essential  → dist/essential
 *   npm run build:complete   → dist/complete
 */
const PLAN = process.env.PLAN === 'essential' ? 'essential' : 'complete';

export default defineConfig({
  plugins: [react()],
  /**
   * Caminhos relativos: o build funciona em qualquer pasta do servidor, sem
   * reconfigurar nada — inclusive num subdiretório de nome não óbvio, como
   * seudominio.com/a7f3c2/. Junto com o HashRouter, isso torna a publicação
   * um upload e nada mais.
   */
  base: './',
  define: {
    __PLAN__: JSON.stringify(PLAN),
  },
  resolve: {
    alias: {
      '@plan-content': fileURLToPath(
        new URL(`./src/data/plan-content.${PLAN}.ts`, import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
