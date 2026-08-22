# Bastidores — vídeos

Coloque aqui os arquivos dos vídeos que aparecem na área **Bastidores**.

## Como publicar um vídeo

1. Salve o arquivo nesta pasta, em **MP4** (H.264 + AAC — é o que todo navegador
   toca). Ex.: `video-01.mp4`.
2. Se quiser controlar o primeiro quadro, salve também uma imagem de capa com o
   mesmo nome: `video-01.jpg`.
3. Em `src/data/backstage.ts`, no item correspondente:
   - `video: 'video-01.mp4'`
   - `poster: 'video-01.jpg'` (opcional)
   - `prompt`: cole o texto **exato** que você usou na ferramenta
   - `notes`: o que reparar naquele vídeo
   - apague o `draft: true`

Enquanto `video` estiver vazio, o card mostra o espaço reservado — nunca um
player quebrado. Enquanto `draft: true` estiver lá, o card aparece etiquetado
como estrutura de exemplo e o botão de copiar fica desligado.

## Peso dos arquivos

Não há servidor de vídeo aqui: o arquivo é baixado direto da hospedagem. Vídeo
vertical de 30s bem exportado fica entre 3 e 8 MB. Acima de ~15 MB por arquivo,
vale usar um serviço de vídeo e trocar o `<video>` por um incorporado.

## O que NÃO vai no card

Número de faturamento. Não existe campo para isso na estrutura, de propósito —
a mesma regra que vale para depoimento e notícia no resto do produto.
