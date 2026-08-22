import { Icon } from './Icon';
import styles from './TaskCheck.module.css';

interface TaskCheckProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

/** Checkbox das tarefas do plano. Área de toque grande, estado bem visível. */
export function TaskCheck({ checked, label, onChange }: TaskCheckProps) {
  return (
    <label className={[styles.row, checked ? styles.checked : ''].filter(Boolean).join(' ')}>
      <input type="checkbox" checked={checked} onChange={onChange} className={styles.input} />
      <span className={styles.box} aria-hidden="true">
        <Icon name="check" size={13} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
