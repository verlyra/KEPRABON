<?php

namespace App\Services;

use App\Helper\Response;
use App\Repositories\UserRepository;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        protected UserRepository $userRepository
    ) {}

    public function login(array $credentials): array
    {
        $user = $this->userRepository->findByUsername($credentials['username']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [
                'status'  => false,
                'message' => 'Kredensial yang diberikan tidak cocok dengan data kami.'
            ];
        }

        if (!$user->aktif) {
            return [
                'status'  => false,
                'message' => 'Akun Anda tidak aktif.'
            ];
        }

        $secretKey = config('app.key');

        $tokenLifetimeMinutes = 60 * 24;
        $issuedAt = time();
        $expireAt = $issuedAt + ($tokenLifetimeMinutes * 60);

        $payload = [
            'iss' => url('/'),           
            'iat' => $issuedAt,          
            'exp' => $expireAt,          
            'sub' => $user->id_user,     
            'username' => $user->username
        ];

        $jwtToken = JWT::encode($payload, $secretKey, 'HS256');

        $this->userRepository->updateToken($user->id_user, $jwtToken);

        return [
            'status' => true,
            'data'   => [
                'user'       => $user,
                'token'      => $jwtToken,
                'expires_in' => $tokenLifetimeMinutes * 60
            ]
        ];
    }
}