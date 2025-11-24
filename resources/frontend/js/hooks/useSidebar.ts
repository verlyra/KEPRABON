import { NavItem, sidebarNav } from "@/lib/sidebar-nav";
import { useState } from "react";

export function useSidebarHooks() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredNav = sidebarNav.map(item => {
        if (!item.items) {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ? item : null;
        }
        const filteredSubItems = item.items.filter(sub => sub.title.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filteredSubItems.length > 0 || item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return { ...item, items: filteredSubItems };
        }
        return null;
    }).filter(Boolean) as NavItem[];

    return {
        searchTerm,
        setSearchTerm,
        filteredNav
    }
}