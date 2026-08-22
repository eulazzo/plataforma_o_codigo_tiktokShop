import { modules } from '@/data/modules';
import { useProgress } from '@/hooks/useProgress';
import { ModuleCard } from '@/components/cards/ModuleCard';
import { BonusCard } from '@/components/cards/BonusCard';
import { BACKSTAGE_SUMMARY, BACKSTAGE_TITLE } from '@/data/backstage';
import { COPY_SUMMARY, COPY_TITLE } from '@/data/copys';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import styles from './Modules.module.css';

export function Modules() {
  const { isModuleDone, modulesDone } = useProgress();

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">O caminho</p>
        <h1>Os módulos</h1>
        <p>
          Cada módulo destrava uma etapa. A ordem importa: o seguinte assume o que foi decidido no
          anterior. O módulo 09 abre sozinho sete dias depois do seu primeiro acesso.
        </p>
      </header>

      <p className={`mono ${styles.counter}`}>
        {modulesDone} de {modules.length} concluídos
      </p>

      <div className={`stagger ${styles.list}`}>
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            index={index}
            done={isModuleDone(module.id)}
          />
        ))}

        {/*
          Os dois bônus fecham a grade. Mesma anatomia dos oito, comportamento
          próprio: abrem por data, não por leitura. Os tons são vizinhos na
          rampa das capas para lerem como um par.
        */}
        <BonusCard
          number="09"
          title={BACKSTAGE_TITLE}
          summary={BACKSTAGE_SUMMARY}
          to="/bastidores"
          cover="modulo-09.jpg"
          tone={{ from: '#fe2c55', to: '#8f0020' }}
          action="Abrir bastidores"
        />

        <BonusCard
          number="10"
          title={COPY_TITLE}
          summary={COPY_SUMMARY}
          to="/copys"
          cover="modulo-10.jpg"
          tone={{ from: '#cf5ad0', to: '#8d1275' }}
          action="Abrir as copys"
        />
      </div>

      <div className={styles.bannerSlot}>
        <UpgradeBanner />
      </div>
    </div>
  );
}
