/**
 * Conjunto mínimo de ícones em SVG, desenhados em traço fino para combinar
 * com as hairlines da interface. Sem biblioteca externa e sem emoji.
 */

const paths: Record<string, string> = {
  home: 'M3 9.5 12 3l9 6.5M5 21V11m14 10V11M3.5 21h17',
  calendar: 'M7 3v3m10-3v3M4 8.5h16M5 5.5h14a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z',
  book: 'M4 4.5h6a2.5 2.5 0 0 1 2.5 2.5v13a2 2 0 0 0-2-2H4Zm16 0h-6A2.5 2.5 0 0 0 11.5 7v13a2 2 0 0 1 2-2H20Z',
  film: 'M4 4.5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Zm4 0v15m8-15v15M3 12h18',
  image: 'M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.5 12 5-5 3.5 3.5 3-2.5 4.5 4M9.2 10a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  sparkle: 'M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5ZM18.5 16l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z',
  magnet: 'M6 4.5v8a6 6 0 0 0 12 0v-8m-12 0h4.5v8a1.5 1.5 0 0 0 3 0v-8H18m-12 0v3.5m12-3.5v3.5',
  chart: 'M4 20V4m0 16h16M8 16.5v-4m4 4v-8m4 8v-6',
  table: 'M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm-1 4.5h18M9.5 10v8.5',
  download: 'M12 3.5v11m0 0 4-4m-4 4-4-4M4 20h16',
  flask: 'M9.5 3h5M11 3v6.4L5.4 18.4A2 2 0 0 0 7.1 21.5h9.8a2 2 0 0 0 1.7-3.1L13 9.4V3M8 14.5h8',
  refresh: 'M20.5 12a8.5 8.5 0 1 1-2.6-6.1M20.5 4.5V10H15',
  edit: 'M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z',
  star: 'M12 3.7l2.55 5.17 5.7.83-4.12 4.02.97 5.68L12 16.7l-5.1 2.7.97-5.68L3.75 9.7l5.7-.83L12 3.7Z',
  heart: 'M12 20.4c-1.1-.75-8.5-5.3-8.5-10.6a4.85 4.85 0 0 1 8.5-2.6 4.85 4.85 0 0 1 8.5 2.6c0 5.3-7.4 9.85-8.5 10.6Z',
  comment: 'M20.5 11.8c0 4-3.8 7.3-8.5 7.3-1 0-1.95-.15-2.85-.42L4 20.5l1.55-3.6A6.9 6.9 0 0 1 3.5 11.8c0-4 3.8-7.3 8.5-7.3s8.5 3.3 8.5 7.3Z',
  bookmark: 'M6.5 3.6h11a1 1 0 0 1 1 1v15.8L12 16.2l-6.5 4.2V4.6a1 1 0 0 1 1-1Z',
  share: 'M4 18.5c0-5.4 3.7-8.1 9-8.4V5.2l7.5 6.6-7.5 6.6v-4.7c-4.4.2-6.9 1.6-9 4.8Z',
  music: 'M9 18.4a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0Zm0 0V6.3l11.4-2.7v12.2m0 0a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0Z',
  plus: 'M12 5.5v13M5.5 12h13',
  bag: 'M6.2 8.5h11.6l-.95 11.6a1 1 0 0 1-1 .9H8.15a1 1 0 0 1-1-.9L6.2 8.5Zm2.9 0V6.1a2.9 2.9 0 0 1 5.8 0v2.4',
  check: 'm4.5 12.5 5 5 10-11',
  arrowRight: 'M4.5 12h14m0 0-5.5-5.5M18.5 12 13 17.5',
  arrowLeft: 'M19.5 12h-14m0 0L11 6.5M5.5 12 11 17.5',
  arrowUp: 'M12 19.5v-15m0 0L5.5 11M12 4.5 18.5 11',
  arrowDown: 'M12 4.5v15m0 0L18.5 13M12 19.5 5.5 13',
  lock: 'M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1Z',
  user: 'M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.5 8a7.5 7.5 0 0 1 15 0',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
  copy: 'M9 9V5.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H15M4 10.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z',
  external: 'M14 4.5h5.5V10M19 5l-8 8M18 14v5.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1h5.5',
  search: 'M11 18.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm5.5-2 4 4',
  chevronDown: 'm6 9.5 6 6 6-6',
  hide: 'M3 3l18 18M10.6 10.7a2 2 0 0 0 2.8 2.8M6.5 6.7A10.9 10.9 0 0 0 2.5 12s3.5 6 9.5 6a10 10 0 0 0 4-.8m2.9-2A11.3 11.3 0 0 0 21.5 12S18 6 12 6a9.6 9.6 0 0 0-1.6.1',
  play: 'M8 5.5v13l11-6.5-11-6.5Z',
  pause: 'M9.5 5.5v13m5-13v13',
  headphones: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h2.5a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V14Zm16 0h-2.5a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1V14Z',
};

export type IconName = keyof typeof paths;

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
