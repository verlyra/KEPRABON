<?php

namespace App\Http\Controllers;

use App\Helper\Response;
use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected DashboardService $userService;

    public function __construct()
    {
        $this->userService = app(DashboardService::class);
    }
    
    public function index(Request $request)
    {
        $user = $request->attributes->get('auth_user');

        return Response::success($this->userService->index($user->nip));
    }
}
