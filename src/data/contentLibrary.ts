import type { ContentFormat } from './types';

/**
 * BIBLIOTECA DE CONTEÚDO — estruturas de roteiro
 * ============================================================================
 * Cada formato é descrito como uma SEQUÊNCIA DE TEMPOS (beats). É assim que a
 * tela desenha a "anatomia do vídeo": cada beat vira um bloco proporcional à
 * sua duração.
 *
 * COMO EDITAR:
 *   · `seconds` é a duração aproximada daquele trecho — os blocos se
 *     redimensionam sozinhos, não precisa somar nada à mão;
 *   · `purpose` é o que aquele trecho precisa fazer (aparece na tela);
 *   · `prompt` é a instrução de preenchimento que vai para o roteiro copiado.
 *
 * ATENÇÃO AO CONTEÚDO:
 * Estruturas e frases de exemplo abaixo são um RASCUNHO — a forma dos vídeos e
 * o tom de cada formato, que é o método do produto. Revise antes de entregar a
 * compradores.
 *
 * A frase de `example` é material de escrita, como os ganchos do bônus: ela
 * mostra o tom, não afirma nada sobre o mundo. Continua proibido inventar
 * depoimento, resultado, número ou qualquer coisa apresentada como prova.
 *
 * ESSENCIAL x COMPLETO:
 * Este arquivo é a base, presente nas duas versões. As estruturas adicionais da
 * versão Completa vivem em plan-content.complete.ts e não entram no bundle da
 * Essencial.
 */

