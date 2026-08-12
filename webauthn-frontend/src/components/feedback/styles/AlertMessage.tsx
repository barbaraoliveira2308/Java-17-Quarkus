import { Alert } from '@mui/material';
import styles from './AlertMessage.module.css';

type Props = {
  severity: 'success' | 'error' | 'info' | 'warning';
  message: string | null;
};

export function AlertMessage({ severity, message }: Props) {
  if (!message) return null;
  return (
    <Alert severity={severity} className={styles.root}>
      {message}
    </Alert>
  );
}