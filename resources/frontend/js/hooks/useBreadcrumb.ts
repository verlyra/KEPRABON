import { useRouterState } from '@tanstack/react-router';
import { sidebarNav } from '@/lib/sidebar-nav';

export function useBreadcrumb() {
    const { location } = useRouterState();
    
    const findCurrentNavItem = () => {
        for (const item of sidebarNav) {
        if (item.url === location.pathname) {
            return { title: item.title, parent: undefined };
        }
        if (item.items) {
            for (const subItem of item.items) {
            if (subItem.url === location.pathname) {
                return { title: subItem.title, parent: item.title };
            }
            }
        }
        }
        return null;
    };
    
    const breadcrumb = findCurrentNavItem();
    
    return breadcrumb;
}