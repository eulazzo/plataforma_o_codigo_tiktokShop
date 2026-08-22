import { useState } from 'react';
import {
  BACKSTAGE_SUMMARY,
  BACKSTAGE_TITLE,
  CLAIM,
  UNLOCK_DAYS,
  formatOpensOn,
  unlockState,
  vaultItems,
} from '@/data/backstage';
import type { UnlockState } from '@/data/backstage';
import type { VaultItem } from '@/data/types';
import { useCopy } from '@/hooks/useCopy';
import { Icon } from '@/components/ui/Icon';
import { TikTokFrame } from '@/components/cards/TikTokFrame';
import styles from './Backstage.module.css';

/**
 * BASTIDORES — o módulo 9
 * ============================================================================
 * O vídeo que foi publicado, e ao lado o prompt exato que o gerou.
 *
 * A entrada é o card do módulo 09 na tela de módulos; esta rota é o conteúdo.
 * Quem chegar direto pela URL com a área ainda fechada vê a mesma contagem.
 *
 * A ESPERA
 * ----------------------------------------------------------------------------
 * Sete dias contados do primeiro acesso, e só isso — não há atalho. A regra e
 * o que ela não garante estão documentadas em src/data/backstage.ts.
 *
 * SOBRE O TEXTO DESTA TELA: aqui a linguagem pode ser mais vendedora que na
 * página de vendas, porque este material está atrás do login e não passa por
 * revisão de plataforma de anúncio. O que continua valendo é o resto: número de
 * faturamento só entra se for real e seu — ver CLAIM em src/data/backstage.ts.
 */
export function Backstage() {
  const unlock = unlockState();

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Módulo 09 · Bônus premium</p>
        <h1>{BACKSTAGE_TITLE}</h1>
        <p>{BACKSTAGE_SUMMARY}</p>
      </header>

      {unlock.open ? <Vault /> : <Countdown unlock={unlock} />}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Travado
   --------------------------------------------------------------------------- */

function Countdown({ unlock }: { unlock: UnlockState }) {
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
        Abre em <strong>{formatOpensOn(unlock.opensOn)}</strong>.
      </p>

      <p className={styles.lockedWhy}>
        São sete dias porque este material só funciona depois que você tentou. Quem copia antes de
        tentar aprende a copiar. Nesta semana, grave com o que está nos outros módulos — quando esta
        porta abrir, você vai saber exatamente o que olhar nos meus vídeos.
      </p>

      <p className={styles.lockedNote}>
        A contagem começa no seu primeiro acesso e fica neste navegador.
      </p>
    </section>
  );
}
/* ---------------------------------------------------------------------------
   Aberto
   --------------------------------------------------------------------------- */

function Vault() {
  const pending = vaultItems.filter((item) => item.draft).length;

  return (
    <>
      {CLAIM && <p className={styles.claim}>{CLAIM}</p>}

      {pending === vaultItems.length && (
        <div className={styles.pending}>
          <span className={`mono ${styles.pendingTag}`}>a subir</span>
          <p>Os vídeos desta área ainda estão sendo preparados.</p>
        </div>
      )}

      <div className={`stagger ${styles.list}`}>
        {vaultItems.map((item) => (
          <VaultCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function VaultCard({ item }: { item: VaultItem }) {
  const [open, setOpen] = useState(false);
  const copy = useCopy();

  return (
    <article className={styles.card}>
      {/* ---------- o vídeo, na moldura do feed ---------- */}
      <div className={styles.videoCol}>
        <TikTokFrame item={item} />
      </div>
      {/* ---------- o prompt ---------- */}
      <div className={styles.promptCol}>
        <header className={styles.cardHead}>
          <span className={`mono ${styles.number}`}>{item.number}</span>
          <span className={`mono ${styles.category}`}>{item.category}</span>
          <span className={`mono ${styles.tool}`}>{item.tool}</span>
          {item.aiGenerated && (
            <span className={`mono ${styles.aiTag}`}>
              <Icon name="sparkle" size={11} /> gerado por IA
            </span>
          )}
          {item.draft && <span className={`mono ${styles.draftTag}`}>estrutura de exemplo</span>}
        </header>

        <h2 className={styles.title}>{item.title}</h2>

        {item.steps && (
          <section className={styles.steps}>
            <h3 className="eyebrow">O que você poderia fazer</h3>
            <ol>
              {item.steps.map((step, i) => (
                <li key={step}>
                  <span className={`mono ${styles.stepNum}`}>{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {item.transcript && (
          <section className={styles.transcript}>
            <h3 className="eyebrow">A copy, do jeito que ela fala</h3>
            <div className={styles.lines}>
              {item.transcript.map((line) => (
                <p key={line.time}>
                  <span className={`mono ${styles.time}`}>{line.time}</span>
                  <span>{line.text}</span>
                </p>
              ))}
            </div>
            <button
              className={styles.copyLine}
              onClick={() =>
                copy(
                  item.transcript!.map((line) => line.text).join(' '),
                  'Copy do vídeo copiada!',
                )
              }
            >
              <Icon name="copy" size={14} /> Copiar a copy inteira
            </button>
          </section>
        )}

        {/*
          A cadeia inteira, um bloco por etapa. Quando há mais de um prompt, o
          rótulo e o numeral dizem a ordem — é o que permite refazer sem
          adivinhar onde uma etapa termina.
        */}
        <div className={styles.chain}>
          {item.prompts.map((step, i) => (
            <section key={step.label} className={styles.chainStep}>
              <div className={styles.promptHead}>
                <span className="eyebrow">
                  {item.prompts.length > 1 && (
                    <span className={`mono ${styles.chainNum}`}>{i + 1}</span>
                  )}
                  {step.label}
                </span>

                {/* onde a ferramenta fica: o aluno não deveria ter que procurar */}
                {step.link && (
                  <a
                    className={styles.toolLink}
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    abrir <Icon name="external" size={13} />
                  </a>
                )}
              </div>

              <div
                className={[styles.body, open ? styles.bodyOpen : ''].filter(Boolean).join(' ')}
              >
                <pre className={styles.bodyText}>{step.text}</pre>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.copy}
                  onClick={() => copy(step.text, 'Prompt copiado!')}
                  disabled={item.draft}
                >
                  <Icon name="copy" size={15} /> Copiar
                </button>
              </div>
            </section>
          ))}

          <button
            className={[styles.expand, open ? styles.expandOpen : ''].filter(Boolean).join(' ')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Recolher os prompts' : 'Ver os prompts inteiros'}
            <Icon name="chevronDown" size={14} />
          </button>
        </div>

        <div className={styles.notes}>
          <span className="eyebrow">O que reparar</span>
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
