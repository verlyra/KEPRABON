import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function NotFound() {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
            <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Construction className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold">
                Halaman Belum Tersedia
            </CardTitle>
            <CardDescription className="mt-2">
                Modul yang anda coba akses sedang dalam tahap pengembangan,
                silakan periksa kembali nanti.
            </CardDescription>
            </CardHeader>
        </Card>
        </div>
    );
}