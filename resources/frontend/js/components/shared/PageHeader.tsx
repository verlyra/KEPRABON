import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    onAdd: () => void;
    addButtonLabel?: string;
}

export function PageHeader({ 
    title, 
    onAdd, 
    addButtonLabel = "Tambah Data" 
}: PageHeaderProps) {
    return (
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button onClick={onAdd} className="bg-green-700 hover:bg-green-800">
                <Plus className="w-4 h-4 mr-2" />
                {addButtonLabel}
            </Button>
        </CardHeader>
    );
}