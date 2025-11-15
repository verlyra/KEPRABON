import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/frontend/js/app.tsx',
                'resources/frontend/css/app.css'
            ],
            refresh: true,
        }),
        react(),
        TanStackRouterVite({
            routesDirectory: './resources/frontend/js/routes',
            generatedRouteTree: './resources/frontend/js/routeTree.gen.ts',
        }),
    ],
});
