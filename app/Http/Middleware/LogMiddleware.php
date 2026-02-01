<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LogMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Proses request terlebih dahulu
        $response = $next($request);

        // Ambil path URL
        $path = $request->path();

        // Hanya simpan log yang aktivitas store/update/delete berdasarkan path
        if (preg_match('/(store|update|delete)$/', $path)) {

            // Ambil user dari attribute
            $user = $request->attributes->get('auth_user');

            // Payload ditambah informasi path
            $payload = [
                'path'   => $path,
                'method' => $request->method(),
                'data'   => $request->all(),
            ];

            DB::table('trx_log')->insert([
                'nip'         => $user->nip ?? null,
                'payload'     => json_encode($payload, JSON_UNESCAPED_UNICODE),
                'response'    => $response->getContent(),
                'tanggal_log' => now(),
            ]);
        }

        return $response;
    }
}