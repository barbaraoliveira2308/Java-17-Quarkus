import { Button, CircularProgress } from '@mui/material';
import type { ReactNode } from "react";
import styles from './SubmitButton.module.css';

type Props = {
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export function SubmitButton({
  loading,
  children,
  onClick,
  color = 'primary',
  fullWidth = false,
}: Props) {
  return (
    <div className={styles.root}>
      <Button
        variant="contained"
        color={color}
        onClick={onClick}
        disabled={loading}
        fullWidth={fullWidth}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : children}
      </Button>
    </div>
  );
}