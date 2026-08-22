import type { AiPrompt, Hook, PlanContent } from './types';

/**
 * CONTEÚDO DA VERSÃO COMPLETA (R$37)
 * ----------------------------------------------------------------------------
 * Resolvido pelo alias "@plan-content" quando o build roda com PLAN=complete.
 *
 * FASE 2 — é aqui que entram:
 *   · prompts        → Laboratório de IA (UGC, avatar, demonstração, narração,
 *                      ganchos, roteiros)   ✔ escrito
 *   · extraHooks     → os 30 ganchos exclusivos (a base de 20 está em hooks.ts,
 *                      nas duas versões — dá 50 aqui)   ✔ escrito
 *   · contentLibrary → estruturas de roteiro exclusivas da Completa
 *
 * Enquanto uma lista estiver vazia, a área correspondente segue marcada como
 * "em breve" na navegação. Nada de conteúdo de exemplo fingindo ser real.
 */

/**
 * KIT VÍDEOS COM IA — prompts
 * ============================================================================
 * COMO EDITAR:
 *   · `body` é o texto colado na ferramenta. Escreva {{produto}}, {{publico}},
 *     {{beneficio}} e {{tom}} onde o aluno precisa entrar com o caso dele — a
 *     tela troca pelo que ele preencheu na bancada e o botão copia já pronto.
 *   · `notes` é o que fazer DEPOIS de gerar. É a parte que separa um vídeo
 *     utilizável de um vídeo de IA com cara de IA.
 *   · `tool` é a categoria da ferramenta, nunca a marca. Serviço de IA muda de
 *     nome, preço e recurso sozinho; o produto não fica refém disso.
 *
 * REGRA DE CONTEÚDO (a mesma do resto da plataforma):
 * Nenhum prompt manda a IA inventar depoimento, resultado, prazo ou número.
 * Vários dizem isso explicitamente para a ferramenta — modelo de linguagem
 * preenche lacuna com invenção plausível se ninguém proibir.
 *
 * ATENÇÃO: este material é um RASCUNHO de trabalho. Revise cada prompt rodando
 * na ferramenta antes de entregar a compradores.
 */
/**
 * UGC — quatro variações do mesmo molde.
 *
 * O corpo é IDÊNTICO nas quatro: só o ESTÁGIO 1, o gancho, muda. É de
 * propósito. O que separa um vídeo UGC do outro é a primeira frase, não a
 * direção de arte — e mantendo um molde só, corrigir uma regra aqui corrige
 * as quatro de uma vez.
 *
 * O aluno não vê isto: para ele são quatro prompts diferentes na lista, cada
 * um com um ângulo de abertura.
 */
