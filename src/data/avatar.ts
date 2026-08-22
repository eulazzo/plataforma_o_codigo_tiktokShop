/**
 * MONTADOR DE AVATAR — prompt em JSON
 * ============================================================================
 * Gerador de imagem responde melhor a JSON estruturado do que a texto corrido:
 * a chave nomeia o que a descrição está descrevendo, e o modelo para de
 * misturar o que é roupa com o que é cenário.
 *
 * MAS O MOTIVO PRINCIPAL É OUTRO, e é o que faz a técnica funcionar de verdade:
 * o bloco `subject` precisa sair IDÊNTICO em toda geração. É ele que trava a
 * identidade da apresentadora. Se você redigitar "loira platinada" com outras
 * palavras na segunda cena, volta outra pessoa.
 *
 * Por isso a tela separa em dois:
 *   · FICHA — preenchida uma vez e guardada. Vira o `subject`, sempre igual.
 *   · CENA  — preenchida a cada geração. Vira todo o resto.
 *
 * O que o aluno NÃO preenche são os blocos de câmera e de renderização: são os
 * mesmos em toda foto de celular realista, e pedir isso a cada cena seria
 * cobrar trabalho por um valor que nunca muda.
 */

import type { AvatarSheet, AvatarShot } from './types';

interface FieldDef<K> {
  key: K;
  label: string;
  hint: string;
  placeholder: string;
}

/** A ficha da apresentadora. Preenche uma vez, vale para todas as cenas. */
export const SHEET_FIELDS: FieldDef<keyof AvatarSheet>[] = [
  {
    key: 'presentation',
    label: 'Quem é',
    hint: 'aparência e faixa etária',
    placeholder: 'mulher brasileira, jovem adulta',
  },
  {
    key: 'skin',
    label: 'Pele',
    hint: 'tom, sem eufemismo',
    placeholder: 'pele parda clara',
  },
  {
    key: 'hair',
    label: 'Cabelo',
    hint: 'cor e corte, os dois',
    placeholder: 'castanho escuro, longo e liso',
  },
  {
    key: 'face',
    label: 'Rosto',
    hint: 'expressão de base e maquiagem',
    placeholder: 'expressão calma, maquiagem discreta',
  },
  {
    key: 'build',
    label: 'Corpo',
    hint: 'porte',
    placeholder: 'magra a mediana',
  },
  {
    key: 'marks',
    label: 'Marcas registradas',
    hint: 'o que faz reconhecerem ela — tatuagem, sinal, óculos',
    placeholder: 'sinal acima do lábio, tatuagem fina no braço',
  },
];

/** O que muda a cada foto. */
export const SHOT_FIELDS: FieldDef<keyof Omit<AvatarShot, 'framing'>>[] = [
  {
    key: 'scene',
    label: 'Tipo de cena',
    hint: 'em uma linha',
    placeholder: 'retrato caseiro em ambiente interno',
  },
  {
    key: 'environment',
    label: 'Onde está',
    hint: 'o lugar e o que aparece atrás',
    placeholder: 'quarto com luz de janela, cama branca, plantas',
  },
  {
    key: 'atmosphere',
    label: 'Clima do lugar',
    hint: 'a sensação do ambiente',
    placeholder: 'silencioso, aconchegante',
  },
  {
    key: 'pose',
    label: 'Pose',
    hint: 'corpo, mãos e para onde olha',
    placeholder: 'sentada na cama, segurando o produto com as duas mãos',
  },
  {
    key: 'clothing',
    label: 'Roupa',
    hint: 'peça, cor e tecido',
    placeholder: 'moletom largo bege, algodão',
  },
  {
    key: 'lighting',
    label: 'Luz',
    hint: 'de onde vem e como é',
    placeholder: 'luz natural de janela, difusa, sombra suave',
  },
  {
    key: 'mood',
    label: 'Sensação',
    hint: 'o que a foto deve transmitir',
    placeholder: 'tranquila, pessoal',
  },
];

/** Enquadramentos comuns. O resto do bloco de câmera é fixo. */
export const FRAMINGS = [
  { value: 'Selfie no espelho', perspective: 'Mirror selfie' },
  { value: 'Selfie com o braço', perspective: 'Arm-length selfie' },
  { value: 'Altura dos olhos', perspective: 'Eye level' },
  { value: 'Três quartos', perspective: 'Three-quarter angle' },
  { value: 'Plano fechado nas mãos', perspective: 'Close-up on hands' },
] as const;

export const EMPTY_SHEET: AvatarSheet = {
  presentation: '',
  skin: '',
  hair: '',
  face: '',
  build: '',
  marks: '',
};

export const EMPTY_SHOT: AvatarShot = {
  scene: '',
  environment: '',
  atmosphere: '',
  pose: '',
  clothing: '',
  lighting: '',
  mood: '',
  framing: FRAMINGS[0].value,
};

/* ---------------------------------------------------------------------------
   Blocos fixos
   ----------------------------------------------------------------------------
   Câmera e renderização são os mesmos em toda foto de celular realista. Ficam
   aqui porque não é decisão do aluno — é o que faz a imagem parar de parecer
   ilustração. Só a perspectiva varia, e ela vem do enquadramento escolhido.
   --------------------------------------------------------------------------- */

const CAMERA = {
  camera_type: 'Smartphone',
  lens_equivalent: '26mm',
  focus: 'Clean subject clarity',
  aperture_simulation: 'f/1.8 look',
  iso_simulation: 'Low ISO',
  white_balance: 'Daylight neutral',
};

const RENDERING = {
  realism_level: 'Ultra photorealistic',
  detail_level: 'Natural skin texture, realistic light falloff',
  post_processing: 'Soft highlights, gentle contrast',
  artifacts: 'None',
};

/** Campo vazio vira um marcador visível, nunca uma chave em branco. */
function fill(value: string, label: string): string {
  const clean = value.trim();
  return clean || `[${label.toUpperCase()}]`;
}

/**
 * Monta o JSON da imagem.
 *
 * A ordem das chaves é estável de propósito: com `subject` sempre montado a
 * partir da mesma ficha e na mesma posição, duas gerações diferentes produzem
 * blocos byte a byte idênticos — que é a condição para a apresentadora ser a
 * mesma pessoa nas duas fotos.
 */
export function buildAvatarJson(sheet: AvatarSheet, shot: AvatarShot): string {
  const framing = FRAMINGS.find((item) => item.value === shot.framing) ?? FRAMINGS[0];

  const payload = {
    scene_type: fill(shot.scene, 'tipo de cena'),
    environment: {
      location: fill(shot.environment, 'onde está'),
      atmosphere: fill(shot.atmosphere, 'clima do lugar'),
    },
    subject: {
      presentation: fill(sheet.presentation, 'quem é'),
      skin_tone: fill(sheet.skin, 'pele'),
      hair: fill(sheet.hair, 'cabelo'),
      facial_features: fill(sheet.face, 'rosto'),
      build: fill(sheet.build, 'corpo'),
      distinguishing_marks: fill(sheet.marks, 'marcas registradas'),
    },
    pose: fill(shot.pose, 'pose'),
    clothing: fill(shot.clothing, 'roupa'),
    lighting: fill(shot.lighting, 'luz'),
    mood: fill(shot.mood, 'sensação'),
    camera_details: { ...CAMERA, perspective: framing.perspective },
    rendering_style: RENDERING,
  };

  return JSON.stringify(payload, null, 2);
}

/** true quando a ficha está pronta para travar a identidade. */
export function sheetIsReady(sheet: AvatarSheet): boolean {
  return Object.values(sheet).every((value) => value.trim() !== '');
}
