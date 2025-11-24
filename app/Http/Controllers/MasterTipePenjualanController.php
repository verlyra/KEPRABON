<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\MasterTipePenjualanService;

class MasterTipePenjualanController extends Controller
{
    public function __construct(MasterTipePenjualanService $MasterTipePenjualanService)
    {
        $this->MasterTipePenjualanService = $MasterTipePenjualanService;
    }

    public function list(Request $request)
    {
        return Response::success($this->MasterTipePenjualanService->list());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_tipe_penjualan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $namaTipePenjualan = $validated['nama_tipe_penjualan'];

        return Response::success($this->MasterTipePenjualanService->store($namaTipePenjualan));
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_tipe_penjualan' => 'required|integer',
            'nama_tipe_penjualan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idTipePenjualan = $validated['id_tipe_penjualan'];
        $namaTipePenjualan = $validated['nama_tipe_penjualan'];

        return Response::success($this->MasterTipePenjualanService->update($idTipePenjualan, $namaTipePenjualan));
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_tipe_penjualan' => 'required|integer',
        ]);
        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idTipePenjualan = $validated['id_tipe_penjualan'];

        return Response::success($this->MasterTipePenjualanService->delete($idTipePenjualan));
    }

}