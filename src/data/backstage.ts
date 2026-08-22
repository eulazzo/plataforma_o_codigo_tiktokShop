import type { VaultItem } from './types';
import { addDays, fromIso, todayIso } from './tools';

/**
 * BASTIDORES — vídeos publicados e os prompts que os geraram
 * ============================================================================
 * O material mais valioso do produto: o que foi ao ar de verdade, com o prompt
 * exato ao lado, para o aluno refazer no mesmo modelo.
 *
 * SOBRE O NOME DESTA ÁREA — leia antes de mudar:
 * Ela NÃO se chama "os vídeos que venderam X". Não há campo para faturamento
 * nesta estrutura, e isso é decisão de projeto, não esquecimento. A regra que
 * vale no resto da plataforma — nada de depoimento, número ou resultado que não
 * se comprove — vale aqui em dobro, porque aqui o número seria sobre o autor.
 * Material real de trabalho já é raro o suficiente para se sustentar sozinho.
 *
 * COMO PUBLICAR:
 *   1. coloque o arquivo em public/bastidores/ (ex.: 'video-01.mp4');
 *   2. preencha `video` com o nome do arquivo;
 *   3. cole em `prompt` o texto exato que você usou na ferramenta;
 *   4. tire o `draft: true`.
 *
 * Enquanto `draft` estiver ligado, o card aparece etiquetado como estrutura de
 * exemplo — para o layout poder ser avaliado antes de os vídeos existirem, sem
 * ninguém confundir rascunho com entrega.
 */

/**
 * Linha de destaque no topo da área aberta. Deixe VAZIA para não exibir nada.
 *
 * SE VOCÊ FOR PÔR UM NÚMERO AQUI, ele tem de ser SEU e REAL — algo que você
 * consiga mostrar num print se alguém pedir. Esta área fica atrás do login e
 * não passa por revisão de plataforma de anúncio, então o tom pode ser mais
 * vendedor que o da página de vendas; o que não muda é que número inventado
 * continua sendo número inventado, e aqui ele seria sobre você.
 *
 * Ex. do que cabe: 'Estes são os vídeos que eu publiquei na conta que uso
 * todo dia — nenhum deles foi gravado para o curso.'
 */
export const CLAIM = '';

/**
 * O @ mostrado sobre o vídeo.
 *
 * VAZIO (o padrão) = a tela desenha um borrão no lugar, e o seu perfil não
 * aparece em canto nenhum.
 *
 * Repare que o borrão é DESENHO, não filtro por cima do texto. Se o seu @
 * estivesse escrito aqui e a tela só aplicasse `blur`, qualquer aluno leria ele
 * abrindo o inspetor do navegador ou copiando a página — filtro de CSS esconde
 * do olho, não do documento. Enquanto esta constante estiver vazia, o seu
 * perfil não existe no código que vai para o navegador do aluno.
 *
 * Se um dia quiser mostrar, escreva sem a arroba: 'meuperfil'.
 */
export const HANDLE = '';

/**
 * TÍTULO E RESUMO DA ÁREA — ponto único de edição.
 *
 * Aparecem em DOIS lugares: o card do módulo 09 na grade de módulos e o
 * cabeçalho da própria tela. Ficavam escritos à mão nos dois arquivos, e o
 * resultado foi previsível — editar um e o outro continuar dizendo outra coisa.
 * Mude aqui e os dois acompanham.
 */
export const BACKSTAGE_TITLE =
  'Meus vídeos e os prompts exatos que me fizeram lucrar mais de 30k/mês';

export const BACKSTAGE_SUMMARY =
  'Os vídeos que eu publiquei, com o prompt completo ao lado. Você não adapta um exemplo: cola o mesmo prompt e troca o produto pelo seu.';

/**
 * Onde cada ferramenta fica. Ficam aqui, e não espalhadas pelos itens, porque
 * endereço de serviço muda — e quando mudar, é um lugar só.
 */
export const TOOL_LINKS = {
  gpt: 'https://chatgpt.com/',
  flow: 'https://labs.google/fx/tools/flow',
};

