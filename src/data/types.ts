/**
 * Tipos do conteúdo da plataforma.
 *
 * REGRA DE CONTEÚDO (vale para todos os arquivos de dados):
 * · Nada de promessa de ganho, prazo de venda ou resultado garantido.
 * · Nada de depoimento, número de mercado ou notícia inventada.
 * · Texto ainda não escrito entra como bloco { kind: 'placeholder' } — nunca
 *   como texto plausível que parece pronto.
 */

/** Versão do produto que o aluno comprou. */
export type ProductPlan = 'essential' | 'complete';

/** Um lado do bloco de comparação. */
export interface CompareSide {
  label: string;
  /** Frase curta que resume o lado, ex.: "risco baixo". */
  note: string;
  /** 'accent' destaca o lado recomendado; 'muted' fica secundário. */
  tone: 'accent' | 'muted';
  rows: { label: string; value: string }[];
}

/** Bloco de conteúdo dentro de um módulo. */
export type ContentBlock =
  | { kind: 'text'; id: string; title: string; body: string[] }
  | { kind: 'list'; id: string; title: string; items: string[] }
  | {
      kind: 'callout';
      id: string;
      title: string;
      body: string;
      tone?: 'neutral' | 'warn';
      /** Botão opcional no fim do aviso, para levar à ferramenta que resolve. */
      link?: { to: string; label: string };
    }
  /**
   * Divisor de seção. Não tem corpo obrigatório: serve para quebrar um módulo
   * longo em partes e para o índice lateral ganhar dois níveis.
   */
  | { kind: 'heading'; id: string; number: string; title: string; body?: string }
  /**
   * Grade de cards "nome + o que faz". Para quando a informação é uma tabela
   * de papéis ou de lugares — tabela de duas colunas não sobrevive no celular.
   */
  | {
      kind: 'cards';
      id: string;
      title: string;
      intro?: string;
      cards: { name: string; role: string; text: string }[];
    }
  /** Duas colunas lado a lado, para contrastar dois caminhos. */
  | { kind: 'compare'; id: string; title: string; intro?: string; columns: [CompareSide, CompareSide] }
  /**
   * Lista de conferência que o aluno marca. As marcações usam o mesmo estado
   * do plano de 7 dias, mas com ids próprios — os contadores de progresso só
   * somam ids do plano, então isto não infla porcentagem nenhuma.
   */
  | {
      kind: 'checklist';
      id: string;
      title: string;
      intro?: string;
      items: { id: string; label: string; note: string }[];
    }
  /**
   * Os cinco pilares do validador, lidos de src/data/tools.ts.
   *
   * NÃO recebe o conteúdo por parâmetro de propósito: o framework já vive na
   * ferramenta, e escrever a régua de novo aqui criaria duas versões do mesmo
   * método para divergirem com o tempo. O módulo ensina, a ferramenta calcula,
   * e os dois leem a mesma fonte.
   */
  | { kind: 'pillars'; id: string; title: string; intro?: string }
  /**
   * Linha do tempo de um vídeo: cada faixa com o intervalo, o nome da etapa e
   * o que ela precisa fazer. A largura de cada faixa é proporcional à duração,
   * então a barra mostra onde o tempo do vídeo realmente vai.
   */
  | {
      kind: 'timeline';
      id: string;
      title: string;
      intro?: string;
      steps: { range: string; seconds: number; label: string; purpose: string }[];
    }
  /**
   * Os cinco tipos de gancho, lidos de src/data/hooks.ts.
   *
   * Mesma decisão do bloco de pilares: a taxonomia já vive na biblioteca de
   * ganchos e no Laboratório de IA. Reescrevê-la aqui criaria uma terceira
   * versão do mesmo vocabulário para divergir com o tempo.
   */
  | { kind: 'hooktypes'; id: string; title: string; intro?: string }
  /**
   * Diagnóstico por sintoma: o aluno escolhe o cenário em que está e recebe o
   * que aquilo significa e o que fazer.
   *
   * A tela de Métricas resolve o mesmo problema pela outra ponta — lá se entra
   * pela ETAPA do funil, aqui pelo SINTOMA. É como a pessoa vive o problema:
   * ninguém pensa "minha etapa 4 está fraca", pensa "deu view e não deu
   * clique". Cada caso liga de volta para a etapa correspondente.
   */
  | {
      kind: 'diagnosis';
      id: string;
      title: string;
      intro?: string;
      cases: {
        id: string;
        symptom: string;
        meaning: string;
        actions: string[];
        link?: { to: string; label: string };
      }[];
    }
  /**
   * Quiz de certo ou errado no fim do módulo.
   *
   * Não tranca nada: pontua e explica. Módulo que só se conclui acertando o
   * quiz transforma revisão em obstáculo, e quem errou é justamente quem mais
   * precisa continuar lendo.
   */
  | {
      kind: 'quiz';
      id: string;
      title: string;
      intro?: string;
      questions: { id: string; statement: string; answer: boolean; explain: string }[];
    }
  /** Espaço reservado: o roteiro do que vai aqui, ainda por escrever. */
  | { kind: 'placeholder'; id: string; title: string; outline: string[] };

