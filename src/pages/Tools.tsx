import { Link, useParams } from 'react-router-dom';
import { isComplete } from '@/plan';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ProductMiner } from '@/components/tools/ProductMiner';
import { ConsistencyPanel } from '@/components/tools/ConsistencyPanel';
import styles from './Tools.module.css';

/**
 * FERRAMENTAS
 * ============================================================================
 * Esta área substituiu a ideia original de "planilhas para download".
 *
 * POR QUÊ: uma planilha obriga a pessoa a sair da plataforma, abrir outra conta
 * e trabalhar numa tabela cinza — e chega com cara de dever de casa. A mesma
 * conta feita aqui dentro chega como software: o cálculo é imediato, o critério
 * aparece no momento da decisão, e o resultado fica guardado.
 *
 * A promessa de "planilha" continua cumprida pelo botão de exportar de cada
 * ferramenta. A diferença é a ordem: o trabalho acontece aqui e a planilha é o
 * que SAI, não o que a pessoa precisa preencher.
 *
 * ABAS EM VEZ DE UMA EMBAIXO DA OUTRA: cada ferramenta é uma sessão de trabalho
 * inteira. Empilhadas, a segunda vira rodapé da primeira e ninguém rola até
 * lá. Como aba, cada uma tem a tela para si.
 *
 * As abas são ROTAS, não estado de componente: /ferramentas/consistencia é um
 * link que se compartilha, o botão voltar funciona, e trocar de aba remonta a
 * ferramenta — que é como o painel de consistência relê a lista de produtos
 * salva pela central de mineração.
 *
 * COMO ADICIONAR A PRÓXIMA:
 *   1. crie o componente em src/components/tools/;
 *   2. acrescente uma entrada em TOOLS com slug, número e rótulo;
 *   3. renderize no switch de `Current`.
 */

interface ToolTab {
  slug: string;
  number: string;
  label: string;
  /** Rótulo curto, para a aba não quebrar no celular. */
  short: string;
}

const TOOLS: ToolTab[] = [
  { slug: 'mineracao', number: '01', label: 'Central de mineração', short: 'Mineração' },
  { slug: 'consistencia', number: '02', label: 'Painel de consistência', short: 'Consistência' },
];

export function Tools() {
  const { tool } = useParams<{ tool?: string }>();
  /* slug desconhecido cai na primeira ferramenta, nunca numa tela em branco */
  const active = TOOLS.find((item) => item.slug === tool) ?? TOOLS[0];

  if (!isComplete) {
    return (
      <div className="page">
        <ToolsHead />

        <div className={`card ${styles.locked}`}>
          <span className={styles.lockedIcon} aria-hidden="true">
            <Icon name="lock" size={22} />
          </span>
          <h2>As ferramentas fazem parte da versão Completa</h2>
          <p>
            São duas: a central de mineração, que dá nota aos cinco pilares de cada produto
            candidato, e o painel de consistência, que acompanha os seus 21 dias de publicação e
            mostra qual formato está rendendo mais.
          </p>
          <Button to="/versao-completa" iconRight="arrowRight">
            Ver o que muda na versão Completa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <ToolsHead />

      <nav className={styles.tabs} aria-label="Ferramentas">
        {TOOLS.map((item) => {
          const current = item.slug === active.slug;
          return (
            <Link
              key={item.slug}
              to={`/ferramentas/${item.slug}`}
              className={[styles.tab, current ? styles.tabOn : ''].filter(Boolean).join(' ')}
              aria-current={current ? 'page' : undefined}
            >
              <span className={`mono ${styles.tabNum}`}>{item.number}</span>
              <span className={styles.tabLabel}>{item.label}</span>
              <span className={styles.tabShort}>{item.short}</span>
            </Link>
          );
        })}
      </nav>

      {active.slug === 'consistencia' ? <ConsistencyPanel /> : <ProductMiner />}
    </div>
  );
}

function ToolsHead() {
  return (
    <header className="page-head">
      <p className="eyebrow">Ferramentas</p>
      <h1>Suas ferramentas de controle</h1>
      <p>
        O que seria uma planilha, funcionando aqui dentro: a conta é imediata, o critério aparece
        na hora de decidir e o resultado fica guardado. Quando você quiser a planilha mesmo, cada
        ferramenta exporta a sua em um clique.
      </p>
    </header>
  );
}
