import type { Module } from './types';

/**
 * OS 8 MÓDULOS
 * ----------------------------------------------------------------------------
 * COMO ESCREVER O CONTEÚDO:
 * Cada módulo tem uma lista de "blocks". Troque os blocos { kind: 'placeholder' }
 * por blocos reais conforme for escrevendo:
 *
 *   { kind: 'text',    id: 'x', title: 'Título', body: ['parágrafo', 'parágrafo'] }
 *   { kind: 'list',    id: 'x', title: 'Título', items: ['item', 'item'] }
 *   { kind: 'callout', id: 'x', title: 'Atenção', body: 'texto', tone: 'warn' }
 *
 * O índice lateral ("Nesta aula") é montado automaticamente a partir dos
 * títulos dos blocos — não precisa manter uma lista separada.
 *
 * Os blocos 'placeholder' aparecem na tela como espaço reservado, deixando
 * explícito que o conteúdo ainda não foi escrito. Nunca preencha com texto
 * genérico só para "ficar cheio".
 */
/*
 * NÚMEROS E REGRAS DE PLATAFORMA — LISTA DE CONFERÊNCIA
 * ============================================================================
 * O conteúdo dos módulos 01 a 06 é o material do autor, publicado como ele
 * escreveu. Vários pontos dependem de regra de plataforma, preço de terceiro
 * ou resultado de terceiro — coisas que mudam sozinhas e que a plataforma não
 * tem como verificar. Confira antes de cada republicação:
 *
 * MÓDULO 01  comissão de 1% a 25%; 32% a 35% em parceria; a marca citada
 *            nominalmente; saque semanal às quartas; até 35% na comparação
 * MÓDULO 02  18 anos e 2.000 seguidores (1.000 em contas selecionadas);
 *            publicação nos últimos 30 dias; R$ 200 a R$ 260 por conta pronta;
 *            5 contas por CPF; caminho do menu; 21 dias para destravar conta
 * MÓDULO 03  mensalidades (R$ 2.200, R$ 49, $29–$59); faturamentos citados
 *            (R$ 1,17 mi, R$ 1,8 mi, R$ 50 mil); comissão de R$ 44 a R$ 55;
 *            preços de exemplo (R$ 17, R$ 33, R$ 89); nota mínima 4,8;
 *            teto de R$ 100; 10 a 15 ganchos antes de trocar
 * MÓDULO 04  GMV de R$ 14.000 a R$ 150.000; ancoragem de R$ 270 x R$ 89;
 *            exigência de marcar conteúdo de IA; cortes de 2 a 5 segundos
 * MÓDULO 05  escrito a partir do roteiro de tópicos do autor, não de rascunho
 *            pronto — a voz pode não estar exatamente na dele. O corte de três
 *            vídeos por formato espelha MIN_SAMPLE em src/data/tools.ts.
 * MÓDULO 06  funil de R$ 500 mil (10 mi / 400 mil / 16 mil); cortes de 200 e
 *            500 views; 400 visualizações; saque na quarta (repete o 01)
 * MÓDULO 07  aquecimento de 2 a 3 dias; 2.000 seguidores (repete o 02);
 *            2 a 3 publicações diárias; obrigatoriedade de marcar IA;
 *            punição por acúmulo de avisos
 * MÓDULO 08  10 a 15 variações por produto (repete o 03); 21 dias para conta
 *            parada (repete o 02). Os SETE DIAS não estão neste arquivo:
 *            moram em src/data/sevenDayPlan.ts, que também tem números a
 *            conferir (2.000 seguidores, 100 views na foto de aquecimento,
 *            janela de 6 a 12 horas entre publicações).
 *
 * Uma afirmação aparece em mais de um módulo às vezes (o saque semanal está no
 * 01, no 02 e no 06). Se corrigir uma, procure as outras.
 */
