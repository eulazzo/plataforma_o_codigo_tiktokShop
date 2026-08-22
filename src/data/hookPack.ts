import type { HookKind } from './types';
import { hookKindOrder } from './hooks';

/**
 * PACOTE DE TESTES DE GANCHO
 * ============================================================================
 * O prompt de gancho pede 10 aberturas, duas de cada tipo, NA ORDEM dos cinco
 * tipos da biblioteca. Este arquivo é o que acontece com a resposta depois:
 * o aluno cola o que a ferramenta de IA devolveu e a tela organiza aquilo em
 * pacote — cada gancho com o seu tipo, o seu botão de copiar e a opção de
 * pedir variações só daquele.
 *
 * POR QUE O ALUNO COLA A RESPOSTA:
 * a plataforma não fala com nenhum modelo. Ela escreve o prompt e organiza o
 * retorno. Inventar dez frases aqui dentro seria fácil e seria mentira — e o
 * aluno descobriria no primeiro produto, porque as frases não teriam nada a
 * ver com o que ele vende.
 *
 * A ordem dos tipos é a MESMA de `hookKindOrder`, importada e não recopiada:
 * é a taxonomia que o aluno já aprendeu na tela de Ganchos.
 */

export interface PackedHook {
  /** Posição na lista, 1 a 10. */
  index: number;
  text: string;
  /** Ausente quando a resposta veio com mais itens do que o prompt pediu. */
  kind?: HookKind;
}

/** Quantos ganchos o prompt pede de cada tipo. */
export const PER_KIND = 2;

/** O tamanho do pacote completo: 5 tipos × 2. */
export const PACK_SIZE = hookKindOrder.length * PER_KIND;

/* Uma linha numerada: "01. texto", "1) texto", "3 - texto", "10: texto". */
const NUMBERED = /^\s*(\d{1,2})\s*[.)\-–—:]\s+(.+?)\s*$/;

/* Linha que claramente não é gancho: divisória, título de bloco, vazio. */
const NOISE = /^\s*(?:[=*_-]{3,}|#{1,6}\s|\s*)$/;

/** Tira aspas e travessão de abertura que a IA costuma pendurar na frase. */
function clean(text: string): string {
  return text
    .replace(/^["“”'‘’\s]+|["“”'‘’\s]+$/g, '')
    .replace(/^[-–—]\s*/, '')
    .trim();
}

/**
 * Lê o texto colado e devolve os ganchos na ordem em que apareceram.
 *
 * Primeiro tenta as linhas numeradas, que é o formato que o prompt exige.
 * Se não achar nenhuma — a IA ignorou o formato —, cai para as linhas soltas,
 * porque o conteúdo continua servindo e obrigar o aluno a formatar à mão seria
 * transformar a ferramenta em trabalho.
 */
export function parseHookPack(raw: string): PackedHook[] {
  const lines = raw.split(/\r?\n/);

  const numbered = lines
    .map((line) => line.match(NUMBERED))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => clean(match[2]))
    .filter(Boolean);

  const loose =
    numbered.length > 0
      ? []
      : lines.map(clean).filter((line) => line.length > 0 && !NOISE.test(line));

  const texts = (numbered.length > 0 ? numbered : loose).slice(0, 40);

  return texts.map((text, i) => ({
    index: i + 1,
    text,
    /* dois por tipo, na ordem do prompt. Além do décimo não há tipo a afirmar. */
    kind: hookKindOrder[Math.floor(i / PER_KIND)],
  }));
}

/**
 * O prompt de variações: pega UM gancho que já existe e pede mais cinco no
 * mesmo ângulo.
 *
 * Repete as proibições do prompt principal de propósito. Este texto vai ser
 * colado numa conversa nova, sem memória do que foi pedido antes — regra que
 * não estiver aqui não vale.
 */
export function buildVariationsPrompt(hook: PackedHook, produto: string): string {
  const angulo = hook.kind ? `${hook.kind} — ` : '';

  return `Este é um gancho de abertura para um vídeo vertical de TikTok Shop sobre ${produto}:

"${hook.text}"

Ângulo: ${angulo}mantenha exatamente o mesmo tipo de abertura.

Gere 5 variações dessa frase.

Cada variação deve:
· Manter o mesmo ângulo e a mesma promessa da frase original.
· Ter no máximo 12 palavras.
· Poder ser falada em cerca de 3 segundos.
· Funcionar sozinha, sem contexto anterior.
· Soar como pessoa real falando, não como copy publicitária.
· Trocar a construção da frase, não só uma palavra.

Não invente número, porcentagem, resultado, prazo, depoimento nem característica do produto que não esteja na frase original.
Não use "dica de ouro", "ninguém te conta", "segredo", "você precisa ver isso", "corre" nem urgência falsa.

Entregue apenas as 5 variações, uma por linha, numeradas. Sem introdução e sem explicação.`;
}

/** O texto do "copiar todos": lista numerada, com o tipo de cada um. */
export function packToText(items: PackedHook[]): string {
  return items
    .map((item) => {
      const number = String(item.index).padStart(2, '0');
      return item.kind ? `${number}. [${item.kind}] ${item.text}` : `${number}. ${item.text}`;
    })
    .join('\n');
}