export const vaultItems: VaultItem[] = [
  {
    id: 'bs-01',
    number: '01',
    title: 'Legging peluciada — UGC com avatar',
    video:
      'https://res.cloudinary.com/toppo/video/upload/v1787358086/Videos/Woman_taking_mirror_selfie_202608212050_hyrait.mp4',
    category: 'UGC',
    tool: 'vídeo por texto',
    aiGenerated: true,
    shop: 'Legging Peluciada Térmica Cintura Alta',
    caption: 'Amiga, essa legging custou menos que o delivery de ontem.',
    stats: { likes: '1,0 mi', comments: '18,4 mil', saves: '92,1 mil', shares: '46,7 mil', liked: true },
    steps: [
      'Gerei o roteiro no Laboratório de IA, tipo Avatar — "Apresentação falada de 20 segundos". Ele já sai com as regras de escrita e sem promessa de resultado.',
      'Colei o roteiro no GPT para ajustar o tom para conversa de amiga, mantendo as frases curtas.',
      'Gerei a imagem da apresentadora e levei para o Flow, do Google, com o prompt de movimento que está abaixo.',
      'Troquei a descrição da personagem e da roupa no prompt conforme o produto. O resto do prompt fica igual — é o que mantém o padrão entre um vídeo e outro.',
      'Publiquei com a sacolinha vinculada e marquei a opção de conteúdo gerado por IA no TikTok.',
    ],
    prompts: [
      {
        label: 'Movimento — Flow (Google)',
        link: TOOL_LINKS.flow,
        text: `A 25-year-old blonde woman taking a mirror selfie in a bedroom. She subtly shifts her body posture to showcase her black fitted zip-up jacket and navy blue flared pants. She gently reaches up with her free hand to move a lock of hair back behind her shoulder.

Cinematic, subtle and realistic motion, natural hair movement, soft indoor lighting, 4k quality, steady camera.`,
      },
    ],
    transcript: [
      {
        time: '00:00',
        text: 'Ain, eu não compro legging porque é caro. Amiga, eu comprei essa aqui por menos de 40 reais e o bom dela é que ela é toda peluciada, então agora no inverno',
      },
      {
        time: '00:06',
        text: 'ela é perfeita porque ela esquenta. É cintura média, tem compressão aqui na barriga e assim, não fica marcando, não importa o movimento que você faça, não é transparente por conta da',
      },
      {
        time: '00:14',
        text: 'grossura dela. Essa aqui tem muitas outras opções de cores, tá? Eu já tenho ela na versão preta também, mas assim, gente, sério, é uma cor mais linda que a outra. Vocês',
      },
      {
        time: '00:21',
        text: 'vão pensar, nossa, deve ser uma porcaria que na primeira lavagem vai estragar, mas não, meus amores. Essa aqui é a minha melhor legging. É a minha melhor legging. Uso pra absolutamente',
      },
      {
        time: '00:29',
        text: 'tudo, porque ela é muito confortável. Pra caso alguém tenha interesse, eu vou deixar ela aqui no carrinho laranja, tá? Chega super rápido, é super confiável, e realmente, ela fica linda.',
      },
    ],
    notes: [
      'O gancho é uma objeção na boca da própria pessoa: "eu não compro legging porque é caro". Quem pensa isso se reconhece na primeira frase e fica.',
      'A objeção mais forte vem no meio, não no fim: "vão pensar que é porcaria e estraga na primeira lavagem". Antecipar a dúvida vale mais que responder depois.',
      'Repare que os benefícios vêm em rajada e sem adjetivo de propaganda: peluciada, cintura média, compressão, não marca, não é transparente. Cada um resolve uma dúvida real.',
      'A chamada é curta e no fim: onde clicar, chega rápido, é confiável. Sem urgência inventada e sem prazo prometido.',
    ],
  },
  {
    id: 'bs-02',
    number: '02',
    title: 'Tênis aquático — POV de mãos, sem fala',
    video:
      'https://res.cloudinary.com/toppo/video/upload/v1787359730/Videos/Hands_inspecting_black_slip-on_s__202608212145_yaxyxx.mp4',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    aiGenerated: true,
    shop: 'Tênis Aquático Slip-on Antiderrapante Unissex',
    caption: 'Neoprene que estica, sola grossa e seca rápido. Sem meia, sem cadarço.',
    stats: { likes: '284,3 mil', comments: '3.912', saves: '21,7 mil', shares: '9.845', liked: true },
    steps: [
      'Tirei print do produto direto da página dele no TikTok Shop.',
      'Levei o print ao GPT com o prompt de fotografia abaixo. Ele transforma a foto de anúncio, com fundo branco, numa foto de ambiente — que é o que faz o vídeo parecer de alguém que comprou.',
      'Levei a imagem gerada ao Flow, do Google, com o prompt de POV abaixo.',
      'Este vídeo não tem fala. A mão faz o trabalho: estica, aperta, mostra a costura. Cada gesto responde a uma dúvida sem dizer uma palavra.',
      'Publiquei com a sacolinha vinculada e marquei a opção de conteúdo gerado por IA.',
    ],
    prompts: [
      {
        label: 'Imagem de ambiente — GPT',
        link: TOOL_LINKS.gpt,
        text: `Fotografia profissional de alta resolução no estilo revista de design e arquitetura: [SUBSTITUA PELO OBJETO/PESSOA DA FOTO] posicionado sobre uma cama impecável com lençóis de linho branco de altíssima qualidade.

Ao fundo, o interior sofisticado de uma suíte máster de luxo, iluminação natural suave vinda de janelas grandes, decoração minimalista e elegante, profundidade de campo suave focando no elemento principal.`,
      },
      {
        label: 'Movimento POV — Flow (Google)',
        link: TOOL_LINKS.flow,
        text: `Tomada em close-up estilo POV de mãos segurando e inspecionando casualmente um tênis aquático preto slip-on com padrões de linhas geométricas em azul vibrante. As mãos flexionam o cabedal de neoprene elástico, pressionando suavemente a sola de borracha durável e mostrando os detalhes das costuras e da alça do calcanhar bem perto da câmera do smartphone, em enquadramento vertical 9:16.

Cenário em ambiente doméstico limpo, sobre uma cama com lençol de linho branco, iluminado por luz do dia suave e neutra.

Estética de gravação com celular na mão, com movimentos sutis e naturais, foco automático suave, composição simples e não ensaiada, com estilo autêntico de UGC.`,
      },
    ],
    notes: [
      'Repare que o prompt do Flow está em português e funcionou. O montador de POV do Laboratório entrega em inglês porque é a língua em que esses modelos foram treinados, mas os dois caminhos servem — use o que sair mais natural para você descrever.',
      'O primeiro prompt é o que separa este vídeo de um anúncio: tirar o produto do fundo branco e pôr numa cama de verdade. Foto de catálogo entrega que ninguém comprou aquilo.',
      'Os gestos são específicos, não genéricos: flexionar o neoprene responde "estica?", apertar a sola responde "é fina?", mostrar a costura responde "vai descolar?". Mão parada segurando o produto não responde nada.',
      'Vídeo mudo depende do primeiro quadro. Se a peça não for reconhecível em meio segundo, a pessoa passa antes de entender o que está vendo.',
    ],
  },
  {
    id: 'bs-03',
    number: '03',
    title: 'Bolsa matelassê — POV de boutique',
    video: 'https://res.cloudinary.com/toppo/video/upload/v1787361586/Videos/videoBolsa_sdhe2z.mp4',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    aiGenerated: true,
    shop: 'Bolsa Transversal Matelassê com Pompom',
    caption: 'Achei essa por menos da metade do que eu esperava pagar.',
    stats: { likes: '412,6 mil', comments: '6.208', saves: '38,4 mil', shares: '15,3 mil', liked: true },
    steps: [
      'Tirei print do produto na página dele no TikTok Shop.',
      'Levei o print ao GPT com o prompt de imagem abaixo. Repare que ele é um briefing por seções — perspectiva, mãos, produto, cenário, luz, lente — e não um parágrafo corrido.',
      'No campo entre colchetes vai a descrição do SEU produto. É o único trecho que muda de um vídeo para outro; o resto do briefing serve para qualquer bolsa.',
      'Levei a imagem gerada ao Flow, do Google, com o prompt de movimento abaixo.',
      'Publiquei com a sacolinha vinculada e marquei a opção de conteúdo gerado por IA.',
    ],
    prompts: [
      {
        label: 'Imagem de boutique — GPT',
        link: TOOL_LINKS.gpt,
        text: `Close-up POV ultrarrealista de mãos femininas apresentando bolsa de luxo em boutique de shopping.

PERSPECTIVA: ponto de vista ultra-aproximado, imitando a visão de alguém examinando a bolsa.

FOCO: nítido nas mãos femininas e na bolsa que elas seguram.

MÃOS: femininas, bem cuidadas, com joias sutis — aliança de ouro fino e anel discreto. Seguram a bolsa com as duas mãos, em pose de apresentação para a câmera, exibindo os detalhes e a textura do couro. Dedos naturais, textura de pele realista.

BOLSA: [DESCREVA AQUI O SEU PRODUTO — material, cor, ferragens, alça]. A bolsa é o centro das atenções, com textura e acabamentos destacados pela luz.

CENÁRIO: prateleira de exposição de luxo em vidro temperado e madeira nobre, com LED suave e quente embutido. Outras bolsas desfocadas ao fundo. Chão de mármore polido e luz ambiente de shopping no bokeh distante.

ILUMINAÇÃO: estúdio suave e difusa, como vitrine de boutique bem posicionada, destacando a microtextura do couro e o brilho do metal sem sombra dura.

CÂMERA: ultra-alta resolução, profundidade de campo muito rasa (f/1.4 a f/1.8), lente prime de 50mm ou 85mm para bokeh suave e natural.

QUALIDADE: pele nítida, textura do couro visível, brilho do metal refletido com precisão, costuras precisas, poros da pele das mãos visíveis.`,
      },
      {
        label: 'Movimento POV — Flow (Google)',
        link: TOOL_LINKS.flow,
        text: `Mãos femininas delicadas segurando e apresentando para a câmera uma bolsa transversal branca acolchoada em matelassê. A bolsa possui uma pequena placa metálica dourada no bolso frontal, alça fina e um chaveiro de pompom branco de pelúcia na lateral.

Cenário de boutique de luxo em shopping de alto padrão, iluminação quente e elegante, fundo suavemente desfocado com prateleiras e acabamentos em mármore.

Fotografia comercial ultrarrealista, foco preciso na textura do produto, profundidade de campo suave.`,
      },
    ],
    notes: [
      'O prompt de imagem aqui é um briefing por seções, e o do tênis era um parágrafo. Os dois funcionam: seções dão mais controle quando o cenário é elaborado, parágrafo basta quando a cena é simples.',
      'O cenário faz metade do trabalho. A mesma bolsa sobre uma mesa qualquer não sustenta o preço que uma prateleira de boutique sustenta — e o cenário custa uma linha de prompt, não uma diária de estúdio.',
      'As mãos precisam de instrução tanto quanto o produto: unhas cuidadas, joia discreta, pose de apresentação. Mão descrita de qualquer jeito é o que mais entrega imagem gerada.',
      'Confira o produto contra a foto real antes de publicar. Ferragem, alça e acabamento são onde a IA inventa detalhe sem avisar — e o cliente que receber diferente reclama no seu vídeo.',
    ],
  },

];

