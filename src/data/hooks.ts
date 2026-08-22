import type { Hook, HookKind } from './types';

/**
 * BIBLIOTECA DE GANCHOS — base
 * ============================================================================
 * As 20 aberturas presentes nas DUAS versões. As outras 30 vivem em
 * plan-content.complete.ts e não entram no bundle da Essencial — 20 no
 * Essencial, 50 no Completo, como a página da versão Completa promete.
 *
 * COMO EDITAR:
 *   · `text` é a primeira frase do vídeo. Máximo 12 palavras: gancho que não
 *     cabe em três segundos não é gancho.
 *   · Colchetes marcam o que o aluno troca. Eles aparecem na tela em âmbar e
 *     são mantidos no texto copiado, de propósito.
 *   · `number` é sequencial e contínuo entre os dois arquivos: a base vai de
 *     01 a 20, os extras da Completa de 21 a 50.
 *
 * REGRAS DE ESCRITA (as mesmas que o produto ensina, aplicadas a si mesmo):
 *   · nada de "dica de ouro", "ninguém te conta", "segredo", "muda sua vida";
 *   · nada de urgência falsa ("corre que acaba");
 *   · NADA de número, resultado, prazo ou opinião de terceiro inventados;
 *   · gancho que serviria para qualquer produto não é gancho — sempre que
 *     possível, force o específico com um colchete.
 *
 * ATENÇÃO: material de RASCUNHO. Leia cada frase em voz alta antes de entregar
 * a compradores — gancho se testa com a boca, não com o olho.
 */

/** O que cada tipo faz. Aparece na tela quando o aluno filtra por ele. */
export const hookKinds: Record<HookKind, string> = {
  Situação:
    'Abre numa cena que a pessoa já viveu. Ela continua assistindo porque se reconheceu, não porque você prometeu algo.',
  Contraste:
    'Põe o jeito de sempre ao lado do jeito novo. A tensão entre os dois é o que segura os três segundos.',
  Detalhe:
    'Começa pelo específico e concreto — a peça, o encaixe, o gesto. Funciona bem quando o produto se explica sozinho na imagem.',
  Pergunta:
    'Pergunta fechada, que a pessoa responde na cabeça antes de decidir sair. Evite pergunta aberta: ela dá licença para ir embora.',
  'Meio da conversa':
    'Entra como quem continua um assunto já começado. Quebra o padrão de abertura de anúncio e soa como gente falando.',
};

/** A ordem em que os tipos aparecem nos filtros. */
export const hookKindOrder: HookKind[] = [
  'Situação',
  'Contraste',
  'Detalhe',
  'Pergunta',
  'Meio da conversa',
];

export const hooks: Hook[] = [
  /* ---------------------------------------------------- Situação ---------- */
  { id: 'h01', number: '01', kind: 'Situação', text: 'Quando você abre [a gaveta] e fecha rápido pra ninguém ver.' },
  { id: 'h02', number: '02', kind: 'Situação', text: 'Se você já desistiu de arrumar [isso], escuta um pouco.' },
  { id: 'h03', number: '03', kind: 'Situação', text: 'Todo dia a mesma cena: [o problema] ali de novo.' },
  { id: 'h04', number: '04', kind: 'Situação', text: 'Você limpa, organiza, e em dois dias [volta ao mesmo].' },

  /* ---------------------------------------------------- Contraste --------- */
  { id: 'h05', number: '05', kind: 'Contraste', text: 'Antes eu fazia [assim]. Agora faço [assado].' },
  { id: 'h06', number: '06', kind: 'Contraste', text: 'Tem o jeito difícil de [fazer isso] e tem esse.' },
  { id: 'h07', number: '07', kind: 'Contraste', text: 'Parei de [fazer o de sempre] e não voltei atrás.' },
  { id: 'h08', number: '08', kind: 'Contraste', text: 'A diferença entre [os dois] cabe em cinco segundos.' },

  /* ---------------------------------------------------- Detalhe ----------- */
  { id: 'h09', number: '09', kind: 'Detalhe', text: 'Repara nessa parte aqui — é o que muda tudo.' },
  { id: 'h10', number: '10', kind: 'Detalhe', text: 'Esse encaixe aqui é o motivo de eu ter comprado.' },
  { id: 'h11', number: '11', kind: 'Detalhe', text: 'Tem um detalhe em [esse produto] que só se vê usando.' },
  { id: 'h12', number: '12', kind: 'Detalhe', text: 'Isso aqui parece besteira e é a parte mais útil.' },

  /* ---------------------------------------------------- Pergunta ---------- */
  { id: 'h13', number: '13', kind: 'Pergunta', text: 'Você já perdeu tempo procurando [isso] dentro de casa?' },
  { id: 'h14', number: '14', kind: 'Pergunta', text: 'Sua [gaveta] fecha na primeira tentativa?' },
  { id: 'h15', number: '15', kind: 'Pergunta', text: 'Se eu te mostrar [isso], você refaz a sua?' },
  { id: 'h16', number: '16', kind: 'Pergunta', text: 'Quantas vezes por dia você repete [esse gesto]?' },

  /* ---------------------------------------------- Meio da conversa -------- */
  { id: 'h17', number: '17', kind: 'Meio da conversa', text: '...e foi aí que eu vi que dava pra [fazer diferente].' },
  { id: 'h18', number: '18', kind: 'Meio da conversa', text: 'Enfim, comprei. E agora eu preciso te contar.' },
  { id: 'h19', number: '19', kind: 'Meio da conversa', text: 'Voltando naquele assunto de [tema]: testei e é isso.' },
  { id: 'h20', number: '20', kind: 'Meio da conversa', text: 'Como eu ia dizendo, [isso] mudou a minha rotina.' },
];

/** Marca no texto o que o aluno troca: "[a gaveta]" vira um pedaço destacável. */
const BRACKET = /(\[[^\]]+\])/g;

export function splitHook(text: string): string[] {
  return text.split(BRACKET).filter((part) => part !== '');
}

export function isBlank(part: string): boolean {
  return /^\[[^\]]+\]$/.test(part);
}
