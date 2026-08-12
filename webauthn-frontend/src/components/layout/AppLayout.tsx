import type { ReactNode } from "react";
import { Container } from '@mui/material';
import { AppHeader } from './AppHeader';
import styles from './styles/AppLayout.module.css';

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className={styles.root}>
      <AppHeader />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}