function ugc(gancho: string): string {
  return `Crie um vídeo vertical 9:16 com estética de UGC (User Generated Content), extremamente natural e espontâneo, como se tivesse sido gravado por uma pessoa comum para publicar no TikTok.

O vídeo deve parecer uma gravação real feita com celular, e NÃO uma propaganda tradicional.

========================
PRODUTO
========================

Produto: {{produto}}
Público-alvo: {{publico}}
Principal benefício: {{beneficio}}
Tom da comunicação: {{tom}}

========================
CONCEITO
========================

Crie um vídeo curto apresentando o produto de forma natural, despertando curiosidade e mostrando seu principal benefício através de uma situação cotidiana.

O vídeo deve transmitir a sensação de: "eu descobri isso por acaso e preciso mostrar".

Não deve parecer que a pessoa está lendo um anúncio. A comunicação precisa ser espontânea, casual e imperfeita na medida certa.

========================
ESTILO VISUAL
========================

Formato vertical 9:16.
Estética de vídeo UGC gravado com smartphone.
Iluminação natural, preferencialmente próxima a uma janela.
Ambiente residencial realista e levemente cotidiano.
Câmera na mão, com pequenas imperfeições naturais de enquadramento.
Movimentos discretos e orgânicos. Pequenas mudanças de enquadramento são permitidas.

Evitar aparência cinematográfica excessiva.
Evitar iluminação de estúdio.
Evitar composição perfeita demais.
Evitar aparência de comercial.
Não utilizar filtros exagerados.
Não utilizar transições sofisticadas.
Não adicionar gráficos corporativos.

O vídeo deve parecer espontâneo e nativo de TikTok.

========================
PERSONAGEM
========================

Pessoa comum, aparência natural e amigável.
A pessoa deve parecer um consumidor real compartilhando uma descoberta, não um modelo publicitário.
Expressões faciais naturais, gestos espontâneos, movimentos corporais discretos.
A pessoa pode segurar e demonstrar o produto durante o vídeo.

Não fazer movimentos exagerados.
Não olhar constantemente para a câmera como se estivesse apresentando um telejornal.

========================
ESTRUTURA
========================

Duração aproximada: 15 a 25 segundos.

ESTÁGIO 1 — GANCHO

Nos primeiros 2 segundos, começar diretamente com uma situação que desperte curiosidade.

Não começar com "Oi, gente", "Olá pessoal" ou "Hoje eu vim falar sobre...".

${gancho}

O gancho deve ser adaptado ao produto e ao público — a frase acima é a construção, não o texto final.

ESTÁGIO 2 — DESCOBERTA

Apresentar rapidamente o produto.
Mostrar o produto em uso ou em destaque.
Explicar de forma simples por que ele chamou atenção.
A fala deve parecer uma recomendação espontânea, não uma apresentação comercial.

ESTÁGIO 3 — DEMONSTRAÇÃO

Mostrar visualmente o produto e seu principal benefício.
Sempre que possível, utilizar close-ups naturais do produto.
Mostrar detalhes, textura, funcionamento ou resultado visual quando aplicável.
A demonstração deve fazer o espectador entender imediatamente por que o produto é interessante.

ESTÁGIO 4 — REFORÇO

Reforçar o principal benefício de forma curta e natural.
Não utilizar lista de benefícios: escolher apenas o mais importante para {{publico}}.

ESTÁGIO 5 — CTA

Finalizar com uma chamada para ação natural.

Não utilizar frases agressivas como "COMPRE AGORA!", "VOCÊ PRECISA DISSO!" ou "CORRA!".

Preferir uma CTA nativa de conteúdo:
· "Eu deixei o produto aqui embaixo."
· "Se quiser ver, está no link do produto."
· "Eu colocaria na minha lista se fosse você."
· "Vale a pena dar uma olhada."

A CTA deve parecer uma recomendação, não um anúncio.

========================
DIÁLOGO
========================

Criar uma fala em português brasileiro, curta, natural e conversacional.
Usar linguagem cotidiana. Evitar palavras excessivamente formais, frases longas e linguagem de vendedor.
Incluir pequenas pausas naturais.

A pessoa pode usar expressões como "tipo", "olha", "eu achei", "pra mim", "realmente", "não esperava" quando fizer sentido — sem exagerar.

========================
ÁUDIO
========================

Voz humana natural, tom conversacional, velocidade normal.
Pequenas pausas entre frases, entonação espontânea.
Não utilizar voz robótica nem narração institucional.
O áudio ambiente pode permanecer levemente presente para aumentar a sensação de autenticidade.

========================
CÂMERA
========================

Câmera de smartphone, profundidade de campo natural, leve movimento de câmera.
Pequenas imperfeições de gravação são aceitáveis.
Não utilizar movimentos cinematográficos, travelling profissional nem zooms dramáticos.

========================
EDIÇÃO
========================

Cortes rápidos e naturais.
Legendas grandes e fáceis de ler, sincronizadas com a fala, destacando apenas palavras ou frases importantes. Não sobrecarregar a tela.

Utilizar cortes para mostrar: pessoa · produto · detalhe do produto · produto sendo utilizado · resultado ou benefício.

Manter ritmo dinâmico. O vídeo deve prender a atenção desde o primeiro segundo.

========================
IMPORTANTE
========================

O resultado final NÃO deve parecer um anúncio produzido por uma agência. Deve parecer um vídeo que uma pessoa comum gravou espontaneamente para o TikTok depois de descobrir um produto interessante. Priorizar autenticidade acima de perfeição.

Não inventar características que o produto não possui.
Não inventar resultados.
Não fazer afirmações médicas, financeiras ou extraordinárias que não possam ser comprovadas.

O produto deve permanecer visualmente consistente durante todo o vídeo: mesma aparência, formato, embalagem, cor e características entre as cenas.

Resultado final: vídeo vertical 9:16, aproximadamente 15 a 25 segundos, UGC extremamente natural, espontâneo, convincente e nativo do TikTok.`;
}

/**
 * DEMONSTRAÇÃO — seis ângulos, um molde só.
 *
 * Este prompt é de segundo grau: ele não descreve o vídeo, ele manda a
 * ferramenta ESCREVER a descrição do vídeo a partir dos quatro campos da
 * bancada. É por isso que ele pode ser tão longo — quem lê é a máquina, e o
 * que o aluno cola depois na ferramenta de vídeo é a resposta, não isto.
 *
 * O bloco [[ANGULO]] é trocado na hora de exibir pelo ângulo escolhido (ver
 * `src/data/demo.ts`). O corpo continua com as {{variáveis}} intactas, então a
 * bancada preenche normalmente e a tela consegue marcar o que é do aluno.
 */
