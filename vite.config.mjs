import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {

    return {
        plugins: [
            laravel({
                input: ['resources/frontend/css/app.css', 'resources/frontend/js/main.tsx'],
                refresh: true,
            }),
            react(),
            TanStackRouterVite({
                routesDirectory: './resources/frontend/js/routes',
                generatedRouteTree: './resources/frontend/js/routeTree.gen.ts',
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/frontend/js'),
            },
        },
    }
});