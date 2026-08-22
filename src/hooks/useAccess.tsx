import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { checkCredentials } from '@/data/access';
import { markStart } from '@/data/backstage';
import { Splash } from '@/components/ui/Splash';

/**
 * Estado de entrada na plataforma. Guardado no localStorage — quem entrou uma
 * vez não precisa digitar de novo naquele aparelho.
 *
 * Ver src/data/access.ts para o que isto é e o que não é.
 *
 * A ESPERA
 * ----------------------------------------------------------------------------
 * Entrar e sair levam AUTH_DELAY_MS de propósito. Não há requisição nenhuma: a
 * conferência é síncrona e roda no navegador em microssegundos. A pausa existe
 * porque uma transição instantânea entre "digitei a senha" e "estou dentro"
 * não é lida como sucesso — é lida como se nada tivesse acontecido.
 *
 * Ela mora aqui, e não nas telas, para que toda porta de entrada e de saída
 * herde o mesmo comportamento sem repetir cronômetro.
 *
 * A CONFERÊNCIA ACONTECE DEPOIS DA ESPERA, nunca antes: recusar na hora e
 * aceitar devagar entregaria a encenação no primeiro erro de digitação.
 */

const STORAGE_KEY = 'octs.access.v1';

/** Duração da espera de entrada e de saída. Mexa só aqui. */
const AUTH_DELAY_MS = 1600;

type Pending = 'in' | 'out' | null;

interface AccessValue {
  unlocked: boolean;
  /** 'in' enquanto entra, 'out' enquanto sai, null parado. */
  pending: Pending;
  /** Resolve com o resultado da conferência DEPOIS da espera. */
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AccessContext = createContext<AccessValue | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === 'ok';
    } catch {
      return false;
    }
  });
  const [pending, setPending] = useState<Pending>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      if (unlocked) {
        localStorage.setItem(STORAGE_KEY, 'ok');
        /* registro de entrada: é daqui que a contagem dos bastidores parte */
        markStart();
      }
      /* sair NÃO apaga a data de início — a contagem não recomeça a cada saída */
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* modo privativo: a sessão só não sobrevive ao recarregar */
    }
  }, [unlocked]);

  /* o provedor não desmonta em uso normal, mas cronômetro solto não fica */
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const signIn = useCallback(
    (email: string, password: string) =>
      new Promise<boolean>((resolve) => {
        setPending('in');
        timer.current = window.setTimeout(() => {
          const ok = checkCredentials(email, password);
          if (ok) setUnlocked(true);
          setPending(null);
          timer.current = undefined;
          resolve(ok);
        }, AUTH_DELAY_MS);
      }),
    [],
  );

  const signOut = useCallback(
    () =>
      new Promise<void>((resolve) => {
        setPending('out');
        timer.current = window.setTimeout(() => {
          /* só agora: virar `unlocked` antes tiraria a tela debaixo da espera */
          setUnlocked(false);
          setPending(null);
          timer.current = undefined;
          resolve();
        }, AUTH_DELAY_MS);
      }),
    [],
  );

  const value = useMemo<AccessValue>(
    () => ({ unlocked, pending, signIn, signOut }),
    [unlocked, pending, signIn, signOut],
  );

  return (
    <AccessContext.Provider value={value}>
      {children}
      {/*
        A saída cobre a tela inteira porque é a aplicação inteira que está indo
        embora. A entrada não: ali o botão que foi clicado é o lugar certo para
        o retorno acontecer, e tapar o formulário não informaria nada.
      */}
      {pending === 'out' && <Splash label="Saindo da plataforma" />}
    </AccessContext.Provider>
  );
}

export function useAccess(): AccessValue {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccess precisa estar dentro de <AccessProvider>');
  return ctx;
}
