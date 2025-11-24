<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MasterPembayaran extends Controller
{
    protected MasterPembayaranService $MasterPembayaranService;

    public function __construct(MasterPembayaranService $MasterPembayaranService)
    {
        $this->MasterPembayaranService = $MasterPembayaranService;
    }

    public function list(Request $request)
    {
        return Response::success($this->MasterPembayaranService->list());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_pembayaran' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $namaPembayaran = $validated['nama_pembayaran'];

        return Response::success($this->MasterPembayaranService->store($namaPembayaran));
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_pembayaran' => 'required|integer',
            'nama_pembayaran' => 'required|string|max:255',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idPembayaran = $validated['id_pembayaran'];
        $namaPembayaran = $validated['nama_pembayaran'];

        return Response::success($this->MasterPembayaranService->update($idPembayaran, $namaPembayaran));
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_pembayaran' => 'required|integer',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idPembayaran = $validated['id_pembayaran'];

        return Response::success($this->MasterPembayaranService->delete($idPembayaran));
    }
}
