<?php

namespace App\Http\Middleware;

use App\Helper\Response;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class ValidateApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $cookieData = json_decode($request->cookie('user_session'), true);
        $jwtToken = $cookieData['token'] ?? null;

        if (!$jwtToken) return Response::unauthorized('Akses ditolak: Token tidak ditemukan.');

        try {
            $secretKey = config('app.key');
            $decoded = JWT::decode($jwtToken, new Key($secretKey, 'HS256'));

            $user = DB::selectOne("SELECT * FROM MASTER_USER WHERE nip = ?", [$decoded->sub]);

            if (!$user) return Response::unauthorized('Akses ditolak: User tidak ditemukan.');

            // if (!$user->aktif) return Response::unauthorized('Akses ditolak: Akun Anda tidak aktif.');

            if ($jwtToken !== $user->token) return Response::unauthorized('Akses ditolak: Sesi tidak valid. Silakan login kembali.');

            $request->headers->set('Authorization', 'Bearer ' . $user->token);
            $request->attributes->add(['auth_user' => $user]);

            return $next($request);
        }catch (Exception $e) {
            return Response::unauthorized('Akses ditolak: Token tidak valid atau kedaluwarsa.');
        }
    }
}
