import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '@/hooks/useAccess';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import styles from './Login.module.css';

/**
 * Entrada da plataforma.
 *
 * Nota de copy: esta tela não fala em "área protegida", "acesso seguro" nem
 * mostra cadeado — seria prometer uma proteção que não existe sem backend.
 * Ela diz o que é verdade: use os dados que chegaram no seu e-mail.
 */
export function Login() {
  const { signIn, pending } = useAccess();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const busy = pending === 'in';

  /**
   * A conferência acontece dentro de signIn, depois da espera. Aqui só
   * reagimos ao resultado — inclusive o erro, que por isso chega no mesmo
   * tempo que o acerto chegaria. Recusa instantânea entregaria a encenação.
   */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;

    setError(false);
    const ok = await signIn(email, password);

    if (ok) navigate('/', { replace: true });
    else setError(true);
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <h1 className={styles.title}>Entrar na plataforma</h1>
        <p className={styles.lead}>
          Use o e-mail e a senha de acesso que você recebeu depois da compra.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label className={styles.field}>
            <span>E-mail de acesso</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="seu-acesso@exemplo.com"
              disabled={busy}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              disabled={busy}
              required
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              E-mail ou senha não conferem. Confira o e-mail que você recebeu na compra.
            </p>
          )}

          <Button type="submit" full iconRight="arrowRight" loading={busy}>
            {busy ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className={styles.help}>
          Não encontrou o e-mail com o acesso? Procure também na caixa de promoções ou spam.
        </p>
      </div>
    </div>
  );
}