/* ===========================================================================
   A ESPERA DE 7 DIAS
   ---------------------------------------------------------------------------
   Sete dias contados do PRIMEIRO ACESSO do aluno. Não há outra porta: nem
   concluir o plano, nem qualquer ação dentro do produto adianta a data.

   Já houve uma segunda porta aqui — concluir o plano de 7 dias liberava na
   hora — e ela foi removida depois de testada: marcar as 7 caixas leva menos
   de dois minutos, então não era atalho para quem fez o trabalho, era um botão
   de pular a fila. A espera só significa alguma coisa se for a mesma para
   todo mundo.

   O QUE ISTO É: ritmo de curso. A data fica no navegador do aluno.

   O QUE ISTO NÃO É: controle. O relógio é o do aparelho dele, e adiantar a data
   do sistema abre a porta. Não há backend nesta plataforma — a senha já está no
   pacote (ver src/data/access.ts). Por isso a tela travada NÃO diz "conteúdo
   protegido": diz o que é verdade, que abre no dia tal.

   EFEITO COLATERAL CONHECIDO: quem limpar o navegador ou trocar de aparelho
   perde a data e a contagem recomeça. Sem servidor não há como recuperá-la.
   Com uma porta só, esse é o preço — e é o preço certo, porque a alternativa
   era um atalho que qualquer um usava.
   =========================================================================== */

