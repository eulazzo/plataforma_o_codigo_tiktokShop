import type { LateralSignal, MetricStage } from './types';

/**
 * MÉTRICAS — o caminho do vídeo até o pedido
 * ============================================================================
 * Esta tela NÃO é a planilha de testes (essa é outra área, para registrar cada
 * publicação). Aqui o aluno aprende a LER os números que já tem e a descobrir
 * em qual etapa ele perde as pessoas.
 *
 * O QUE NÃO EXISTE AQUI, DE PROPÓSITO:
 *   · número de referência ("um bom CTR é X%") — muda com nicho, preço e
 *     público; publicar um valor inventado é inventar prova;
 *   · explicação de como o algoritmo funciona por dentro — seria chute com
 *     cara de fato. Os textos falam do que a PESSOA fez e do que o aluno muda.
 *
 * O que substitui o benchmark: comparar o vídeo com o vídeo anterior DELE. É a
 * única comparação honesta que existe sem dados de mercado.
 *
 * ATENÇÃO: material de RASCUNHO. Revise antes de entregar a compradores.
 */

export const metricStages: MetricStage[] = [
  {
    id: 'alcance',
    number: '01',
    name: 'Alcance',
    alias: 'costuma aparecer como “visualizações de vídeo”',
    what: 'Quantas pessoas viram o seu vídeo.',
    whenLow:
      'Não há o que ajustar aqui diretamente: alcance é resultado, não alavanca. Não existe botão para aumentá-lo. O que está no seu controle são as etapas seguintes — se as pessoas ficam, se tocam no produto, se compram.',
    fixes: [
      'Não persiga alcance. Trabalhe as etapas 02 e 03, que são as que você controla.',
      'Publique mais vezes em vez de esperar um vídeo decolar. Cada publicação é um teste novo.',
      'Se todos os seus vídeos param no mesmo tamanho, olhe o assunto antes de olhar a edição.',
    ],
  },
  {
    id: 'tres-segundos',
    number: '02',
    name: 'Os três primeiros segundos',
    alias: 'aparece no tempo médio de exibição e na curva de retenção',
    what: 'Quantos continuam depois da primeira frase.',
    whenLow:
      'A abertura não deu motivo para ficar. Ou o vídeo demorou a começar, ou começou por você em vez de começar pela pessoa.',
    fixes: [
      'Troque só a primeira frase e publique de novo. É o teste mais barato que existe — a biblioteca de ganchos serve para isso.',
      'Corte tudo que vem antes da ação. Se o vídeo começa com você respirando, começou tarde.',
      'Ponha o produto ou a cena no primeiro quadro, não depois da apresentação.',
      'Texto na tela nos primeiros segundos compete com o vídeo: ler tira a atenção de assistir.',
    ],
  },
  {
    id: 'ate-o-fim',
    number: '03',
    name: 'Até o fim',
    alias: 'costuma aparecer como “assistiram o vídeo completo”',
    what: 'Quantos ficaram até o último segundo.',
    whenLow:
      'O gancho funcionou e o miolo não sustentou. Costuma ser ritmo caindo, demonstração longa, ou a promessa da abertura entregue tarde demais — quando é entregue.',
    fixes: [
      'Encurte. Quase todo vídeo que cai no meio está longo para o que tem a dizer.',
      'Entregue o que a abertura prometeu antes da metade, não no fim.',
      'Corte seco entre os planos. Transição gasta tempo e não segura ninguém.',
      'Se a demonstração é o miolo, mostre a ação inteira uma vez em vez de vários pedaços.',
    ],
  },
  {
    id: 'toque',
    number: '04',
    name: 'Toque no produto',
    alias: 'costuma aparecer como “cliques no produto”',
    what: 'Quantos tocaram na vitrine depois de assistir.',
    whenLow:
      'O vídeo entreteve e não deu motivo de compra. Costuma faltar o problema que o produto resolve — ou faltou dizer, uma vez, o que fazer agora.',
    fixes: [
      'Mostre o produto resolvendo alguma coisa, não o produto existindo.',
      'Diga o que fazer, uma vez, com naturalidade. Vídeo sem instrução termina em nada.',
      'Deixe claro no vídeo que o produto está ali: muita gente não procura sozinha.',
      'Se o vídeo virou entretenimento e o produto virou cenário, o problema é o roteiro.',
    ],
  },
  {
    id: 'pedido',
    number: '05',
    name: 'Pedido',
    alias: 'costuma aparecer como “pedidos” ou “conversão”',
    what: 'Quantos compraram depois de tocar.',
    whenLow:
      'A pessoa se interessou e desistiu na página. Daqui para frente quem decide é a página do produto, não a edição do vídeo.',
    fixes: [
      'Abra a sua página como quem chega pela primeira vez: primeira foto, título, preço, frete.',
      'Confira se o vídeo prometeu algo que a página não confirma — cor, tamanho, quantidade, acessório.',
      'Preço e frete entram juntos na decisão. Vídeo bom não conserta frete que assusta.',
      'Se muita gente toca e ninguém compra, teste outro produto antes de gravar mais dez vídeos.',
    ],
  },
];

