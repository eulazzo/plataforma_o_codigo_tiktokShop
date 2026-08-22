import type { PovSettings } from './types';

/**
 * MONTADOR DE VÍDEO POV
 * ============================================================================
 * Todo prompt de POV que funciona tem a mesma anatomia, em três blocos:
 *
 *   1. A CENA        — o que as mãos fazem, o enquadramento. Muda a cada vídeo.
 *   2. O ACABAMENTO  — sem voz, sem legenda, 4K, celular na mão, foco rápido,
 *                      textura de tecido, estética UGC. É o mesmo sempre.
 *   3. O FORMATO     — vertical 9:16, produto inteiro no quadro. É o mesmo
 *                      sempre.
 *
 * Dois terços do prompt são constantes. Pedir isso ao aluno a cada vídeo seria
 * cobrar digitação por um valor que nunca muda — então os blocos 2 e 3 ficam
 * aqui, e o que ele preenche é a peça, o lugar, a luz, a câmera e o tecido.
 *
 * O texto sai em inglês porque é a língua em que os geradores de vídeo foram
 * treinados e a que responde melhor. Os campos livres passam do jeito que o
 * aluno escrever — misturar português neles funciona.
 */

interface Option {
  label: string;
  value: string;
}

/** Onde o vídeo acontece. Complementa a cena, não a substitui. */
export const POV_PLACES: Option[] = [
  { label: 'Loja', value: 'inside a clothing store' },
  { label: 'Quarto', value: 'in a simple bedroom' },
  { label: 'Sala de casa', value: 'in a everyday home living room' },
  { label: 'Provador', value: 'in a fitting room' },
  { label: 'Mesa simples', value: 'on a plain table at home' },
  { label: 'Rua', value: 'outdoors on a sidewalk' },
];

export const POV_LIGHTS: Option[] = [
  { label: 'Luz natural de dia', value: 'natural daylight, neutral lighting, correct white balance' },
  { label: 'Luz difusa e suave', value: 'soft diffused light, accurate colors, no warm tones' },
  { label: 'Luz de loja', value: 'realistic ambient store lighting, balanced white tones' },
  { label: 'Alto contraste', value: 'high contrast lighting, strong highlights on the product' },
  { label: 'Luz de estúdio', value: 'studio lighting, even and controlled' },
];

export const POV_CAMERAS: Option[] = [
  { label: 'Parada', value: 'static camera, slight natural sway' },
  { label: 'Na mão, leve', value: 'handheld, slight natural shake' },
  { label: 'Na mão, dinâmica', value: 'handheld with dynamic movement, slightly messy motion' },
];

export const POV_FABRICS: Option[] = [
  { label: 'Genérico', value: 'sharp fabric texture' },
  { label: 'Algodão', value: 'cotton texture, visible weave' },
  { label: 'Jeans', value: 'denim texture, visible stitching' },
  { label: 'Malha', value: 'knit texture, soft drape' },
  { label: 'Cetim ou seda', value: 'satin texture, soft sheen' },
  { label: 'Moletom', value: 'fleece texture, thick and soft' },
];

export const EMPTY_POV: PovSettings = {
  item: '',
  place: POV_PLACES[0].value,
  light: POV_LIGHTS[0].value,
  camera: POV_CAMERAS[1].value,
  fabric: POV_FABRICS[0].value,
  extra: '',
};

/* ---------------------------------------------------------------------------
   Os blocos que não mudam
   --------------------------------------------------------------------------- */

/**
 * Bloco 2 — acabamento. As negativas vêm primeiro de propósito: gerador de
 * vídeo tende a inventar locução e legenda se ninguém proibir, e legenda
 * queimada na imagem estraga o vídeo inteiro.
 */
const FINISH = [
  'no audio, no voiceover, no narration, no subtitles, no text on screen',
  'ultra realistic, 4K, high detail, sharp focus',
  'handheld smartphone recording, slight natural shake, fast autofocus',
  '{{FABRIC}}',
  'realistic motion, clean and not staged composition',
  'social media style, brazilian UGC',
];

/** Bloco 3 — formato. Vertical, produto inteiro, sem corte. */
const FORMAT =
  'vertical video, 9:16 aspect ratio, centered framing, mobile format, product always fully visible, no cropping';

/** Quando a peça não foi escrita ainda. */
const ITEM_FALLBACK = 'the clothing item';

/**
 * Monta o prompt final a partir da cena e dos ajustes.
 *
 * A cena vem do prompt escolhido e traz {{ITEM}} onde a peça entra. O resto é
 * concatenado sempre na mesma ordem — cena, lugar, câmera, luz, extra —
 * porque ordem estável ajuda o modelo a atribuir cada trecho ao que ele
 * descreve.
 */
export function buildPovPrompt(scene: string, settings: PovSettings): string {
  const item = settings.item.trim() || ITEM_FALLBACK;

  const shot = [
    scene.replace(/\{\{ITEM\}\}/g, item),
    settings.place,
    settings.camera,
    settings.light,
    settings.extra.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  const finish = FINISH.map((line) => line.replace('{{FABRIC}}', settings.fabric)).join(', ');

  return `${shot}.\n\n${finish}.\n\n${FORMAT}.`;
}

/** A peça é o único campo obrigatório: sem ela o vídeo é de "uma roupa". */
export function povIsReady(settings: PovSettings): boolean {
  return settings.item.trim() !== '';
}