export const contentFormats: ContentFormat[] = [
  {
    id: 'ugc-natural',
    name: 'Indicação sincera',
    category: 'UGC',
    objective: 'Parecer recomendação de gente real, não anúncio — sem precisar mostrar o rosto.',
    faceless: true,
    effort: 'baixo',
    beats: [
      {
        id: 'b1',
        label: 'Gancho falado',
        seconds: 3,
        purpose: 'Abrir em tom de conversa, como quem continua um assunto já começado.',
        prompt: 'Escreva a primeira frase como se estivesse falando com uma amiga.',
      },
      {
        id: 'b2',
        label: 'Contexto pessoal',
        seconds: 5,
        purpose: 'Dizer por que você foi atrás disso — dá motivo para a pessoa continuar.',
        prompt: 'Qual era a situação antes do produto?',
      },
      {
        id: 'b3',
        label: 'Demonstração',
        seconds: 12,
        purpose: 'Mostrar o produto sendo usado de verdade, em plano fechado.',
        prompt: 'Descreva o que a câmera mostra, passo a passo.',
      },
      {
        id: 'b4',
        label: 'Detalhe que convence',
        seconds: 8,
        purpose: 'O ponto específico que faz diferença — não a lista de características.',
        prompt: 'Qual detalhe você só percebe usando?',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 5,
        purpose: 'Dizer com naturalidade o que fazer agora.',
        prompt: 'Encerre sem soar como locutor de propaganda.',
      },
    ],
    example:
      'Comprei sem esperar nada e virou item fixo aqui em casa — deixa eu te mostrar por quê.',
  },
  {
    id: 'demonstracao-produto',
    name: 'Mostra, não conta',
    category: 'Demonstração',
    objective: 'Mostrar o produto funcionando e responder a dúvida que trava a compra.',
    faceless: true,
    effort: 'baixo',
    beats: [
      {
        id: 'b1',
        label: 'Resultado primeiro',
        seconds: 3,
        purpose: 'Começar pelo depois, não pelo antes. O resultado é o gancho.',
        prompt: 'Qual imagem mostra o resultado em um segundo?',
      },
      {
        id: 'b2',
        label: 'O que é',
        seconds: 5,
        purpose: 'Nomear o produto e a categoria, rápido, para orientar quem chegou agora.',
        prompt: 'Uma frase: o que é isso?',
      },
      {
        id: 'b3',
        label: 'Como funciona',
        seconds: 14,
        purpose: 'A parte mais longa: o uso real, na ordem em que acontece.',
        prompt: 'Liste os passos que a câmera acompanha.',
      },
      {
        id: 'b4',
        label: 'Objeção respondida',
        seconds: 8,
        purpose: 'Antecipar a dúvida que aparece nos comentários antes que ela apareça.',
        prompt: 'Qual é a pergunta que todo mundo faz?',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 5,
        purpose: 'Indicar o caminho para quem se interessou.',
        prompt: 'Como você encerra sem repetir o óbvio?',
      },
    ],
    example:
      'Olha o que acontece quando eu faço isso — repara no detalhe.',
  },
  {
    id: 'review-honesto',
    name: 'Review equilibrado',
    category: 'Review',
    objective: 'Construir confiança dizendo também o que não é bom — e por isso mesmo convencer.',
    faceless: false,
    effort: 'médio',
    beats: [
      {
        id: 'b1',
        label: 'Veredito antecipado',
        seconds: 4,
        purpose: 'Entregar a conclusão logo. Segurar o veredito para o fim perde audiência.',
        prompt: 'Vale a pena ou não? Diga já.',
      },
      {
        id: 'b2',
        label: 'Contexto de uso',
        seconds: 6,
        purpose: 'Situar em que condição você usou — é o que dá peso à opinião.',
        prompt: 'Por quanto tempo e em que situação?',
      },
      {
        id: 'b3',
        label: 'O que funciona',
        seconds: 10,
        purpose: 'Pontos positivos concretos, não adjetivos.',
        prompt: 'O que ele faz bem, especificamente?',
      },
      {
        id: 'b4',
        label: 'O que não funciona',
        seconds: 8,
        purpose: 'A parte que constrói credibilidade. Sem isso, vira propaganda.',
        prompt: 'Qual limitação real você encontrou?',
      },
      {
        id: 'b5',
        label: 'Para quem serve',
        seconds: 10,
        purpose: 'Fechar segmentando: para quem vale e para quem não vale.',
        prompt: 'Quem deve comprar e quem deve passar?',
      },
    ],
    example:
      'É bom, mas não para todo mundo — te explico para quem faz sentido.',
  },
  {
    id: 'storytelling-curto',
    name: 'História curta',
    category: 'Storytelling',
    objective: 'Prender pela narrativa e deixar o produto entrar como parte da história.',
    faceless: false,
    effort: 'médio',
    beats: [
      {
        id: 'b1',
        label: 'Situação',
        seconds: 4,
        purpose: 'Colocar a pessoa dentro de uma cena reconhecível em segundos.',
        prompt: 'Onde e quando isso acontece?',
      },
      {
        id: 'b2',
        label: 'Problema',
        seconds: 6,
        purpose: 'O incômodo específico — quanto mais concreto, mais gente se reconhece.',
        prompt: 'O que deu errado?',
      },
      {
        id: 'b3',
        label: 'Virada',
        seconds: 10,
        purpose: 'O momento em que algo muda. O produto entra aqui, não antes.',
        prompt: 'O que mudou a situação?',
      },
      {
        id: 'b4',
        label: 'Resultado',
        seconds: 10,
        purpose: 'Mostrar o depois sem exagerar — exagero quebra a história.',
        prompt: 'Como ficou?',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 6,
        purpose: 'Devolver para quem assiste: e você?',
        prompt: 'Que pergunta você deixa no ar?',
      },
    ],
    example:
      'Passei três semanas resolvendo isso do jeito errado até cair a ficha.',
  },
  {
    id: 'lista-rapida',
    name: 'Lista rápida',
    category: 'Lista',
    objective: 'Entregar valor em blocos curtos e segurar até o fim pela contagem.',
    faceless: true,
    effort: 'baixo',
    beats: [
      {
        id: 'b1',
        label: 'Promessa numerada',
        seconds: 3,
        purpose: 'O número é o contrato: diz de saída quanto tempo isso vai levar.',
        prompt: 'Três coisas sobre o quê?',
      },
      {
        id: 'b2',
        label: 'Item 1',
        seconds: 6,
        purpose: 'O mais óbvio primeiro, para criar concordância.',
        prompt: 'Primeiro item, em uma frase.',
      },
      {
        id: 'b3',
        label: 'Item 2',
        seconds: 6,
        purpose: 'O intermediário, que aprofunda.',
        prompt: 'Segundo item.',
      },
      {
        id: 'b4',
        label: 'Item 3',
        seconds: 6,
        purpose: 'O menos óbvio por último — é o que faz a pessoa salvar o vídeo.',
        prompt: 'Terceiro item, o que quase ninguém fala.',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 4,
        purpose: 'Recolher a lista e apontar o próximo passo.',
        prompt: 'Como você amarra os três?',
      },
    ],
    example:
      'Três coisas que eu queria ter sabido antes de começar.',
  },
  {
    id: 'comparacao',
    name: 'Essa ou aquela',
    category: 'Comparação',
    objective: 'Ajudar a decidir entre duas opções — quem está decidindo está perto de comprar.',
    faceless: true,
    effort: 'médio',
    beats: [
      {
        id: 'b1',
        label: 'A pergunta',
        seconds: 4,
        purpose: 'Nomear a dúvida exata que a pessoa tem.',
        prompt: 'Qual é a escolha em jogo?',
      },
      {
        id: 'b2',
        label: 'Opção A',
        seconds: 8,
        purpose: 'Apresentar com justiça — torcer o jogo aqui destrói a confiança.',
        prompt: 'O que a opção A faz bem?',
      },
      {
        id: 'b3',
        label: 'Opção B',
        seconds: 8,
        purpose: 'Mesmo tempo, mesmo cuidado.',
        prompt: 'O que a opção B faz bem?',
      },
      {
        id: 'b4',
        label: 'Critério de decisão',
        seconds: 8,
        purpose: 'O que realmente separa as duas — é aqui que está o valor do vídeo.',
        prompt: 'O que decide entre uma e outra?',
      },
      {
        id: 'b5',
        label: 'Recomendação',
        seconds: 6,
        purpose: 'Tomar partido em função do perfil, não em função da comissão.',
        prompt: 'Para cada perfil, qual você indica?',
      },
    ],
    example:
      'Os dois fazem a mesma coisa, mas só um resolve o seu caso.',
  },
  {
    id: 'problema-solucao',
    name: 'Problema → solução',
    category: 'Problema → solução',
    objective: 'Mostrar um incômodo cotidiano e resolvê-lo na frente da câmera.',
    faceless: true,
    effort: 'baixo',
    beats: [
      {
        id: 'b1',
        label: 'O problema em cena',
        seconds: 4,
        purpose: 'Mostrar, não explicar. O incômodo tem que ser visível.',
        prompt: 'Que imagem mostra o problema sem narração?',
      },
      {
        id: 'b2',
        label: 'Por que incomoda',
        seconds: 5,
        purpose: 'Dar dimensão: com que frequência e quanto custa em tempo ou dinheiro.',
        prompt: 'Por que isso importa?',
      },
      {
        id: 'b3',
        label: 'A solução aparece',
        seconds: 9,
        purpose: 'A entrada do produto, mostrada em uso imediato.',
        prompt: 'Como o produto entra na cena?',
      },
      {
        id: 'b4',
        label: 'Prova rápida',
        seconds: 8,
        purpose: 'O antes e depois lado a lado, no mesmo enquadramento se possível.',
        prompt: 'Qual comparação torna o resultado inegável?',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 6,
        purpose: 'Encerrar no resultado, não no pedido.',
        prompt: 'Qual a última imagem?',
      },
    ],
    example:
      'Se isso também te irrita todo santo dia, assiste até o fim.',
  },
  {
    id: 'curiosidade',
    name: 'Curiosidade que puxa',
    category: 'Curiosidade',
    objective: 'Usar uma informação inesperada para abrir espaço e só então falar do produto.',
    faceless: true,
    effort: 'médio',
    beats: [
      {
        id: 'b1',
        label: 'Fato inesperado',
        seconds: 3,
        purpose: 'Uma afirmação que contraria o senso comum — e que você consiga sustentar.',
        prompt: 'Que informação surpreende? (precisa ser verdadeira)',
      },
      {
        id: 'b2',
        label: 'Contexto',
        seconds: 6,
        purpose: 'Explicar o suficiente para o fato fazer sentido.',
        prompt: 'De onde vem essa informação?',
      },
      {
        id: 'b3',
        label: 'Revelação',
        seconds: 9,
        purpose: 'Fechar o laço aberto no gancho. Não fechar aqui gera comentário irritado.',
        prompt: 'Qual é a explicação?',
      },
      {
        id: 'b4',
        label: 'Ligação com o produto',
        seconds: 8,
        purpose: 'A ponte precisa ser natural — ponte forçada derruba a retenção no fim.',
        prompt: 'Como o produto se conecta a isso?',
      },
      {
        id: 'b5',
        label: 'Fechamento',
        seconds: 6,
        purpose: 'Encerrar no assunto, com o produto como consequência.',
        prompt: 'Como você fecha sem quebrar o clima?',
      },
    ],
    example:
      'Quase ninguém repara nisso, e muda completamente o resultado.',
  },
];

