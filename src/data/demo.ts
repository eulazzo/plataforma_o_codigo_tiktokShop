/**
 * ÂNGULOS DE DEMONSTRAÇÃO
 * ============================================================================
 * Um vídeo de demonstração pode ser montado de seis jeitos. O ângulo decide o
 * que aparece na tela, não o texto: mudar de "antes → depois" para "teste
 * visual" muda a cena inteira.
 *
 * O QUE O LABORATÓRIO FAZ COM ISSO: lê o benefício que o aluno escreveu e
 * ordena os seis. O que casa melhor com as palavras dele vem primeiro, e a
 * tela DIZ por que escolheu aquele. Não é adivinhação disfarçada de
 * inteligência — é uma regra de palavras, explicada em voz alta, e o aluno
 * continua podendo clicar de novo para receber o próximo ângulo.
 *
 * Por que ordenar em vez de escolher um só: nenhum produto tem um único vídeo
 * possível. Os seis ângulos são seis testes, e o aluno vai querer os outros
 * depois que o primeiro rodar.
 */

export interface DemoAngle {
  id: string;
  /** Nome curto, do jeito que aparece na tela. */
  name: string;
  /** A promessa visual em uma linha. Vira o "objetivo" da ficha do prompt. */
  promise: string;
  /**
   * Sinais no texto do aluno que puxam este ângulo para a frente.
   *
   * São radicais, não palavras inteiras: "limp" pega limpa, limpar, limpeza,
   * limpinho. Português conjuga demais para casar palavra fechada.
   */
  signals: string[];
  /** Por que este ângulo foi escolhido — completa a frase "porque…". */
  reason: string;
  /**
   * O bloco que entra no lugar de [[ANGULO]] no corpo do prompt. Descreve a
   * ESTRUTURA visual pedida, nunca uma característica do produto.
   */
  block: string;
}

