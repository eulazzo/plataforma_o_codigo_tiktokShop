import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { sevenDayPlan } from '@/data/sevenDayPlan';
import { modules } from '@/data/modules';
import {
  CYCLE_DAYS,
  addDays,
  bestStreak,
  currentStreak,
  focusProduct,
  isApproved,
  loadCandidates,
  loadTracker,
  todayIso,
} from '@/data/tools';
import { parseNumber } from '@/data/metrics';
import { isComplete } from '@/plan';
import { ProgressMeter } from '@/components/ui/ProgressMeter';
import { TaskCheck } from '@/components/ui/TaskCheck';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { DayCard } from '@/components/cards/DayCard';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import styles from './Dashboard.module.css';

/**
 * PAINEL DE CONTROLE (tela inicial)
 * ============================================================================
 * Consolida numa tela o que o aluno já produziu nas outras áreas. Nada aqui
 * tem fonte própria: cada número é lido do que ELE registrou — produtos da
 * central de mineração, postagens do painel de consistência, tarefas do plano.
 * O painel não é mais um lugar para preencher; é o retrato do que já foi feito.
 *
 * A ÚNICA ENTRADA DIRETA é a meta da semana, e ela é deliberadamente do aluno:
 * o valor é editável e o painel só mostra onde ele está em relação ao que ELE
 * definiu. A plataforma não afirma que alguém vai faturar X — isso seria
 * promessa de ganho, que é justamente o que a regra de conteúdo proíbe. O
 * número sugerido aparece como sugestão do guia, atribuída, não como previsão.
 *
 * VERSÃO: os quadros de mineração, sequência e foco vêm das ferramentas, que
 * são exclusivas da Completa. Na Essencial eles não aparecem — quadro que nunca
 * poderia encher é pior que quadro nenhum.
 */

const GOAL_KEY = 'ocodigo:painel:meta';

/** O guia usa este valor como primeiro alvo. É sugestão, e é editável. */
const SUGGESTED_GOAL = '500';

interface Goal {
  target: string;
  earned: string;
}

function loadGoal(): Goal {
  const fallback: Goal = { target: SUGGESTED_GOAL, earned: '' };
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<Goal>;
    return {
      target: typeof saved.target === 'string' ? saved.target : fallback.target,
      earned: typeof saved.earned === 'string' ? saved.earned : '',
    };
  } catch {
    return fallback;
  }
}

function formatMoney(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  });
}

/* ---------------------------------------------------------------------------
   Tom da capa da meta
   ----------------------------------------------------------------------------
   Os dois pares saem da mesma rampa das capas dos módulos (ver COVER_TONES em
   ModuleCard.tsx), que vai do ciano ao magenta. Cor nova aqui seria cor nova na
   plataforma — o que este quadro precisa é só de um trecho da rampa que ainda
   não estivesse em uso no painel, e o azul/violeta estava livre.

   Bater a meta troca para o ciano de conclusão, o mesmo de "dia concluído" no
   plano e de "aprovado" na mineração. A cor muda porque o estado mudou, não
   para enfeitar.
   --------------------------------------------------------------------------- */
const GOAL_TONE = { from: '#6a8ef0', to: '#3c34a6' };
const GOAL_TONE_DONE = { from: '#25f4ee', to: '#0e8f96' };

/* ---------------------------------------------------------------------------
   Tela
   --------------------------------------------------------------------------- */

