import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface TableActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
    editLabel?: string;
    deleteLabel?: string;
}

export function TableActionButtons({
    onEdit,
    onDelete,
    editLabel = "Edit",
    deleteLabel = "Hapus"
}: TableActionButtonsProps) {
    return (
        <div className="flex justify-end space-x-2">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white border-none"
            >
                <Pencil className="w-4 h-4 mr-1" /> {editLabel}
            </Button>
            <Button 
                variant="destructive" 
                size="sm"
                onClick={onDelete}
            >
                <Trash2 className="w-4 h-4 mr-1" /> {deleteLabel}
            </Button>
        </div>
    );
}