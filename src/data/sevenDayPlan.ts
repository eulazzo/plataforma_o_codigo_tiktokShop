import type { PlanDay } from './types';

/**
 * PLANO DE IMPLEMENTAÇÃO EM 7 DIAS
 * ============================================================================
 * Esta é a fonte única dos sete dias. O módulo 08 explica COMO usar o plano e
 * o que fazer depois dele; os dias em si moram aqui e aparecem na tela /plano,
 * no painel de controle e no card do dia de hoje. Escrever os sete dias também
 * dentro do módulo 08 criaria duas versões do cronograma para divergirem.
 *
 * Edite livremente títulos, objetivos e tarefas — o layout se adapta. As
 * tarefas viram caixas de marcar e alimentam o progresso do aluno.
 *
 * NÚMEROS A CONFERIR (mesma lista do topo de modules.ts): 2.000 seguidores,
 * 100 visualizações na foto de aquecimento, janela de 6 a 12 horas entre
 * publicações, corte de 500 views no diagnóstico.
 */
export const sevenDayPlan: PlanDay[] = [
  {
    day: 1,
    title: 'Estruturação e fundação do perfil',
    summary:
      'Criar uma conta nova e configurar a base do perfil focado em crescimento rápido.',
    objectives: [
      'Começar do zero, com o engajamento que o algoritmo dá a perfil novo',
      'Definir nome, foto e bio dentro de um nicho de alto engajamento',
      'Proteger a conta antes de qualquer publicação',
    ],
    tasks: [
      { id: 'd1t1', label: 'Criei uma conta nova do zero, com e-mail novo ou rede social' },
      { id: 'd1t2', label: 'Defini usuário, apelido e foto ligados ao nicho escolhido' },
      { id: 'd1t3', label: 'Escrevi uma bio simples e persuasiva focada no nicho' },
      { id: 'd1t4', label: 'Ativei a autenticação de dois fatores' },
    ],
    relatedModuleId: 'prepare-sua-operacao',
  },
  {
    day: 2,
    title: 'Aquecimento de conta',
    summary:
      'Provar ao algoritmo de segurança que você é uma pessoa real, e não um robô automatizado.',
    objectives: [
      'Usar a conta de forma humana antes de publicar em massa',
      'Confirmar que a conta está entregando',
      'Evitar a punição preventiva que pega conta nova subindo vídeo de IA',
    ],
    tasks: [
      { id: 'd2t1', label: 'Passei de 15 a 30 minutos no feed curtindo, assistindo e comentando' },
      { id: 'd2t2', label: 'Postei uma foto tirada na câmera nativa do TikTok, sem legenda' },
      { id: 'd2t3', label: 'Esperei 24 horas e conferi as estatísticas do post' },
      { id: 'd2t4', label: 'Confirmei que teve pelo menos 100 visualizações ou algum like' },
    ],
    relatedModuleId: 'evite-erros',
  },
  {
    day: 3,
    title: 'Crescimento rápido até os 2.000 seguidores',
    summary:
      'Executar a estratégia de crescimento para destravar o recurso do TikTok Shop.',
    objectives: [
      'Bater os 2.000 seguidores necessários para liberar o Shop',
      'Usar o gatilho de engajamento duplo em todo roteiro',
      'Publicar com espaçamento para o algoritmo trabalhar',
    ],
    tasks: [
      { id: 'd3t1', label: 'Escolhi a figura de autoridade e baixei um vídeo com boa luz e sem legenda' },
      { id: 'd3t2', label: 'Gerei a narração do script clonando a voz no Minimax Audio' },
      { id: 'd3t3', label: 'Sincronizei o áudio com a imagem no Dream Face' },
      { id: 'd3t4', label: 'Pedi no roteiro para comentar a palavra do nicho e clicar no sinal de mais' },
      { id: 'd3t5', label: 'Publiquei de 2 a 3 vídeos, com 6 a 12 horas entre eles' },
    ],
    relatedModuleId: 'crie-conteudo-sem-aparecer',
  },
  {
    day: 4,
    title: 'Ativação do Shop e verificação de identidade',
    summary: 'Liberar a sacolinha laranja de vendas no seu perfil.',
    objectives: [
      'Aplicar ao TikTok Shop assim que bater a meta de seguidores',
      'Passar na verificação de identidade sem travar o cadastro',
      'Confirmar que a vitrine apareceu no perfil',
    ],
    tasks: [
      { id: 'd4t1', label: 'Entrei em TikTok Studio > TikTok Shop para Criadores e cliquei em aplicar' },
      { id: 'd4t2', label: 'Preenchi a verificação com o primeiro e o último nome e o CPF' },
      { id: 'd4t3', label: 'Confirmei a aprovação e vi a aba da sacolinha no meu perfil' },
    ],
    relatedModuleId: 'prepare-sua-operacao',
  },
  {
    day: 5,
    title: 'Mineração e seleção de produtos',
    summary:
      'Adicionar os produtos certos à vitrine e preparar o catálogo de vendas.',
    objectives: [
      'Encontrar produtos com dor nítida e barreira de preço baixa',
      'Passar cada candidato pelo Score 10/10',
      'Ter produto físico em mãos sempre que possível',
    ],
    tasks: [
      { id: 'd5t1', label: 'Pesquisei em "Mais vendidos", na busca com a extensão Sort e nas ferramentas' },
      { id: 'd5t2', label: 'Passei os selecionados pelo checklist de Score 10/10' },
      { id: 'd5t3', label: 'Adicionei pelo menos 10 produtos do mesmo gênero de público à vitrine' },
      { id: 'd5t4', label: 'Solicitei amostras aos vendedores ou encomendei o item' },
    ],
    relatedModuleId: 'escolha-produtos-melhores',
  },
  {
    day: 6,
    title: 'Roteirização e produção dos criativos',
    summary:
      'Produzir as primeiras variações de vídeo focadas em retenção e conversão.',
    objectives: [
      'Modelar referências de vídeos que já venderam',
      'Estruturar o roteiro de 30 a 45 segundos',
      'Editar com o ritmo que segura a atenção',
    ],
    tasks: [
      { id: 'd6t1', label: 'Busquei referências validadas e extraí a transcrição para modelagem' },
      { id: 'd6t2', label: 'Estruturei o roteiro: gancho em 3s, demonstração com dor clara e CTA' },
      { id: 'd6t3', label: 'Gravei os takes com as mãos, ou gerei com IA se optei por não aparecer' },
      { id: 'd6t4', label: 'Editei no CapCut com cortes a cada 2 a 5 segundos e legendas centrais' },
    ],
    relatedModuleId: 'crie-conteudo-sem-aparecer',
  },
  {
    day: 7,
    title: 'Publicação, rastreamento e diagnóstico',
    summary:
      'Subir o conteúdo com a sacolinha vinculada e ler as primeiras métricas de conversão.',
    objectives: [
      'Publicar com o produto corretamente vinculado',
      'Esperar a janela de entrega antes de concluir qualquer coisa',
      'Diagnosticar em qual etapa você perde as pessoas',
    ],
    tasks: [
      { id: 'd7t1', label: 'Postei e usei "Adicionar link" > "Produto" para vincular a sacolinha' },
      { id: 'd7t2', label: 'Esperei de 6 a 12 horas para coletar dados limpos' },
      { id: 'd7t3', label: 'Fiz o diagnóstico: views, cliques no carrinho e compras' },
      { id: 'd7t4', label: 'Anotei o que vou mudar na próxima rodada' },
    ],
    relatedModuleId: 'entenda-as-vendas',
  },
];

/** Total de tarefas do plano — alimenta o cálculo de progresso. */
export const totalPlanTasks = sevenDayPlan.reduce((sum, day) => sum + day.tasks.length, 0);