export function Dashboard() {
  const { percent, daysDone, modulesDone, currentDay, isDayDone, isTaskDone, toggleTask } =
    useProgress();
  const [goal, setGoal] = useState<Goal>(loadGoal);

  useEffect(() => {
    try {
      localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
    } catch {
      /* sem armazenamento o painel funciona na sessão e não guarda */
    }
  }, [goal]);

  /* leitura única na montagem: quem escreve são as ferramentas, não esta tela */
  const products = useMemo(() => (isComplete ? loadCandidates() : []), []);
  const tracker = useMemo(() => (isComplete ? loadTracker() : null), []);
  const today = todayIso();

  const approved = products.filter((item) => isApproved(item.scores)).length;

  const postedDates = useMemo(
    () => new Set((tracker?.posts ?? []).map((post) => post.date)),
    [tracker],
  );
  const streak = currentStreak(postedDates, today);
  const best = bestStreak(postedDates);
  const focus = focusProduct(tracker?.posts ?? []);

  /* os 21 blocos da barra, no ciclo que a ferramenta está acompanhando */
  const cycle = useMemo(() => {
    if (!tracker) return [];
    return Array.from({ length: CYCLE_DAYS }, (_, index) => {
      const date = addDays(tracker.startDate, index);
      return {
        date,
        done: postedDates.has(date),
        isToday: date === today,
        future: date > today,
      };
    });
  }, [tracker, postedDates, today]);

  const target = parseNumber(goal.target) ?? 0;
  const earned = parseNumber(goal.earned) ?? 0;
  const goalPercent = target > 0 ? Math.round((earned / target) * 100) : 0;
  const reachedGoal = target > 0 && earned >= target;

  const current = sevenDayPlan.find((d) => d.day === currentDay) ?? sevenDayPlan[0];
  const allDone = daysDone === sevenDayPlan.length;

  return (
    <div className="page">
      <header className={`page-head ${styles.head}`}>
        <p className="eyebrow">Painel de controle</p>
        <h1>Bem-vindo ao Código TikTok Shop</h1>
        <p className={styles.motto}>
          O aprendizado que gera dinheiro é o que você aplica na prática.
        </p>
      </header>

      {/* ---------- faixa de progresso geral ---------- */}
      <section className={`card ${styles.progress}`}>
        <div className={styles.progressHead}>
          <p className="eyebrow">Seu progresso</p>
          <span className={`mono ${styles.big}`}>{percent}%</span>
        </div>

        <ProgressMeter done={daysDone} current={currentDay} />

        <div className={styles.stats}>
          <div>
            <span className={`mono ${styles.statNum}`}>
              {daysDone}
              <span className={styles.of}>/{sevenDayPlan.length}</span>
            </span>
            <span className={styles.statLabel}>dias concluídos</span>
          </div>
          <div>
            <span className={`mono ${styles.statNum}`}>
              {modulesDone}
              <span className={styles.of}>/{modules.length}</span>
            </span>
            <span className={styles.statLabel}>módulos lidos</span>
          </div>
          <div className={styles.statHint}>
            {allDone
              ? 'Você percorreu o plano inteiro. Agora é repetir o ciclo com o que aprendeu.'
              : daysDone === 0
                ? 'Comece pelo Dia 1.'
                : `Continue pelo Dia ${currentDay}.`}
          </div>
        </div>
      </section>

      {/* ---------- os quadros ---------- */}
      <div className={[styles.grid, isComplete ? '' : styles.gridLite].filter(Boolean).join(' ')}>
        {/* ===== coluna larga ===== */}
        <div className={styles.col}>
          {/* --- meta da semana: mesma anatomia das capas de módulo --- */}
          <section className={`card ${styles.goal}`}>
            <div
              className={styles.goalCover}
              style={
                {
                  '--from': reachedGoal ? GOAL_TONE_DONE.from : GOAL_TONE.from,
                  '--to': reachedGoal ? GOAL_TONE_DONE.to : GOAL_TONE.to,
                } as React.CSSProperties
              }
            >
              <span className={`mono ${styles.goalPercent}`}>
                {target > 0 ? `${Math.min(goalPercent, 999)}%` : '—'}
              </span>

              <span className={`mono ${styles.goalTag}`}>Meta da semana</span>

              {/* o filete embaixo da capa é a barra de progresso de verdade */}
              <span
                className={styles.goalFill}
                style={{ width: `${Math.min(goalPercent, 100)}%` }}
                aria-hidden="true"
              />
            </div>

            <div className={styles.goalBody}>
              <div className={styles.goalFields}>
                <label className={styles.goalField}>
                  <span className="eyebrow">Já entrou</span>
                  <span className={styles.money}>
                    <i className="mono">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={goal.earned}
                      placeholder="0"
                      onChange={(e) => setGoal({ ...goal, earned: e.target.value })}
                      aria-label="Comissão já recebida nesta semana"
                    />
                  </span>
                </label>

                <label className={styles.goalField}>
                  <span className="eyebrow">Sua meta</span>
                  <span className={styles.money}>
                    <i className="mono">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={goal.target}
                      placeholder={SUGGESTED_GOAL}
                      onChange={(e) => setGoal({ ...goal, target: e.target.value })}
                      aria-label="Meta de comissão da semana"
                    />
                  </span>
                </label>
              </div>

              <p className={styles.goalNote}>
                {reachedGoal
                  ? `Meta batida: ${formatMoney(earned)} de ${formatMoney(target)}. Suba o alvo e continue.`
                  : target > 0
                    ? `Faltam ${formatMoney(Math.max(target - earned, 0))} para a meta que você definiu.`
                    : `A meta é sua. O guia usa R$ ${SUGGESTED_GOAL} como primeiro alvo — ajuste para a sua realidade.`}
              </p>
            </div>
          </section>

          {/* --- sequência dos 21 dias --- */}
          {isComplete && (
            <section className={`card ${styles.widget}`}>
              <div className={styles.widgetHead}>
                <p className="eyebrow">Regra dos {CYCLE_DAYS} dias</p>
                <Link to="/ferramentas/consistencia" className={styles.widgetLink}>
                  Abrir <Icon name="arrowRight" size={13} />
                </Link>
              </div>

              <div className={styles.streakTop}>
                <span className={`mono ${streak > 0 ? styles.streakLive : styles.streakOff}`}>
                  {streak}
                </span>
                <span className={styles.streakLabel}>
                  {streak === 1 ? 'dia seguido publicando' : 'dias seguidos publicando'}
                  {best > streak && <em> · melhor: {best}</em>}
                </span>
              </div>

              <div className={styles.blocks} aria-hidden="true">
                {cycle.map((day) => (
                  <i
                    key={day.date}
                    className={[
                      styles.block,
                      day.done ? styles.blockOn : '',
                      day.isToday ? styles.blockToday : '',
                      day.future ? styles.blockFuture : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                ))}
              </div>

              <p className={styles.widgetNote}>
                {streak === 0 && postedDates.size > 0
                  ? 'A sequência quebrou. Publique hoje e ela recomeça — o ciclo não precisa ser perfeito, precisa ser retomado.'
                  : streak === 0
                    ? 'Nenhuma postagem registrada ainda. O primeiro bloco acende hoje.'
                    : 'Um bloco por dia publicado. Mantenha a fila acesa.'}
              </p>
            </section>
          )}
        </div>

        {/* ===== coluna do meio: o que vem das ferramentas ===== */}
        {isComplete && (
          <div className={styles.col}>
            {/* --- funil de mineração --- */}
            <section className={`card ${styles.widget}`}>
              <div className={styles.widgetHead}>
                <p className="eyebrow">Funil de mineração</p>
                <Link to="/ferramentas/mineracao" className={styles.widgetLink}>
                  Abrir <Icon name="arrowRight" size={13} />
                </Link>
              </div>

              <div className={styles.counters}>
                <div className={styles.counter}>
                  <span className={`mono ${styles.counterNum}`}>{products.length}</span>
                  <span className={styles.counterLabel}>analisados</span>
                </div>
                <div className={`${styles.counter} ${styles.counterOk}`}>
                  <span className={`mono ${styles.counterNum}`}>{approved}</span>
                  <span className={styles.counterLabel}>aprovados</span>
                </div>
              </div>

              <p className={styles.widgetNote}>
                {products.length === 0
                  ? 'Nenhum produto analisado ainda. Antes de gravar, passe o candidato pelos cinco pilares.'
                  : approved === 0
                    ? 'Nenhum candidato passou de oito pontos ainda. Vale minerar mais antes de gravar.'
                    : 'Grave sobre os aprovados primeiro — foi para isso que você deu as notas.'}
              </p>
            </section>

            {/* --- produto de foco --- */}
            <section className={`card ${styles.widget} ${focus ? styles.focusOn : ''}`}>
              <p className="eyebrow">Seu produto de foco</p>

              {focus ? (
                <>
                  <h3 className={styles.focusName}>{focus.name}</h3>
                  <p className={styles.focusText}>
                    Você já publicou <strong>{focus.count}</strong>{' '}
                    {focus.count === 1 ? 'vídeo' : 'vídeos'} sobre ele. Continue variando o gancho:
                    é o mesmo produto encontrando públicos diferentes.
                  </p>
                  <Link to="/ganchos" className={styles.focusLink}>
                    Pegar outro gancho <Icon name="arrowRight" size={14} />
                  </Link>
                </>
              ) : (
                <p className={styles.widgetNote}>
                  Assim que você registrar postagens, o produto com mais vídeos aparece aqui.
                  Concentrar em um rende mais que espalhar em vários.
                </p>
              )}
            </section>
          </div>
        )}

        {/* ===== coluna estreita: o dia de hoje ===== */}
        <div className={styles.col}>
          <section className={`card ${styles.widget} ${styles.todayCard}`}>
            <div className={styles.widgetHead}>
              <p className="eyebrow">Hoje · Dia {String(current.day).padStart(2, '0')}</p>
              <Link to={`/plano#dia-${current.day}`} className={styles.widgetLink}>
                Ver o dia <Icon name="arrowRight" size={13} />
              </Link>
            </div>

            <h3 className={styles.todayTitle}>{current.title}</h3>
            <p className={styles.todayText}>{current.summary}</p>

            <div className={styles.tasks}>
              {current.tasks.map((task) => (
                <TaskCheck
                  key={task.id}
                  checked={isTaskDone(task.id)}
                  label={task.label}
                  onChange={() => toggleTask(task.id)}
                />
              ))}
            </div>

            {current.relatedModuleId && (
              <Button
                to={`/modulos/${current.relatedModuleId}`}
                variant="secondary"
                size="sm"
                full
              >
                Abrir o material do dia
              </Button>
            )}
          </section>
        </div>
      </div>

      {/* ---------- plano completo ---------- */}
      <section className={styles.planSection}>
        <div className="section-title">
          <h2>Seu plano de 7 dias</h2>
          <Link to="/plano" className={styles.seeAll}>
            Ver plano completo <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        <div className={`stagger ${styles.days}`}>
          {sevenDayPlan.map((day) => (
            <DayCard
              key={day.day}
              day={day}
              done={isDayDone(day.day)}
              current={!isDayDone(day.day) && day.day === currentDay}
            />
          ))}
        </div>
      </section>

      <div className={styles.bannerSlot}>
        <UpgradeBanner />
      </div>
    </div>
  );
}
