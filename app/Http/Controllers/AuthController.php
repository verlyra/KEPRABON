<?php

namespace App\Http\Controllers;

use App\Helper\Response;
use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authService;

    public function __construct()
    {
        $this->authService = app(AuthService::class);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nip' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $result = $this->authService->login($validator->validated());

        if ($result['status'] === false) {
            return Response::unauthorized($result['message']);
        }

        $loginData = $result['data'];
        $user = $loginData['user'];
        $token = $loginData['token'];
        $expiresInSeconds = $loginData['expires_in'];

        $cookiePayload = [
            'nip' => $user->nip,
            'nama' => $user->nama,
            'token' => $token,
        ];
        
        $cookie = cookie('user_session', json_encode($cookiePayload), $expiresInSeconds / 60);

        return Response::success(null, 'Berhasil Login')->withCookie($cookie);
    }
}
