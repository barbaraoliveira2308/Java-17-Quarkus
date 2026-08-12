import { AppLayout } from './components/layout/AppLayout';
import { AppRoutes } from './router';

export default function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}