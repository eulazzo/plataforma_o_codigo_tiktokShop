import { isComplete } from '@/plan';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import styles from './UpgradeInfo.module.css';

/**
 * Página informativa da versão Completa (rota do banner de upgrade).
 *
 * NÃO processa pagamento e não promete resultado: descreve o que a outra
 * versão contém. O botão de compra fica desativado até você colar o link do
 * checkout em CHECKOUT_URL.
 */
const CHECKOUT_URL = ''; /* TODO: link do checkout da versão Completa */

const items = [
  {
    icon: 'sparkle',
    title: 'Kit Vídeos com IA',
    text: 'Prompts para UGC, avatar, demonstração de produto e narração, com estruturas de roteiro e orientações de edição.',
  },
  {
    icon: 'magnet',
    title: '50 ganchos',
    text: 'A biblioteca ampliada de aberturas, organizada por tipo, para testar nos primeiros segundos.',
  },
  {
    icon: 'book',
    title: 'Biblioteca de conteúdo',
    text: 'Modelos de roteiro por formato: UGC, demonstração, review, storytelling, lista, comparação.',
  },
  {
    icon: 'table',
    title: 'Ferramentas de controle',
    text: 'A central de mineração, onde você dá nota aos cinco pilares de cada produto candidato e a plataforma soma, ordena e exporta a lista em planilha.',
  },
];

export function UpgradeInfo() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Versão Completa</p>
        <h1>O que muda na versão Completa</h1>
        <p>
          Sua versão atual dá acesso ao método e ao plano de 7 dias. A Completa acrescenta a parte
          de produção de conteúdo.
        </p>
      </header>

      {isComplete ? (
        <div className={`card ${styles.already}`}>
          <span className={styles.check} aria-hidden="true">
            <Icon name="check" size={17} />
          </span>
          <div>
            <strong>Você já está na versão Completa.</strong>
            <p>Todo o material desta página já faz parte do seu acesso.</p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {items.map((item) => (
              <article key={item.title} className={`card ${styles.item}`}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={item.icon} size={19} />
                </span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className={`card ${styles.cta}`}>
            <div>
              <p className="eyebrow">Versão Completa</p>
              <span className={`mono ${styles.price}`}>R$37</span>
              <p className={styles.ctaNote}>
                Pagamento único. Inclui tudo da versão Essencial que você já tem.
              </p>
            </div>

            {CHECKOUT_URL ? (
              <a className={styles.buy} href={CHECKOUT_URL} target="_blank" rel="noopener">
                Ir para o checkout
                <Icon name="external" size={16} />
              </a>
            ) : (
              <Button disabled>Link do checkout a configurar</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
