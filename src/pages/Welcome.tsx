import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { sevenDayPlan } from '@/data/sevenDayPlan';
import styles from './Welcome.module.css';

/**
 * Primeiro acesso. Aparece uma vez (a marcação fica no localStorage) e existe
 * para uma coisa só: tirar a pressão de "consumir tudo" e apontar o Dia 1.
 */
export function Welcome() {
  const { markWelcomed } = useProgress();
  const navigate = useNavigate();

  const start = () => {
    markWelcomed();
    navigate('/');
  };

  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <p className="eyebrow">Seu acesso está liberado</p>
        <h1 className={styles.title}>
          Bem-vindo ao<br />
          Código TikTok Shop.
        </h1>

        <p className={styles.lead}>
          Você não precisa consumir tudo de uma vez. O material foi organizado em sete etapas, uma
          por dia — e cada uma termina com algo feito, não com algo assistido.
        </p>

        <ol className={styles.spine}>
          {sevenDayPlan.map((day) => (
            <li key={day.day}>
              <span className={`mono ${styles.num}`}>{String(day.day).padStart(2, '0')}</span>
              <span className={styles.dayTitle}>{day.title}</span>
            </li>
          ))}
        </ol>

        <p className={styles.cue}>Comece pelo Dia 1.</p>

        <Button onClick={start} iconRight="arrowRight">
          Começar agora
        </Button>
      </div>
    </div>
  );
}
