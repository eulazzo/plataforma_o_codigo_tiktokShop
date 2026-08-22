import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AccessProvider, useAccess } from '@/hooks/useAccess';
import { ProgressProvider, useProgress } from '@/hooks/useProgress';
import { ToastProvider } from '@/components/ui/Toast';
import { AppShell } from '@/components/layout/AppShell';
import { Login } from '@/pages/Login';
import { Welcome } from '@/pages/Welcome';
import { Dashboard } from '@/pages/Dashboard';
import { SevenDayPlan } from '@/pages/SevenDayPlan';
import { Modules } from '@/pages/Modules';
import { ModuleDetail } from '@/pages/ModuleDetail';
import { UpgradeInfo } from '@/pages/UpgradeInfo';
import { ContentLibrary } from '@/pages/ContentLibrary';
import { AiLab } from '@/pages/AiLab';
import { HookLibrary } from '@/pages/HookLibrary';
import { Metrics } from '@/pages/Metrics';
import { Tools } from '@/pages/Tools';
import { Backstage } from '@/pages/Backstage';
import { CopyVault } from '@/pages/CopyVault';

/**
 * ROTAS
 * ----------------------------------------------------------------------------
 * HashRouter: a plataforma pode ser hospedada em qualquer lugar — inclusive num
 * subdiretório de caminho não óbvio — sem configuração de servidor para rotas.
 *
 * Ordem das portas: entrar → boas-vindas (uma vez) → plataforma.
 *
 * FASE 2 — ao construir uma área nova:
 *   1. crie a página em src/pages;
 *   2. adicione a <Route> aqui;
 *   3. troque o status do item em src/data/navigation.ts para 'ready'.
 */

/** Sem acesso liberado, manda para a tela de entrada. */
function RequireAccess({ children }: { children: JSX.Element }) {
  const { unlocked } = useAccess();
  return unlocked ? children : <Navigate to="/entrar" replace />;
}

/** Primeiro acesso passa pelas boas-vindas antes do painel. */
function RequireWelcome({ children }: { children: JSX.Element }) {
  const { state } = useProgress();
  return state.welcomed ? children : <Navigate to="/boas-vindas" replace />;
}

export default function App() {
  return (
    <AccessProvider>
      <ProgressProvider>
        <ToastProvider>
          <HashRouter>
            <Routes>
              <Route path="/entrar" element={<Login />} />

              <Route
                path="/boas-vindas"
                element={
                  <RequireAccess>
                    <Welcome />
                  </RequireAccess>
                }
              />

              <Route
                element={
                  <RequireAccess>
                    <RequireWelcome>
                      <AppShell />
                    </RequireWelcome>
                  </RequireAccess>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="/plano" element={<SevenDayPlan />} />
                <Route path="/modulos" element={<Modules />} />
                <Route path="/modulos/:moduleId" element={<ModuleDetail />} />
                <Route path="/conteudo" element={<ContentLibrary />} />
                <Route path="/laboratorio-ia" element={<AiLab />} />
                <Route path="/ganchos" element={<HookLibrary />} />
                <Route path="/metricas" element={<Metrics />} />
                <Route path="/ferramentas" element={<Tools />} />
                <Route path="/ferramentas/:tool" element={<Tools />} />
                <Route path="/bastidores" element={<Backstage />} />
                <Route path="/copys" element={<CopyVault />} />
                <Route path="/versao-completa" element={<UpgradeInfo />} />
              </Route>

              {/* rota desconhecida volta para o início, nunca para uma tela em branco */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </ToastProvider>
      </ProgressProvider>
    </AccessProvider>
  );
}
