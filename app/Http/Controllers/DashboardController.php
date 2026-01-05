<?php

namespace App\Http\Controllers;

use App\Helper\Response;
use App\Services\DashboardService;
use App\Services\StatisticService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected DashboardService $userService;
    protected StatisticService $statisticService;

    public function __construct()
    {
        $this->userService = app(DashboardService::class);
        $this->statisticService = app(StatisticService::class);
    }
    
    public function index(Request $request)
    {
        $user = $request->attributes->get('auth_user');

        return Response::success($this->userService->index($user->nip));
    }

    public function statistic(Request $request)
    {
        return Response::success($this->statisticService->index());
    }
}