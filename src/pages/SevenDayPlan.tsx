import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sevenDayPlan, totalPlanTasks } from '@/data/sevenDayPlan';
import { getModule } from '@/data/modules';
import { useProgress } from '@/hooks/useProgress';
import { useToast } from '@/components/ui/Toast';
import { ProgressMeter } from '@/components/ui/ProgressMeter';
import { TaskCheck } from '@/components/ui/TaskCheck';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import styles from './SevenDayPlan.module.css';

/**
 * PLANO DE 7 DIAS
 *
 * Um dia aberto por vez. Sete dias expandidos ao mesmo tempo viram um paredão
 * de texto onde nada indica por onde continuar — e a tela existe justamente
 * para responder "o que eu faço hoje".
 *
 * A trilha de dias no topo fica sempre à mão para pular entre eles, e concluir
 * um dia abre o seguinte.
 */
export function SevenDayPlan() {
  const { isTaskDone, toggleTask, isDayDone, completeDay, daysDone, tasksDone, currentDay } =
    useProgress();
  const { toast } = useToast();
  const { hash } = useLocation();

  const [openDay, setOpenDay] = useState<number>(currentDay);

  function goToDay(day: number, smooth = true) {
    setOpenDay(day);
    requestAnimationFrame(() => {
      const el = document.getElementById(`dia-${day}`);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
    });
  }

  /* abre e rola até o dia pedido pela âncora (#dia-3) */
  useEffect(() => {
    const match = hash.match(/#dia-(\d+)/);
    if (!match) return;
    const day = Number(match[1]);
    if (day >= 1 && day <= sevenDayPlan.length) goToDay(day, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const currentPlanDay = sevenDayPlan.find((d) => d.day === currentDay) ?? sevenDayPlan[0];
  const allDone = daysDone === sevenDayPlan.length;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">O núcleo do material</p>
        <h1>Plano de implementação em 7 dias</h1>
        <p>Sete dias. Sete tarefas. Um caminho claro para começar.</p>
      </header>

      {/* ---------- painel de situação ---------- */}
      <section className={styles.panel}>
        <div className={styles.panelMain}>
          <p className="eyebrow">{allDone ? 'Plano concluído' : 'Onde você está'}</p>
          {allDone ? (
            <>
              <h2 className={styles.panelTitle}>Você percorreu os sete dias.</h2>
              <p className={styles.panelText}>
                Agora é repetir o ciclo com o que aprendeu — o Dia 7 vira o seu novo Dia 1.
              </p>
            </>
          ) : (
            <>
              <h2 className={styles.panelTitle}>
                <span className={`mono ${styles.panelDay}`}>Dia {String(currentDay).padStart(2, '0')}</span>
                {currentPlanDay.title}
              </h2>
              <p className={styles.panelText}>{currentPlanDay.summary}</p>
              <Button size="sm" iconRight="arrowRight" onClick={() => goToDay(currentDay)}>
                Ir para este dia
              </Button>
            </>
          )}
        </div>

        <div className={styles.panelSide}>
          <div className={styles.panelStats}>
            <div>
              <span className={`mono ${styles.statNum}`}>
                {daysDone}
                <span className={styles.of}>/{sevenDayPlan.length}</span>
              </span>
              <span className={styles.statLabel}>dias</span>
            </div>
            <div>
              <span className={`mono ${styles.statNum}`}>
                {tasksDone}
                <span className={styles.of}>/{totalPlanTasks}</span>
              </span>
              <span className={styles.statLabel}>tarefas</span>
            </div>
          </div>
          <ProgressMeter done={daysDone} current={currentDay} />
        </div>
      </section>

      {/* ---------- trilha de dias ---------- */}
      <nav className={styles.rail} aria-label="Ir para um dia">
        {sevenDayPlan.map((day) => {
          const done = isDayDone(day.day);
          const isOpen = day.day === openDay;
          return (
            <button
              key={day.day}
              className={[
                styles.railItem,
                done ? styles.railDone : '',
                isOpen ? styles.railOpen : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => goToDay(day.day)}
              aria-current={isOpen ? 'step' : undefined}
            >
              <span className={`mono ${styles.railNum}`}>{String(day.day).padStart(2, '0')}</span>
              <span className={styles.railState} aria-hidden="true">
                {done ? <Icon name="check" size={11} /> : <span className={styles.railDot} />}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ---------- dias ---------- */}
      <ol className={styles.timeline}>
        {sevenDayPlan.map((day) => {
          const done = isDayDone(day.day);
          /*
           * A ordem é inegociável — está escrito no módulo 08. Um dia só abre
           * depois que o anterior fechou.
           *
           * O que a trava NÃO faz: esconder o título do dia. O aluno vê o que
           * vem pela frente e o que falta para chegar lá; o que fica guardado
           * são as tarefas, que é onde pular etapa causaria estrago.
           */
          const locked = day.day > 1 && !isDayDone(day.day - 1);
          const isOpen = day.day === openDay && !locked;
          const isCurrent = !done && day.day === currentDay;
          const relatedModule = day.relatedModuleId ? getModule(day.relatedModuleId) : undefined;
          const doneTasks = day.tasks.filter((t) => isTaskDone(t.id)).length;

          return (
            <li
              key={day.day}
              id={`dia-${day.day}`}
              className={[
                styles.item,
                done ? styles.done : '',
                isCurrent ? styles.current : '',
                isOpen ? styles.open : '',
                locked ? styles.locked : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.marker} aria-hidden="true">
                {done ? <Icon name="check" size={13} /> : <span className="mono">{day.day}</span>}
              </div>

              <article className={styles.card}>
                {/* cabeçalho: sempre visível, abre e fecha o dia */}
                <button
                  className={styles.cardHead}
                  onClick={() => !locked && setOpenDay(isOpen ? -1 : day.day)}
                  aria-expanded={isOpen}
                  aria-disabled={locked}
                  aria-controls={`dia-${day.day}-corpo`}
                >
                  <span className={styles.headText}>
                    <span className={`mono ${styles.dayLabel}`}>
                      Dia {String(day.day).padStart(2, '0')}
                      {isCurrent && <span className={styles.nowTag}>seu próximo passo</span>}
                    </span>
                    <span className={styles.title}>{day.title}</span>
                  </span>

                  <span className={styles.headMeta}>
                    {locked ? (
                      <span className={`mono ${styles.lockTag}`}>
                        <Icon name="lock" size={12} />
                        conclua o dia {day.day - 1}
                      </span>
                    ) : (
                      <span className={`mono ${styles.taskCount}`}>
                        {doneTasks}/{day.tasks.length}
                      </span>
                    )}
                    <span className={styles.chevron}>
                      <Icon name="chevronDown" size={18} />
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className={styles.body} id={`dia-${day.day}-corpo`}>
                    <p className={styles.summaryLine}>{day.summary}</p>

                    <div className={styles.grid}>
                      <section>
                        <h3 className="eyebrow">Objetivos</h3>
                        <ul className={styles.objectives}>
                          {day.objectives.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h3 className="eyebrow">Checklist</h3>
                        <div className={styles.tasks}>
                          {day.tasks.map((task) => (
                            <TaskCheck
                              key={task.id}
                              label={task.label}
                              checked={isTaskDone(task.id)}
                              onChange={() => toggleTask(task.id)}
                            />
                          ))}
                        </div>
                      </section>
                    </div>

                    <footer className={styles.actions}>
                      <Button
                        variant={done ? 'secondary' : 'primary'}
                        size="sm"
                        icon={done ? undefined : 'check'}
                        onClick={() => {
                          completeDay(day.day);
                          if (!done) {
                            toast(`Dia ${day.day} concluído.`);
                            /* concluiu: já abre o próximo, que é o que a pessoa faria em seguida */
                            const next = sevenDayPlan.find((d) => d.day === day.day + 1);
                            if (next) goToDay(next.day);
                          }
                        }}
                      >
                        {done ? 'Desmarcar dia' : 'Marcar como concluído'}
                      </Button>

                      {relatedModule && (
                        <Button to={`/modulos/${relatedModule.id}`} variant="quiet" size="sm">
                          Material: {relatedModule.title}
                        </Button>
                      )}
                    </footer>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
