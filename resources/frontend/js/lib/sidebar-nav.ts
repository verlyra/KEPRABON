import { 
    ChartLine,
    NotebookPen,
    BookText,
    Store,
    CreditCard,
    Percent,
    Ham,
    UserCog,
    Cog
} from 'lucide-react';

export interface NavItem {
    title: string;
    url: string;
    icon?: React.ElementType;
    items?: NavItem[];
}

export const sidebarNav: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: ChartLine,
    },
    {
        title: 'Catat Penjualan',
        url: '/dashboard/penjualan',
        icon: NotebookPen,
    },
    {
        title: 'Laporan Penjualan',
        url: '/dashboard/pelaporan',
        icon: BookText,
    },
    {
    title: 'Data Master',
    url: '#',
    icon: Cog,
    items: [
        {
            title: 'Cabang',
            url: '/dashboard/master/cabang',
            icon: Store,
        },
        {
            title: 'Pembayaran',
            url: '/dashboard/master/pembayaran',
            icon: CreditCard,
        },
        {
            title: 'Tipe Penjualan',
            url: '/dashboard/master/tipe-penjualan',
            icon: Percent,
        },
        {
            title: 'Items',
            url: '/dashboard/master/items',
            icon: Ham,
        },
        {
            title: 'User',
            url: '/dashboard/master/users',
            icon: UserCog,
        },
        ]
    },
];