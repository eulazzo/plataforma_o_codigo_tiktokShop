# O Código TikTok Shop — Área do aluno

MVP front-end da área de conteúdo. React + Vite + TypeScript, sem backend.

> **Escopo desta fase (Fase 1):** casca da aplicação, navegação, camada de dados,
> Início, Plano de 7 dias e Módulos. As demais áreas aparecem na navegação
> marcadas como "em breve" — desativadas, nunca como link quebrado.

---

## Rodar

```bash
npm install
npm run dev              # versão Completa (padrão)
npm run dev:essential    # versão Essencial
```

Abre em `http://localhost:5173`.

## Gerar os arquivos para publicar

```bash
npm run build            # gera as duas versões
npm run build:essential  # → dist/essential
npm run build:complete   # → dist/complete
```

Cada pasta em `dist/` é um site estático completo. Sobe em qualquer lugar
(Netlify, Vercel, Hostinger) sem configuração de servidor: as rotas são por hash
e os caminhos dos arquivos são relativos, então funciona inclusive dentro de um
subdiretório de nome não óbvio — `seudominio.com/a7f3c2/` — o que já reduz o
link ser descoberto por acaso.

## Verificar antes de publicar

```bash
npm run typecheck   # erros de tipo
npm run smoke       # monta cada página em Node e acusa erro de runtime
```

---

## Como as duas versões funcionam

A separação é **de build, não de tela**. O alias `@plan-content` (em
`vite.config.ts`) resolve para um arquivo diferente conforme a variável `PLAN`:

| Build | Arquivo carregado |
|---|---|
| `PLAN=essential` | `src/data/plan-content.essential.ts` |
| `PLAN=complete` | `src/data/plan-content.complete.ts` |

O material exclusivo da versão Completa mora só no segundo arquivo e **não entra
no bundle da versão Essencial**. Não é uma tela de bloqueio por cima do
conteúdo: o conteúdo não está lá. Ninguém destrava pelo DevTools.

Por isso: nunca copie conteúdo do `plan-content.complete.ts` para o
`plan-content.essential.ts`.

No código, use `isComplete` / `isEssential` de `src/plan.ts` para decidir o que
mostrar. Como são constantes de build, o Vite remove os trechos não usados.

---

## Onde fica cada conteúdo

Tudo que é texto vive em `src/data/` — dá para editar sem tocar em componente:

| Arquivo | O que contém |
|---|---|
| `sevenDayPlan.ts` | Os 7 dias: título, resumo, objetivos e checklist de cada um |
| `modules.ts` | Os 8 módulos e o conteúdo de cada aula |
| `contentLibrary.ts` | Estruturas de roteiro da biblioteca de conteúdo |
| `navigation.ts` | Itens do menu e quais já estão prontos |
| `plan-content.complete.ts` | Prompts, ganchos extras e biblioteca (Fase 2) |
| `types.ts` | Formato dos dados |

### Escrever o conteúdo de um módulo

Em `modules.ts`, cada módulo tem uma lista de `blocks`. Os blocos
`{ kind: 'placeholder' }` aparecem na tela como espaço reservado, mostrando o
roteiro do que vai ali. Troque por conteúdo real conforme escrever:

```ts
{ kind: 'text',    id: 'm1b1', title: 'Como funciona', body: ['parágrafo', 'outro'] }
{ kind: 'list',    id: 'm1b2', title: 'O que observar', items: ['item', 'item'] }
{ kind: 'callout', id: 'm1b3', title: 'Atenção', body: 'texto', tone: 'warn' }
```

O índice lateral ("Nesta aula") se monta sozinho a partir dos títulos dos blocos.

**Antes de entregar para compradores, não deve restar nenhum bloco
`placeholder`** — eles existem para deixar explícito o que falta escrever, em
vez de preencher com texto genérico que parece pronto.

### Estruturas de conteúdo

Em `contentLibrary.ts`, cada formato é uma sequência de trechos (`beats`) com
duração em segundos. A tela desenha a "anatomia do vídeo" a partir disso: os
blocos se dimensionam sozinhos pela duração, e as cores caminham do ciano ao
magenta ao longo do roteiro. Mexer no `seconds` de um trecho redesenha tudo —
não há nada para acertar à mão.

O botão "Copiar roteiro" gera um molde com os tempos e as instruções de
preenchimento. É um template para a pessoa completar, não um roteiro pronto.

O campo `example` é uma frase de abertura que mostra o tom do formato. É
material de escrita, como os ganchos do bônus — uma frase modelo não afirma nada
sobre o mundo. O que continua proibido é inventar depoimento, resultado ou
número apresentado como prova.