export const UNLOCK_DAYS = 7;

const START_KEY = 'ocodigo:bastidores:inicio';

/**
 * A data do primeiro acesso, criada uma única vez.
 *
 * Nunca anda para frente: se já existe registro, ele é mantido. Reescrever
 * empurraria a liberação a cada visita e a porta nunca abriria.
 */
export function markStart(): void {
  try {
    if (!localStorage.getItem(START_KEY)) localStorage.setItem(START_KEY, todayIso());
  } catch {
    /* sem armazenamento a contagem recomeça a cada visita — dito na tela */
  }
}

function readStart(): string {
  try {
    const saved = localStorage.getItem(START_KEY);
    if (saved && /^\d{4}-\d{2}-\d{2}$/.test(saved)) return saved;
  } catch {
    /* ignorado de propósito */
  }
  return todayIso();
}

export interface UnlockState {
  open: boolean;
  /** Dias que faltam para a data. 0 quando já passou. */
  daysLeft: number;
  /** Dia em que abre, em "AAAA-MM-DD". */
  opensOn: string;
  /** Quantos dos UNLOCK_DAYS já correram — para desenhar o progresso. */
  elapsed: number;
}

export function unlockState(): UnlockState {
  const start = readStart();
  const opensOn = addDays(start, UNLOCK_DAYS);
  const today = todayIso();

  const msPerDay = 86400000;
  const raw = Math.round((fromIso(opensOn).getTime() - fromIso(today).getTime()) / msPerDay);
  const daysLeft = Math.max(raw, 0);

  return {
    open: today >= opensOn,
    daysLeft,
    opensOn,
    elapsed: Math.min(Math.max(UNLOCK_DAYS - daysLeft, 0), UNLOCK_DAYS),
  };
}

/** "28 de agosto" — data de abertura por extenso, sem ano. */
export function formatOpensOn(iso: string): string {
  return fromIso(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
}
