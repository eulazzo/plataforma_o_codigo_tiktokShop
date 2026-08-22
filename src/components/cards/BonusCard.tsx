import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UNLOCK_DAYS, formatOpensOn, unlockState } from '@/data/backstage';
import { Icon } from '@/components/ui/Icon';
import styles from './BonusCard.module.css';

/**
 * CARD DE MÓDULO BÔNUS NA GRADE
 * ----------------------------------------------------------------------------
 * Serve os módulos 09 e 10. Antes era um componente por módulo, e dois arquivos
 * de cem linhas quase iguais divergem na primeira alteração — mudar o cadeado
 * num e esquecer o outro é questão de tempo.
 *
 * Mesma anatomia do ModuleCard — capa, etiqueta no canto, corpo com título e
 * resumo — com dois comportamentos próprios:
 *
 *   · travado, o cadeado ocupa o centro da capa, o card não é link e a
 *     contagem aparece no corpo;
 *   · aberto, vira link normal para o conteúdo.
 *
 * A CAPA aceita imagem: basta pôr o arquivo em public/modulos/ com o nome
 * passado em `cover`. Sem arquivo, o degradê do card assume.
 *
 * POR QUE O CADEADO É BOM AQUI: nas outras áreas cadeado é evitado porque
 * prometeria uma proteção que não existe. Aqui ele não fala de segurança, fala
 * de CALENDÁRIO — e o texto embaixo diz a data, não "acesso restrito".
 */
interface BonusCardProps {
  number: string;
  title: string;
  summary: string;
  /** Para onde vai quando abrir. */
  to: string;
  /** Nome do arquivo em public/modulos/. */
  cover: string;
  /** Par de cores do degradê da capa, da rampa dos módulos. */
  tone: { from: string; to: string };
  /** Texto do link quando aberto. */
  action: string;
}

export function BonusCard({ number, title, summary, to, cover, tone, action }: BonusCardProps) {
  const unlock = unlockState();
  const inner = (
    <Body
      unlock={unlock}
      number={number}
      title={title}
      summary={summary}
      cover={cover}
      tone={tone}
      action={action}
    />
  );

  return unlock.open ? (
    <Link to={to} className={`${styles.card} ${styles.open}`}>
      {inner}
    </Link>
  ) : (
    <div
      className={styles.card}
      aria-label={`Módulo ${number} — abre em ${unlock.daysLeft} dias`}
    >
      {inner}
    </div>
  );
}

function Body({
  unlock,
  number,
  title,
  summary,
  cover,
  tone,
  action,
}: Omit<BonusCardProps, 'to'> & { unlock: ReturnType<typeof unlockState> }) {
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <>
      <div
        className={styles.cover}
        style={{ '--from': tone.from, '--to': tone.to } as React.CSSProperties}
      >
        {/* a imagem cobre o degradê quando o arquivo existe */}
        {!coverFailed && (
          <img
            className={styles.coverImage}
            src={`${import.meta.env.BASE_URL}modulos/${cover}`}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setCoverFailed(true)}
          />
        )}

        {/* selo e numeral (ou cadeado) formam um bloco só, centrado na capa */}
        <div className={styles.seal}>
          {unlock.open ? (
            <span className={`mono ${styles.coverNumber}`} aria-hidden="true">
              {number}
            </span>
          ) : (
            <span className={styles.lock} aria-hidden="true">
              <Icon name="lock" size={30} />
            </span>
          )}

          <span className={`mono ${styles.premium}`}>
            <Icon name="sparkle" size={12} />
            Bônus premium
          </span>
        </div>

        <span className={`mono ${styles.coverTag}`}>Módulo {number}</span>

        {!unlock.open && (
          <span className={`mono ${styles.coverDays}`}>
            {unlock.daysLeft}
            <small>{unlock.daysLeft === 1 ? ' dia' : ' dias'}</small>
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>

        {unlock.open ? (
          <span className={styles.action}>
            {action}
            <Icon name="arrowRight" size={15} />
          </span>
        ) : (
          <div className={styles.wait}>
            <div className={styles.blocks} aria-hidden="true">
              {Array.from({ length: UNLOCK_DAYS }, (_, index) => (
                <i key={index} className={index < unlock.elapsed ? styles.blockOn : undefined} />
              ))}
            </div>
            <p className={styles.waitText}>
              Desbloqueia <strong>{UNLOCK_DAYS} dias</strong> depois do seu primeiro acesso — em{' '}
              <strong>{formatOpensOn(unlock.opensOn)}</strong>.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
