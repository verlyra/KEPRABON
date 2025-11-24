import { Link } from '@tanstack/react-router';
import { useLogout } from '@/api/auth/hooks';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { DashboardData } from '@/types/dashboard';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

interface DashboardHeaderProps {
    user: DashboardData;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const { mutate: performLogout } = useLogout();
    const breadcrumb = useBreadcrumb();

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                {breadcrumb && breadcrumb.title.toLowerCase() !== 'dashboard' && (
                <>
                    {breadcrumb.parent && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumb.parent}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                    )}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
                )}
            </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className="flex items-center gap-4 mx-5">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">{user.nama}</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.nama} />
                    <AvatarFallback>{user.nama.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.nama}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.nip}</p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={() => performLogout()}
                    className="hover:!bg-red-500 hover:!text-white"
                >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </header>
    );
}