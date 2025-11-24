import '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { type ColumnMeta } from '@tanstack/react-table';

interface RouterContext {
    queryClient: QueryClient;
    breadcrumb?: {
        title: string;
        parent?: string;
    };
}

declare module '@tanstack/react-router' {
    interface Register {
        router: router;
        context: RouterContext;
    }
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        filterComponent?: React.ComponentType<{ column: Column<TData, TValue> }>;
    }
}