<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\MasterCabangService;

class MasterCabangController extends Controller
{
    protected MasterCabangService $MasterCabangService;

    public function __construct()
    {
        $this->MasterCabangService = app(MasterCabangService::class);
    }

    public function list(Request $request)
    {
        return Response::success($this->MasterCabangService->list());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_cabang' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $namaCabang = $validated['nama_cabang'];

        return Response::success($this->MasterCabangService->store($namaCabang));
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_cabang' => 'required|integer',
            'nama_cabang' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idCabang = $validated['id_cabang'];
        $namaCabang = $validated['nama_cabang'];

        return Response::success($this->MasterCabangService->update($idCabang, $namaCabang));
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_cabang' => 'required|integer',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idCabang = $validated['id_cabang'];

        return Response::success($this->MasterCabangService->delete($idCabang));
    }

}
