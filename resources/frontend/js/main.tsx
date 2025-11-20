// import '@/mocks/setupMocks';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../css/app.css';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
});

const rootElement = document.getElementById('root')!;
    if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
        </StrictMode>
    );
}