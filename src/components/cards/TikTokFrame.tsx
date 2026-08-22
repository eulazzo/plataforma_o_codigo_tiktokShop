import { useRef, useState } from 'react';
import { HANDLE } from '@/data/backstage';
import type { VaultItem } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/layout/LogoMark';
import styles from './TikTokFrame.module.css';

/**
 * O VÍDEO NO FORMATO DO FEED
 * ============================================================================
 * Reproduz a moldura do TikTok em volta do vídeo: 9:16, barra de ações à
 * direita, legenda com @ e trilha no rodapé, barra de progresso na base.
 *
 * POR QUE A MOLDURA IMPORTA: o material desta área é "o que eu publiquei". Um
 * player comum diz "arquivo"; a moldura diz "publicação". O aluno precisa ver
 * o vídeo do jeito que o público dele viu.
 *
 * O PERFIL OCULTO: quando HANDLE está vazio, a tela escreve uma palavra neutra
 * e borra. O que vai para o navegador do aluno é literalmente a string
 * "perfilocultado" — não existe nenhum dado do autor no documento para alguém
 * ler no inspetor. Borrar o @ verdadeiro esconderia do olho e de mais ninguém.
 *
 * A barra lateral inteira é `aria-hidden`: é cenário, não controle. Só o
 * play/pause é botão de verdade, porque é a única coisa que faz algo.
 */

/** Palavra neutra que aparece borrada no lugar do @. Não é dado de ninguém. */
const MASK = 'perfilocultado';

export function TikTokFrame({ item }: { item: VaultItem }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* URL completa passa direto; nome de arquivo vira caminho em public/bastidores */
  const asset = (name: string) =>
    name.startsWith('http') ? name : `${import.meta.env.BASE_URL}bastidores/${name}`;

  const src = item.video ? asset(item.video) : '';
  const poster = item.poster ? asset(item.poster) : undefined;

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  return (
    <div className={styles.phone}>
      {src ? (
        <>
          <video
            ref={video}
            className={styles.video}
            src={src}
            poster={poster}
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* o toque no vídeo é o gesto do aplicativo: sem barra de controles */}
          <button
            className={styles.tap}
            onClick={toggle}
            aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          >
            {!playing && (
              <span className={styles.playBadge} aria-hidden="true">
                <Icon name="play" size={26} />
              </span>
            )}
          </button>
        </>
      ) : (
        /* sem arquivo: o reservado fica DENTRO da moldura, para o layout poder
           ser avaliado antes de os vídeos existirem */
        <div className={styles.empty}>
          <Icon name="film" size={26} />
          <span className={`mono ${styles.emptyTag}`}>vídeo a subir</span>
        </div>
      )}

      {/* véu no rodapé: sem ele a legenda some sobre quadro claro */}
      <span className={styles.scrim} aria-hidden="true" />

      {/* ---------- barra de ações: cenário, não controle ---------- */}
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.avatar}>
          <LogoMark size={26} />
          <i className={styles.avatarPlus}>
            <Icon name="plus" size={11} />
          </i>
        </span>

        <RailAction icon="heart" value={item.stats?.likes} liked={item.stats?.liked} />
        <RailAction icon="comment" value={item.stats?.comments} />
        <RailAction icon="bookmark" value={item.stats?.saves} />
        <RailAction icon="share" value={item.stats?.shares} />

        <span className={styles.disc}>
          <Icon name="music" size={15} />
        </span>
      </div>

      {/* ---------- legenda ---------- */}
      <div className={styles.caption}>
        {/*
          A sacolinha fica DENTRO do bloco da legenda, não posicionada por
          cima dela. Com posição fixa, legenda de duas linhas empurrava o @
          para debaixo da pílula — e o tamanho da legenda muda a cada vídeo.
          No fluxo, o empilhamento se resolve sozinho.
        */}
        {item.shop && (
          <span className={styles.shop} aria-hidden="true">
            <i className={styles.shopIcon}>
              <Icon name="bag" size={13} />
            </i>
            <b>Shop</b>
            <em>{item.shop}</em>
          </span>
        )}

        <strong className={styles.handle}>
          @
          {HANDLE || (
            <span className={styles.blurred} aria-label="perfil do autor, oculto">
              {MASK}
            </span>
          )}
        </strong>

        {item.caption && <p className={styles.captionText}>{item.caption}</p>}

        <span className={styles.track}>
          <Icon name="music" size={12} />
          <span className={styles.trackName}>
            som original — {HANDLE || <span className={styles.blurred}>{MASK}</span>}
          </span>
        </span>
      </div>

      <span className={styles.progress} aria-hidden="true">
        <i />
      </span>
    </div>
  );
}

function RailAction({ icon, value, liked }: { icon: string; value?: string; liked?: boolean }) {
  return (
    <span className={[styles.action, liked ? styles.actionOn : ''].filter(Boolean).join(' ')}>
      <Icon name={icon} size={26} />
      {/* campo vazio vira traço, nunca zero: o traço mostra onde o número vai */}
      <em className="mono">{value || '—'}</em>
    </span>
  );
}
