import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface UnauthorizedModalProps {
    isOpen: boolean;
}

export function UnauthorizedModal({ isOpen }: UnauthorizedModalProps) {
    const router = useRouter();

    const handleConfirm = () => {
        router.navigate({ to: '/' });
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Sesi anda telah berakhir</DialogTitle>
                    <DialogDescription>Harap login ulang untuk melanjutkan</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleConfirm} className="bg-green-900 hover:bg-green-700">
                        Oke
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}