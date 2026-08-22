import { COPY_SUMMARY, COPY_TITLE, copyItems } from '@/data/copys';
import { UNLOCK_DAYS, formatOpensOn, unlockState } from '@/data/backstage';
import type { UnlockState } from '@/data/backstage';
import type { CopyItem } from '@/data/types';
import { useCopy } from '@/hooks/useCopy';
import { Icon } from '@/components/ui/Icon';
import styles from './CopyVault.module.css';

/**
 * GANCHOS E COPYS — o módulo 10
 * ============================================================================
 * Foto do produto à esquerda, a copy que foi ao ar à direita.
 *
 * A ESPERA é a mesma do módulo 09: sete dias contados do primeiro acesso, sem
 * atalho. Os dois bônus abrem no mesmo dia de propósito — são a mesma promessa
 * feita na venda, e abrir um antes do outro só criaria dúvida sobre qual era.
 *
 * POR QUE A FOTO IMPORTA: copy lida sem ver o produto vira frase solta. É
 * olhando a tela de galinheiro que se entende por que "aguenta sol e chuva"
 * resolve uma dúvida real, e não é adjetivo de propaganda.
 */
export function CopyVault() {
  const unlock = unlockState();

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Módulo 10 · Bônus premium</p>
        <h1>{COPY_TITLE}</h1>
        <p>{COPY_SUMMARY}</p>
      </header>

      {unlock.open ? <Vault /> : <Locked unlock={unlock} />}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Travado
   --------------------------------------------------------------------------- */

function Locked({ unlock }: { unlock: UnlockState }) {
  return (
    <section className={styles.locked}>
      <span className={styles.lockedIcon} aria-hidden="true">
        <Icon name="lock" size={26} />
      </span>

      <div className={styles.lockedMain}>
        <span className={`mono ${styles.lockedDays}`}>{unlock.daysLeft}</span>
        <span className={styles.lockedUnit}>
          {unlock.daysLeft === 1 ? 'dia para abrir' : 'dias para abrir'}
        </span>
      </div>

      <div className={styles.lockedBlocks} aria-hidden="true">
        {Array.from({ length: UNLOCK_DAYS }, (_, index) => (
          <i key={index} className={index < unlock.elapsed ? styles.blockOn : undefined} />
        ))}
      </div>

      <p className={styles.lockedText}>
        Abre em <strong>{formatOpensOn(unlock.opensOn)}</strong>, junto com os Bastidores.
      </p>

      <p className={styles.lockedWhy}>
        Copy pronta antes de você ter escrito a sua vira cópia, não aprendizado. Nesta semana
        escreva as suas com a Biblioteca de ganchos; quando esta porta abrir, você vai ler estas
        aqui procurando o que fez diferente — que é onde está o valor.
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Aberto
   --------------------------------------------------------------------------- */

function Vault() {
  const pending = copyItems.filter((item) => item.draft).length;

  return (
    <>
      {pending === copyItems.length && (
        <div className={styles.pending}>
          <span className={`mono ${styles.pendingTag}`}>a escrever</span>
          <p>As copys desta área ainda estão sendo reunidas.</p>
        </div>
      )}

      <div className={`stagger ${styles.list}`}>
        {copyItems.map((item) => (
          <CopyCard key={item.id} item={item} />
        ))}
      </div>

      <p className={styles.foot}>
        As copys aparecem do jeito que foram faladas, sem pontuação e sem correção de gramática.
        Não é descuido: copy de vídeo é escrita para a boca, não para o olho, e é isso que faz ela
        soar como conversa em vez de anúncio.
      </p>
    </>
  );
}

function CopyCard({ item }: { item: CopyItem }) {
  const copy = useCopy();
  const src = item.image.startsWith('http')
    ? item.image
    : `${import.meta.env.BASE_URL}copys/${item.image}`;

  return (
    <article className={styles.card}>
      {/* ---------- a foto ---------- */}
      <div className={styles.shot}>
        {/* a coluna da esquerda ganha rótulo para não começar no vazio ao lado
            do bloco de cabeçalho da direita */}
        <span className="eyebrow">Imagem do produto</span>

        {item.image ? (
          <img src={src} alt={item.product} loading="lazy" decoding="async" />
        ) : (
          <div className={styles.shotEmpty}>
            <Icon name="image" size={26} />
            <span className={`mono ${styles.shotTag}`}>foto a subir</span>
          </div>
        )}
      </div>

      {/* ---------- a copy ---------- */}
      <div className={styles.text}>
        <header className={styles.head}>
          <span className={`mono ${styles.number}`}>{item.number}</span>
          <span className={`mono ${styles.category}`}>{item.category}</span>
          {item.draft && <span className={`mono ${styles.draftTag}`}>estrutura de exemplo</span>}
        </header>

        <h2 className={styles.product}>{item.product}</h2>

        <div className={styles.quote}>
          <p>{item.copy}</p>
        </div>

        <button
          className={styles.copyBtn}
          onClick={() => copy(item.copy, 'Copy copiada!')}
          disabled={item.draft}
        >
          <Icon name="copy" size={15} /> Copiar a copy
        </button>

        <div className={styles.notes}>
          <span className="eyebrow">Por que ela funciona</span>
          <ul>
            {item.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
