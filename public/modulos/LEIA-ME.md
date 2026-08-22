# Capas dos módulos

Coloque aqui as imagens de capa. Os nomes já estão reservados no código
(`src/data/modules.ts`, campo `cover`) — basta salvar o arquivo com o nome
correspondente e ele aparece, sem mexer em código nenhum.

| Arquivo | Módulo |
|---|---|
| `modulo-01.jpg` | 01 — Entenda o modelo |
| `modulo-02.jpg` | 02 — Prepare sua operação |
| `modulo-03.jpg` | 03 — Escolha produtos melhores |
| `modulo-04.jpg` | 04 — Crie conteúdo sem aparecer |
| `modulo-05.jpg` | 05 — Aprenda a testar |
| `modulo-06.jpg` | 06 — Entenda as vendas |
| `modulo-07.jpg` | 07 — Evite erros |
| `modulo-08.jpg` | 08 — Execute por 7 dias |

## Especificação

- **Proporção:** 16:10. O card corta o excesso pelo centro (`object-fit: cover`),
  então evite informação importante nas bordas.
- **Tamanho sugerido:** 1200 × 750 px. Acima disso só pesa o carregamento.
- **Formato:** JPG ou WebP. Para usar WebP, troque a extensão no campo `cover`
  do módulo.
- **Peso:** mire abaixo de 200 KB por imagem — são 8 carregando na mesma tela.
- **Legibilidade:** uma etiqueta escura com "Módulo 0X" fica sobre o canto
  inferior esquerdo da capa. Se a imagem for muito clara ali, o texto some.

## Enquanto não houver imagem

O card mostra uma capa tipográfica gerada: o número do módulo sobre um degradê
próprio, indo do ciano ao magenta ao longo dos oito. Não é imagem quebrada — é
um estado desenhado, e some sozinho quando o arquivo aparecer na pasta.

## Onde a capa aparece

O mesmo arquivo é usado em dois lugares:

- no **card do módulo**, na tela de módulos (recorte 16:10);
- no **topo da tela do módulo**, quando o aluno abre (recorte 16:9).

Como os recortes são diferentes, deixe o assunto principal no centro. Texto
colado nas bordas pode ser cortado num dos dois.

Enquanto o arquivo não existir, a capa gerada (numeral sobre degradê) assume
no card e a tela do módulo abre sem capa. Nenhum dos dois mostra imagem
quebrada: o tratamento de erro devolve o estado anterior.