export interface Module {
  /** Slug usado na rota: /modulos/:id */
  id: string;
  /** Número exibido (01…08). */
  number: string;
  title: string;
  summary: string;
  /** Estimativa de leitura, ex.: "8 min". Deixe vazio se não souber ainda. */
  duration: string;
  /**
   * Capa do módulo: nome do arquivo dentro de public/modulos/
   * (ex.: 'modulo-01.jpg'). Enquanto o arquivo não existir, o card mostra uma
   * capa tipográfica gerada — basta colocar a imagem na pasta com esse nome
   * para ela assumir, sem mexer no código.
   */
  cover?: string;
  /**
   * Audiobook do módulo: nome do arquivo dentro de public/audio/
   * (ex.: 'modulo-01.mp3'). Omita enquanto não existir — o player só aparece
   * quando há arquivo, e some sozinho se o arquivo não for encontrado.
   */
  audio?: string;
  blocks: ContentBlock[];
}

export interface DayTask {
  id: string;
  label: string;
}

export interface PlanDay {
  /** 1…7 */
  day: number;
  title: string;
  summary: string;
  objectives: string[];
  tasks: DayTask[];
  /** Módulo relacionado, para o botão "abrir material". */
  relatedModuleId?: string;
}

/* ---------------------------------------------------------------------------
   Biblioteca de conteúdo
   --------------------------------------------------------------------------- */

export type ContentCategory =
  | 'UGC'
  | 'Demonstração'
  | 'Review'
  | 'Storytelling'
  | 'Lista'
  | 'Comparação'
  | 'Problema → solução'
  | 'Curiosidade';

/** Um trecho do vídeo, com duração aproximada. */
export interface ContentBeat {
  id: string;
  /** Nome do trecho, ex.: "Gancho". */
  label: string;
  /** Duração aproximada em segundos — define o tamanho do bloco na tela. */
  seconds: number;
  /** O que este trecho precisa fazer. */
  purpose: string;
  /** Instrução de preenchimento, usada no roteiro copiado. */
  prompt: string;
}

export interface ContentFormat {
  id: string;
  name: string;
  category: ContentCategory;
  objective: string;
  /** Se dá para produzir sem mostrar o rosto. */
  faceless: boolean;
  effort: 'baixo' | 'médio' | 'alto';
  beats: ContentBeat[];
  /**
   * Frase de exemplo da abertura — mostra o TOM do formato em uma linha.
   *
   * Isto é material de escrita (como os ganchos do bônus), não prova: uma frase
   * modelo não afirma nada sobre o mundo. O que continua proibido é inventar
   * depoimento, resultado ou número.
   *
   * `null` mostra espaço reservado no card.
   */
  example: string | null;
}

export interface NavItem {
  to: string;
  label: string;
  icon: string;
  /** Áreas ainda não construídas aparecem desativadas, nunca como link quebrado. */
  status?: 'ready' | 'soon';
  /** Se true, só aparece na versão Completa. */
  completeOnly?: boolean;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  format: string;
  /** Caminho do arquivo. Vazio = ainda não disponibilizado. */
  file: string;
  completeOnly?: boolean;
}

/* ---------------------------------------------------------------------------
   Laboratório de IA
   --------------------------------------------------------------------------- */

export type PromptCategory =
  | 'UGC'
  | 'Avatar'
  | 'Demonstração'
  | 'Gancho'
  | 'Estilo POV';

/**
 * Tipo de ferramenta onde o prompt é colado. Descreve a CATEGORIA da
 * ferramenta, nunca um produto específico: nome, preço e recurso de serviço de
 * IA mudam sozinhos, e a plataforma não afirma nada sobre eles.
 */
export type PromptTool =
  | 'vídeo por texto'
  | 'avatar falante'
  | 'voz sintética'
  | 'imagem'
  | 'texto';

/**
 * Campos da bancada. O corpo do prompt escreve {{produto}}, {{publico}},
 * {{beneficio}} ou {{tom}} e a tela troca pelo que o aluno preencheu.
 */