export const DEMO_ANGLES: DemoAngle[] = [
  {
    id: 'antes-depois',
    name: 'Antes → Depois',
    promise: 'A transformação lado a lado, no mesmo enquadramento',
    signals: [
      'limp',
      'remov',
      'suj',
      'mancha',
      'poeir',
      'farel',
      'migalh',
      'organiz',
      'bagunç',
      'desembaraç',
      'enxug',
      'tira',
      'elimin',
      'desentup',
      'polir',
      'brilh',
      'arrum',
    ],
    reason: 'o benefício que você escreveu fala em mudar o estado de alguma coisa',
    block: `ÂNGULO OBRIGATÓRIO: ANTES → DEPOIS

A cena tem um estado inicial visivelmente imperfeito, a ação do produto, e o mesmo enquadramento com o estado final.

O antes e o depois precisam ser comparáveis quadro a quadro: mesmos objetos, mesmas posições, mesma luz. A única diferença é a causada pelo produto.

Reserve os últimos segundos ao resultado, com a câmera parada, para dar tempo de comparar.`,
  },
  {
    id: 'em-funcionamento',
    name: 'Produto em funcionamento',
    promise: 'O mecanismo acontecendo, em plano fechado',
    signals: [
      'automátic',
      'sozinh',
      'rápid',
      'segundo',
      'minuto',
      'aquec',
      'esfri',
      'gira',
      'vibra',
      'dobra sozinh',
      'liga',
      'funcion',
    ],
    reason: 'o interesse do produto está no que ele faz enquanto está ligado',
    block: `ÂNGULO OBRIGATÓRIO: PRODUTO EM FUNCIONAMENTO

A cena é o produto operando, em plano fechado, do começo ao fim da ação.

Mostre o mecanismo: a parte que se move, gira, abre, aquece ou encaixa. O enquadramento deve estar perto o bastante para que o movimento seja legível numa tela de celular.

Não corte para o resultado: a ação inteira acontece dentro do mesmo plano.`,
  },
  {
    id: 'problema-solucao',
    name: 'Problema → Solução',
    promise: 'O incômodo aparece primeiro, o produto entra depois',
    signals: [
      'evita',
      'impede',
      'acaba com',
      'resolve',
      'para de',
      'chega de',
      'sem precisar',
      'sem ter que',
      'não deixa',
      'protege',
      'segura',
    ],
    reason: 'o benefício que você escreveu está escrito como o fim de um incômodo',
    block: `ÂNGULO OBRIGATÓRIO: PROBLEMA → SOLUÇÃO

A cena abre mostrando o incômodo ACONTECENDO, não o resultado dele. Alguma coisa cai, escorre, embola, não cabe, escapa — a falha precisa ser vista, não deduzida.

Depois o produto entra no mesmo enquadramento e a mesma situação se repete, agora sem a falha.

O incômodo precisa ser concreto e cotidiano. Nada de problema abstrato como "falta de praticidade".`,
  },
  {
    id: 'comparacao',
    name: 'Comparação',
    promise: 'O jeito de sempre ao lado do jeito com o produto',
    signals: [
      'em vez de',
      'substitui',
      'no lugar de',
      'dispensa',
      'melhor que',
      'troca',
      'igual',
      'parecid',
      'diferen',
      'compar',
    ],
    reason: 'o benefício que você escreveu se define por oposição a outra coisa',
    block: `ÂNGULO OBRIGATÓRIO: COMPARAÇÃO

A cena tem os dois lados dentro do MESMO enquadramento fixo: o método comum de um lado, o produto do outro, com a mesma tarefa acontecendo nos dois.

Mesma superfície, mesma luz, mesma quantidade de material. O que muda é só a ferramenta.

Não use marca real do outro lado, não faça o método comum parecer mais desastrado do que é, e não invente diferença de tempo ou de resultado.`,
  },
  {
    id: 'detalhe',
    name: 'Detalhe / funcionalidade',
    promise: 'A parte específica que resolve, bem de perto',
    signals: [
      'cabe',
      'dobra',
      'encaix',
      'compact',
      'tamanho',
      'leve',
      'portátil',
      'bolso',
      'regul',
      'ajust',
      'divis',
      'trava',
      'ímã',
      'imã',
      'ventosa',
      'antiderrap',
    ],
    reason: 'o benefício que você escreveu aponta para uma parte específica do produto',
    block: `ÂNGULO OBRIGATÓRIO: DETALHE / FUNCIONALIDADE

A cena é um plano bem fechado na parte do produto que faz a diferença: o encaixe, a trava, a dobra, a divisória, a textura.

Uma mão manipula essa parte devagar, dentro do quadro, mostrando como ela funciona.

O resto do produto pode ficar fora do enquadramento. O assunto é a peça, não o conjunto.`,
  },
  {
    id: 'teste-visual',
    name: 'Teste visual',
    promise: 'Uma prova simples acontecendo na frente da câmera',
    signals: [
      'aguenta',
      'resist',
      'suporta',
      'não vaza',
      'impermeáv',
      'à prova',
      'a prova',
      'firme',
      'antiqued',
      'peso',
      'quilo',
      'reforç',
    ],
    reason: 'o benefício que você escreveu é do tipo que se prova com um teste',
    block: `ÂNGULO OBRIGATÓRIO: TESTE VISUAL

A cena é um teste simples, feito uma vez só, dentro do enquadramento fixo: o produto é submetido à situação que o benefício descreve e a câmera fica parada até o fim.

O teste precisa ser plausível e do tamanho do produto. Nada de exagero, nada de encenação impossível.

Se o teste não puder acontecer de verdade em uma cena contínua, escolha uma versão menor dele em vez de simular o resultado.`,
  },
];

export const demoAngleById = (id: string): DemoAngle | undefined =>
  DEMO_ANGLES.find((angle) => angle.id === id);

/**
 * Ordena os seis ângulos pelo texto que o aluno escreveu.
 *
 * Conta quantos sinais de cada ângulo aparecem no benefício e no produto. O
 * benefício pesa o dobro: é ele que descreve a mudança, e é a mudança que o
 * vídeo precisa mostrar. Empate mantém a ordem declarada, que é a ordem em que
 * os ângulos são mais usados.
 */
export function rankDemoAngles(produto: string, beneficio: string): DemoAngle[] {
  const alvo = beneficio.toLowerCase();
  const extra = produto.toLowerCase();

  const score = (angle: DemoAngle) =>
    angle.signals.reduce(
      (total, signal) =>
        total + (alvo.includes(signal) ? 2 : 0) + (extra.includes(signal) ? 1 : 0),
      0,
    );

  return DEMO_ANGLES.map((angle, order) => ({ angle, order, points: score(angle) }))
    .sort((a, b) => b.points - a.points || a.order - b.order)
    .map((row) => row.angle);
}

/**
 * Por que este ângulo veio primeiro.
 *
 * Sem nenhum sinal no texto, a resposta honesta não é inventar um motivo: é
 * dizer que o ângulo é o começo padrão.
 */
export function demoReason(angle: DemoAngle, produto: string, beneficio: string): string {
  const texto = `${beneficio} ${produto}`.toLowerCase();
  const casou = angle.signals.some((signal) => texto.includes(signal));

  return casou ? angle.reason : 'é a estrutura que serve para quase todo produto';
}