function demo(): string {
  return `Você é um especialista em criação de vídeos de demonstração de produtos para TikTok Shop.

Sua tarefa é criar um prompt detalhado para gerar um vídeo vertical de demonstração do produto informado.

O objetivo é mostrar visualmente, de forma rápida e extremamente clara, o produto sendo utilizado e o benefício que ele proporciona.

========================
DADOS DO PRODUTO
========================

Produto: {{produto}}
Público-alvo: {{publico}}
Principal benefício: {{beneficio}}
Tom da comunicação: {{tom}}

========================
ÂNGULO DA DEMONSTRAÇÃO
========================

[[ANGULO]]

========================
OBJETIVO DO VÍDEO
========================

Crie uma demonstração visual do produto em que a transformação seja compreendida mesmo sem áudio.

O espectador deve conseguir entender:
1. Como está a situação antes.
2. O que o produto faz.
3. Como fica a situação depois.

A demonstração deve ser simples o suficiente para ser entendida em poucos segundos. Priorize a transformação visual em vez de explicações.

Não transforme o vídeo em uma propaganda tradicional.
Não utilizar uma pessoa falando para a câmera.
Não utilizar narração.
Não depender de texto para explicar o benefício.

O produto e sua utilização devem contar a história visualmente.

========================
FORMATO
========================

Formato vertical 9:16.
Duração aproximada: 6 a 10 segundos.
Uma única cena contínua, sem cortes, sem transições, sem mudança de cenário e sem mudança de enquadramento.

A câmera deve permanecer completamente fixa durante todo o vídeo, sobre tripé ou superfície estável. Nenhum movimento de câmera.

Não utilizar: zoom · pan · tilt · travelling · câmera na mão · câmera acompanhando o produto · mudança de lente.

O enquadramento deve permanecer exatamente igual do primeiro ao último quadro.

========================
COMPOSIÇÃO
========================

Escolha uma superfície ou ambiente coerente com o uso real do produto. O ambiente deve parecer realista e cotidiano, com objetos concretos e visualmente identificáveis. Evitar cenários excessivamente produzidos.

O produto deve estar claramente visível.

Os objetos presentes no estado inicial devem permanecer consistentes durante a demonstração. Sempre que possível, manter mesma posição, mesmo tamanho, mesma iluminação, mesma superfície e mesma perspectiva antes e depois da ação.

A única mudança relevante deve ser causada pela utilização do produto.

========================
ESTADO INICIAL
========================

Descreva especificamente o estado "ANTES".

Não utilize descrições vagas como "mesa suja", "ambiente bagunçado" ou "produto sendo necessário". Descreva elementos concretos.

Exemplo do nível de detalhe esperado:
"Uma mesa branca apresenta pequenos farelos de biscoito espalhados próximos ao teclado, algumas migalhas maiores ao lado de um copo e pequenas partículas sobre a superfície."

Os elementos utilizados no "ANTES" devem ser visualmente claros e fáceis de comparar com o "DEPOIS".

========================
AÇÃO
========================

Descreva exatamente como o produto entra em ação. A ação deve acontecer dentro do enquadramento.

O movimento deve ser simples e facilmente compreendido, preferencialmente linear — da esquerda para a direita ou de cima para baixo. Evitar movimentos complexos.

O produto deve interagir fisicamente com o ambiente de maneira plausível. A velocidade da ação deve permitir que o espectador perceba o que está acontecendo.

Não criar movimentos impossíveis.
Não fazer o produto atravessar objetos.
Não fazer objetos desaparecerem magicamente.
Não utilizar efeitos visuais para simular o resultado.

O resultado deve acontecer através da própria ação do produto.

========================
ESTADO FINAL
========================

Descreva especificamente o estado "DEPOIS", usando exatamente os mesmos objetos apresentados no estado inicial sempre que possível.

A diferença entre o estado inicial e o final deve ser visualmente evidente.

Exemplo do nível de detalhe esperado:
"Após a passagem do produto, a área central da mesa está limpa, sem as migalhas anteriormente presentes. O teclado, copo e demais objetos permanecem exatamente nas mesmas posições."

Não adicionar objetos novos apenas para criar contraste.
Não remover objetos que não tenham relação com a ação.
Não alterar artificialmente o ambiente.

========================
ILUMINAÇÃO
========================

Utilizar iluminação natural e constante. A luz deve permanecer idêntica durante todo o vídeo.

Não alterar temperatura de cor, intensidade, direção da luz, sombras nem exposição. Não criar mudança de iluminação entre o "antes" e o "depois".

========================
CONSISTÊNCIA VISUAL
========================

O produto deve permanecer visualmente consistente durante toda a cena: formato, tamanho, cor, embalagem, materiais, detalhes e proporções.

Não alterar a aparência do produto durante o vídeo.

Os objetos do ambiente também devem permanecer consistentes. Não permitir que objetos mudem de posição sem uma causa física visível.

========================
MOVIMENTO
========================

Os movimentos devem obedecer à física. Mãos humanas, quando necessárias, devem se movimentar de forma natural.

O produto deve entrar e sair do enquadramento apenas se isso fizer sentido para a demonstração.

Evitar movimentos rápidos demais que dificultem a compreensão, movimentos exagerados, deformações, objetos flutuando, desaparecimentos instantâneos e duplicação de objetos.

========================
ESTRUTURA TEMPORAL
========================

0–2 segundos: mostrar claramente o estado inicial. O problema ou situação deve ser visualmente evidente.

2–6 segundos: mostrar o produto sendo utilizado. A ação principal deve acontecer de maneira clara e contínua.

6–10 segundos: mostrar o resultado final, com o enquadramento completamente parado para permitir comparação visual.

Se a duração escolhida for de 6 segundos, comprimir proporcionalmente as três etapas sem eliminar a clareza do "antes → ação → depois".

========================
ESTILO
========================

A estética deve parecer uma demonstração real de produto gravada para TikTok: realista, limpa, visualmente satisfatória, objetiva e fácil de entender sem áudio.

Evitar aparência de comercial de televisão, estética cinematográfica exagerada, efeitos especiais, gráficos, transições, texto na tela e elementos decorativos que não contribuam para a demonstração.

========================
ÁUDIO
========================

O vídeo deve funcionar sem áudio. Não utilizar narração nem diálogos.

Sons ambientes naturais podem existir. Se houver som do produto sendo utilizado, ele deve ser realista e coerente com a ação.

========================
TEXTO NA TELA
========================

Não adicionar texto, legendas, títulos, chamadas de venda nem logotipos artificiais.

A demonstração deve comunicar o benefício visualmente.

========================
REGRAS DE VERACIDADE
========================

Não invente características que não foram fornecidas.
Não invente resultados extraordinários.
Não invente números, porcentagens, tempo de funcionamento nem propriedades técnicas.
Não mostre um resultado que o produto não poderia plausivelmente produzir.

Se o benefício informado não puder ser demonstrado visualmente de maneira segura e plausível, escolha uma demonstração simples que represente a função principal do produto sem criar uma promessa falsa.

========================
PRINCÍPIO CENTRAL
========================

PROBLEMA VISÍVEL → PRODUTO EM AÇÃO → RESULTADO VISÍVEL

O espectador deve conseguir entender a transformação mesmo assistindo ao vídeo sem som.

========================
FORMATO FINAL
========================

Retorne apenas o prompt final de geração do vídeo. Não explique o raciocínio, não apresente alternativas e não escreva comentários antes ou depois do prompt.

O prompt final deve conter:
1. Descrição do cenário.
2. Estado inicial.
3. Ação do produto.
4. Estado final.
5. Câmera.
6. Iluminação.
7. Movimento.
8. Consistência visual.
9. Restrições.
10. Duração.

Crie agora o prompt final personalizado com base nos dados fornecidos.`;
}

