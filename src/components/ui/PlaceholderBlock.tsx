import styles from './PlaceholderBlock.module.css';

/**
 * ESPAÇO RESERVADO DE CONTEÚDO
 * ----------------------------------------------------------------------------
 * Aparece onde o texto do módulo ainda não foi escrito. É deliberadamente
 * identificado como tal: em vez de preencher com texto genérico que parece
 * pronto, mostra o roteiro do que vai ali.
 *
 * Ao publicar para compradores, nenhum destes deve restar — troque o bloco
 * 'placeholder' por 'text' ou 'list' em src/data/modules.ts.
 */
interface PlaceholderBlockProps {
  title: string;
  outline: string[];
}

export function PlaceholderBlock({ title, outline }: PlaceholderBlockProps) {
  return (
    <section className={styles.block} aria-label={`${title} — conteúdo em produção`}>
      <header className={styles.head}>
        <h3>{title}</h3>
        <span className={`mono ${styles.tag}`}>a escrever</span>
      </header>
      <p className={styles.intro}>Este trecho ainda está em produção. O roteiro previsto é:</p>
      <ul className={styles.outline}>
        {outline.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
