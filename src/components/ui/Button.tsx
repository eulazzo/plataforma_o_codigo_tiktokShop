import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'sm';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  full?: boolean;
  /** Troca o ícone por um giro e trava o clique enquanto a ação acontece. */
  loading?: boolean;
  className?: string;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  to?: never;
}

interface LinkProps extends BaseProps {
  to: string;
  onClick?: () => void;
}

function classesFor({ variant = 'primary', size = 'md', full, loading, className }: BaseProps) {
  return [
    styles.btn,
    styles[variant],
    styles[size],
    full ? styles.full : '',
    loading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

function Inner({ children, icon, iconRight, loading }: BaseProps) {
  return (
    <>
      {/* o giro ocupa o lugar do ícone da esquerda; sem ícone, entra na frente */}
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        icon && <Icon name={icon} size={17} />
      )}
      <span>{children}</span>
      {iconRight && !loading && <Icon name={iconRight} size={17} />}
    </>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  if ('to' in props && props.to) {
    const { to, onClick, ...rest } = props;
    return (
      <Link to={to} onClick={onClick} className={classesFor(rest)}>
        <Inner {...rest} />
      </Link>
    );
  }

  const { onClick, type = 'button', disabled, ...rest } = props as ButtonProps;
  /* carregando trava o clique sozinho: quem chama não precisa lembrar disso */
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || rest.loading}
      aria-busy={rest.loading || undefined}
      className={classesFor(rest)}
    >
      <Inner {...rest} />
    </button>
  );
}