export type PromptVar = 'produto' | 'publico' | 'beneficio' | 'tom';

/**
 * Formato do que sai quando o prompt é gerado.
 *
 *   texto       → o corpo escrito à mão, com as variáveis da bancada trocadas.
 *   avatar-json → um JSON montado na hora com a ficha do avatar e os campos da
 *                 cena. Ver src/data/avatar.ts.
 */
export type PromptOutput = 'texto' | 'avatar-json' | 'pov' | 'ganchos' | 'demo';

/**
 * A ficha da apresentadora: preenchida uma vez e repetida idêntica em toda
 * cena. É ela que trava a identidade — redescrever com outras palavras na
 * cena seguinte devolve outra pessoa.
 */
export interface AvatarSheet {
  presentation: string;
  skin: string;
  hair: string;
  face: string;
  build: string;
  marks: string;
}

/** O que muda a cada foto. */
export interface AvatarShot {
  scene: string;
  environment: string;
  atmosphere: string;
  pose: string;
  clothing: string;
  lighting: string;
  mood: string;
  framing: string;
}

/**
 * Os ajustes do vídeo POV. Valem para TODAS as cenas: a cena muda a cada
 * prompt, isto continua igual — é o acabamento da sua conta.
 */
export interface PovSettings {
  /** A peça, com as palavras do anúncio: "camiseta oversized preta". */
  item: string;
  place: string;
  light: string;
  camera: string;
  fabric: string;
  extra: string;
}

/**
 * Ficha curta do que vai sair, mostrada acima do prompt gerado.
 *
 * Serve para o aluno saber o que esperar ANTES de colar numa ferramenta de
 * vídeo: formato, duração e para que serve aquele ângulo. Opcional — prompt
 * de texto puro não tem duração nem formato para declarar.
 */
export interface PromptSpec {
  /** "UGC · pessoa + produto" */
  format: string;
  /** "15–25s" */
  duration: string;
  /** O que aquele ângulo tenta provocar. */
  goal: string;
}

export interface AiPrompt {
  id: string;
  /** Número exibido como elemento gráfico (01…). */
  number: string;
  title: string;
  category: PromptCategory;
  tool: PromptTool;
  /** Ausente = texto comum. */
  output?: PromptOutput;
  /** Ficha do resultado. Ausente = o prompt não declara formato nem duração. */
  spec?: PromptSpec;
  /**
   * Ângulo de demonstração (ver `src/data/demo.ts`). Só nos prompts com
   * `output: 'demo'` — é ele que decide qual bloco entra no lugar de
   * [[ANGULO]] no corpo.
   */
  angle?: string;
  /** Para que serve, em uma linha. */
  objective: string;
  /**
   * O corpo do prompt, com as variáveis {{...}} no meio do texto.
   *
   * Isto é material de escrita — um molde de instrução para a ferramenta.
   * REGRA: nenhum prompt daqui pode mandar a IA inventar depoimento, resultado
   * ou número. A regra de conteúdo do produto vale também para o que a IA gera.
   */
  body: string;
  /** O que fazer depois de gerar — edição, corte, checagem. */
  notes: string[];
}

/* ---------------------------------------------------------------------------
   Biblioteca de ganchos
   --------------------------------------------------------------------------- */

/**
 * Os cinco tipos de abertura. É a MESMA taxonomia que o prompt "Dez aberturas
 * para o mesmo produto" usa no Laboratório de IA — de propósito: o aluno
 * aprende uma classificação só e ela vale nas duas telas.
 */
export type HookKind =
  | 'Situação'
  | 'Contraste'
  | 'Detalhe'
  | 'Pergunta'
  | 'Meio da conversa';

export interface Hook {
  id: string;
  /** Numeral exibido (01…50), também serve para o aluno citar "o gancho 23". */
  number: string;
  kind: HookKind;
  /**
   * A primeira frase do vídeo, com no máximo 12 palavras.
   *
   * Os colchetes marcam o que a pessoa troca pelo caso dela — e são mantidos no
   * texto copiado, para ela não colar um vídeo com "[a gaveta]" na fala.
   *
   * Isto é material de escrita, como as frases de exemplo da biblioteca de
   * conteúdo: mostra o TOM, não afirma nada sobre o mundo. Continua proibido
   * gancho com número, resultado, prazo ou opinião de terceiro inventados.
   */
  text: string;
}

/**
 * Conteúdo que muda entre as versões do produto.
 * A versão Essencial recebe listas vazias — o material do Completo não é
 * embutido no bundle dela (ver vite.config.ts).
 */
