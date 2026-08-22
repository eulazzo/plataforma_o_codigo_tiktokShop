import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import styles from './AudioPlayer.module.css';

/**
 * Player do audiobook do módulo — para ouvir enquanto acompanha o texto.
 *
 * · preload="metadata": baixa só a duração, não o arquivo inteiro.
 * · Se o arquivo não existir, o player some por completo em vez de aparecer
 *   quebrado.
 * · Velocidade em 1x / 1.25x / 1.5x, que é o que costuma ser usado de verdade.
 *
 * Os arquivos ficam em public/audio/. No dado do módulo vai só o nome do
 * arquivo (ex.: 'modulo-01.mp3') — o caminho é montado aqui, o que mantém tudo
 * funcionando mesmo com a plataforma hospedada em subpasta.
 */

const SPEEDS = [1, 1.25, 1.5] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function AudioPlayer({ file, title }: { file: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [missing, setMissing] = useState(false);

  const src = `${import.meta.env.BASE_URL}audio/${file}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = SPEEDS[speedIndex];
  }, [speedIndex]);

  if (missing) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => setMissing(true));
    } else {
      audio.pause();
    }
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = Number(event.target.value);
    setCurrent(audio.currentTime);
  };

  const progress = Number.isFinite(duration) && duration > 0 ? (current / duration) * 100 : 0;

  return (
    <section className={styles.player} aria-label={`Audiobook: ${title}`}>
      <button
        className={styles.play}
        onClick={toggle}
        aria-label={playing ? 'Pausar audiobook' : 'Ouvir audiobook'}
      >
        <Icon name={playing ? 'pause' : 'play'} size={18} />
      </button>

      <div className={styles.body}>
        <div className={styles.top}>
          <span className={`mono ${styles.label}`}>Ouça enquanto lê</span>
          <span className={`mono ${styles.time}`}>
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>

        <input
          className={styles.range}
          type="range"
          min={0}
          max={Number.isFinite(duration) ? duration : 0}
          value={current}
          onChange={seek}
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
          aria-label="Posição do áudio"
        />
      </div>

      <button
        className={`mono ${styles.speed}`}
        onClick={() => setSpeedIndex((i) => (i + 1) % SPEEDS.length)}
        aria-label="Velocidade de reprodução"
      >
        {SPEEDS[speedIndex]}×
      </button>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />
    </section>
  );
}