/**
 * Sinais que não são etapa do funil. Cada um diz algo diferente sobre quem
 * assistiu — e nenhum deles substitui a leitura das cinco etapas acima.
 */
export const lateralSignals: LateralSignal[] = [
  {
    id: 'comentarios',
    name: 'Comentários',
    reading:
      'Pergunta em comentário é objeção que o vídeo não respondeu. Cada uma delas é o roteiro do próximo vídeo, escrito com as palavras de quem compra.',
  },
  {
    id: 'salvamentos',
    name: 'Salvamentos',
    reading:
      'Salvar é “quero isso depois”. Muito salvamento com pouco pedido costuma apontar para preço, frete ou momento — raramente para a edição.',
  },
  {
    id: 'compartilhamentos',
    name: 'Compartilhamentos',
    reading:
      'Compartilhar é “isso serve para alguém que eu conheço”. Repare em qual assunto gera compartilhamento: costuma ser o que vale a pena repetir.',
  },
];

/* ---------------------------------------------------------------------------
   Leitura dos números
   ----------------------------------------------------------------------------
   Tudo aqui é conta, não julgamento: a tela calcula as taxas do aluno e mostra.
   Nenhuma função decide se um número é "bom" — não há com o que comparar sem
   inventar referência.
   --------------------------------------------------------------------------- */

/** O que o aluno digita, como veio do <input>. */
export interface VideoNumbers {
  views: string;
  /** Percentual de quem assistiu até o fim, como o painel mostra. */
  finished: string;
  clicks: string;
  orders: string;
}

export const emptyVideo: VideoNumbers = { views: '', finished: '', clicks: '', orders: '' };

/**
 * Aceita o jeito brasileiro de escrever número.
 *
 *   "12.480"  → 12480   (ponto de milhar)
 *   "12,5"    → 12.5    (vírgula decimal)
 *   "12.5"    → 12.5    (ponto com uma ou duas casas: decimal)
 *   "1.234.5" → 12345   (dois pontos: milhar)
 *
 * A regra do ponto é ambígua de propósito só num caso — "12.5" — e ali o
 * decimal é a leitura certa: ninguém escreve doze mil e quinhentos assim.
 */
export function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,]/g, '');
  if (!cleaned) return null;

  let normalized: string;
  if (cleaned.includes(',')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    const dots = cleaned.split('.').length - 1;
    const afterDot = cleaned.slice(cleaned.indexOf('.') + 1);
    normalized =
      dots === 1 && afterDot.length > 0 && afterDot.length <= 2
        ? cleaned
        : cleaned.replace(/\./g, '');
  }

  const value = Number(normalized);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

/** As taxas derivadas de um vídeo. `null` = não dá para calcular ainda. */
export interface VideoRates {
  views: number | null;
  /** Assistiram até o fim, em %. Vem digitado, não calculado. */
  finished: number | null;
  /** Tocaram no produto ÷ viram, em %. */
  clickRate: number | null;
  /** Compraram ÷ tocaram, em %. */
  orderRate: number | null;
  /** Pedidos a cada mil visualizações — junta o funil inteiro num número só. */
  perThousand: number | null;
}

function ratio(top: number | null, bottom: number | null, scale = 100): number | null {
  if (top === null || bottom === null || bottom === 0) return null;
  return (top / bottom) * scale;
}

export function readVideo(input: VideoNumbers): VideoRates {
  const views = parseNumber(input.views);
  const clicks = parseNumber(input.clicks);
  const orders = parseNumber(input.orders);

  return {
    views,
    finished: parseNumber(input.finished),
    clickRate: ratio(clicks, views),
    orderRate: ratio(orders, clicks),
    perThousand: ratio(orders, views, 1000),
  };
}

/** Há algo digitado? Usado para decidir entre desenhar o funil e não desenhar. */
export function hasNumbers(input: VideoNumbers): boolean {
  return Object.values(input).some((value) => value.trim() !== '');
}

/** Número inteiro com separador de milhar: 12480 → "12.480". */
export function formatCount(value: number): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

/** Percentual com no máximo duas casas, sem zero à toa: 1.5 → "1,5%". */
export function formatPercent(value: number): string {
  const digits = value >= 10 ? 1 : 2;
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: digits })}%`;
}

export function formatDecimal(value: number): string {
  const digits = value >= 10 ? 1 : 2;
  return value.toLocaleString('pt-BR', { maximumFractionDigits: digits });
}
