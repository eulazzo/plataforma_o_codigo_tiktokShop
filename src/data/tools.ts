import type {
  PillarId,
  PillarScore,
  ProductCandidate,
  ScorePillar,
  VideoPost,
} from './types';

/**
 * VALIDADOR 10/10 — os cinco pilares
 * ============================================================================
 * O framework do módulo 03: antes de gravar sobre um produto, dê nota de 0 a 2
 * para cinco pilares. Oito ou mais e vale o seu tempo.
 *
 * POR QUE OS TEXTOS DE NÍVEL EXISTEM:
 * Nota de 0 a 2 sem régua é chute com cara de método — cada pessoa calibra
 * diferente, e a mesma pessoa calibra diferente em dias diferentes. Os três
 * textos de cada pilar são a régua. É o que faz a ferramenta ensinar enquanto
 * o aluno preenche, em vez de só somar.
 *
 * ATENÇÃO: as réguas abaixo são RASCUNHO. Confira palavra por palavra contra o
 * capítulo 3 antes de entregar a compradores — é o texto do método aparecendo
 * dentro da ferramenta, e os dois precisam dizer a mesma coisa.
 *
 * ONDE ISTO MORA: em arquivo de dados comum, não em plan-content. O framework
 * do capítulo 3 está no módulo 03, que as duas versões têm. Esconder o texto
 * aqui seria encenação — o que é exclusivo da Completa é a FERRAMENTA, não a
 * teoria por trás dela.
 */
export const miningPillars: ScorePillar[] = [
  {
    id: 'dor',
    name: 'Dor',
    question: 'Resolve um problema real?',
    levels: [
      'Não vejo problema nenhum sendo resolvido — é um objeto bonito.',
      'Resolve alguma coisa, mas nada que incomode a ponto de a pessoa procurar.',
      'Resolve algo que irrita de verdade, e a pessoa reconhece na hora.',
    ],
  },
  {
    id: 'demonstracao',
    name: 'Demonstração',
    question: 'É fácil mostrar funcionando em vídeo?',
    levels: [
      'O benefício não aparece na tela: só dá para explicar falando.',
      'Dá para mostrar, mas precisa de montagem, tempo ou explicação.',
      'Um plano fechado de poucos segundos já mostra o que ele faz.',
    ],
  },
  {
    id: 'interesse',
    name: 'Interesse',
    question: 'Faz o dedo parar no feed?',
    levels: [
      'Passa despercebido — nada nele interrompe a rolagem.',
      'Chama atenção de quem já procura esse tipo de coisa.',
      'Faz parar mesmo quem não estava procurando nada.',
    ],
  },
  {
    id: 'prova',
    name: 'Prova social',
    question: 'Tem avaliações e histórico de venda?',
    levels: [
      'Sem avaliação e sem histórico: você seria o primeiro a testar.',
      'Tem alguma coisa, mas pouca ou irregular.',
      'Avaliações consistentes e histórico que dá para conferir.',
    ],
  },
  {
    id: 'roteiro',
    name: 'Roteiro',
    question: 'É fácil criar um gancho forte?',
    levels: [
      'Não me vem nenhuma primeira frase — teria que forçar.',
      'Consigo um gancho, mas ele serviria para qualquer produto parecido.',
      'Já tenho pelo menos três aberturas específicas na cabeça.',
    ],
  },
];

/** Nota mínima para o produto valer o tempo de gravação. */
export const APPROVAL_SCORE = 8;

/** Dois pontos por pilar. */
export const MAX_SCORE = miningPillars.length * 2;

export const emptyScores: Record<PillarId, PillarScore> = {
  dor: 0,
  demonstracao: 0,
  interesse: 0,
  prova: 0,
  roteiro: 0,
};

export function totalScore(scores: Record<PillarId, PillarScore>): number {
  return miningPillars.reduce((sum, pillar) => sum + (scores[pillar.id] ?? 0), 0);
}

export function isApproved(scores: Record<PillarId, PillarScore>): boolean {
  return totalScore(scores) >= APPROVAL_SCORE;
}

/* ---------------------------------------------------------------------------
   Exportação
   ----------------------------------------------------------------------------
   A promessa da página de vendas continua sendo "planilha". Este botão é o que
   a cumpre — só que o trabalho acontece aqui dentro e a planilha é o que sai,
   não o que o aluno precisa preencher à mão.
   --------------------------------------------------------------------------- */

