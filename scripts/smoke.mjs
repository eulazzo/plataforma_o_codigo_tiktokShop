/**
 * Smoke test: renderiza cada página em Node (SSR) para pegar erro de runtime
 * — hook fora de provider, import quebrado, acesso a undefined — antes de
 * abrir o navegador.
 *
 *   npm run smoke
 *
 * Não substitui olhar a tela: verifica que as páginas montam, não que estão
 * bonitas.
 */
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

/**
 * [rótulo, módulo, export, caminho visitado, padrão da rota]
 *
 * O quinto item só é necessário quando a página lê parâmetro de rota: sem ele,
 * o <Route> é montado com o caminho literal, useParams devolve vazio e a página
 * cai no padrão — o teste passaria sem ter testado o que se queria.
 */
const routes = [
  ['Login', '@/pages/Login', 'Login', '/entrar'],
  ['Welcome', '@/pages/Welcome', 'Welcome', '/boas-vindas'],
  ['Dashboard', '@/pages/Dashboard', 'Dashboard', '/'],
  ['Plano de 7 dias', '@/pages/SevenDayPlan', 'SevenDayPlan', '/plano'],
  ['Módulos', '@/pages/Modules', 'Modules', '/modulos'],
  ['Módulo (detalhe)', '@/pages/ModuleDetail', 'ModuleDetail', '/modulos/entenda-o-modelo', '/modulos/:moduleId'],
  ['Biblioteca de conteúdo', '@/pages/ContentLibrary', 'ContentLibrary', '/conteudo'],
  ['Laboratório de IA', '@/pages/AiLab', 'AiLab', '/laboratorio-ia'],
  ['Biblioteca de ganchos', '@/pages/HookLibrary', 'HookLibrary', '/ganchos'],
  ['Métricas', '@/pages/Metrics', 'Metrics', '/metricas'],
  ['Ferramentas — mineração', '@/pages/Tools', 'Tools', '/ferramentas'],
  ['Ferramentas — consistência', '@/pages/Tools', 'Tools', '/ferramentas/consistencia', '/ferramentas/:tool'],
  ['Bastidores', '@/pages/Backstage', 'Backstage', '/bastidores'],
  ['Ganchos e copys', '@/pages/CopyVault', 'CopyVault', '/copys'],
  ['Versão Completa', '@/pages/UpgradeInfo', 'UpgradeInfo', '/versao-completa'],
];

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let failures = 0;

try {
  const { MemoryRouter, Routes, Route } = await vite.ssrLoadModule('react-router-dom');
  const { AccessProvider } = await vite.ssrLoadModule('@/hooks/useAccess');
  const { ProgressProvider } = await vite.ssrLoadModule('@/hooks/useProgress');
  const { ToastProvider } = await vite.ssrLoadModule('@/components/ui/Toast');

  for (const [label, modulePath, exportName, path, pattern] of routes) {
    try {
      const mod = await vite.ssrLoadModule(modulePath);
      const Page = mod[exportName];
      if (!Page) throw new Error(`export "${exportName}" não encontrado em ${modulePath}`);

      /* mesma pilha de providers do App.tsx, para o render ser fiel */
      const tree = React.createElement(
        MemoryRouter,
        { initialEntries: [path] },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: pattern ?? path,
            element: React.createElement(Page),
          }),
        ),
      );

      const html = renderToString(
        React.createElement(
          AccessProvider,
          null,
          React.createElement(ProgressProvider, null, React.createElement(ToastProvider, null, tree)),
        ),
      );

      if (html.trim().length < 40) throw new Error('render vazio');
      console.log(`  ok   ${label} — ${html.length} caracteres`);
    } catch (error) {
      failures++;
      console.log(`  FALHA ${label}: ${error.message}`);
    }
  }
} finally {
  await vite.close();
}

console.log(failures === 0 ? '\nTodas as páginas montaram.\n' : `\n${failures} página(s) com erro.\n`);
process.exit(failures === 0 ? 0 : 1);
