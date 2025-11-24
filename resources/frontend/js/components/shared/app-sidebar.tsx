import { Landmark, Minus, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '../ui/sidebar';
import { ThemeToggleSimple } from './ThemeToggleSimple';
import { cn } from '@/lib/utils';
import { useSidebarHooks } from '@/hooks/useSidebar';

export function AppSidebar() {
  const {
    searchTerm,
    setSearchTerm,
    filteredNav
  } = useSidebarHooks();

  return (
    <Sidebar>
      <div className="flex h-full flex-col">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-900 text-white">
                    <Landmark className="size-4" />
                  </div>
                  <span className="font-semibold">Pencatatan Keuangan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto pl-2">
          <SidebarGroup>
            {/* <SearchForm className="mb-3" value={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} /> */}
            <SidebarMenu>
              {filteredNav.map((item, index) =>
                !item.items?.length ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className='h-auto'>
                      <Link to={item.url} activeProps={{ className: 'is-active' }} className="menu-list">
                        {item.icon && <item.icon className="size-4 hover:text-white" />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible key={item.title} defaultOpen={index === 0 || searchTerm.length > 0} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild ><SidebarMenuButton className="menu-list h-auto">
                        {item.icon && <item.icon className="size-4 hover:text-white" />}
                        {item.title}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton></CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map(sub => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={sub.url} activeProps={{ className: 'is-active' }} className="menu-list h-auto group">
                                  {sub.icon && <sub.icon className={cn(
                                    "size-4 transition-colors",
                                    "text-muted-foreground",
                                    "group-hover:text-inherit"
                                  )} />}
                                  {sub.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              )}
              {filteredNav.length === 0 && <p className='px-4 text-sm text-muted-foreground'>Menu tidak ditemukan.</p>}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto p-4 border-t space-y-2">
          <ThemeToggleSimple />
        </div>
      </div>
    </Sidebar>
  );
}