/* ---------------------------------------------------------------------------
   Métricas
   --------------------------------------------------------------------------- */

/**
 * Uma etapa do caminho entre "o vídeo apareceu" e "a pessoa comprou".
 *
 * REGRA DESTA TELA: nenhuma etapa traz número de referência. Não existe "um
 * bom CTR é X%" aqui — esse número muda com nicho, preço e público, e publicar
 * um valor inventado seria o mesmo que inventar depoimento. O que a tela
 * ensina é a LER o próprio funil e a comparar com o próprio vídeo anterior.
 *
 * Pelo mesmo motivo, os textos descrevem o que a PESSOA fez (ficou, tocou,
 * comprou) e o que o aluno pode mudar — nunca o que o aplicativo faz por
 * dentro. Comportamento de algoritmo aqui seria chute com cara de fato.
 */
export interface MetricStage {
  id: string;
  /** Numeral exibido (01…05). */
  number: string;
  name: string;
  /** Como o número costuma aparecer no painel — ajuda a achar, sem prometer. */
  alias: string;
  /** O que ele mede. */
  what: string;
  /** O que costuma estar acontecendo quando é aqui que a coisa trava. */
  whenLow: string;
  /** O que mexer. */
  fixes: string[];
}

/** Sinal que não é etapa do funil, mas diz algo sobre quem assistiu. */
export interface LateralSignal {
  id: string;
  name: string;
  reading: string;
}

/* ---------------------------------------------------------------------------
   Ganchos e copys que vendem
   --------------------------------------------------------------------------- */

/**
 * Uma copy que foi ao ar, com a foto do produto ao lado.
 *
 * Diferente dos Bastidores, aqui não há vídeo nem prompt: o que se estuda é o
 * TEXTO. A imagem serve para o aluno ver de que produto se está falando —
 * copy lida fora do contexto do produto não ensina nada.
 */
export interface CopyItem {
  id: string;
  /** Numeral exibido (01…). */
  number: string;
  /** O produto de que a copy fala. */
  product: string;
  /** Categoria do produto, para orientar quem procura algo parecido. */
  category: string;
  /**
   * A foto. Aceita nome de arquivo em public/copys/ ou URL completa.
   * Vazio mostra o espaço reservado, nunca imagem quebrada.
   */
  image: string;
  /** A copy, do jeito que foi falada. */
  copy: string;
  /** O que faz esta copy funcionar — a parte que transforma exemplo em método. */
  notes: string[];
  /** true = estrutura de exemplo, ainda não é material real. */
  draft?: boolean;
}

/* ---------------------------------------------------------------------------
   Ferramentas — validador de produtos
   --------------------------------------------------------------------------- */

export type PillarId = 'dor' | 'demonstracao' | 'interesse' | 'prova' | 'roteiro';

/** Nota de um pilar. Cinco pilares × 2 = 10 no total. */
export type PillarScore = 0 | 1 | 2;

export interface ScorePillar {
  id: PillarId;
  name: string;
  question: string;
  /**
   * O que cada nota significa — o índice do array É a nota.
   *
   * Existe para a ferramenta ENSINAR enquanto o aluno preenche. Sem isso, dar
   * nota de 0 a 2 vira chute com cara de método.
   */
  levels: [string, string, string];
}

/** Um produto candidato salvo pelo aluno. Mora no navegador dele, não aqui. */
export interface ProductCandidate {
  id: string;
  name: string;
  /** Link do marketplace ou da ferramenta de pesquisa. Pode ficar vazio. */
  link: string;
  category: string;
  scores: Record<PillarId, PillarScore>;
  createdAt: number;
}

/* ---------------------------------------------------------------------------
   Ferramentas — painel de consistência
   --------------------------------------------------------------------------- */

/**
 * Uma postagem registrada pelo aluno.
 *
 * `product` guarda o NOME do produto, não o id do candidato da central de
 * mineração. É de propósito: apagar um produto de lá não pode apagar o
 * histórico do que já foi publicado.
 */
export interface VideoPost {
  id: string;
  /** Dia da postagem em "AAAA-MM-DD". O dia é a unidade; hora não interessa. */
  date: string;
  product: string;
  /** Formato usado — um dos valores de `postHooks`. */
  hook: string;
  link: string;
  /** `null` = ainda não conferiu. Zero e "não sei" não são a mesma coisa. */
  views: number | null;
  sales: number | null;
  createdAt: number;
}

/* ---------------------------------------------------------------------------
   Bastidores
   --------------------------------------------------------------------------- */

