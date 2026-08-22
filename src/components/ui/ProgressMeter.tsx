import { sevenDayPlan } from '@/data/sevenDayPlan';
import styles from './ProgressMeter.module.css';

/**
 * O MEDIDOR — assinatura visual da plataforma.
 *
 * Nunca é uma barra contínua: são sempre 7 segmentos, um por dia do plano.
 * Assim, em qualquer tela, o aluno lê "7 dias" antes de ler o número.
 */

interface ProgressMeterProps {
  /** dias concluídos */
  done: number;
  /** dia atual (recebe o traço de destaque) */
  current?: number;
  size?: 'md' | 'sm';
  className?: string;
}

export function ProgressMeter({ done, current, size = 'md', className }: ProgressMeterProps) {
  const total = sevenDayPlan.length;
  return (
    <div
      className={[styles.meter, styles[size], className ?? ''].filter(Boolean).join(' ')}
      role="img"
      aria-label={`${done} de ${total} dias concluídos`}
    >
      {sevenDayPlan.map((day) => {
        const isDone = day.day <= done;
        const isCurrent = !isDone && day.day === current;
        return (
          <span
            key={day.day}
            className={[styles.seg, isDone ? styles.done : '', isCurrent ? styles.current : '']
              .filter(Boolean)
              .join(' ')}
          />
        );
      })}
    </div>
  );
}