export const modules: Module[] = [
  {
    id: 'entenda-o-modelo',
    number: '01',
    title: 'Entenda o modelo',
    summary: 'Como funciona o TikTok Shop e onde entram criadores e afiliados dentro dessa engrenagem.',
    /* ~1.300 palavras: sete minutos a um ritmo de leitura comum */
    duration: '7 min',
    cover: 'modulo-01.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm1s1',
        number: '01',
        title: 'Como funciona o TikTok Shop',
        body: 'Antes de escolher produto ou gravar qualquer coisa, é preciso entender por que uma venda acontece aqui de um jeito diferente do resto da internet.',
      },
      {
        kind: 'text',
        id: 'm1s1b1',
        title: 'Buscar um produto x encontrar um produto',
        body: [
          'No comércio eletrônico tradicional, o comportamento é ativo: a pessoa abre o site porque já sabe o que quer e digita o nome do produto. A compra começa por uma intenção que já existia antes.',
          'No TikTok o processo é passivo e nasce de descoberta. A pessoa abriu o aplicativo para se distrair e encontrou o produto no meio do que estava assistindo. Ela não planejava comprar nada.',
          'É por isso que os vídeos que mais vendem não têm cara de comercial. O que funciona é a demonstração ou o relato que cria a vontade na hora — mais perto de uma recomendação de amiga do que de um anúncio.',
        ],
      },
      {
        kind: 'cards',
        id: 'm1s1b2',
        title: 'Onde a loja vive dentro do aplicativo',
        intro: 'O TikTok Shop é nativo: a pessoa compra sem sair do aplicativo. A loja aparece em três lugares, e eles não valem a mesma coisa.',
        cards: [
          {
            name: 'Aba Loja',
            role: 'o marketplace',
            text: 'Fica no menu principal do feed, ao lado de "Seguindo" e "Para você". Funciona como uma loja completa, com categorias para navegar. É o lugar de quem já entrou querendo comprar.',
          },
          {
            name: 'Vitrine do perfil',
            role: 'a sua prateleira',
            text: 'A aba com ícone de sacola que aparece no seu perfil depois que você ativa o TikTok Shop. É onde ficam expostos os produtos que você escolheu promover, para quem visita o seu perfil.',
          },
          {
            name: 'Sacolinha laranja',
            role: 'onde a venda acontece',
            text: 'O link preso na parte de baixo do vídeo, ou fixado durante uma transmissão ao vivo. É o ponto mais forte de conversão: a pessoa toca e compra em poucos toques, porque os dados de pagamento e endereço já estão salvos no aplicativo.',
          },
        ],
      },
      {
        kind: 'cards',
        id: 'm1s1b3',
        title: 'Quem é quem nessa engrenagem',
        intro: 'Quatro partes, e cada uma responde por uma coisa. Saber o que é seu e o que não é evita cobrar de si mesmo o que nunca esteve no seu controle.',
        cards: [
          {
            name: 'A plataforma',
            role: 'TikTok',
            text: 'Fornece a estrutura: processa o pagamento, guarda os dados do cliente, define as regras e distribui o conteúdo pelo algoritmo de recomendação.',
          },
          {
            name: 'O vendedor',
            role: 'a loja',
            text: 'Cadastra o produto, mantém o estoque, embala, envia e responde pelo pós-venda. É ele quem define quanto de comissão vai pagar aos afiliados.',
          },
          {
            name: 'O criador',
            role: 'você',
            text: 'Escolhe produtos, põe na vitrine e produz o conteúdo que leva gente até eles. É o motor de tráfego da engrenagem — e a única parte que trabalha com atenção, não com estoque.',
          },
          {
            name: 'O comprador',
            role: 'quem paga',
            text: 'Estava no feed se distraindo. Foi atraído pelo vídeo e comprou ali mesmo, sem sair do aplicativo e sem ser redirecionado para lugar nenhum.',
          },
        ],
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm1s2',
        number: '02',
        title: 'Como funciona o modelo de afiliados',
        body: 'Você promove o produto de outra pessoa e fica com uma parte de cada venda. O que muda tudo é o que você NÃO precisa fazer.',
      },
      {
        kind: 'text',
        id: 'm1s2b1',
        title: 'O que significa divulgar produto de terceiro',
        body: [
          'Como afiliado, você é um vendedor de atenção. Não desenvolve marca, não formula produto, não compra maquinário, não responde suporte.',
          'A sua função é uma só: levar gente qualificada até o produto, pelos seus vídeos ou pelas suas lives. Se o produto vende por causa do seu conteúdo, você ganha. Se não vende, você perdeu tempo — não perdeu dinheiro.',
          'Essa é a diferença que faz o modelo caber em quem está começando: o risco financeiro de errar um produto é zero.',
        ],
      },
      {
        kind: 'text',
        id: 'm1s2b2',
        title: 'De onde vem a comissão e quem paga',
        body: [
          'A comissão é calculada automaticamente pelo sistema toda vez que uma venda sai pela sua sacolinha. Quem define a porcentagem e quem paga é o próprio vendedor — o valor sai do preço do produto, não do bolso do comprador.',
          'As comissões padrão no TikTok Shop variam de 1% a 25% por venda. Em comunidades exclusivas ou parcerias fechadas com marcas de alta conversão, como a Universe Dreams, criadores parceiros conseguem comissões diferenciadas que chegam a 32% ou 35%.',
          'O valor acumula na carteira do TikTok Studio, e o saque cai na conta bancária cadastrada uma vez por semana, às quartas-feiras.',
        ],
      },
      {
        kind: 'compare',
        id: 'm1s2b3',
        title: 'Afiliado ou vendedor: o que muda de verdade',
        intro: 'Os dois vendem no TikTok Shop. O que separa os dois é o que acontece depois que o pedido entra.',
        columns: [
          {
            label: 'Afiliado',
            note: 'risco baixo, teto na comissão',
            tone: 'accent',
            rows: [
              { label: 'Estoque', value: 'Nenhum. Você não compra produto antes de vender.' },
              { label: 'Logística', value: 'Nenhuma. Embalar, postar e responder é com o vendedor.' },
              { label: 'Ganho', value: 'Comissão por venda, de até 35% nas parcerias.' },
              { label: 'Onde vai o seu tempo', value: 'Roteiro, gancho e volume de publicação.' },
            ],
          },
          {
            label: 'Vendedor',
            note: 'operação física, margem sua',
            tone: 'muted',
            rows: [
              { label: 'Estoque', value: 'Obrigatório. Você compra antes de saber se vende.' },
              { label: 'Logística', value: 'Sua. Embalagem, postagem, atraso, troca e reclamação.' },
              { label: 'Ganho', value: 'Faturamento maior, margem comida por frete, embalagem e imposto.' },
              { label: 'Onde vai o seu tempo', value: 'Gestão, anúncio pago e recrutamento de afiliados.' },
            ],
          },
        ],
      },

      /* ================= SEÇÃO 3 ================= */
      {
        kind: 'heading',
        id: 'm1s3',
        number: '03',
        title: 'O papel do criador',
        body: 'Separar o que está na sua mão do que nunca vai estar é o que decide se você continua publicando no mês dois.',
      },
      {
        kind: 'list',
        id: 'm1s3b1',
        title: 'O que você controla',
        items: [
          'O roteiro. O gancho dos três primeiros segundos, como o produto aparece e quão clara é a instrução no fim.',
          'A escolha do produto. Você decide o que entra na sua vitrine: produto com avaliação alta (a partir de 4,8 estrelas), que resolva uma dor óbvia e que pague uma comissão que faça sentido para o seu tempo.',
          'A constância. O volume de publicação é trabalho, não sorte — de 2 a 3 vídeos por dia mantém a conta ativa e dá material para o algoritmo testar.',
        ],
      },
      {
        kind: 'list',
        id: 'm1s3b2',
        title: 'O que não depende de você',
        items: [
          'Prazo e entrega. Se atrasar, quebrar ou sumir no caminho, quem responde é o vendedor e a plataforma.',
          'Preço e oferta. Desconto que aparece, cupom que some, estoque que acaba — tudo isso é decisão da loja parceira.',
          'Para quem o vídeo é mostrado na primeira hora. Você não escolhe o primeiro público; você influencia o que vem depois, pelo tempo que as pessoas ficam assistindo.',
        ],
      },
      {
        kind: 'text',
        id: 'm1s3b3',
        title: 'Por que o conteúdo é o centro de tudo',
        body: [
          'Aqui o conteúdo é o anúncio. O TikTok não é uma vitrine parada esperando visita: ele distribui o seu vídeo com base no tempo que as pessoas passam assistindo.',
          'Quando um vídeo segura a atenção — retenção acima de dez segundos — e gera toque na sacolinha, ele passa a ser mostrado para mais gente que não te segue. E como a plataforma fica com uma parte de cada venda, distribuir o seu vídeo é do interesse dela.',
          'Tem um segundo efeito que quase ninguém aproveita: um vídeo seu que começa a vender pode ser impulsionado pelo próprio vendedor como anúncio pago. O dinheiro de mídia é dele, as comissões continuam sendo suas. É o único jeito de escalar sem tirar um centavo do próprio bolso.',
        ],
      },
      {
        kind: 'callout',
        id: 'm1s3b4',
        title: 'A barreira de entrada não é dinheiro',
        body: 'É constância. O TikTok trabalha em bola de neve: vídeo que não vendeu nas primeiras 24 horas continua sendo testado e distribuído semanas depois. Trate o perfil como empresa, publique todo dia com os ganchos certos e deixe o tempo trabalhar. Quem desiste na semana dois nunca fica sabendo o que o vídeo da semana um ia fazer.',
      },
      {
        kind: 'quiz',
        id: 'm1s3b5',
        title: 'Três perguntas para fechar',
        intro: 'Responda antes de olhar a explicação. Errar aqui é de graça — e é o único jeito de saber se o modelo ficou claro.',
        questions: [
          {
            id: 'm1q1',
            statement:
              'No TikTok Shop a venda começa por uma intenção que a pessoa já tinha antes de abrir o aplicativo.',
            answer: false,
            explain:
              'Errado. É o contrário do comércio tradicional: a pessoa abriu o aplicativo para se distrair e encontrou o produto no meio do que estava assistindo. Ela não planejava comprar nada — e é por isso que vídeo com cara de comercial não funciona aqui.',
          },
          {
            id: 'm1q2',
            statement:
              'Quem define a porcentagem da comissão e paga por ela é o vendedor, não a plataforma.',
            answer: true,
            explain:
              'Certo. O vendedor define a comissão para atrair afiliados, e o valor sai do preço do produto. A plataforma processa o pagamento e distribui o conteúdo; quem banca a comissão é a loja.',
          },
          {
            id: 'm1q3',
            statement:
              'Como afiliado, você precisa manter estoque do produto que promove.',
            answer: false,
            explain:
              'Errado. Estoque, embalagem, envio e pós-venda são do vendedor. É justamente isso que faz o risco financeiro de errar um produto ser zero — você perde tempo, não dinheiro.',
          },
        ],
      },
    ],
  },
  {
    id: 'prepare-sua-operacao',
    number: '02',
    title: 'Prepare sua operação',
    summary: 'O que você precisa configurar e organizar antes de começar a produzir conteúdo.',
    /* ~1.200 palavras */
    duration: '6 min',
    cover: 'modulo-02.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm2s1',
        number: '01',
        title: 'Requisitos da conta',
        body: 'Antes de qualquer vídeo, a conta precisa estar apta. É aqui que a maior parte das pessoas trava — e quase sempre por detalhe de cadastro, não por falta de seguidor.',
      },
      {
        kind: 'list',
        id: 'm2s1b1',
        title: 'O que a plataforma pede',
        items: [
          'Ter 18 anos ou mais.',
          'Ter pelo menos 2.000 seguidores. O TikTok vem liberando o recurso para contas selecionadas com 1.000, e em algumas atualizações recentes até para contas menores — mas planeje com 2.000 até ver liberado no seu perfil.',
          'Ter publicado nos últimos 30 dias. Conta sem nada recente entra como inativa.',
          'Estar em dia com as diretrizes de comunidade. Perfil com restrição ativa não passa.',
        ],
      },
      {
        kind: 'callout',
        id: 'm2s1b2',
        title: 'O atalho da conta pronta',
        body: 'Caso você não tenha tempo ou prefira não passar pelo processo de crescimento orgânico de seguidores, existe um mercado validado de compra de contas pré-aprovadas com o TikTok Shop já ativo, custando em média de R$ 200 a R$ 260.',
      },
      {
        kind: 'list',
        id: 'm2s1b3',
        title: 'Onde conferir as regras do seu país',
        items: [
          'Abra as configurações do seu perfil e entre em TikTok Studio.',
          'Escolha "TikTok Shop para Criadores".',
          'Ali ficam as diretrizes oficiais, o que ainda falta no seu perfil e o botão de aplicar.',
          'Confira antes de cada tentativa: as regras mudam sem aviso, e o que vale é o que está escrito lá, não o que está escrito aqui.',
        ],
      },
      {
        kind: 'checklist',
        id: 'm2s1b4',
        title: 'O que costuma travar o cadastro',
        intro: 'Três erros respondem pela maioria das reprovações de quem está começando. Marque conforme for conferindo — fica salvo.',
        items: [
          {
            id: 'm2-check-nome',
            label: 'Cadastrei só o primeiro e o último nome',
            note: 'Na etapa do CPF o TikTok pede primeiro e último nome, não o nome completo. Nome completo gera divergência com a Receita e trava o perfil.',
          },
          {
            id: 'm2-check-cpf',
            label: 'Enviei o CPF e a verificação foi aprovada',
            note: 'Seus links de produto não ficam visíveis para os clientes até você enviar e aprovar o seu CPF — nem na vitrine, nem nos vídeos. Dica: você pode cadastrar até 5 contas sob o mesmo CPF.',
          },
          {
            id: 'm2-check-arquivo',
            label: 'Publiquei sobre o produto real antes de arquivar qualquer coisa',
            note: 'Ao usar nichos rápidos de crescimento, como política ou religião, para bater os seguidores: se você arquivar todos os vídeos ANTES de clicar em aplicar no Shop, o cadastro falha. O ideal é postar pelo menos 3 vídeos do produto real antes de arquivar.',
          },
        ],
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm2s2',
        number: '02',
        title: 'Preparando o ambiente de trabalho',
        body: 'A tentação de montar estúdio antes de gravar o primeiro vídeo é grande, e é a forma mais comum de gastar dinheiro sem publicar nada.',
      },
      {
        kind: 'list',
        id: 'm2s2b1',
        title: 'O mínimo para gravar e editar',
        items: [
          'O celular que você já tem. Não importa se é antigo ou se não é o modelo do ano — dá para começar e vender com ele.',
          'Um editor gratuito. O CapCut é o padrão do meio: corta os respiros da fala para o vídeo não arrastar, e gera legenda automática já centralizada.',
          'Ritmo de corte. Trocar de plano a cada 2 a 5 segundos mantém a atenção; plano parado por dez segundos perde quem chegou pelo gancho.',
        ],
      },
      {
        kind: 'cards',
        id: 'm2s2b2',
        title: 'Ferramentas para não aparecer no vídeo',
        intro: 'Se você optar por não mostrar o rosto, este é o encadeamento que se usa hoje. Vale conferir preço e disponibilidade antes de assinar: serviço de IA muda de nome e de plano sozinho.',
        cards: [
          {
            name: 'Grok',
            role: 'imagem',
            text: 'Gerar e refinar as imagens da modelo que vai aparecer no lugar do seu rosto.',
          },
          {
            name: 'Minimax',
            role: 'voz',
            text: 'Clonar vozes de figuras públicas ou gerar vozes extremamente humanas e persuasivas a partir de texto. É a etapa que dá naturalidade — voz robótica derruba o vídeo nos primeiros segundos.',
          },
          {
            name: 'Dream Face',
            role: 'sincronia',
            text: 'Casar a voz gerada com o rosto da modelo, para a boca acompanhar a fala.',
          },
          {
            name: 'Google Flow / Veo',
            role: 'movimento',
            text: 'Transformar as imagens paradas em pequenos trechos de vídeo com movimento.',
          },
          {
            name: 'ChatGPT',
            role: 'texto',
            text: 'A versão gratuita já resolve para levantar ideias e escrever os primeiros roteiros. O Laboratório de IA desta plataforma tem os prompts prontos.',
          },
        ],
      },
      {
        kind: 'list',
        id: 'm2s2b3',
        title: 'Organize desde o primeiro dia',
        items: [
          'A colinha ao lado da câmera. Antes de gravar, escreva num papel a dor que o produto resolve, os benefícios, como demonstrar e os dados que você consegue comprovar. Cite só o que dá para provar: registro de órgão regulador e composição são checáveis, e afirmar o que não se sustenta é problema seu, não do vendedor.',
          'Gravação em lote. Como o ritmo pedido é de 2 a 3 publicações por dia, grave muitos vídeos de uma vez e mantenha um estoque de rascunhos salvos no aplicativo. Quem grava no dia da postagem para no primeiro imprevisto.',
          'Um produto por dia. Se você promove vários, concentre cada dia num só. Misturar produtos diferentes no mesmo dia embaralha a leitura do que funcionou e complica a gestão do seu estoque de vídeos.',
        ],
      },
      {
        kind: 'list',
        id: 'm2s2b4',
        title: 'O que não vale a pena comprar agora',
        items: [
          'Estoque. Você é afiliado: quem compra, guarda e envia produto é o vendedor. Comprar produto para gravar transforma um modelo de risco zero num de risco seu.',
          'Iluminação e microfone caros. Janela com luz natural e fala limpa resolvem o começo. Compre equipamento com o lucro das primeiras comissões, não antes delas.',
          'Assinaturas de IA empilhadas. No início, versões gratuitas dão conta. Se for assinar, prefira um plano que cubra várias etapas a pagar quatro mensalidades separadas para gerar um vídeo.',
        ],
      },
      {
        kind: 'callout',
        id: 'm2s2b5',
        title: 'Conta parada pode custar mais que conta nova',
        body: 'Se você tem um perfil antigo sem visualizações, saiba que uma conta parada pode levar semanas de publicação constante até a entrega voltar a subir — na prática, algo perto de 21 dias postando todo dia. Em muitos casos, começar um perfil do zero e aquecê-lo direito chega mais rápido às primeiras vendas do que insistir num que já está frio. Não é regra: é uma conta a fazer antes de escolher onde gastar as próximas três semanas.',
      },
      {
        kind: 'quiz',
        id: 'm2s2b6',
        title: 'Três perguntas para fechar',
        intro: 'As três armadilhas que mais travam quem está começando. Responda antes de olhar a explicação.',
        questions: [
          {
            id: 'm2q1',
            statement:
              'Enquanto o CPF não for aprovado na verificação, os links dos seus produtos ficam invisíveis para os clientes.',
            answer: true,
            explain:
              'Certo. Nem na vitrine, nem nos vídeos. Muita gente adiciona produto, publica e fica esperando venda sem saber que ninguém consegue clicar em nada — é o erro mais silencioso do cadastro.',
          },
          {
            id: 'm2q2',
            statement:
              'Na etapa de verificação de identidade você deve escrever o nome completo, exatamente como está no documento.',
            answer: false,
            explain:
              'Errado. O TikTok pede apenas o primeiro e o último nome. Escrever o nome completo gera divergência com a Receita e trava o cadastro — e o erro não é óbvio quando acontece.',
          },
          {
            id: 'm2q3',
            statement:
              'Se você promove vários produtos, o melhor é publicar sobre todos no mesmo dia para testar mais rápido.',
            answer: false,
            explain:
              'Errado. Um produto por dia. Misturar produtos diferentes no mesmo dia embaralha a leitura do que funcionou e complica a gestão do seu estoque de vídeos — você acaba sem saber qual vídeo puxou qual venda.',
          },
        ],
      },
    ],
  },
  {
    id: 'escolha-produtos-melhores',
    number: '03',
    title: 'Escolha produtos melhores',
    summary: 'Critérios para analisar um produto antes de investir tempo gravando conteúdo sobre ele.',
    /* ~1.400 palavras */
    duration: '7 min',
    cover: 'modulo-03.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm3s1',
        number: '01',
        title: 'Onde procurar produtos',
        body: 'Produto é o que vende; o vídeo é o veículo. Escolher mal aqui faz você gravar trinta vezes uma coisa que não tinha chance.',
      },
      {
        kind: 'cards',
        id: 'm3s1b1',
        title: 'As fontes de busca',
        intro: 'Da grátis à cara. Comece pelas duas primeiras: elas resolvem os primeiros meses sem custo. Confira preço e disponibilidade antes de assinar qualquer uma — mensalidade de ferramenta muda sozinha.',
        cards: [
          {
            name: 'Biblioteca de Anúncios do Facebook',
            role: 'grátis',
            text: 'Quem vende muito no TikTok costuma rodar os mesmos vídeos em tráfego pago no Facebook. Pesquise "TikTok Shop", "achadinho" ou "shop" em todos os anúncios. Serve para ter ideia; não mostra faturamento.',
          },
          {
            name: 'Busca do TikTok + extensão Sort',
            role: 'quase grátis',
            text: 'A busca do TikTok funciona bem. Procure "melhor produto do TikTok Shop" ou "produto hype do TikTok Shop". Com a extensão Sort no Chrome dá para ordenar por visualizações e ver o que o público já está consumindo.',
          },
          {
            name: 'Mercado de produtos do TikTok',
            role: 'nativo e grátis',
            text: 'Na Central do Criador, aba "Mais vendidos". O próprio TikTok revela em tempo real o que está no topo de vendas, como o batedor mixer elétrico de R$ 17. Ali você confere comissão, estoque, avaliações e resgata cupons de desconto.',
          },
          {
            name: 'CaloData',
            role: 'premium',
            text: 'A ferramenta de análise mais avançada do mercado: revela o faturamento (GMV) real oculto de cada produto e quais criativos geraram essas vendas. Dá para ver, por exemplo, que um kit de potes de R$ 33 faturou R$ 1,17 milhão em 30 dias, e uma calça feminina faturou mais de R$ 1,8 milhão. Custo individual alto, cerca de R$ 2.200 por mês, mas costuma ser acessada em ecossistemas integrados como a Talkfy.',
          },
          {
            name: 'Viral',
            role: 'foco em vídeo',
            text: 'Muito usada por criadores, a R$ 49 por mês. Exibe o ranking dos mais vendidos no Brasil e nos EUA — protetor solar, devocionais, mini climatizadores — e entrega a transcrição exata do vídeo campeão e o Insight Viral estruturado: gancho, dor, solução e CTA para você modelar.',
          },
          {
            name: 'Fast Moss',
            role: 'foco em live',
            text: 'Alternativa focada em analisar dados de transmissões ao vivo, com planos pagos que variam de 9 a 9. Útil se a sua estratégia inclui live.',
          },
        ],
      },
      {
        kind: 'list',
        id: 'm3s1b2',
        title: 'O que registrar de cada candidato',
        items: [
          'Nome e nicho. Ex.: multicolágeno, saúde e beleza.',
          'Preço final ao consumidor. Preço baixo derruba a barreira e vende por impulso.',
          'Comissão líquida. O que sobra para você por venda — fuja de comissão de um ou dois reais.',
          'Avaliação do produto. Nota média de quem comprou; mantenha o corte acima de 4,8 estrelas.',
          'Estoque do vendedor. Se o seu vídeo estourar e o estoque zerar, o trabalho inteiro vira clique perdido.',
        ],
      },
      {
        kind: 'callout',
        id: 'm3s1b3',
        title: 'Não confie na memória',
        body: 'Cada candidato que você levantar precisa ir para algum lugar com nota, comissão e avaliação. A Central de mineração desta plataforma faz isso: você cadastra o produto, dá as notas dos cinco pilares e ela ordena os aprovados por cima. Exporta em planilha quando você quiser.',
        link: { to: '/ferramentas/mineracao', label: 'Abrir a Central de mineração' },
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm3s2',
        number: '02',
        title: 'Os critérios de análise',
        body: 'Cinco perguntas, nota de 0 a 2 em cada. É o que separa escolher por método de escolher por vontade.',
      },
      {
        kind: 'pillars',
        id: 'm3s2b1',
        title: 'O Score 10/10',
        intro: 'Cada pilar vale de 0 a 2 pontos. A régua abaixo é o que impede a nota de virar chute — leia o que significa cada número antes de dar o seu.',
      },
      {
        kind: 'list',
        id: 'm3s2b2',
        title: 'Sinais de alerta',
        items: [
          'Preço elevado. O público do TikTok Shop busca produtos práticos e acessíveis, em média até R$ 100. Tentar vender itens de alto valor, como notebooks, cria uma barreira enorme e raramente funciona no orgânico.',
          'Vendedor sem histórico. Se a loja tem duas ou três vendas no total, ela é iniciante e pode falhar na entrega — e quem o cliente vai xingar nos comentários é você.',
          'Comissão baixa para esforço alto. Não vale gastar a sua energia promovendo um produto de R$ 200 que te paga R$ 2 de comissão. Priorize produtos com alta margem, como o colágeno, que chega a pagar de R$ 44 a R$ 55 por venda realizada.',
        ],
      },
      {
        kind: 'text',
        id: 'm3s2b3',
        title: 'Como comparar dois candidatos sem travar',
        body: [
          'Na dúvida entre A e B, o primeiro critério é físico: você tem o produto em casa ou consegue amostra rápido?',
          'Gravar com o produto em mãos — unboxing, closes de textura, demonstração real com as mãos — converte 10x mais do que usar apenas imagens de IA.',
          'Se nenhum estiver em suas mãos, opte pelo que tem a melhor combinação de alta comissão e menor preço final — por exemplo, um suco detox por R$ 89, que vende rápido e garante excelente margem.',
        ],
      },

      /* ================= SEÇÃO 3 ================= */
      {
        kind: 'heading',
        id: 'm3s3',
        number: '03',
        title: 'Como decidir e seguir em frente',
        body: 'A escolha travada custa mais que a escolha errada. Errar um produto custa alguns dias; não escolher custa o mês inteiro.',
      },
      {
        kind: 'text',
        id: 'm3s3b1',
        title: 'Decidir rápido vale mais que decidir perfeito',
        body: [
          'O produto é o que realmente vende, e o vídeo é apenas o veículo de entrega. Meninos de 15 anos faturam alto utilizando vídeos muito simples, porque o produto selecionado já se vende sozinho e tem apelo viral.',
          'Não trave tentando montar o roteiro perfeito para um item que não passou no Score. Escolha um que some oito pontos ou mais e comece a testar hoje.',
          'A leitura dos dados vem da prática. Você vai aprender a reconhecer um produto vencedor mais rápido publicando dez vídeos do que analisando por duas semanas.',
        ],
      },
      {
        kind: 'list',
        id: 'm3s3b2',
        title: 'Quando trocar de produto',
        items: [
          'Quando o estoque zerar. Se o vendedor não repõe, mude o foco no mesmo dia — cada clique que chega e não compra é trabalho perdido.',
          'Quando vários ganchos diferentes falharem. O erro comum é trocar de produto cedo demais: o caminho é testar de 10 a 15 aberturas diferentes para o MESMO produto antes de desistir dele.',
          'Nunca por apego. Produto que não gera toque na sacolinha depois de testes de verdade não é o seu produto, por mais que você goste dele.',
        ],
      },
      {
        kind: 'callout',
        id: 'm3s3b3',
        title: 'O segredo é a Modelagem Viral',
        body: 'Você não precisa reinventar a roda nem criar um roteiro artístico do absoluto zero. Use ferramentas como a Viral para extrair a transcrição exata de um vídeo que faturou R$ 50 mil, mude as palavras para a sua própria identidade, adapte os ganchos e replique. O algoritmo já validou aquela comunicação; você só precisa usá-la a seu favor.',
        link: { to: '/conteudo', label: 'Ver as estruturas de roteiro' },
      },
      {
        kind: 'quiz',
        id: 'm3s3b4',
        title: 'Três perguntas para fechar',
        intro: 'Escolher produto é onde o mês se ganha ou se perde. Responda antes de olhar a explicação.',
        questions: [
          {
            id: 'm3q1',
            statement:
              'Estoque baixo do vendedor é motivo para descartar um produto, mesmo que ele pareça ótimo em tudo o mais.',
            answer: true,
            explain:
              'Certo. Se o seu vídeo estourar e o estoque zerar, todo o trabalho de tráfego vira clique perdido — e o cliente que não conseguiu comprar reclama no seu vídeo, não com o vendedor.',
          },
          {
            id: 'm3q2',
            statement:
              'Gravar com o produto em mãos converte melhor do que usar apenas imagens geradas.',
            answer: true,
            explain:
              'Certo. Unboxing, close de textura, a mão usando de verdade — nada disso se substitui, e é o que faz o vídeo parecer recomendação em vez de anúncio. Na dúvida entre dois produtos, fique com o que você consegue ter em casa.',
          },
          {
            id: 'm3q3',
            statement:
              'Um produto que somou 7 pontos no Score 10/10 já está validado para você investir tempo gravando.',
            answer: false,
            explain:
              'Errado. O corte é 8. Sete pontos quer dizer que algum pilar está fraco — e o pilar fraco vai aparecer no vídeo, não importa quantas vezes você grave. Volte à Central de mineração e olhe qual nota puxou o total para baixo.',
          },
        ],
      },
    ],
  },
  {
    id: 'crie-conteudo-sem-aparecer',
    number: '04',
    title: 'Crie conteúdo sem aparecer',
    summary: 'Estruturas de vídeo que dão conta do recado sem você mostrar o rosto.',
    /* ~1.500 palavras */
    duration: '8 min',
    cover: 'modulo-04.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm4s1',
        number: '01',
        title: 'Os formatos que dispensam o rosto',
        body: 'Não é preciso ser influenciador para vender aqui. Vergonha, privacidade ou vontade de tocar vários perfis ao mesmo tempo — qualquer um dos três é motivo suficiente, e há três formatos validados que resolvem.',
      },
      {
        kind: 'cards',
        id: 'm4s1b1',
        title: 'Os três formatos',
        cards: [
          {
            name: 'Mãos e produto',
            role: 'quando você tem o produto',
            text: 'A câmera foca só nas suas mãos: abrindo o pacote, manuseando, aplicando, preparando. A sua voz narra por cima. É o mais orgânico dos três, porque o espectador sente que está tendo a experiência em primeira pessoa — e isso vira confiança sem você prometer nada.',
          },
          {
            name: 'Tela e narração',
            role: 'quando você ainda não tem',
            text: 'Prints da página do produto, fotos da vitrine, comentários de quem comprou, slides. Funciona para quebrar objeção e mostrar prova social. É o mais rápido de produzir e o de menor conversão dos três — use para testar produto novo, não como formato principal.',
          },
          {
            name: 'Apresentador com IA',
            role: 'quando quer escala',
            text: 'O formato mais escalável de 2026. Uma modelo ultra-realista gerada por IA fala direto com o espectador, sem você ter o produto físico nem gravar um único take. Existem roteiros idênticos criados com IA que geraram de R$ 14.000 a mais de R$ 150.000 em faturamento (GMV) no TikTok Shop.',
          },
        ],
      },
      {
        kind: 'callout',
        id: 'm4s1b2',
        title: 'A regra que derruba mais alcance',
        tone: 'warn',
        body: 'Se você anexou a sacolinha ao vídeo, o produto precisa aparecer de forma nítida em algum trecho. Vídeo com link e só imagens soltas, paisagem ou slide desconexo vira violação de produto e pode custar a conta. Tela estática sem o produto em uso não é formato: é infração.',
      },
      {
        kind: 'cards',
        id: 'm4s1b3',
        title: 'A cadeia de ferramentas do apresentador com IA',
        intro: 'Quatro etapas, uma ferramenta em cada. Confira preço e disponibilidade antes de assinar — e leia o aviso de conformidade no fim do módulo antes de publicar qualquer coisa gerada assim.',
        cards: [
          {
            name: 'Grok',
            role: 'a imagem',
            text: 'Gera a apresentadora em alta definição. Descreva idade aproximada, traço, o produto na mão e o enquadramento — vertical, gravado como se fosse celular.',
          },
          {
            name: 'Minimax',
            role: 'a voz',
            text: 'Gera a locução a partir do texto. Busque uma voz natural, com respiro: voz de locutor derruba o vídeo. Não clone voz de pessoa real sem autorização dela.',
          },
          {
            name: 'Dream Face',
            role: 'a sincronia',
            text: 'Casa a boca da apresentadora com o áudio. É a etapa que separa "parece gente" de "parece boneco".',
          },
          {
            name: 'Google Flow / Veo',
            role: 'o movimento',
            text: 'Transforma a imagem parada em trechos com movimento de corpo e close nas mãos. Um movimento por trecho; dois já entregam que é gerado.',
          },
        ],
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm4s2',
        number: '02',
        title: 'A estrutura de um roteiro de 30 a 45 segundos',
        body: 'Vídeo que vende sem rosto não é improviso com sorte. É uma sequência fixa, e cada trecho tem um trabalho.',
      },
      {
        kind: 'timeline',
        id: 'm4s2b1',
        title: 'Onde vai o tempo',
        intro: 'Repare no tamanho das faixas: o gancho é o menor trecho do vídeo e o que decide todos os outros.',
        steps: [
          {
            range: '0–3s',
            seconds: 3,
            label: 'Gancho',
            purpose: 'Quebrar a rolagem. O produto ou o problema precisa aparecer aqui, não depois da apresentação.',
          },
          {
            range: '3–10s',
            seconds: 7,
            label: 'Contexto e dor',
            purpose: 'Nomear a situação de um jeito que a pessoa se reconheça. É aqui que ela decide se aquilo é sobre ela.',
          },
          {
            range: '10–25s',
            seconds: 15,
            label: 'Demonstração',
            purpose: 'Mostrar o produto resolvendo. É o trecho mais longo, e o único que não dá para fazer com slide.',
          },
          {
            range: '25–35s',
            seconds: 10,
            label: 'Chamada',
            purpose: 'Dizer o que fazer agora, uma vez, com naturalidade. Sem isso, a pessoa gosta do vídeo e vai embora.',
          },
        ],
      },
      {
        kind: 'list',
        id: 'm4s2b2',
        title: 'A abertura: os três primeiros segundos',
        items: [
          'Corte a apresentação. "Oi pessoal, hoje eu vim falar sobre" gasta os dois segundos que você tinha. Comece pelo problema ou pelo produto na tela.',
          'Gancho validado: "Eu comprei isso no TikTok achando que era golpe, e olha o que aconteceu..."',
          'Gancho validado: "Se você sofre com [DOR], pelo amor de Deus, presta atenção aqui..."',
          'Gancho validado: "O TikTok está lotado desse produto, mas ninguém te conta esse detalhe aqui..."',
          'Gancho validado: "Só sofre com [PROBLEMA] quem quer..."',
          'Gancho validado: "Você ia passar, né? Mas ficou! Eu sabia..."',
          'A CTA leve inicial: logo após o gancho, solte a indicação sutil — "Já deixei fixado no carrinho laranja aqui do vídeo para quem quiser garantir antes que acabe..."',
        ],
      },
      {
        kind: 'callout',
        id: 'm4s2b2b',
        title: 'Os ganchos prontos estão em outra tela',
        body: 'A Biblioteca de ganchos tem aberturas prontas para copiar, separadas por tipo, com o que cada tipo faz. Grave o mesmo vídeo com três aberturas diferentes e publique separado: é o teste mais barato que existe.',
        link: { to: '/ganchos', label: 'Abrir a Biblioteca de ganchos' },
      },
      {
        kind: 'list',
        id: 'm4s2b3',
        title: 'A demonstração: mostrar, não anunciar',
        items: [
          'Corte a cada 2 a 5 segundos. Plano parado por dez segundos perde quem chegou pelo gancho.',
          'Resolva uma dor óbvia antes da ficha técnica. Se for um suco detox, mostre o preparo rápido enquanto fala: "Eu me sentia muito inchada, com retenção de líquido e estômago alto. Isso aqui limpou meu organismo em dias."',
          'Âncora de valor, o choque de preço. Mostre que a pessoa está economizando ao comprar agora: "Se você fosse comprar os ingredientes desse colágeno separadamente na farmácia, gastaria mais de R$ 270. Mas esse pote completo 3 em 1 está saindo por apenas R$ 89 aqui no TikTok Shop."',
          'Em saúde e estética, use a técnica de falar sem falar: troque termos agressivos por palavras suaves — "sentir-se mais leve", "eliminar retenção", "pele de milhões".',
        ],
      },
      {
        kind: 'list',
        id: 'm4s2b4',
        title: 'O fechamento: leve para a sacolinha',
        items: [
          'CTA indireta e segura: "Clica nesse carrinho laranja que aparece bem aqui no cantinho esquerdo do seu vídeo, preenche seus dados e aproveita o frete grátis."',
          'Gatilho de escassez temporal: "Lembrando que o estoque do vendedor está acabando e a promoção com desconto relâmpago reseta à meia-noite, então corre."',
          'Microcompromisso: "Garante o seu e depois volta aqui nos comentários para me contar se também amou!"',
        ],
      },
      {
        kind: 'list',
        id: 'm4s2b5',
        title: 'Erros que travam a venda em cada etapa',
        items: [
          'Na abertura: demorar a mostrar o produto ou começar com fala institucional. A retenção cai e o algoritmo para de entregar.',
          'Na demonstração: tom de vendedor de loja forçando a barra. O que funciona é o tom de quem está contando uma coisa para uma amiga.',
          'No fechamento: citar concorrentes externos como Shopee, Amazon ou Mercado Livre. O TikTok possui robôs que identificam essas palavras e derrubam o alcance orgânico do vídeo imediatamente.',
        ],
      },

      /* ================= SEÇÃO 3 ================= */
      {
        kind: 'heading',
        id: 'm4s3',
        number: '03',
        title: 'As regras da plataforma',
        body: 'Conta viva rende todo mês; conta punida não rende nada. Estas três valem mais que qualquer gancho.',
      },
      {
        kind: 'list',
        id: 'm4s3b1',
        title: 'O que respeitar para manter a conta saudável',
        items: [
          'Marque o conteúdo gerado por IA. Ao publicar vídeo feito com avatar ou imagem gerada, use a marcação de conteúdo gerado por IA que o próprio aplicativo oferece. É rápido, e não marcar é o tipo de coisa que cobra caro depois.',
          'O produto tem que aparecer. Se a sacolinha está no vídeo, o produto real precisa estar visível em algum trecho. Link com imagem desconexa é violação.',
          'Em saúde e estética, descreva em vez de prometer. Nada de prazo, de quantidade emagrecida ou de antes e depois montado. Fale do que a pessoa sente e de como o produto se usa — é o que passa e é o que é verdade.',
        ],
      },
      {
        kind: 'callout',
        id: 'm4s3b2',
        title: 'Muitas visualizações e nenhum clique quer dizer uma coisa só',
        body: 'Se o vídeo tem visualização e não tem toque na sacolinha, o seu gancho funcionou e a sua demonstração não. O problema não está nos três primeiros segundos — está no meio e no fim. A tela de Métricas mostra em qual etapa você perde as pessoas, com os seus próprios números.',
        link: { to: '/metricas', label: 'Abrir Métricas' },
      },
      {
        kind: 'quiz',
        id: 'm4s3b3',
        title: 'Três perguntas para fechar',
        intro: 'Sobre formato, ritmo e o que os números querem dizer. Responda antes de olhar a explicação.',
        questions: [
          {
            id: 'm4q1',
            statement:
              'Entre os três formatos sem rosto, "tela e narração" é o de maior conversão.',
            answer: false,
            explain:
              'Errado. É o mais rápido de produzir e o de MENOR conversão dos três. Serve para testar produto novo, não como formato principal. Quem converte melhor é "mãos e produto", porque a pessoa sente que está tendo a experiência em primeira pessoa.',
          },
          {
            id: 'm4q2',
            statement:
              'Num roteiro de 30 a 45 segundos, a demonstração é o trecho mais longo.',
            answer: true,
            explain:
              'Certo. O gancho leva 3 segundos, o contexto 7, a chamada 10 — e a demonstração fica com os 15 do meio. É o único trecho que não dá para fazer com slide, e é onde o vídeo prova o que a abertura prometeu.',
          },
          {
            id: 'm4q3',
            statement:
              'Se o vídeo teve muitas visualizações e nenhum toque na sacolinha, o problema está no gancho.',
            answer: false,
            explain:
              'Errado. Visualização alta quer dizer que o gancho FUNCIONOU: as pessoas ficaram. O que falhou foi o meio e o fim — a demonstração não gerou vontade, ou faltou dizer o que fazer. Trocar de abertura aí é consertar o degrau errado.',
          },
        ],
      },
    ],
  },
  {
    id: 'aprenda-a-testar',
    number: '05',
    title: 'Aprenda a testar',
    summary: 'Como testar diferentes ganchos, formatos e ângulos em vez de repetir sempre a mesma tentativa.',
    /* ~1.300 palavras */
    duration: '7 min',
    cover: 'modulo-05.jpg',
    /*
     * NOTA DE AUTORIA — este módulo é diferente dos anteriores
     * ------------------------------------------------------------------
     * Nos módulos 01 a 04 o texto veio de rascunho seu e eu editei. Aqui veio
     * só o roteiro de tópicos, então o texto abaixo é escrito por mim a partir
     * do que a própria plataforma já ensina. Leia antes de publicar: é o seu
     * método saindo pela minha mão, e a voz pode não estar exatamente na sua.
     *
     * DE ONDE VEIO CADA COISA, para você conferir a coerência:
     *   · os cinco tipos de gancho     → src/data/hooks.ts (lidos, não copiados)
     *   · o corte de três vídeos por
     *     formato antes de concluir    → MIN_SAMPLE em src/data/tools.ts
     *   · a leitura por etapa do funil → src/data/metrics.ts
     *
     * Se você mudar qualquer um desses três, este módulo acompanha sozinho nos
     * dois primeiros casos. O número "três" no bloco m5s2b3 está escrito à mão:
     * se mexer em MIN_SAMPLE, mexa nele também.
     *
     * NÃO HÁ NÚMERO DE PLATAFORMA AQUI de propósito — nada de "espere 48 horas"
     * ou "poste X vezes". Prazo de entrega e comportamento de algoritmo eu não
     * consigo verificar, e este módulo funciona sem eles.
     */
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm5s1',
        number: '01',
        title: 'O que é um gancho',
        body: 'Quase todo mundo que desiste do TikTok Shop desiste testando pouco e concluindo cedo. Este módulo é sobre a diferença entre publicar muito e testar de verdade.',
      },
      {
        kind: 'text',
        id: 'm5s1b1',
        title: 'O papel dos primeiros segundos',
        body: [
          'O gancho é a primeira frase do vídeo. Não é a melhor parte, não é o resumo do que vem: é o pedágio. Sem ele, ninguém chega no resto — e o resto pode estar ótimo.',
          'Ele é a única etapa do vídeo que trabalha sozinha. A demonstração precisa de alguém assistindo; a chamada precisa de alguém convencido. O gancho precisa apenas de alguém rolando o feed, e é isso que o torna o ponto de maior alavanca do vídeo inteiro.',
          'O que ele não é: apresentação, saudação, ou aviso do que você vai mostrar. "Oi pessoal, hoje eu vim falar sobre" não é gancho — é o tempo que você tinha, gasto avisando que ainda não começou.',
        ],
      },
      {
        kind: 'text',
        id: 'm5s1b2',
        title: 'Por que o mesmo produto rende ganchos diferentes',
        body: [
          'Um produto não tem um jeito de ser apresentado. Ele tem portas — e cada pessoa entra por uma.',
          'Uma se reconhece na situação que o produto resolve. Outra só percebe o valor quando vê o contraste com o jeito que ela faz hoje. Uma terceira não liga para nada disso e para no detalhe físico da peça. Uma quarta responde a uma pergunta na cabeça antes de decidir se fica.',
          'Trocar o gancho não é trocar a embalagem do mesmo argumento: é abrir outra porta da mesma casa. Por isso o erro mais caro de quem está começando é concluir que "esse produto não vende" depois de duas tentativas pela mesma porta.',
        ],
      },
      {
        kind: 'hooktypes',
        id: 'm5s1b3',
        title: 'As cinco portas',
        intro: 'São os mesmos cinco tipos da Biblioteca de ganchos e do Laboratório de IA. Antes de descartar um produto, você deveria ter tentado pelo menos três delas.',
      },
      {
        kind: 'callout',
        id: 'm5s1b4',
        title: 'Você não precisa escrever do zero',
        body: 'A Biblioteca tem 50 aberturas prontas, separadas por tipo, com o que cada tipo faz e quando funciona. Separe três de portas diferentes para o mesmo produto e você já tem o seu primeiro teste montado.',
        link: { to: '/ganchos', label: 'Abrir a Biblioteca de ganchos' },
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm5s2',
        number: '02',
        title: 'Como montar um teste honesto',
        body: 'Teste honesto é aquele que, quando termina, você sabe o que aprendeu. Se no fim você não consegue dizer o que causou o resultado, não foi teste — foi tentativa.',
      },
      {
        kind: 'compare',
        id: 'm5s2b1',
        title: 'Mudar uma variável por vez',
        intro: 'A diferença entre os dois lados não é esforço. É saber o que fazer no dia seguinte.',
        columns: [
          {
            label: 'Teste que ensina',
            note: 'você sabe o que causou',
            tone: 'accent',
            rows: [
              { label: 'O que muda', value: 'Só a primeira frase. Mesmo produto, mesmas imagens, mesma edição, mesma chamada.' },
              { label: 'O que você grava', value: 'Uma vez. Você regrava só a abertura e monta três versões do mesmo material.' },
              { label: 'No fim você sabe', value: 'Qual porta funciona para esse produto — e leva esse aprendizado para o próximo.' },
            ],
          },
          {
            label: 'Teste que não ensina',
            note: 'o resultado não tem dono',
            tone: 'muted',
            rows: [
              { label: 'O que muda', value: 'Gancho, produto, edição e horário, tudo de uma vez.' },
              { label: 'O que você grava', value: 'Três vídeos do zero, três vezes o trabalho.' },
              { label: 'No fim você sabe', value: 'Que um deles foi melhor. Sem ideia de por quê, e sem nada para repetir.' },
            ],
          },
        ],
      },
      {
        kind: 'text',
        id: 'm5s2b2',
        title: 'O teste mais barato que existe',
        body: [
          'Grave o vídeo inteiro uma vez. Depois regrave apenas os três primeiros segundos, três vezes, com aberturas de tipos diferentes. Monte três versões e publique separado.',
          'O custo disso é uma gravação e alguns minutos de edição. O custo de gravar três vídeos completos é uma tarde — e ainda por cima devolve um resultado que você não consegue explicar.',
          'Vale para outras variáveis também, uma de cada vez: o mesmo gancho em dois formatos diferentes, ou a mesma demonstração com duas chamadas diferentes. A regra não é "teste ganchos". A regra é uma variável por vez.',
        ],
      },
      {
        kind: 'list',
        id: 'm5s2b3',
        title: 'Quantas versões publicar',
        items: [
          'Três, no mínimo, antes de concluir qualquer coisa sobre um tipo de gancho. Com uma, você não tem média: tem um resultado. Com dois, tem dois resultados.',
          'Três do MESMO tipo, não três tipos diferentes. Se você publicou uma abertura de cada porta, aprendeu sobre o produto, não sobre as portas.',
          'Publique em dias diferentes. Três vídeos do mesmo produto no mesmo dia competem entre si e embaralham a leitura.',
          'Uma escala completa de teste é: três aberturas do tipo A, três do tipo B, e a comparação entre as duas médias. Isso são seis vídeos — dois ou três dias de trabalho, não duas semanas.',
        ],
      },
      {
        kind: 'text',
        id: 'm5s2b4',
        title: 'Quanto tempo esperar antes de concluir',
        body: [
          'A pergunta certa não é "quantas horas". É "com o que eu estou comparando".',
          'Um vídeo continua sendo distribuído depois do primeiro dia — o que rendeu pouco em 24 horas pode render depois. Por isso julgar um vídeo pela manhã seguinte é a forma mais comum de matar algo que ia funcionar.',
          'O que fecha um teste não é o relógio: é ter os três vídeos publicados e os números anotados. Enquanto o terceiro não saiu, não há o que concluir. Depois que saiu, espere os três terem o mesmo tempo de vida antes de comparar — vídeo de ontem contra vídeo de uma semana atrás não é comparação.',
          'E compare sempre com você mesmo. Não existe número bom universal: o que interessa é se esta leva foi melhor que a sua leva anterior, no seu produto, no seu público.',
        ],
      },
      {
        kind: 'callout',
        id: 'm5s2b5',
        title: 'Anote, ou você não testou',
        body: 'Teste que não foi registrado vira impressão, e impressão vira "acho que aquele funcionou melhor". O Painel de consistência guarda cada publicação com produto, formato, visualizações e vendas — e compara a média por formato sozinho, avisando quando ainda são poucos registros para apontar um vencedor.',
        link: { to: '/ferramentas/consistencia', label: 'Abrir o Painel de consistência' },
      },
      {
        kind: 'callout',
        id: 'm5s2b6',
        title: 'Quando o teste diz que o problema não é o gancho',
        body: 'Se as três versões tiveram muita visualização e nenhum toque na sacolinha, o gancho está funcionando e o problema mudou de lugar: está na demonstração ou na chamada. Testar mais aberturas ali é gastar trabalho no degrau errado. A tela de Métricas mostra em qual etapa você perde as pessoas.',
        link: { to: '/metricas', label: 'Abrir Métricas' },
      },
    ],
  },
  {
    id: 'entenda-as-vendas',
    number: '06',
    title: 'Entenda as vendas',
    summary: 'A jornada entre o conteúdo, o produto e a comissão — e o que acontece em cada etapa.',
    /* ~1.300 palavras */
    duration: '7 min',
    cover: 'modulo-06.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm6s1',
        number: '01',
        title: 'Do vídeo à comissão',
        body: 'Entre alguém rolando o feed e o dinheiro na sua conta existem seis passos. Saber quais são muda o que você olha quando um vídeo não vende.',
      },
      {
        kind: 'list',
        id: 'm6s1b1',
        title: 'O caminho que a pessoa percorre',
        items: [
          'A impressão. Alguém está rolando o feed ou passa por uma transmissão ao vivo. Não procurava nada.',
          'A retenção. Os três primeiros segundos seguram — ou não. É aqui que a maior parte das pessoas some.',
          'O desejo. Ela assiste à demonstração e entende o que o produto resolve. Se soar comercial, ela sai; se soar recomendação, ela fica.',
          'O toque. Convencida, ela toca na sacolinha do vídeo.',
          'A compra. Como o aplicativo já guarda endereço e pagamento, ela finaliza em poucos toques, sem sair do TikTok.',
          'A comissão. O sistema calcula sozinho e o valor entra na sua carteira, liberado para saque no ciclo semanal.',
        ],
      },
      {
        kind: 'text',
        id: 'm6s1b2',
        title: 'Onde cada etapa perde gente',
        body: [
          'Para você entender a proporção real desse funil em escala macro: numa operação de sucesso com faturamento de R$ 500 mil, as métricas se comportaram assim — 10 milhões de pessoas únicas viram o produto, 400.000 clicaram para visitar o anúncio, e 16.000 unidades foram vendidas.',
          'O que importa não é o tamanho do tombo, é em qual degrau ele acontece. Passou direto sem parar? O problema está nos três primeiros segundos. Assistiu inteiro e não tocou? O gancho funcionou e a demonstração não. Tocou e não comprou? O problema saiu do seu vídeo e foi para a página do produto.',
          'Cada um desses três diagnósticos pede uma correção diferente. Corrigir o gancho quando o problema é a página do produto é gastar a semana no degrau errado.',
        ],
      },
      {
        kind: 'callout',
        id: 'm6s1b2b',
        title: 'Veja o seu funil, não o dos outros',
        body: 'Números de funil de outra pessoa não dizem nada sobre o seu: nicho, preço e público mudam tudo. Ponha as visualizações, o percentual que assistiu até o fim, os cliques e os pedidos do seu vídeo na tela de Métricas e as barras passam a desenhar o seu caso, na proporção real.',
        link: { to: '/metricas', label: 'Abrir Métricas' },
      },
      {
        kind: 'list',
        id: 'm6s1b3',
        title: 'O que você consegue influenciar',
        items: [
          'O roteiro e o ritmo. Os primeiros segundos e o corte a cada 2 a 5 segundos são inteiramente seus.',
          'A escolha do vendedor. Promover loja com reputação alta, estoque e histórico de entrega evita reembolso — e reembolso é problema que chega na sua caixa de comentários, não na do vendedor.',
          'O volume. De 2 a 3 vídeos por dia sobre o mesmo produto, variando a abordagem, dá material para o teste existir. Um vídeo por semana não testa nada.',
        ],
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm6s2',
        number: '02',
        title: 'As métricas do começo',
        body: 'Quatro números resolvem os primeiros meses. Os outros só fazem sentido quando estes já estão sendo lidos.',
      },
      {
        kind: 'cards',
        id: 'm6s2b1',
        title: 'Os quatro números que importam agora',
        intro: 'Cada um responde a uma pergunta diferente. Olhar só o primeiro é o erro mais comum de quem está começando.',
        cards: [
          {
            name: 'Visualizações',
            role: 'força de atração',
            text: 'A força de atração do vídeo e a eficácia do gancho inicial. Se as views estão muito baixas, abaixo de 200, o algoritmo descartou o vídeo porque as pessoas passaram direto nos primeiros 3 segundos.',
          },
          {
            name: 'Retenção',
            role: 'força do conteúdo',
            text: 'O quanto o conteúdo mantém as pessoas assistindo. Manter a retenção alta, especialmente acima dos primeiros 10 segundos, sinaliza ao algoritmo que o vídeo é bom, fazendo o TikTok entregá-lo para muito mais pessoas.',
          },
          {
            name: 'Toques na sacolinha',
            role: 'força do desejo',
            text: 'Quantos quiseram comprar depois de assistir. Separa "gostei do vídeo" de "quero isso". Toque alto quer dizer que a demonstração e a chamada fizeram o trabalho.',
          },
          {
            name: 'Pedidos',
            role: 'força da oferta',
            text: 'A força da oferta final, do custo-benefício e da quebra de objeções. Mostra o resultado real. Você não precisa de milhões de views para vender: é possível gerar comissões excelentes com apenas 400 visualizações, se o público for qualificado.',
          },
        ],
      },
      {
        kind: 'diagnosis',
        id: 'm6s2b2',
        title: 'Diagnóstico rápido',
        intro: 'Escolha o cenário em que você está. Cada um pede uma correção diferente — e mexer no lugar errado é como a maior parte das semanas se perde.',
        cases: [
          {
            id: 'm6-caso-views',
            symptom: 'Poucas visualizações',
            meaning:
              'Menos de 500 views. Seu gancho falhou nos primeiros 3 segundos e o algoritmo descartou o vídeo.',
            actions: [
              'Regrave só a abertura. Mantenha produto, imagens e edição — troque apenas a primeira frase.',
              'Teste ganchos de curiosidade ou polêmicos para quebrar o scroll do feed.',
              'Corte o que vem antes da ação. Se o vídeo começa com você respirando, começou tarde.',
            ],
            link: { to: '/ganchos', label: 'Pegar outra abertura' },
          },
          {
            id: 'm6-caso-cliques',
            symptom: 'Muitas visualizações, nenhum toque',
            meaning:
              'O gancho funcionou: as pessoas ficaram. O que não funcionou foi o meio e o fim — a demonstração não gerou vontade, ou faltou dizer o que fazer.',
            actions: [
              'Mostre o produto resolvendo alguma coisa, não o produto existindo.',
              'Melhore a prova visual com antes e depois indireto, e mostre o produto em uso com as mãos.',
              'Diga onde clicar, uma vez, com todas as letras. Vídeo sem instrução termina em nada.',
              'Não troque de produto ainda. Este é problema de roteiro, e roteiro se conserta em uma gravação.',
            ],
            link: { to: '/conteudo', label: 'Ver estruturas de roteiro' },
          },
          {
            id: 'm6-caso-vendas',
            symptom: 'Toques altos, nenhuma venda',
            meaning:
              'A pessoa se interessou e desistiu na página do produto. O problema saiu do seu vídeo: agora quem decide é preço, frete, foto, avaliação e estoque da loja.',
            actions: [
              'Abra a página como quem chega pela primeira vez: primeira foto, título, preço com frete somado.',
              'Confira se o seu vídeo prometeu algo que a página não confirma — cor, tamanho, quantidade, acessório.',
              'Veja a reputação e os comentários de entrega da loja. Atraso vira reclamação no seu vídeo, não no dele.',
              'Substitua o link de afiliado por outro fornecedor que venda o mesmo produto com melhor preço ou melhor reputação.',
            ],
            link: { to: '/ferramentas/mineracao', label: 'Reavaliar o produto' },
          },
        ],
      },
      {
        kind: 'callout',
        id: 'm6s2b3',
        title: 'Não apague vídeo antigo',
        body: 'Um vídeo continua sendo testado e distribuído depois do primeiro dia — o que pareceu fracasso na segunda-feira pode aparecer semanas depois. Apagar por vergonha do resultado é fechar uma porta que ainda estava aberta, e ainda por cima apaga o histórico que te diria o que funcionou. Analise, guarde e publique a próxima variação.',
      },
    ],
  },
  {
    id: 'evite-erros',
    number: '07',
    title: 'Evite erros',
    summary: 'Práticas que podem prejudicar sua conta ou seu conteúdo, e o que observar nas regras da plataforma.',
    /* ~1.400 palavras */
    duration: '7 min',
    cover: 'modulo-07.jpg',
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm7s1',
        number: '01',
        title: 'Erros comuns de quem está começando',
        body: 'O mercado de afiliados do TikTok Shop é uma das maiores fontes de renda de 2026, mas ele pune severamente quem tenta burlar o sistema ou ignora as regras básicas. A plataforma usa sistemas automatizados de inteligência artificial que monitoram cada conta, vídeo e live em tempo real.',
      },
      {
        kind: 'list',
        id: 'm7s1b1',
        title: 'Erros na conta',
        items: [
          'Pular a fase de aquecimento. Criar uma conta do absoluto zero e subir imediatamente vídeos de IA ou de alto apelo viral: o algoritmo identifica o perfil como robô e aplica banimento preventivo imediato. A regra de ouro é usar a conta de forma humana por 2 a 3 dias antes de qualquer postagem em massa.',
          'O erro do nome completo na verificação. A plataforma pede estritamente o primeiro e o último nome; escrever o nome completo gera incompatibilidade com o CPF na Receita Federal e trava o cadastro.',
          'Deixar a identidade sem verificação. Muitos adicionam produtos à vitrine e esquecem de enviar o documento. Resultado: a sacolinha laranja e os links dos vídeos ficam completamente invisíveis para os clientes.',
          'Excluir vídeos em vez de arquivar. Depois de bater os 2.000 seguidores usando nichos rápidos, como política ou prosperidade, o iniciante tende a apagar tudo. Nunca exclua: a exclusão em massa sinaliza atividade suspeita ao algoritmo e despenca a autoridade da conta. O correto é arquivar gradativamente.',
        ],
      },
      {
        kind: 'list',
        id: 'm7s1b2',
        title: 'Erros no conteúdo',
        items: [
          'Não mostrar o produto vinculado. É o motivo número um de suspensão de contas de afiliados. Se você anexou a sacolinha, aquele exato produto tem que aparecer fisicamente ou em uso realista. Imagem genérica, slide ou paisagem com o link gera violação imediata.',
          'Promover um produto e mostrar outro. Anunciar uma máscara de cílios e pendurar a sacolinha de um colágeno. O TikTok exige correspondência exata entre o que aparece e o link de destino, e penaliza rápido quem desobedece.',
          'Esquecer de marcar a opção de IA. Se o vídeo usa avatar realista, imagem clonada ou voz sintetizada, você deve obrigatoriamente marcar "Conteúdo Gerado por IA" ao postar. Ignorar viola as políticas de transparência e derruba o alcance.',
          'Fazer promessas fortes ou milagrosas. O robô de segurança do TikTok é ultra-sensível em estética e emagrecimento. "Perca 10 quilos em uma semana" ou antes e depois agressivos, com barriga ou pele muito expostas, bloqueiam vídeo e live. Use sempre a técnica do falar sem falar.',
          'Silêncio em transmissões ao vivo. O TikTok transcreve o áudio da live em tempo real. Ficar longos períodos calado ou mexendo no computador, sem interagir e sem falar do nicho do produto, gera alerta de violação automática.',
        ],
      },
      {
        kind: 'list',
        id: 'm7s1b3',
        title: 'Erros na divulgação',
        items: [
          'Conteúdo reutilizado. Baixar o vídeo de outro afiliado que viralizou e postar igual na sua conta: o robô detecta a assinatura digital do arquivo e marca o vídeo como não elegível para o Para Você, deixando seu perfil invisível.',
          'Citar plataformas concorrentes. Falar Shopee, Amazon ou Mercado Livre nos vídeos ou lives. O TikTok quer reter os usuários no próprio aplicativo e pune severamente o tráfego direcionado para fora do ecossistema Shop.',
          'Desistir no primeiro flop. Pular o estudo do produto e do público, postar um vídeo e desistir por falta de visualizações. O sucesso exige constância de 2 a 3 publicações diárias.',
        ],
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm7s2',
        number: '02',
        title: 'Nenhum material garante proteção',
        body: 'As diretrizes, limites de seguidores, porcentagens de comissão e regras de verificação apresentadas neste treinamento são baseadas no funcionamento atual do ecossistema do TikTok Shop.',
      },
      {
        kind: 'list',
        id: 'm7s2b1',
        title: 'Três coisas para entender',
        items: [
          'A plataforma tem controle total. O TikTok é uma empresa privada e soberana. As políticas de comunidade e os termos de serviço podem ser alterados de forma unilateral, a qualquer momento e sem aviso prévio.',
          'Redução de risco não é garantia. Aplicar à risca as boas práticas descritas aqui reduz expressivamente a probabilidade de penalização, suspensão ou aviso na conta — mas não garante imunidade absoluta contra ações corretivas da plataforma.',
          'Trate como um negócio real. Mudança de algoritmo e atualização de regra fazem parte do mercado digital. O criador de sucesso é o que se adapta rápido e continua gerando valor com conteúdo original e focado no cliente.',
        ],
      },
      {
        kind: 'callout',
        id: 'm7s2b2',
        title: 'A punição é por acúmulo',
        tone: 'warn',
        body: 'Os sistemas de segurança do TikTok usam punição por escala. Acumular violações recorrentes de produto ou de diretrizes de comunidade — um, dois, três avisos seguidos — resulta na perda irrevogável do perfil e no congelamento temporário ou permanente do saldo de comissões. Proteja a conta trabalhando sempre dentro das regras.',
      },
      {
        kind: 'quiz',
        id: 'm7s2b3',
        title: 'Certo ou errado',
        intro: 'Seis cenários reais. Responda antes de olhar a explicação — errar aqui é de graça; errar na conta, não.',
        questions: [
          {
            id: 'm7q1',
            statement: 'Posso postar um vídeo sem mostrar o produto, desde que a sacolinha laranja esteja no vídeo.',
            answer: false,
            explain: 'Errado. É o motivo número um de suspensão de conta de afiliado. Se a sacolinha está lá, aquele produto tem que aparecer fisicamente ou em uso realista.',
          },
          {
            id: 'm7q2',
            statement: 'Depois de liberar o Shop, o certo é excluir os vídeos antigos do nicho que usei para crescer.',
            answer: false,
            explain: 'Errado. Exclusão em massa sinaliza atividade suspeita e derruba a autoridade da conta. O correto é arquivar gradativamente.',
          },
          {
            id: 'm7q3',
            statement: 'Vídeo com avatar de IA precisa ser marcado como conteúdo gerado por IA na hora de postar.',
            answer: true,
            explain: 'Certo. É obrigatório. Não marcar viola as políticas de transparência e derruba o alcance do vídeo.',
          },
          {
            id: 'm7q4',
            statement: 'Se o vídeo de outro afiliado viralizou, posso baixar e postar igual na minha conta.',
            answer: false,
            explain: 'Errado. O robô detecta a assinatura digital do arquivo e marca o vídeo como não elegível para o Para Você — seu perfil fica invisível.',
          },
          {
            id: 'm7q5',
            statement: 'Conta nova pode subir vídeos de IA já no primeiro dia, desde que o conteúdo seja bom.',
            answer: false,
            explain: 'Errado. Sem aquecimento, o algoritmo identifica o perfil como robô e aplica banimento preventivo. Use a conta de forma humana por 2 a 3 dias antes.',
          },
          {
            id: 'm7q6',
            statement: 'Numa live de vendas, posso ficar em silêncio organizando os produtos por alguns minutos.',
            answer: false,
            explain: 'Errado. O TikTok transcreve o áudio da live em tempo real. Silêncio longo sem interação gera alerta de violação automática.',
          },
        ],
      },
    ],
  },
  {
    id: 'execute-por-7-dias',
    number: '08',
    title: 'Execute por 7 dias',
    summary: 'Um plano simples e prático para colocar todo o aprendizado em ação, com tarefas e objetivos definidos para cada dia.',
    /* ~1.100 palavras */
    duration: '6 min',
    cover: 'modulo-08.jpg',
    /*
     * OS SETE DIAS NÃO ESTÃO ESCRITOS AQUI, e é de propósito.
     *
     * O cronograma dia a dia mora em src/data/sevenDayPlan.ts, que alimenta a
     * tela /plano, o painel de controle e o card do dia de hoje. Repetir os
     * sete dias dentro deste módulo criaria duas versões do mesmo cronograma
     * para divergirem na primeira correção.
     *
     * Este módulo faz o que a tela do plano não faz: explica COMO usar o plano
     * e o que acontece depois do dia 7.
     */
    blocks: [
      /* ================= SEÇÃO 1 ================= */
      {
        kind: 'heading',
        id: 'm8s1',
        number: '01',
        title: 'Como usar o plano',
        body: 'Este plano de 7 dias é a espinha dorsal prática do seu treinamento. Cada dia foi desenhado com um objetivo específico, uma explicação direta do que fazer e uma lista de tarefas claras.',
      },
      {
        kind: 'list',
        id: 'm8s1b1',
        title: 'Duas regras antes de começar',
        items: [
          'A ordem é inegociável. Cada etapa depende do sucesso da anterior: você não consegue vender sem ter aquecido a conta ou selecionado o produto certo. Por isso, na tela do plano, um dia só abre depois que o anterior estiver concluído.',
          'Respeite o seu tempo. Se precisar de mais de 24 horas para concluir as tarefas de um dia — esperar os seguidores subirem, a amostra chegar — não tem problema. O que não funciona de forma alguma é pular etapas para acelerar.',
        ],
      },
      {
        kind: 'callout',
        id: 'm8s1b2',
        title: 'O plano é uma tela, não uma leitura',
        body: 'Os sete dias com objetivos, motivos e checklists estão na área do plano. As tarefas ficam marcadas, o progresso é salvo e o painel de controle mostra o dia de hoje com as tarefas prontas para marcar. Não copie o cronograma para um papel — trabalhe direto por lá.',
        link: { to: '/plano', label: 'Abrir o plano de 7 dias' },
      },

      /* ================= SEÇÃO 2 ================= */
      {
        kind: 'heading',
        id: 'm8s2',
        number: '02',
        title: 'Depois do dia 7',
        body: 'Chegar ao dia 7 não é o fim da jornada: é o início de uma engrenagem que precisa rodar de forma contínua para empilhar resultado.',
      },
      {
        kind: 'list',
        id: 'm8s2b1',
        title: 'Como repetir o ciclo: a escala vertical',
        items: [
          'Não divulgue 30 produtos aleatórios e desconexos de uma vez. É o erro que mais parece trabalho e menos gera venda.',
          'O segredo dos profissionais é o contrário: selecionar um único produto validado e publicar de 10 a 15 variações de roteiro e gancho focadas nele.',
          'Mantenha o perfil focado num gênero específico de público — por exemplo, só produtos femininos: vestuário, maquiagem, colágeno. Misturar confunde a entrega e a segmentação do algoritmo.',
        ],
      },
      {
        kind: 'list',
        id: 'm8s2b2',
        title: 'O que ajustar a cada rodada',
        items: [
          'Otimização de ganchos. Se o gancho de identificação direta ("Se você sofre com joelhos doloridos...") não performar, troque na próxima rodada por um de controvérsia ("Eu comprei achando que era golpe...") mantendo o mesmo corpo do vídeo.',
          'Escassez e urgência. Se os cliques estiverem altos, reforce o fechamento mental: fixe e desfixe o carrinho laranja na tela para gerar notificação visual, e fale da promoção com cronômetro terminando às 23:59.',
          'Contas paradas. Se uma conta antiga demora a ganhar visualização, são necessários até 21 dias de postagem constante para o algoritmo recuperar o engajamento e a autoridade do perfil. Se não quiser esperar, crie ou compre um perfil novo do zero.',
        ],
      },
      {
        kind: 'list',
        id: 'm8s2b3',
        title: 'Quando é hora de mudar de produto',
        items: [
          'Estoque zerado. Se o vendedor não tem estoque robusto e o produto esgota o tempo todo, troque o link de afiliação ou mude de produto imediatamente para não perder dinheiro com clique vazio.',
          'Limite de testes de ângulo. Se depois de 10 a 15 ganchos e abordagens totalmente diferentes — unboxing, POV, indicação direta, fofoca — o vídeo continuar gerando visualização razoável e zero clique na sacolinha, o produto não tem apelo de compra por impulso e deve ser substituído.',
        ],
      },
      {
        kind: 'callout',
        id: 'm8s2b4',
        title: 'O efeito bambu',
        body: 'Você passa os primeiros dias criando raízes: estruturando conta, testando ganchos, subindo rascunhos. Pode parecer que as vendas estão tímidas no início, mas basta um único roteiro validado ser pego pelo algoritmo para que ele passe a ser distribuído de forma contínua, realizando vendas automáticas de vídeos que você postou semanas atrás. A constância é a sua única e verdadeira garantia.',
      },
      {
        kind: 'callout',
        id: 'm8s2b5',
        title: 'As ferramentas que sustentam o ciclo',
        body: 'A partir daqui, três telas fazem o trabalho pesado: a Central de mineração guarda e pontua os produtos candidatos, o Painel de consistência registra cada publicação e compara a média por formato, e a tela de Métricas mostra em qual etapa você perde as pessoas. Rodar o ciclo de cabeça é como a maior parte das operações para no mês dois.',
        link: { to: '/ferramentas/consistencia', label: 'Abrir o Painel de consistência' },
      },
    ],
  },
];


export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getAdjacentModules(id: string) {
  const index = modules.findIndex((m) => m.id === id);
  return {
    previous: index > 0 ? modules[index - 1] : undefined,
    next: index >= 0 && index < modules.length - 1 ? modules[index + 1] : undefined,
  };
}