const prompts: AiPrompt[] = [
  {
    id: 'ugc-descoberta',
    number: '01',
    title: 'Descoberta — “eu não dava nada por isso”',
    category: 'UGC',
    tool: 'vídeo por texto',
    spec: {
      format: 'UGC · pessoa + produto',
      duration: '15–25s',
      goal: 'Curiosidade + demonstração',
    },
    objective: 'A abertura que admite ceticismo. Funciona quando o produto convence pela imagem.',
    body: ugc(`Começar pela descoberta: a pessoa conta que não esperava nada do produto e mudou de ideia ao usar.

Construção do gancho: “eu não dava nada por isso até testar…”`),
    notes: [
      'Este ângulo só se sustenta se a demonstração for boa: a pessoa duvidou, então a imagem tem que responder.',
      'Gere de 3 a 4 variações e escolha pela naturalidade da fala, não pela qualidade da imagem.',
      'Corte o primeiro e o último quadro — é onde a IA entrega os defeitos de movimento.',
    ],
  },
  {
    id: 'ugc-problema-solucao',
    number: '02',
    title: 'Problema → solução',
    category: 'UGC',
    tool: 'vídeo por texto',
    spec: {
      format: 'UGC · pessoa + produto',
      duration: '15–25s',
      goal: 'Identificação + alívio',
    },
    objective: 'Para produto que resolve um incômodo específico, daqueles que o público reconhece na hora.',
    body: ugc(`Começar pelo incômodo: nomeie a situação chata que {{publico}} vive, de forma concreta, ANTES de mostrar o produto.

Construção do gancho: “se você também sofre com…”

O incômodo precisa ser algo do dia a dia, observável. Nada de problema genérico (“falta de praticidade”) nem exagerado.`),
    notes: [
      'Se você não consegue nomear o incômodo em cinco palavras, o produto provavelmente não é para este ângulo.',
      'A cena do problema tem que aparecer na tela, não só na fala — é ela que segura os 3 primeiros segundos.',
      'Nunca transforme o incômodo em problema de saúde: sai do que dá para comprovar.',
    ],
  },
  {
    id: 'ugc-demonstracao',
    number: '03',
    title: 'Demonstração — “olha o que acontece”',
    category: 'UGC',
    tool: 'vídeo por texto',
    spec: {
      format: 'UGC · pessoa + produto',
      duration: '15–25s',
      goal: 'Prova visual',
    },
    objective: 'Quando o produto se explica sozinho na tela e a fala só acompanha o que se vê.',
    body: ugc(`Começar pela ação: a primeira coisa que aparece é o produto FUNCIONANDO, em plano fechado, e a fala comenta o que está na tela.

Construção do gancho: “olha o que acontece quando…”

Nada de apresentação antes da ação. O vídeo abre no meio do movimento.`),
    notes: [
      'É o ângulo mais fácil de refazer toda semana: mesma estrutura, produto diferente.',
      'Se a demonstração não couber em um plano contínuo, o produto pede o ângulo de problema → solução.',
      'Confira a forma do produto contra a foto do fornecedor antes de publicar. A IA reinventa detalhe sem avisar.',
    ],
  },
  {
    id: 'ugc-curiosidade',
    number: '04',
    title: 'Curiosidade — “por que ninguém fala disso?”',
    category: 'UGC',
    tool: 'vídeo por texto',
    spec: {
      format: 'UGC · pessoa + produto',
      duration: '15–25s',
      goal: 'Curiosidade + descoberta',
    },
    objective: 'Para produto pouco conhecido, onde a novidade em si já é o argumento.',
    body: ugc(`Começar pela estranheza: a pessoa comenta que quase não vê ninguém usando isso, em tom de conversa.

Construção do gancho: “por que ninguém está falando disso?”

A estranheza é uma impressão pessoal, nunca um dado. Não afirmar número de vendas, tamanho de mercado, nem que o produto é novidade no país.`),
    notes: [
      'O ângulo desgasta rápido: use em produto realmente incomum, senão o público sente o truque.',
      'A promessa da abertura é uma explicação — a demonstração precisa mostrar POR QUE o produto passa batido.',
      'Nada de “ninguém conhece”, “segredo” ou “todo mundo devia ter”: a frase é curiosidade, não afirmação.',
    ],
  },
  {
    id: 'avatar-imagem-base',
    number: '05',
    title: 'Imagem base da apresentadora',
    category: 'Avatar',
    tool: 'imagem',
    output: 'avatar-json',
    objective: 'A primeira foto: define quem é a apresentadora e trava a identidade dela.',
    body: '',
    notes: [
      'Preencha a FICHA com calma: ela é a identidade e vai se repetir em toda cena. Vago aqui vira pessoa diferente na próxima foto.',
      'Gere de 4 a 6 vezes com o mesmo JSON e escolha o rosto que você vai manter. Depois de escolhido, não mexa mais na ficha.',
      'Marca registrada — sinal, tatuagem fina, óculos — ajuda mais na consistência do que descrever o rosto em detalhe.',
      'Guarde a imagem aprovada: é dela que saem as variações e os vídeos.',
    ],
  },
  {
    id: 'avatar-variacao-cena',
    number: '06',
    title: 'Nova cena com a mesma apresentadora',
    category: 'Avatar',
    tool: 'imagem',
    output: 'avatar-json',
    objective: 'Outra foto, mesma pessoa: troque só o cenário, a pose, a roupa e a luz.',
    body: '',
    notes: [
      'NÃO toque na ficha. Mude apenas os campos da cena — é isso que mantém a mesma pessoa em fotos diferentes.',
      'Uma variável por vez rende mais: mesma pose em dois cenários ensina mais que mudar tudo de uma vez.',
      'Para virar vídeo: suba a imagem numa ferramenta de animação e peça um movimento só — um sorriso leve, um giro de cabeça, levar o copo à boca. Dois movimentos entregam que é gerado.',
      'Vertical 9:16 e de 5 a 10 segundos é o formato que serve para publicar direto.',
    ],
  },
  {
    id: 'avatar-fala-20s',
    number: '07',
    title: 'Apresentação falada de 20 segundos',
    category: 'Avatar',
    tool: 'avatar falante',
    objective: 'O roteiro que o avatar vai falar — escrito para soar como pessoa, não como locutor.',
    body: `Escreva o texto falado de um vídeo vertical de 20 segundos sobre {{produto}}, para ser lido por um avatar em vídeo.

Público: {{publico}}
Tom: {{tom}}
Ponto central: {{beneficio}}

Regras de escrita:
· Frases curtas, de fôlego só. Nada de subordinada longa.
· A primeira frase precisa funcionar sozinha, sem contexto anterior.
· Fale em segunda pessoa (“você”), sem “pessoal” nem “galera”.
· Nada de superlativo (“incrível”, “revolucionário”, “o melhor”).
· NÃO invente depoimento, resultado, prazo, preço, desconto ou número de vendas. Se faltar informação, deixe a lacuna marcada como [FALTA: ...] em vez de preencher.
· Termine com uma frase de ação simples, sem gritar.

Entregue só o texto falado, em linhas separadas por pausa de respiração, sem rubrica e sem marcação de tempo.`,
    notes: [
      'Leia em voz alta antes de gerar: o que embola na sua boca vai embolar na do avatar.',
      'Troque qualquer lacuna [FALTA: ...] por informação verdadeira da página do produto — nunca por chute.',
      'Peça ao avatar uma pausa curta depois da primeira frase; é o que segura quem chegou pelo gancho.',
    ],
  },
  {
    id: 'avatar-duvida',
    number: '08',
    title: 'Resposta a uma dúvida de quem quase compra',
    category: 'Avatar',
    tool: 'avatar falante',
    objective: 'Um vídeo por objeção — o formato que rende mais material com menos ideia nova.',
    body: `Você vai escrever a fala de um vídeo curto que responde UMA dúvida sobre {{produto}}.

Contexto: quem assiste é de {{publico}} e já entendeu o que o produto faz — está travado numa dúvida antes de decidir.

Dúvida a responder: [ESCREVA AQUI A DÚVIDA REAL, com as palavras que aparecem nos comentários]

Estrutura da fala (20 a 25 segundos):
1. Repita a dúvida em voz alta, quase igual às palavras de quem perguntou.
2. Responda direto, na primeira frase depois disso. Sem rodeio.
3. Dê o detalhe concreto que sustenta a resposta — o que se vê, se sente ou se mede no produto.
4. Diga honestamente para quem NÃO serve. Isso é o que faz a resposta soar verdadeira.
5. Feche com o que fazer agora.

Tom: {{tom}}.
Proibido: promessa de resultado, número inventado, comparação com marca real, urgência artificial.`,
    notes: [
      'Tire as dúvidas dos comentários dos seus próprios vídeos e da aba de perguntas do produto — não invente a pergunta.',
      'O passo 4 parece que derruba a venda e é justamente o que a segura. Não corte na edição.',
      'Um vídeo por dúvida. Duas dúvidas no mesmo vídeo não respondem nenhuma.',
    ],
  },

  {
    id: 'demo-antes-depois',
    number: '09',
    title: 'Demonstração — Antes → Depois',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'antes-depois',
    spec: {
      format: 'Demonstração · Antes → Depois',
      duration: '6–10s · plano único',
      goal: 'A transformação lado a lado, no mesmo enquadramento',
    },
    objective: 'O ângulo mais forte quando o produto muda o estado visível de alguma coisa.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'Se o "antes" vier vago na resposta, devolva pedindo objetos concretos — vago aqui vira vídeo confuso lá.',
      'Confira se o depois manteve os mesmos objetos nas mesmas posições. É isso que faz a comparação funcionar.',
    ],
  },
  {
    id: 'demo-em-funcionamento',
    number: '10',
    title: 'Demonstração — Produto em funcionamento',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'em-funcionamento',
    spec: {
      format: 'Demonstração · Produto em funcionamento',
      duration: '6–10s · plano único',
      goal: 'O mecanismo acontecendo, em plano fechado',
    },
    objective: 'Para produto cujo interesse está no que ele faz enquanto está ligado ou em uso.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'Peça o plano bem fechado: mecanismo pequeno em tela de celular precisa ocupar espaço.',
      'Gere de 4 a 6 variações — movimento é onde a IA erra mais, e a maioria sai descartada.',
    ],
  },
  {
    id: 'demo-problema-solucao',
    number: '11',
    title: 'Demonstração — Problema → Solução',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'problema-solucao',
    spec: {
      format: 'Demonstração · Problema → Solução',
      duration: '6–10s · plano único',
      goal: 'O incômodo aparece primeiro, o produto entra depois',
    },
    objective: 'Quando o benefício é o fim de um incômodo que dá para ver acontecendo.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'O incômodo tem que APARECER acontecendo. Mostrar o resultado do incômodo não segura os 3 primeiros segundos.',
      'Se o problema não couber em um plano fixo, o produto pede o ângulo de antes → depois.',
    ],
  },
  {
    id: 'demo-comparacao',
    number: '12',
    title: 'Demonstração — Comparação',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'comparacao',
    spec: {
      format: 'Demonstração · Comparação',
      duration: '6–10s · plano único',
      goal: 'O jeito de sempre ao lado do jeito com o produto',
    },
    objective: 'Para benefício que se define por oposição ao método que a pessoa já usa.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'Nunca ponha marca real do outro lado da comparação. Método genérico, nunca concorrente identificável.',
      'Se a resposta inventar diferença de tempo ou de quantidade, apague a frase antes de gerar o vídeo.',
    ],
  },
  {
    id: 'demo-detalhe',
    number: '13',
    title: 'Demonstração — Detalhe / funcionalidade',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'detalhe',
    spec: {
      format: 'Demonstração · Detalhe / funcionalidade',
      duration: '6–10s · plano único',
      goal: 'A parte específica que resolve, bem de perto',
    },
    objective: 'Quando o que vende é uma peça do produto: o encaixe, a trava, a dobra, a divisória.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'Compare a peça com a foto real do fornecedor. Detalhe é justamente onde a IA inventa.',
      'Este ângulo combina com o gancho de tipo Detalhe, da biblioteca de ganchos.',
    ],
  },
  {
    id: 'demo-teste-visual',
    number: '14',
    title: 'Demonstração — Teste visual',
    category: 'Demonstração',
    tool: 'vídeo por texto',
    output: 'demo',
    angle: 'teste-visual',
    spec: {
      format: 'Demonstração · Teste visual',
      duration: '6–10s · plano único',
      goal: 'Uma prova simples acontecendo na frente da câmera',
    },
    objective: 'Para benefício do tipo que se prova: aguenta, não vaza, resiste, sustenta.',
    body: demo(),
    notes: [
      'A resposta da IA é o prompt do vídeo. Cole ELA na ferramenta de vídeo, não este texto.',
      'O teste tem que ser do tamanho do produto. Teste exagerado vira promessa que você não pode sustentar.',
      'Se você não faria esse teste ao vivo com o produto na mão, não peça o vídeo dele.',
    ],
  },

  {
    id: 'gancho-dez-aberturas',
    number: '15',
    title: 'Pacote de 10 ganchos para testar',
    category: 'Gancho',
    tool: 'texto',
    output: 'ganchos',
    spec: {
      format: 'Pacote de testes · 10 aberturas',
      duration: '≤ 3s cada · até 12 palavras',
      goal: 'Interromper o scroll',
    },
    objective: 'Dez primeiras frases, duas de cada tipo, para testar no mesmo vídeo.',
    body: `Você é um especialista em criação de ganchos para vídeos curtos de TikTok Shop.

Sua tarefa é criar 10 ganchos altamente testáveis para um vídeo vertical sobre o produto informado.

========================
DADOS DO PRODUTO
========================

Produto: {{produto}}
Público-alvo: {{publico}}
Principal benefício: {{beneficio}}
Tom da comunicação: {{tom}}

========================
OBJETIVO
========================

Criar 10 primeiras frases capazes de interromper o scroll e fazer a pessoa querer continuar assistindo.

O gancho precisa funcionar sozinho nos primeiros segundos do vídeo. A pessoa deve entender imediatamente que existe algo interessante por trás daquela frase.

Não explique o produto completamente no gancho. O objetivo do gancho é criar atenção e curiosidade suficiente para justificar os próximos segundos.

========================
ESTRUTURA DOS GANCHOS
========================

Crie exatamente 10 ganchos, distribuídos entre 5 categorias, 2 variações de cada, NESTA ORDEM:

1. SITUAÇÃO RECONHECÍVEL
Comece com uma situação que o público provavelmente já vivenciou.
Estruturas possíveis: "Se você também…" · "Quando você…" · "Eu estava cansado de…" · "Se isso também acontece com você…"

2. CONTRASTE
Apresente uma diferença entre o jeito tradicional de resolver algo e uma alternativa relacionada ao produto.
Estruturas possíveis: "Eu fazia [X] assim… até descobrir…" · "Em vez de [X], eu comecei a…" · "Eu achava que precisava de [X], mas…"

3. DETALHE ESPECÍFICO
Comece por uma característica concreta, visual ou funcional do produto que desperte interesse. Não invente características.
Estruturas possíveis: "Olha esse detalhe…" · "Uma coisa que eu gostei nesse produto foi…" · "Repara no que acontece quando…"

4. PERGUNTA
Faça uma pergunta que o público consiga responder mentalmente, relacionada diretamente ao problema, desejo ou benefício do produto.
Estruturas possíveis: "Você também…" · "Por que continuar fazendo [X] se…" · "Você sabia que existe uma forma de…"

5. MEIO DA CONVERSA
Comece como se o vídeo já estivesse acontecendo. A frase deve parecer parte de uma conversa espontânea, sem introdução formal.
Estruturas possíveis: "…e foi aí que eu percebi." · "…só depois eu entendi por que isso funciona." · "Eu não esperava que fosse tão…" · "Foi justamente essa parte que me chamou atenção."

========================
REGRAS DE ATENÇÃO
========================

Cada gancho deve:
· Ter no máximo 12 palavras.
· Poder ser falado em aproximadamente 3 segundos.
· Funcionar sem contexto anterior.
· Ser fácil de falar naturalmente.
· Soar como uma pessoa real falando, não como copy publicitária.
· Criar curiosidade sem depender de clickbait enganoso.
· Estar relacionado ao produto ou ao problema que ele resolve.
· Ser diferente dos outros 9 ganchos.

Priorize frases curtas. Evite construções complexas e palavras excessivamente formais. Escreva em português brasileiro natural.

========================
O QUE NÃO FAZER
========================

NÃO use: "dica de ouro" · "ninguém te conta" · "segredo que…" · "isso vai mudar sua vida" · "você precisa ver isso" · "pare tudo" · "corre" · "última chance" · "antes que seja tarde" · "o algoritmo não quer que você saiba".

NÃO invente: números · porcentagens · resultados · quantidade de vendas · valores economizados · prazos · depoimentos · opiniões de terceiros · características que não foram fornecidas.

Não faça promessas de resultado. Não utilize urgência falsa. Não use clickbait que prometa algo que o vídeo não entrega.

========================
QUALIDADE
========================

Antes de entregar, revise cada gancho e pergunte:

1. Eu pararia para ouvir os próximos segundos?
2. A frase soa como algo que uma pessoa realmente falaria?
3. Existe uma razão para continuar assistindo?
4. O gancho está relacionado ao produto?
5. Ele é diferente dos outros?
6. Ele pode ser falado rapidamente?
7. Ele evita promessas ou informações inventadas?

Se algum gancho falhar em qualquer um desses pontos, substitua-o.

========================
FORMATO DA RESPOSTA
========================

Entregue exatamente 10 ganchos, em português brasileiro, na ordem das categorias acima.

Não explique as escolhas. Não coloque introdução. Não coloque conclusão.

Use este formato, um por linha:

01. [gancho]
02. [gancho]
03. [gancho]
04. [gancho]
05. [gancho]
06. [gancho]
07. [gancho]
08. [gancho]
09. [gancho]
10. [gancho]`,
    notes: [
      'Cole a resposta no campo do pacote, aqui embaixo: a tela separa os dez por tipo e dá um botão de copiar em cada.',
      'Grave o mesmo vídeo com três aberturas diferentes e publique separado. É o teste mais barato que existe.',
      'Descarte de cara qualquer gancho que caberia em qualquer produto — gancho genérico não é gancho.',
      'Anote no Painel de consistência qual gancho você usou em cada publicação; sem isso o teste não vira aprendizado.',
    ],
  },
  {
    id: 'pov-cabide',
    number: '16',
    title: 'Cabide de loja',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'A cena mais fácil de repetir: a peça no cabide, girando devagar.',
    body: `POV, hands holding {{ITEM}} on a hanger, slight natural sway, showing the piece front and back`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-manequim',
    number: '17',
    title: 'Manequim na loja',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Mostra caimento sem ninguém vestir — bom para peça estruturada.',
    body: `POV, {{ITEM}} on a front mannequin, hands adjusting the fabric, focus on fit and stitching`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-cama',
    number: '18',
    title: 'Em cima da cama',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'A mais caseira das dez. Funciona porque parece o que a pessoa faria.',
    body: `POV, {{ITEM}} laid on a neat bed, hands smoothing the fabric, folding and showing texture`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-mesa',
    number: '19',
    title: 'Mesa de madeira',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Fundo limpo, foco total na peça. Boa para o primeiro vídeo de um produto.',
    body: `POV, {{ITEM}} on a wooden table, hands gently pulling the fabric to show stretch and details`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-provador',
    number: '20',
    title: 'Provador',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Espelho, do pescoço para baixo. Mostra tamanho real sem mostrar rosto.',
    body: `POV mirror view in a fitting room, framing only torso and clothing, no face visible, holding {{ITEM}} against the body, small natural adjustments`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-unboxing',
    number: '21',
    title: 'Tirando do pacote',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'O momento que mais prende: a peça saindo da embalagem.',
    body: `POV opening a package, taking out {{ITEM}}, light shake to show the fabric flow, close camera`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-corpo',
    number: '22',
    title: 'Vestindo, sem rosto',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Do pescoço para baixo, com movimento leve. A que mais mostra caimento.',
    body: `POV, partially wearing {{ITEM}}, framing from neck down only, no face visible, slight natural body turns, hands occasionally adjusting the clothing`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-tecido',
    number: '23',
    title: 'Close no tecido',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Para peça cujo valor está no material. Mão amassando e esticando.',
    body: `POV, hands bringing {{ITEM}} very close to the camera, casual handling, light rubbing and stretching to show texture and thickness, focus on stitching and seams`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-espelho',
    number: '24',
    title: 'Look no espelho',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'O clássico do feed. Espelho de casa, enquadramento levemente torto.',
    body: `POV mirror shot, wearing {{ITEM}}, framing from neck down only, no face visible, small natural movements like turning and adjusting, casual posture`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
  {
    id: 'pov-andando',
    number: '25',
    title: 'Andando com a peça',
    category: 'Estilo POV',
    tool: 'vídeo por texto',
    output: 'pov',
    objective: 'Mostra o tecido em movimento — o que foto nenhuma mostra.',
    body: `POV walking while wearing {{ITEM}}, light camera movement, focus on the fabric motion`,
    notes: [
      'Suba a foto do produto junto com o prompt: o gerador usa ela como referência da peça.',
      'Gere de 3 a 4 vezes e escolha pelo tecido. É onde a IA erra primeiro.',
      'Trocar só a CENA e manter os ajustes rende dez vídeos do mesmo produto — é a escala vertical do módulo 08.',
      'Nada de rosto, nada de legenda queimada. As duas coisas estão proibidas dentro do prompt.',
    ],
  },
];