/** Envolve em aspas e escapa o que o CSV não engole cru. */
function cell(value: string | number): string {
  const text = String(value);
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * CSV no dialeto que o Excel em português abre com dois cliques:
 *   · separador ponto e vírgula (vírgula é decimal aqui);
 *   · BOM na frente, senão acento vira caractere estranho;
 *   · quebra de linha CRLF.
 */
export function candidatesToCsv(list: ProductCandidate[]): string {
  const header = [
    'Produto',
    'Categoria',
    'Link',
    ...miningPillars.map((pillar) => pillar.name),
    'Total',
    'Situação',
    'Adicionado em',
  ];

  const rows = list.map((item) => [
    cell(item.name),
    cell(item.category),
    cell(item.link),
    ...miningPillars.map((pillar) => item.scores[pillar.id] ?? 0),
    totalScore(item.scores),
    isApproved(item.scores) ? 'Aprovado' : 'Reprovado',
    cell(new Date(item.createdAt).toLocaleDateString('pt-BR')),
  ]);

  const lines = [header.map(cell).join(';'), ...rows.map((row) => row.join(';'))];
  return `\uFEFF${lines.join('\r\n')}\r\n`;
}

/** Entrega o arquivo ao navegador e limpa a URL temporária depois. */
export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ===========================================================================
   ARMAZENAMENTO DOS PRODUTOS
   ---------------------------------------------------------------------------
   Fica aqui, e não dentro da central de mineração, porque o painel de
   consistência também precisa ler a lista para oferecer os produtos no
   formulário de postagem. Uma ferramenta alimenta a outra.
   =========================================================================== */

export const PRODUCTS_KEY = 'ocodigo:ferramentas:mineracao';

function normalizeScores(scores: unknown): Partial<Record<PillarId, PillarScore>> {
  if (!scores || typeof scores !== 'object') return {};
  const out: Partial<Record<PillarId, PillarScore>> = {};
  for (const pillar of miningPillars) {
    const value = (scores as Record<string, unknown>)[pillar.id];
    if (value === 0 || value === 1 || value === 2) out[pillar.id] = value;
  }
  return out;
}

export function loadCandidates(): ProductCandidate[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) return [];
    const saved = JSON.parse(raw) as ProductCandidate[];
    if (!Array.isArray(saved)) return [];
    /* nota fora de 0–2 vira 0: dado velho não pode quebrar o cálculo */
    return saved.map((item) => ({
      ...item,
      scores: { ...emptyScores, ...normalizeScores(item.scores) },
    }));
  } catch {
    return [];
  }
}

/* ===========================================================================
   PAINEL DE CONSISTÊNCIA — regra dos 21 dias
   =========================================================================== */

export const CYCLE_DAYS = 21;

/**
 * Os formatos do capítulo 4, como aparecem no seletor de postagem.
 *
 * ATENÇÃO — COLISÃO DE VOCABULÁRIO: a plataforma já usa a palavra "gancho"
 * para a PRIMEIRA FRASE do vídeo (biblioteca de ganchos e Laboratório de IA,
 * ambos com cinco tipos: Situação, Contraste, Detalhe, Pergunta e Meio da
 * conversa). Os três valores abaixo são FORMATOS de vídeo, não aberturas — um
 * vídeo POV começa com um gancho de algum daqueles cinco tipos.
 *
 * A tela chama isto de "gancho" porque foi assim que foi pedido. Se um dia o
 * rótulo mudar para "formato", é aqui e no label do campo — o dado guardado
 * continua valendo.
 */
export const postHooks = ['POV', 'Recomendação de amiga', 'Unboxing'] as const;

/**
 * Registros mínimos para a tela apontar um vencedor entre os formatos.
 *
 * Com um ou dois vídeos, "média de visualizações" é ruído com cara de
 * conclusão — e apontar um vencedor ali seria a própria plataforma inventando
 * um dado. Abaixo disso a tela mostra a tabela e diz que ainda é cedo.
 */
export const MIN_SAMPLE = 3;

/* ---------------------------------------------------------------------------
   Datas
   ----------------------------------------------------------------------------
   Tudo em horário LOCAL, de propósito. `new Date('2026-08-21')` é interpretado
   como meia-noite UTC — no Brasil isso cai no dia 20 às 21h, e a grade inteira
   andaria um dia para trás. Por isso data vai e volta montada peça por peça.
   --------------------------------------------------------------------------- */

