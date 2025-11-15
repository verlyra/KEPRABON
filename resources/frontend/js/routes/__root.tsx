import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <main>
                <Outlet />
            </main>
        </div>
    );
}