/**
 * GANCHOS EXCLUSIVOS DA VERSÃO COMPLETA
 * ============================================================================
 * Somam-se aos 20 de src/data/hooks.ts, que estão nas duas versões — 20 no
 * Essencial, 50 no Completo. A numeração continua de onde a base parou (21).
 *
 * As regras de escrita e a taxonomia dos tipos estão documentadas em hooks.ts.
 * Não copie nada daqui para lá: é essa separação que faz o bloqueio ser real.
 */
const extraHooks: Hook[] = [
  /* ---------------------------------------------------- Situação ---------- */
  { id: 'h21', number: '21', kind: 'Situação', text: 'Aquele momento em que [isso] acontece bem na hora errada.' },
  { id: 'h22', number: '22', kind: 'Situação', text: 'Convivi com [esse problema] achando que era normal.' },
  { id: 'h23', number: '23', kind: 'Situação', text: 'Se a sua [gaveta] também é assim, isso é pra você.' },
  { id: 'h24', number: '24', kind: 'Situação', text: 'Chega uma hora que [aquilo] cansa mais do que dá trabalho.' },
  { id: 'h25', number: '25', kind: 'Situação', text: 'Comecei a reparar nisso e não consegui mais ignorar.' },
  { id: 'h26', number: '26', kind: 'Situação', text: 'Dá pra [fazer isso] sem virar tarefa de domingo.' },

  /* ---------------------------------------------------- Contraste --------- */
  { id: 'h27', number: '27', kind: 'Contraste', text: 'Todo mundo compra [a versão comum]. Eu testei a outra.' },
  { id: 'h28', number: '28', kind: 'Contraste', text: 'Eu achava que [o caro] valia mais. Testei os dois.' },
  { id: 'h29', number: '29', kind: 'Contraste', text: 'Não é sobre gastar mais. É sobre [o detalhe certo].' },
  { id: 'h30', number: '30', kind: 'Contraste', text: 'O que eu usava antes fazia isso. O de agora, isso.' },
  { id: 'h31', number: '31', kind: 'Contraste', text: 'Mesma função, dois preços. Olha a diferença.' },
  { id: 'h32', number: '32', kind: 'Contraste', text: 'Um resolve e some. O outro só parece melhor.' },

  /* ---------------------------------------------------- Detalhe ----------- */
  { id: 'h33', number: '33', kind: 'Detalhe', text: 'Olha o tamanho disso perto de [algo do dia a dia].' },
  { id: 'h34', number: '34', kind: 'Detalhe', text: 'Presta atenção no que acontece quando eu [faço isso].' },
  { id: 'h35', number: '35', kind: 'Detalhe', text: 'Ninguém repara nisso na foto do anúncio.' },
  { id: 'h36', number: '36', kind: 'Detalhe', text: 'Essa dobra aqui resolve [o problema] inteiro.' },
  { id: 'h37', number: '37', kind: 'Detalhe', text: 'Você só entende [isso] quando pega na mão.' },
  { id: 'h38', number: '38', kind: 'Detalhe', text: 'Três segundos pra te mostrar por que funciona.' },

  /* ---------------------------------------------------- Pergunta ---------- */
  { id: 'h39', number: '39', kind: 'Pergunta', text: 'Quanto tempo por semana você gasta com [essa tarefa]?' },
  { id: 'h40', number: '40', kind: 'Pergunta', text: 'Você faria [essa troca] por menos de um lanche?' },
  { id: 'h41', number: '41', kind: 'Pergunta', text: 'Quando foi a última vez que [isso] deu certo de primeira?' },
  { id: 'h42', number: '42', kind: 'Pergunta', text: 'Isso resolve [o problema]. Cabe na sua casa?' },
  { id: 'h43', number: '43', kind: 'Pergunta', text: 'Você prefere [uma coisa] ou [a outra]?' },
  { id: 'h44', number: '44', kind: 'Pergunta', text: 'Se tivesse um jeito mais simples, você trocaria?' },

  /* ---------------------------------------------- Meio da conversa -------- */
  { id: 'h45', number: '45', kind: 'Meio da conversa', text: 'Então, sobre aquilo que eu falei de [tema] — chegou.' },
  { id: 'h46', number: '46', kind: 'Meio da conversa', text: 'Aí você me pergunta: mas funciona mesmo? Olha.' },
  { id: 'h47', number: '47', kind: 'Meio da conversa', text: 'Segunda parte disso aqui, porque me pediram.' },
  { id: 'h48', number: '48', kind: 'Meio da conversa', text: 'Deixa eu terminar de mostrar [aquilo] que ficou pela metade.' },
  { id: 'h49', number: '49', kind: 'Meio da conversa', text: 'Ah, e tem mais uma coisa sobre [esse produto].' },
  { id: 'h50', number: '50', kind: 'Meio da conversa', text: 'Continuando de onde eu parei: [o resultado] é esse.' },
];

export const planContent: PlanContent = {
  plan: 'complete',
  prompts,
  extraHooks,
  contentLibrary: [],
};
