import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggleSimple() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={cn(
                "relative flex h-8 w-full items-center rounded-lg p-1",
                "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDark ? "bg-slate-700" : "bg-slate-200"
            )}
        >
        <span
            className={cn(
            "absolute flex h-6 w-6 items-center justify-center rounded-md bg-background text-foreground shadow-sm",
            "transition-all duration-300 ease-in-out",
            isDark ? "left-full -translate-x-full -ml-1" : "left-1"
            )}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </span>

        <span className="w-full text-center text-sm font-medium text-muted-foreground">
            {isDark? 'Dark Mode' : 'Light Mode'}
        </span>
        
        <span className="sr-only">Toggle theme</span>
        </button>
    );
}