import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { NotFoundIllustration } from "./NotFoundIllustration";

export function NotFoundPublic() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="max-w-md">
                <NotFoundIllustration className="mx-auto block h-48 w-96 text-foreground" />
                <h1 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
                Halaman Tidak Ditemukan!
                </h1>
                <p className="mt-4 text-muted-foreground">
                Maaf, kami tidak dapat menemukan halaman yang anda cari😔
                Mungkin halaman tersebut telah diculik alien😱
                </p>
                <Button asChild className="mt-4">
                <Link to="/" className="bg-green-900">
                    Kembali ke halaman Login
                </Link>
                </Button>
            </div>
        </main>
    );
}