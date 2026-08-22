import type { CopyItem } from './types';

/**
 * GANCHOS E COPYS QUE VENDEM — o módulo 10
 * ============================================================================
 * Copys que foram ao ar, com a foto do produto ao lado.
 *
 * POR QUE ISTO É UMA ÁREA SEPARADA DOS BASTIDORES: lá se estuda como o vídeo
 * foi FEITO — prompt, ferramenta, movimento. Aqui se estuda o que foi DITO. São
 * duas habilidades diferentes, e misturar as duas numa tela só faria o aluno
 * ler prompt quando queria copy.
 *
 * COMO PUBLICAR:
 *   1. salve a foto do produto em public/copys/ (ex.: 'copy-01.jpg');
 *   2. preencha `image` com o nome do arquivo, ou cole uma URL completa;
 *   3. cole em `copy` o texto exato que foi falado;
 *   4. escreva em `notes` o que faz aquela copy funcionar;
 *   5. tire o `draft: true`.
 *
 * A COPY VAI COMO FOI FALADA. Sem pontuar, sem "arrumar" a gramática: fala
 * corrida é como as boas copys de TikTok soam, e limpar isso apaga justamente
 * o que se quer ensinar.
 */

export const COPY_TITLE = 'Ganchos e copys que vendem milhões';

export const COPY_SUMMARY =
  'As copys que foram ao ar, com a foto do produto ao lado. Não é teoria de gancho: é o texto que foi dito, para você ver a estrutura e refazer com o seu produto.';