A biblioteca base está nas duas versões. As estruturas exclusivas da Completa
entram por `contentLibrary` em `plan-content.complete.ts` e se somam à base.

### Capa do módulo

Salve a imagem em `public/modulos/` com o nome já reservado no código:
`modulo-01.jpg` até `modulo-08.jpg`. Ela aparece sozinha, sem mexer em nada.

Proporção 16:10, sugestão de 1200 × 750 px, abaixo de 200 KB — são 8 imagens
carregando na mesma tela. Detalhes em `public/modulos/LEIA-ME.md`.

Sem imagem, o card mostra uma capa tipográfica gerada: o número do módulo sobre
um degradê próprio, indo do ciano ao magenta ao longo dos oito. É um estado
desenhado, não uma imagem quebrada — dá para lançar sem capa nenhuma.

### Audiobook por módulo

Coloque o MP3 em `public/audio/` e aponte no módulo:

```ts
{ id: 'entenda-o-modelo', number: '01', audio: 'modulo-01.mp3', /* ... */ }
```

O player aparece abaixo do título do módulo, com play, barra de progresso e
velocidade (1x / 1.25x / 1.5x). Ele baixa só os metadados até a pessoa dar play,
e some sozinho se o arquivo não existir — a página nunca quebra por falta de
áudio. Sem o campo `audio`, nem aparece.

### Regras de conteúdo

Valem aqui como valem na landing page:

- nada de promessa de ganho, prazo de venda ou resultado garantido;
- nada de depoimento, estatística de mercado ou notícia inventada;
- o plano de 7 dias é prazo de **implementação**, não de venda.

---

## Acesso do aluno

A plataforma abre numa tela de entrada com **uma credencial compartilhada por
todos os alunos**, definida em `src/data/access.ts`:

```ts
email:    'user_ocodigotikok@gmail.com'
password: 'ocodigotikokuser450'
```

Envie esses dados por e-mail depois da compra — a Kiwify/Hotmart faz isso
automaticamente na entrega do produto.

Para trocar o acesso: edite o arquivo, rode o build, publique e mande a
credencial nova. Quem já entrou continua entrando até limpar o navegador; sem
backend não há como expulsar ninguém.

### O que essa tela é e o que não é

É a porta de entrada do produto e a cerimônia de "comprei, recebi meu acesso".
Também cria um atrito a mais contra o link ser colado num grupo qualquer.

**Não é segurança.** A validação roda no navegador e a senha está no código da
página — quem quiser entrar sem comprar, entra. Por isso a tela de login não diz
"área protegida", não mostra cadeado e não fala em conexão segura: não
prometemos o que não entregamos.

Vale lembrar que um PDF vaza tão fácil quanto — mais, até, por ser um arquivo
só. O vetor de vazamento é a URL circular, não a senha.

Se um dia quiser controle de acesso real sem construir backend, o caminho é
Cloudflare Access (login por código no e-mail, com lista de e-mails liberados)
por cima da hospedagem.

---

## Estrutura

```
src/
  data/           conteúdo e configuração (é aqui que você edita)
  hooks/          progresso do aluno (localStorage)
  components/
    layout/       sidebar, topbar, navegação mobile, casca
    ui/           botão, ícones, medidor, checkbox, toast, placeholder
    cards/        card de dia e card de módulo
  pages/          uma por rota
  plan.ts         versão do produto deste build
  styles/         tokens de design e CSS global
scripts/          run.mjs (dev/build por versão) e smoke.mjs (teste)
```

### Adicionar uma área nova (Fase 2)

1. crie a página em `src/pages`;
2. registre a `<Route>` em `src/App.tsx`;
3. troque o `status` do item para `'ready'` em `src/data/navigation.ts`.

O item sai de "em breve" e vira link ativo na sidebar e na folha "Mais" do
celular.

---

## Design

- **Tipografia:** Bricolage Grotesque (títulos), Manrope (texto), IBM Plex Mono
  (números e etiquetas).
- **Cor:** tema escuro alinhado à landing — fundo quase preto, ciano como acento
  principal, magenta reservado para o que exige atenção. Todas as cores vivem em
  `src/styles/tokens.css`; nenhum componente tem cor fixa, então trocar de tema é
  mexer só nesse arquivo.
- **Assinatura:** o medidor de progresso é sempre 7 segmentos, um por dia — em
  qualquer tela você lê "7 dias" antes de ler o número.
