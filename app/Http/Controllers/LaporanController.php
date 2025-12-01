<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\LaporanService;

use Illuminate\Support\Facades\Validator;
class LaporanController extends Controller
{
    protected LaporanService $LaporanService;

    public function __construct()
    {
        $this->LaporanService = app(LaporanService::class);
    }
    
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];

        return Response::success($this->LaporanService->index($startDate, $endDate));
    }
}
