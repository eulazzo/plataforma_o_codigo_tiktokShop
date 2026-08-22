import styles from './LogoMark.module.css';

/**
 * O SÍMBOLO DA MARCA
 * ----------------------------------------------------------------------------
 * Três coisas no mesmo desenho: a sacola (Shop), a nota saindo da alça
 * (TikTok), e o ">" com os nós ligados dentro dela (Código).
 *
 * O contorno magenta atrás do ciano é a aberração cromática da marca — a mesma
 * do título do Laboratório de IA.
 *
 * POR QUE O TRAÇADO APARECE DUAS VEZES em vez de <defs> + <use>: a marca é
 * desenhada mais de uma vez na mesma página (barra lateral e topo do celular),
 * e id repetido em <defs> faz uma instância referenciar a outra. Repetir seis
 * paths custa menos que essa classe de bug.
 *
 * As cores vêm do CSS, então seguem os tokens. O gêmeo estático que o navegador
 * usa na aba é public/favicon.svg — se o desenho mudar aqui, mude lá também.
 */
function Strokes() {
  return (
    <>
      {/* alça que vira nota */}
      <path d="M25.5 27.5V20.5a6.25 6.25 0 0 1 12.5 0v7" />
      <path d="M38 20.5V9.5c0 4.6 3.4 7.8 8 8.4" />
      {/* sacola */}
      <rect x="11" y="26" width="42" height="30" rx="5.5" />
      {/* código dentro */}
      <path d="M21.5 35l5.5 6-5.5 6" />
      <circle cx="35.5" cy="41" r="2.5" />
      <circle cx="45" cy="35.5" r="2.5" />
      <circle cx="45" cy="46.5" r="2.5" />
      <path d="M37.8 39.8l4.9-3.1M37.8 42.2l4.9 3.1" />
    </>
  );
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      className={styles.mark}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.ghost}>
        <Strokes />
      </g>
      <g className={styles.solid}>
        <Strokes />
      </g>
    </svg>
  );
}
