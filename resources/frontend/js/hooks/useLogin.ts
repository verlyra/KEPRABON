import { useState } from "react";
import { useLogin } from '@/api/auth/hooks';

export function useLoginHooks() {
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: performLogin, isPending, error } = useLogin();
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        performLogin({ nip, password });
    };

    return {
        nip,
        setNip,
        password,
        setPassword,
        isPending,
        error,
        showPassword,
        setShowPassword,
        handleLogin
    }
}