export function toIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromIso(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

export function todayIso(): string {
  return toIso(new Date());
}

export function addDays(iso: string, days: number): string {
  const date = fromIso(iso);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

/** "qua, 27/08" — o suficiente para reconhecer o dia sem ocupar a célula. */
export function formatDayLabel(iso: string): string {
  return fromIso(iso).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

/* ---------------------------------------------------------------------------
   Sequência
   --------------------------------------------------------------------------- */

/**
 * Dias seguidos publicando, contando para trás.
 *
 * Se ainda não postou HOJE, a conta começa em ontem: o dia não acabou, e zerar
 * a sequência de manhã puniria alguém que vai publicar à noite.
 */
export function currentStreak(dates: Set<string>, today: string): number {
  let cursor = dates.has(today) ? today : addDays(today, -1);
  let count = 0;
  while (dates.has(cursor)) {
    count += 1;
    cursor = addDays(cursor, -1);
  }
  return count;
}

/** A maior sequência já feita — não some quando a atual quebra. */
export function bestStreak(dates: Set<string>): number {
  let best = 0;
  for (const date of dates) {
    /* só conta a partir do primeiro dia de cada corrida */
    if (dates.has(addDays(date, -1))) continue;
    let run = 0;
    let cursor = date;
    while (dates.has(cursor)) {
      run += 1;
      cursor = addDays(cursor, 1);
    }
    best = Math.max(best, run);
  }
  return best;
}

/* ---------------------------------------------------------------------------
   Comparação entre formatos
   --------------------------------------------------------------------------- */

export interface HookStat {
  hook: string;
  posts: number;
  /** `null` quando nenhum registro daquele formato tem número conferido. */
  avgViews: number | null;
  avgSales: number | null;
  totalSales: number;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Média por formato, ordenada pela de visualizações.
 *
 * Registro sem número conferido NÃO entra na média — zero e "ainda não olhei"
 * são coisas diferentes, e tratar os dois igual afundaria a média de quem
 * acabou de publicar.
 */
export function analyzeHooks(posts: VideoPost[]): HookStat[] {
  return postHooks
    .map((hook) => {
      const mine = posts.filter((post) => post.hook === hook);
      const views = mine.map((p) => p.views).filter((v): v is number => v !== null);
      const sales = mine.map((p) => p.sales).filter((v): v is number => v !== null);

      return {
        hook,
        posts: mine.length,
        avgViews: average(views),
        avgSales: average(sales),
        totalSales: sales.reduce((sum, value) => sum + value, 0),
      };
    })
    .filter((stat) => stat.posts > 0)
    .sort((a, b) => (b.avgViews ?? -1) - (a.avgViews ?? -1));
}

/* ---------------------------------------------------------------------------
   Exportação das postagens
   --------------------------------------------------------------------------- */

export function postsToCsv(posts: VideoPost[]): string {
  const header = ['Data', 'Produto', 'Gancho', 'Visualizações', 'Vendas', 'Link'];

  const rows = [...posts]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((post) => [
      cell(fromIso(post.date).toLocaleDateString('pt-BR')),
      cell(post.product),
      cell(post.hook),
      post.views ?? '',
      post.sales ?? '',
      cell(post.link),
    ]);

  const lines = [header.map(cell).join(';'), ...rows.map((row) => row.join(';'))];
  return `\uFEFF${lines.join('\r\n')}\r\n`;
}

/* ===========================================================================
   ARMAZENAMENTO DO PAINEL DE CONSISTÊNCIA
   ---------------------------------------------------------------------------
   Fica aqui pelo mesmo motivo que a lista de produtos: o painel de controle
   da tela inicial também lê estes dados. A ferramenta é dona da escrita; quem
   quiser só olhar, importa daqui.
   =========================================================================== */

export const TRACKER_KEY = 'ocodigo:ferramentas:consistencia';

export interface Tracker {
  /** Primeiro dia do ciclo, em "AAAA-MM-DD". */
  startDate: string;
  posts: VideoPost[];
}

export function loadTracker(): Tracker {
  const fallback: Tracker = { startDate: todayIso(), posts: [] };
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<Tracker>;
    return {
      startDate: typeof saved.startDate === 'string' ? saved.startDate : fallback.startDate,
      posts: Array.isArray(saved.posts) ? saved.posts : [],
    };
  } catch {
    return fallback;
  }
}

/**
 * O produto com mais vídeos publicados — a "escala vertical" acontecendo.
 *
 * Empate fica com quem apareceu primeiro na contagem; não vale inventar
 * critério de desempate onde o aluno não deu nenhum.
 */
export function focusProduct(posts: VideoPost[]): { name: string; count: number } | null {
  const tally = new Map<string, number>();
  for (const post of posts) {
    const name = post.product.trim();
    if (!name) continue;
    tally.set(name, (tally.get(name) ?? 0) + 1);
  }

  let best: { name: string; count: number } | null = null;
  for (const [name, count] of tally) {
    if (!best || count > best.count) best = { name, count };
  }
  return best;
}
