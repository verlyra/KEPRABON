import { createFileRoute } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginBgImage from '@/assets/images/login-bg.jpg';
import Logo from '@/assets/images/logo.png';
import { useLoginHooks } from '@/hooks/useLogin';

export const Route = createFileRoute('/_public/')({
  component: LoginPage,
});

function LoginPage() {
  const {
    nip,
    setNip,
    password,
    setPassword,
    isPending,
    error,
    showPassword,
    setShowPassword,
    handleLogin
  } =  useLoginHooks();

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center py-12 lg:min-h-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <CardHeader className="p-0 text-center">
            <CardTitle className="text-3xl font-bold">Silakan Login</CardTitle>
            <CardDescription>
              Masukan NIP dan Password Anda.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4 p-0">
              <div className="grid gap-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  type="text"
                  placeholder="Masukan NIP"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm font-medium text-destructive">
                  {error.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-900 hover:bg-green-700 text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
            </CardContent>
          </form>
        </div>
      </div>

      <div className="hidden lg:relative lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginBgImage})` }}
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col h-full w-full items-center justify-center p-10 text-center">
          <img
            src={Logo}
            alt="Logo Keprabon"
            className="w-1/2 h-auto"
          />
        </div>
      </div>
    </div>
  );
}