export const copyItems: CopyItem[] = [
  {
    id: 'cp-01',
    number: '01',
    product: 'Tela galvanizada para cerca — 50 m',
    category: 'Casa e construção',
    image: 'copy-01.jpg',
    copy: 'Eu ia gastar 1 fortuna cercando meu sítio até encontrar essa tela galvanizada ela é resistente rende muito e ainda aguenta sol e chuva sem dor de cabeça são 50m de tela disponível nas alturas de 1m e 50 OU 1 e 80m se você quer economizar e fazer 1 cercado de qualidade clica no carrinho laranja',
    notes: [
      'O gancho é uma economia evitada, não uma promessa: "eu ia gastar uma fortuna". Quem tem o mesmo problema se reconhece na primeira frase, e ninguém prometeu resultado a ninguém.',
      'Os benefícios vêm em rajada e sem adjetivo de propaganda: resistente, rende muito, aguenta sol e chuva. Três em nove palavras — cada um responde a uma dúvida real de quem vai cercar um terreno.',
      'A ficha técnica aparece no meio, não no começo: 50 metros, 1,50 ou 1,80 de altura. Quem chegou até ali já quer comprar e precisa saber se serve.',
      'A chamada junta o desejo e a ação numa frase só: "se você quer economizar e fazer um cercado de qualidade, clica no carrinho laranja". Sem urgência inventada, sem prazo.',
      'Repare que não tem pontuação. A copy foi escrita para ser FALADA, e falar não tem vírgula — é por isso que ela soa como conversa e não como anúncio.',
    ],
  },
  {
    id: 'cp-02',
    number: '02',
    product: 'Jaqueta de Pilates com entrada para o dedo',
    category: 'Moda esportiva',
    image: 'copy-02.jpg',
    copy: 'Ah, que linda! Sou muito fã da jaquetinha de Pilates. E essa cor que eu comprei, ela é simplesmente perfeita. Comprei para combinar com esse look rosa que eu tô agora, e eu acho que eu acertei muito no tom, gente. Essa aqui é da Arari Sport. Sério, que cor mais linda esse rosa bebê! É um rosa bem, bem clarinho. Hoje eu vou colocar ela porque eu tô bem curiosa. Eu achei o tecido dela bem diferente, já bem grossinho. Ela vem também com aquela entradinha para o dedo que eu amo, e aqui na parte da entrada para o dedo ela parece ser um tecido duplo. Eu vi muitos vídeos do pessoal falando do que ela tem a casinha aqui para colocar o zíper. E realmente, olhem como ela fica aqui no pescoço, não incomoda, o zíper não fica encostando na nossa pele. Ela tem bolsinhos, que é uma coisa que eu já achei um diferencial. Geralmente as minhas jaquetinhas não vêm com bolso, e eu simplesmente amei, gente, ficou bem certinha. Eu vou deixar o link dela aqui no carrinho laranja para vocês porque eu vi que tem várias cores dela disponível.',
    notes: [
      'Compare com a copy 01: lá o gancho era um PROBLEMA ("eu ia gastar uma fortuna"), aqui é uma REAÇÃO ("ah, que linda!"). Produto de necessidade abre pela dor; produto de desejo abre pelo encantamento. Usar o gancho errado para o tipo de produto é o erro mais comum.',
      'Os detalhes que ela cita não estão no anúncio: a entradinha para o dedo, a casinha do zíper, o tecido duplo, o bolso. Cada um é um "só quem usou sabe" — e é isso que separa review de descrição.',
      'A prova social vem da comunidade, não do vendedor: "eu vi muitos vídeos do pessoal falando da casinha do zíper". Ela cita o que já circula e depois CONFIRMA com o produto na mão. Confirmar vale mais que afirmar.',
      'A objeção é resolvida mostrando, não jurando: "olhem como ela fica no pescoço, o zíper não fica encostando". Quem já se incomodou com zíper no queixo entende na hora.',
      'O diferencial é dito como surpresa dela mesma: "geralmente as minhas jaquetinhas não vêm com bolso". Isso soa muito diferente de "possui bolsos" numa ficha técnica.',
      'A chamada dá um motivo para clicar que não é urgência: "tem várias cores disponível". Curiosidade em vez de pressa — e não promete estoque acabando.',
    ],
  },
  {
    id: 'cp-03',
    number: '03',
    product: 'Jaqueta de poliamida com bolso interno para celular',
    category: 'Moda esportiva',
    image: 'copy-03.jpg',
    copy: 'Amigas, isso aqui é meu uniforme do inverno pra academia, pra corrida, pro pilates, pra absolutamente tudo, até pra ir no mercado, tá? Poliamida Premium, ó. A jaqueta, gente, os dentes dela é aquele dente mais largo, então ele desliza. E essa daqui é um lançamento, é coleção nova. Eu faço estoque dessas jaquetinhas do inverno. Ela vem com o passante de dedinho ali, que eu amo, porque daí fica até mais quente aqui na parte do punho, ó. Extremamente confortável. Fizeram esse modelo com bolsinho nas laterais. Eu já vou mostrar pra vocês o melhor, tá? Eu já vou mostrar o melhor. Olha o tanto que ela tá linda. Esse marrom também é um lançamento. Pelo que eu vi, ela tá com bem pouco estoque, ó. Então fizeram bolsinhos aqui nas laterais. Passante de dedinho. E agora o melhor, tá? Fizeram bolsinhos internos, ó, pro celular. Cabe até um celular Pro Max aqui, ó. Fizeram bolsinhos internos. Então aparenta que ele tá por fora, mas ele tá ali dentro. Então você pode correr tudo. Pode colocar a mão no bolso, que ele fica aqui por dentro, tá? Extremamente genial. Amei demais. E é aquele tecido respirável. Então é aquela poliamida que tu pode suar tudo. Que ele não vai ficar transpirando e ele não vai ficar passando pra jaqueta, tá? Então isso aqui é um investimento, ó. Coloca pra ir pra academia. Além de confortável, você tá bem tranquilo ali e mais quentinha, tá? Então eu amo essas peças nesse tecido e ela tá de graça. Em loja de cidade tu não encontra por menos de 200 reais. Aqui eu paguei menos de 80 reais, peguei numa promoção. E pra quem quiser, eu estou com o tamanho P. Ela super modela, deixa superzinho no corpo e eu simplesmente amo, tá? Ela vai servir do tamanho P até o tamanho 44, 46, 48, até o GG. Mas a marrom dela, ela tá com bem poucas peças. Então pra quem quiser uma dessa daqui, vou deixar o link no carrinho laranja. Porque ela tá perfeita e não tem mais nada de estoque.',
    notes: [
      'Terceiro tipo de gancho na coleção: aqui não é dor (copy 01) nem encantamento (copy 02), é VERSATILIDADE — "meu uniforme pra absolutamente tudo, até pra ir no mercado". Quem compra uma peça calculando quantas vezes vai usar se reconhece na primeira frase.',
      'A técnica mais forte desta copy é o adiamento: "eu já vou mostrar pra vocês o melhor" aos 28 segundos, repetido, e a revelação só aos 41. São treze segundos de curiosidade aberta bem no meio do vídeo — que é exatamente onde a retenção costuma cair.',
      'Por causa desse adiamento ela pode guardar o melhor argumento para o fim. Sem o aviso, o bolso interno aos 41 segundos chegaria para uma fração das pessoas.',
      'A prova é uma medida que qualquer um visualiza: "cabe até um Pro Max". Isso vale mais que "bolso espaçoso", porque a pessoa confere mentalmente com o aparelho na mão.',
      'A âncora de preço diz DE ONDE veio a comparação: "em loja de cidade tu não encontra por menos de 200, aqui paguei menos de 80". Comparação com origem declarada é diferente de número solto — e é a diferença entre argumento e invenção.',
      'Repare no "pelo que eu vi, ela tá com bem pouco estoque". Esse "pelo que eu vi" é pequeno e muda tudo: ela relata em vez de afirmar. Escassez que se reporta não vira promessa que você vai ter que sustentar.',
      'A grade de tamanhos aparece antes da chamada. Em roupa, "vai servir em mim?" é a última objeção, e responder antes do link evita o clique que não vira compra.',
    ],
  },
  {
    id: 'cp-04',
    number: '04',
    product: 'Jaqueta de poliamida com recorte slim',
    category: 'Moda esportiva',
    image: 'copy-04.jpg',
    copy: 'Eu comprei essa jaqueta aqui no Carrinho Laranja por menos de R$ 100,00 há umas duas semanas atrás. Quando foi essa semana, eu vi que o preço tinha baixado de novo, pedi e olha que chegou. Peguei ela nessa outra cor. Olha isso aqui, que coisa mais linda, no marrom. O que eu amo nessa jaqueta é que, além de ela ser em poliamida, ser uma qualidade prêmio mesmo, ela tem esse recorte slim, que deixa bem fininha a cintura. Olhem que esses recortes, meninas, excelente qualidade. A golinha mais altinha e olhem esse acabamento prêmio. Jaqueta em poliamida, está por menos de R$ 90,00 aqui no Carrinho Laranja, está com valor de oferta. Se ainda estiver aparecendo aqui, é porque ainda tem em stock disponível e você já corre para garantir a sua. Essa jaqueta aqui é aquela das gringas, excelente qualidade.',
    notes: [
      'Quarto tipo de gancho da coleção — depois de dor, encantamento e versatilidade, aqui é COMPRA REPETIDA: "comprei há duas semanas, o preço baixou, pedi de novo". É a prova social mais forte que existe, porque ninguém compra duas vezes o que não prestou.',
      'A frase mais inteligente das quatro copys está aqui: "se ainda estiver aparecendo aqui, é porque ainda tem em stock". Ela cria urgência sem afirmar nada que possa se provar falso — quem verifica, verifica sozinho. Compare com a escassez relatada da copy 03; as duas resolvem o mesmo problema por caminhos diferentes.',
      'Ela conta que estava acompanhando o preço. Isso constrói mais confiança que qualquer adjetivo: é o comportamento de quem compra, não de quem divulga.',
      'O benefício é sobre o corpo, não sobre o tecido: "recorte slim, que deixa bem fininha a cintura". Ninguém compra poliamida — compra o que a poliamida faz com a silhueta.',
      'Esta é a copy mais curta das quatro, e funciona porque o produto é visual e o preço argumenta sozinho. Copy longa é para produto que precisa ser explicado; esta só precisava ser mostrada.',
      '"Aquela das gringas" posiciona por associação, sem citar marca nenhuma. Só use uma frase dessas se a referência for reconhecível para o seu público — dita no vazio, ela não significa nada.',
    ],
  },
  {
    id: 'cp-05',
    number: '05',
    product: 'Cinta modeladora que não marca na roupa',
    category: 'Moda e beleza',
    image: 'copy-05.jpg',
    copy: 'Amiga, vem cá, tu sofre desse problema de pochete? Tu coloca uma roupa, fica esse ovo aqui marcando? Olha isso aqui, como é que eu uso uma roupa assim? Eu encontrei a solução por menos de R$20, eu vou te mostrar. Olha isso, você conseguiu entender, amiga? Acabou! Olha, barriguinha fica mais retinha, olha isso aqui, amiga, e você consegue tranquilamente colocar por debaixo da roupa. Por quê? Porque ela não marca. Então se você igual a mim tava usando roupa, amiga, marcando aquele ovinho, acabou com esse problema, tá? Corre aqui no carrinho porque tá em oferta relâmpago. Essa cinta modeladora é simplesmente maravilhosa. Eu tô vestindo a minha na P. Se você tem dúvida em qual tamanho pegar, coloca nos comentários que eu vou te ajudar.',
    notes: [
      'Mesmo gancho da copy 01 — a dor — executado de outro jeito. Lá era em primeira pessoa ("eu ia gastar uma fortuna"); aqui é uma pergunta direta ("tu sofre desse problema?"). Duas execuções do mesmo tipo, e vale testar as duas no seu produto.',
      'O detalhe que faz esse gancho funcionar é o vocabulário: "pochete", "ovinho". São as palavras que o público usa entre si, não o termo técnico. Nomear o problema com a palavra errada faz a pessoa não se reconhecer.',
      'Ela MOSTRA o problema antes de mostrar a solução: "como é que eu uso uma roupa assim?". Vídeo que abre pela solução pede que a pessoa lembre sozinha da dor — mostrar economiza esse trabalho.',
      'O preço entra no gancho, não no fim: "encontrei a solução por menos de R$20". Numa peça barata, o preço é argumento e derruba a objeção antes dela se formar.',
      'A objeção vira pergunta e resposta na mesma frase: "você consegue colocar por debaixo da roupa. Por quê? Porque ela não marca." Perguntar em voz alta o que a pessoa está pensando é mais forte que só afirmar.',
      'O fechamento retoma a abertura com as mesmas palavras — "aquele ovinho, acabou com esse problema". Fechar o círculo faz o vídeo parecer inteiro em vez de interrompido.',
      'A melhor jogada está na última frase: "se você tem dúvida em qual tamanho pegar, coloca nos comentários que eu vou te ajudar". A dúvida de tamanho, que na copy 03 mata a venda, aqui vira comentário. Ela transforma a última objeção em engajamento em vez de perder o clique.',
      'Compare a escassez das três últimas copys: aqui é AFIRMADA ("tá em oferta relâmpago"), na 03 é relatada ("pelo que eu vi") e na 04 é verificável ("se ainda estiver aparecendo"). A primeira é a única que você pode ser cobrado por sustentar.',
    ],
  },
  {
    id: 'cp-06',
    number: '06',
    product: 'Calça de alfaiataria cintura alta',
    category: 'Moda',
    image: 'copy-06.jpg',
    copy: 'Quando eu compro algumas calças de alfaiataria, alguns pontos pra mim são muito importantes. Essa calça tá aqui no carrinho laranja, tá? Primeiro ponto, o tecido. Por exemplo, esse tecido aqui é um marran, que é aquele que parece com linho, sabe? Mais grossinho, com mais qualidade. Outro ponto importante, a composição da calça. Por exemplo, ó, 90% viscose e 10% poliéster. Outro ponto muito importante é o acabamento. Já usei essa calça e o acabamento dela continua impecável, tá vendo? Outro ponto importante é se o bolso e o feche-clé tem a mesma cor ou muito parecido com tecido. Tem umas calças que não tem. Para mim tem que ser muito parecido. Ponto importante também, calma aí, toda calça de alfaiataria no meu corpo precisa ser cintura alta. Então ela precisa ser cintura alta e essa é. Ah, essa cordinha que ela sai, tá? Você pode usar com ou sem cordinha porque ela tem passante. Nela toda você pode usar com cinto se você preferir. Tem várias cores e tamanho aqui no carrinho laranja. Qualquer dúvida é só você me perguntar, tá? Essa aqui é a off-white, também tem a preta, tem outras cores aqui.',
    notes: [
      'Sexto tipo de gancho, e o mais sofisticado da coleção: OS CRITÉRIOS. Ela não vende a calça — ensina a escolher calça, e a dela passa em todos os pontos. Quem assiste aprende alguma coisa mesmo sem comprar, e por isso fica até o fim.',
      'O vídeo é uma lista de conferência e o produto é o gabarito. Isso constrói autoridade e vende ao mesmo tempo, sem soar como venda em nenhum momento.',
      'O detalhe que prova conhecimento é o bolso e o zíper na mesma cor do tecido. Ninguém que não entende de roupa repara nisso — e é justamente por isso que citar funciona: quem entende reconhece, quem não entende passa a confiar.',
      'A durabilidade é provada pelo uso, não jurada: "já usei essa calça e o acabamento continua impecável". Responde à maior objeção de roupa barata antes de alguém levantar.',
      'A composição vem com número que dá para conferir no anúncio: 90% viscose, 10% poliéster. Número verificável constrói confiança; número que ninguém consegue checar não constrói nada.',
      'O "calma aí" no meio de um dos pontos é o que faz soar como pessoa. Copy limpa demais soa como locução — e locução o público já aprendeu a pular.',
      'Esta é a única das seis copys SEM preço, SEM urgência e SEM escassez. Ela vende só pela autoridade. Vale como prova de que dá para converter sem apelar para pressa — e como opção para quando o produto não tem preço competitivo.',
      'A chamada repete a jogada da copy 05: "qualquer dúvida é só me perguntar". Convite ao comentário resolve objeção e alimenta o vídeo ao mesmo tempo.',
    ],
  },
  {
    id: 'cp-07',
    number: '07',
    product: 'Calça legging peluciada por dentro',
    category: 'Moda esportiva',
    image: 'copy-07.jpg',
    copy: 'Quem conseguiu pegar essa calça por menos de R$ 40,00 ficou no lucro, porque olha o que ela faz com o bumbum. Além de tudo, ela é peluciada aqui por dentro, pra usar no inverno, gente, vai ser perfeito. Com certeza vai virar minha calça de academia, de saída, eu vou querer ir pra qualquer lugar com ela, porque olha como que ela deixa o corpo perfeito. Não fica dividindo aqui, nem quando puxa. Modelagem maravilhosa, modela muito bem aqui o bumbum. Vou pôr o carrinho aqui, dar uma olhadinha se tá na promoção ainda, porque não tava mais, mas se tiver, gente, compensa muito.',
    notes: [
      'Sétimo tipo de gancho: o PARABÉNS RETROATIVO. "Quem conseguiu pegar por menos de R$ 40 ficou no lucro" é dito para quem já comprou — e sentido por quem não comprou. Cria a sensação de ter perdido algo sem afirmar nada.',
      'O benefício entra nos três primeiros segundos, sem aquecimento: "olha o que ela faz com o bumbum". Em produto cujo valor é visual, descrever é perder tempo — mostre e diga o que olhar.',
      'A objeção é o medo específico da categoria: "não fica dividindo aqui, nem quando puxa". Quem escreveu isso sabe o que impede uma legging de ser comprada. Objeção genérica não convence ninguém; a objeção certa converte sozinha.',
      'A urgência aqui é a mais honesta das sete, e por isso a mais convincente: ela ADMITE que não sabe. "Vou dar uma olhadinha se tá na promoção ainda, porque não tava mais." Confessar incerteza é mais crível que afirmar oferta — e ninguém pode acusá-la de inventar promoção.',
      'A versatilidade vem empilhada numa frase só: academia, saída, qualquer lugar. É o argumento da copy 03 em um décimo do tempo — quando o produto é simples, a lista pode virar enumeração rápida.',
      'É a copy mais curta das sete: o argumento inteiro em dezenove segundos. Produto visual e barato não precisa de mais que isso, e alongar seria dar tempo para a pessoa desistir.',
    ],
  },
];
