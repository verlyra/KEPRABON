import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: IndexComponent,
});

function IndexComponent() {
    const data = Route.useLoaderData();

    return (
        <div className="container mx-auto flex h-screen flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                Selamat Datang di Proyek Laravel + React
            </h1>
        </div>
    );
}