/** Categorias na ordem em que aparecem nos filtros. */
export const contentCategories = [
  'UGC',
  'Demonstração',
  'Review',
  'Storytelling',
  'Lista',
  'Comparação',
  'Problema → solução',
  'Curiosidade',
] as const;

/** Duração total aproximada de um formato, somando os beats. */
export function formatDuration(format: ContentFormat): number {
  return format.beats.reduce((total, beat) => total + beat.seconds, 0);
}

/**
 * Monta o roteiro para a área de transferência: a estrutura com os tempos e as
 * instruções de preenchimento. É um molde para a pessoa completar — não um
 * roteiro pronto fingindo estar pronto.
 */
export function formatToScript(format: ContentFormat): string {
  const lines: string[] = [
    format.name.toUpperCase(),
    `Objetivo: ${format.objective}`,
    `Duração aproximada: ${formatDuration(format)}s`,
    '',
  ];

  let elapsed = 0;
  for (const beat of format.beats) {
    const start = elapsed;
    elapsed += beat.seconds;
    lines.push(`${start}–${elapsed}s · ${beat.label.toUpperCase()}`);
    lines.push(`  ${beat.purpose}`);
    lines.push(`  > ${beat.prompt}`);
    lines.push('  [ escreva aqui ]');
    lines.push('');
  }

  lines.push('— O Código TikTok Shop');
  return lines.join('\n');
}
