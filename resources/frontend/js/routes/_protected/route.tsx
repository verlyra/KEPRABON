import { createFileRoute, Outlet, useLoaderData } from '@tanstack/react-router';
import { getDashboardData } from '@/api/dashboard';
import { AppSidebar } from '@/components/shared/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { UnauthorizedModal } from '@/components/shared/UnauthorizedModal';
import { DashboardHeader } from '@/components/shared/DashboardHeader';

export const Route = createFileRoute('/_protected')({
  loader: async () => {
    try {
      const dashboardData = await getDashboardData();
      return { user: dashboardData, isUnauthorized: false};
    } catch (error) {
      return { user: null, isUnauthorized: true};
    }
  },
  
  errorComponent: ({ error }) => (
    <div className="p-4">
      <p>Terjadi kesalahan: {error.message}</p>
    </div>
  ),
  
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { user, isUnauthorized } = useLoaderData({ from: '/_protected' });

  if (isUnauthorized) {
    return <UnauthorizedModal isOpen={true} />;
  }

  if (!user) {
    return <div className="p-4">Gagal memuat data pengguna.</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader user={user} />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}