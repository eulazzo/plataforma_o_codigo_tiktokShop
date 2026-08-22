import { Link } from 'react-router-dom';
import type { PlanDay } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import styles from './DayCard.module.css';

interface DayCardProps {
  day: PlanDay;
  done: boolean;
  current: boolean;
}

/**
 * Card do dia. O número é o elemento gráfico principal — grande, em mono,
 * quieto. O estado aparece no canto, sem competir.
 */
export function DayCard({ day, done, current }: DayCardProps) {
  const state = done ? 'Concluído' : current ? 'Seu próximo passo' : 'A fazer';

  return (
    <Link
      to={`/plano#dia-${day.day}`}
      className={[styles.card, done ? styles.done : '', current ? styles.current : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.head}>
        <span className={`mono ${styles.number}`}>{String(day.day).padStart(2, '0')}</span>
        <span className={styles.state}>
          {done && <Icon name="check" size={12} />}
          {state}
        </span>
      </div>

      <h3 className={styles.title}>{day.title}</h3>
      <p className={styles.summary}>{day.summary}</p>

      <span className={styles.action}>
        {done ? 'Revisar' : current ? 'Continuar' : 'Abrir'}
        <Icon name="arrowRight" size={15} />
      </span>
    </Link>
  );
}