/**
 * Um vídeo publicado e o prompt que o gerou.
 *
 * REGRA DE CONTEÚDO, e ela é rígida aqui: este material NÃO carrega número de
 * faturamento. Não existe campo para "quanto vendeu" de propósito — a
 * plataforma não pode afirmar resultado que ela não consegue comprovar, e é a
 * mesma regra que vale para depoimento e notícia no resto do produto.
 *
 * O que dá valor a este bloco é ser material REAL de trabalho: o vídeo que foi
 * ao ar e o prompt exato que o produziu. Isso já é raro sem prometer nada.
 */
export interface VaultItem {
  id: string;
  /** Numeral exibido (01…). */
  number: string;
  title: string;
  /**
   * O vídeo. Aceita duas formas:
   *   · nome de arquivo em public/bastidores/ (ex.: 'video-01.mp4');
   *   · URL completa, começando com http.
   *
   * Vazio enquanto não houver vídeo — o card mostra o espaço reservado, nunca
   * um player quebrado.
   */
  video: string;
  /** Miniatura opcional, mesma pasta. Sem ela o player abre no primeiro quadro. */
  poster?: string;
  /** Formato do vídeo, com o vocabulário da biblioteca de conteúdo. */
  category: string;
  /** Categoria da ferramenta que gerou, como no Laboratório de IA. */
  tool: PromptTool;
  /**
   * Os prompts usados, em ordem, cada um com o seu rótulo.
   *
   * É uma LISTA porque quase nenhum vídeo sai de um prompt só: costuma ser um
   * para gerar a imagem e outro para animar. Mostrar os dois separados é o que
   * torna o material refazível — um bloco único esconde onde termina uma etapa
   * e começa a outra.
   */
  prompts: {
    label: string;
    text: string;
    /** Onde a ferramenta fica. Vira link no rótulo — o aluno não precisa procurar. */
    link?: string;
  }[];
  /**
   * O nome do produto como aparece na sacolinha laranja do vídeo.
   *
   * Vazio = a sacolinha não é desenhada. Vídeo sem produto vinculado não deve
   * mostrar a sacolinha: seria dizer que dá para comprar ali quando não dá.
   */
  shop?: string;
  /** A legenda da publicação, como foi ao ar. Aparece sobre o vídeo. */
  caption?: string;
  /**
   * Os números da publicação, se você quiser mostrá-los.
   *
   * São TEXTO de propósito, para você colar exatamente o que o painel mostra
   * ("12,4 mil"), sem a tela reformatar nada. Campo vazio some da barra em vez
   * de virar zero — e nenhum deles é preenchido por padrão: número aqui só
   * entra se for o seu, real.
   */
  stats?: {
    likes?: string;
    comments?: string;
    saves?: string;
    shares?: string;
    /** Coração cheio e vermelho. É estado da interface, não métrica. */
    liked?: boolean;
  };
  /**
   * Aviso de que o vídeo foi gerado por IA. Aparece em destaque no card.
   *
   * Não é opcional por educação: publicar material gerado sem dizer que é
   * gerado é o tipo de coisa que derruba conta e reputação. Se a plataforma
   * ensina a marcar o vídeo no TikTok, ela marca o dela aqui.
   */
  aiGenerated?: boolean;
  /**
   * O passo a passo de como este vídeo foi feito. É o "o que você poderia
   * fazer" — a parte que transforma um exemplo em instrução.
   */
  steps?: string[];
  /** O que é dito no vídeo, com a marcação de tempo. É a copy de vendas. */
  transcript?: { time: string; text: string }[];
  /** O que reparar neste vídeo — decisões de edição, corte, ritmo. */
  notes: string[];
  /**
   * true = estrutura de exemplo, ainda não é material real.
   *
   * Aparece etiquetado na tela. Existe para o layout poder ser avaliado antes
   * de os vídeos subirem, sem que ninguém confunda rascunho com entrega.
   */
  draft?: boolean;
}

export interface PlanContent {
  plan: ProductPlan;
  /** Prompts do Laboratório de IA. Lista vazia na versão Essencial. */
  prompts: AiPrompt[];
  /**
   * Ganchos EXCLUSIVOS da versão Completa. Somam-se aos 20 da biblioteca base
   * (src/data/hooks.ts), que está nas duas versões: 20 no Essencial, 50 no
   * Completo.
   */
  extraHooks: Hook[];
  /**
   * Estruturas de roteiro EXCLUSIVAS da versão Completa. Somam-se às da
   * biblioteca base (src/data/contentLibrary.ts), que está nas duas versões.
   */
  contentLibrary: ContentFormat[];
}
