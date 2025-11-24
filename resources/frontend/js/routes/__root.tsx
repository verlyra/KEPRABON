import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <main>
                    <Outlet />
                </main>
            </div>
            <Toaster richColors position="bottom-right" />
        </ThemeProvider>
    );
}