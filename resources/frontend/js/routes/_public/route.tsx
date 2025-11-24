import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getDashboardData } from '@/api/dashboard';

export const Route = createFileRoute('/_public')({
  beforeLoad: async () => {
    let isAuthenticated = false;

    try {
      await getDashboardData();
      isAuthenticated = true;

    } catch (error) {
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: PublicLayout,
});

function PublicLayout() {
  return <Outlet />;
}