import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { sevenDayPlan, totalPlanTasks } from '@/data/sevenDayPlan';
import { modules } from '@/data/modules';

/**
 * PROGRESSO DO ALUNO
 * ----------------------------------------------------------------------------
 * Guardado no localStorage do próprio navegador. Não há backend: trocar de
 * aparelho ou limpar o navegador zera o progresso — e isso está dito na
 * interface, em vez de fingirmos que existe uma conta.
 */

const STORAGE_KEY = 'octs.progress.v1';

interface ProgressState {
  /** ids de tarefas do plano de 7 dias já marcadas */
  tasks: string[];
  /** ids de módulos marcados como concluídos */
  modules: string[];
  /** o aluno já passou pela tela de boas-vindas */
  welcomed: boolean;
}

const emptyState: ProgressState = { tasks: [], modules: [], welcomed: false };

function readState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      modules: Array.isArray(parsed.modules) ? parsed.modules : [],
      welcomed: Boolean(parsed.welcomed),
    };
  } catch {
    return emptyState;
  }
}

interface ProgressValue {
  state: ProgressState;
  isTaskDone: (id: string) => boolean;
  toggleTask: (id: string) => void;
  isDayDone: (day: number) => boolean;
  completeDay: (day: number) => void;
  isModuleDone: (id: string) => boolean;
  toggleModule: (id: string) => void;
  markWelcomed: () => void;
  reset: () => void;
  /** 0–100, combinando tarefas do plano e módulos concluídos */
  percent: number;
  daysDone: number;
  /** tarefas marcadas que ainda existem no plano */
  tasksDone: number;
  modulesDone: number;
  /** primeiro dia ainda não concluído — o "continue de onde parou" */
  currentDay: number;
}

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() =>
    typeof window === 'undefined' ? emptyState : readState(),
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* modo privativo ou storage cheio: o progresso só não persiste */
    }
  }, [state]);

  const toggleTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.includes(id) ? prev.tasks.filter((t) => t !== id) : [...prev.tasks, id],
    }));
  }, []);

  const completeDay = useCallback((day: number) => {
    const planDay = sevenDayPlan.find((d) => d.day === day);
    if (!planDay) return;
    const ids = planDay.tasks.map((t) => t.id);
    setState((prev) => {
      const allDone = ids.every((id) => prev.tasks.includes(id));
      return {
        ...prev,
        tasks: allDone
          ? prev.tasks.filter((id) => !ids.includes(id))
          : Array.from(new Set([...prev.tasks, ...ids])),
      };
    });
  }, []);

  const toggleModule = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      modules: prev.modules.includes(id)
        ? prev.modules.filter((m) => m !== id)
        : [...prev.modules, id],
    }));
  }, []);

  const markWelcomed = useCallback(() => {
    setState((prev) => (prev.welcomed ? prev : { ...prev, welcomed: true }));
  }, []);

  const reset = useCallback(() => setState({ ...emptyState, welcomed: true }), []);

  const value = useMemo<ProgressValue>(() => {
    const isTaskDone = (id: string) => state.tasks.includes(id);
    const isDayDone = (day: number) => {
      const planDay = sevenDayPlan.find((d) => d.day === day);
      if (!planDay || planDay.tasks.length === 0) return false;
      return planDay.tasks.every((t) => state.tasks.includes(t.id));
    };
    const daysDone = sevenDayPlan.filter((d) => isDayDone(d.day)).length;

    /**
     * Só conta o que ainda existe nos dados. Sem isto, renomear o id de uma
     * tarefa ou de um módulo deixaria marcações órfãs no localStorage do aluno
     * inflando o progresso — daria para ver "24/21 tarefas".
     */
    const tasksDone = sevenDayPlan.reduce(
      (count, day) => count + day.tasks.filter((t) => state.tasks.includes(t.id)).length,
      0,
    );
    const modulesDone = modules.filter((m) => state.modules.includes(m.id)).length;

    const totalUnits = totalPlanTasks + modules.length;
    const doneUnits = tasksDone + modulesDone;
    const percent = totalUnits === 0 ? 0 : Math.round((doneUnits / totalUnits) * 100);

    const firstOpen = sevenDayPlan.find((d) => !isDayDone(d.day));

    return {
      state,
      isTaskDone,
      toggleTask,
      isDayDone,
      completeDay,
      isModuleDone: (id: string) => state.modules.includes(id),
      toggleModule,
      markWelcomed,
      reset,
      percent,
      daysDone,
      tasksDone,
      modulesDone,
      currentDay: firstOpen ? firstOpen.day : sevenDayPlan.length,
    };
  }, [state, toggleTask, completeDay, toggleModule, markWelcomed, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress precisa estar dentro de <ProgressProvider>');
  return ctx;
}
