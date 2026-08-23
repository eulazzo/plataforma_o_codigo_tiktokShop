import type { NavItem } from './types';

/**
 * NAVEGAÇÃO
 * ----------------------------------------------------------------------------
 * status: 'ready' → rota existe e funciona.
 * status: 'soon'  → área planejada para a fase 2. Aparece desativada, com a
 *                   etiqueta "em breve". Nunca vira link quebrado.
 *
 * Ao construir uma área da fase 2: crie a rota em App.tsx e troque o status.
 */
export const navItems: NavItem[] = [
  { to: '/', label: 'Início', icon: 'home', status: 'ready' },
  { to: '/plano', label: 'Plano de 7 dias', icon: 'calendar', status: 'ready' },
  { to: '/modulos', label: 'Módulos', icon: 'book', status: 'ready' },
  { to: '/conteudo', label: 'Conteúdo', icon: 'film', status: 'ready' },
  { to: '/laboratorio-ia', label: 'Laboratório IA', icon: 'flask', status: 'ready', completeOnly: true },
  { to: '/ganchos', label: 'Ganchos', icon: 'magnet', status: 'ready' },
  { to: '/metricas', label: 'Métricas', icon: 'chart', status: 'ready' },
  { to: '/ferramentas', label: 'Ferramentas', icon: 'table', status: 'ready', completeOnly: true },
];

/** Itens que aparecem na barra inferior do celular (o resto vai para "Mais"). */
export const mobilePrimary = ['/', '/plano', '/modulos'];
