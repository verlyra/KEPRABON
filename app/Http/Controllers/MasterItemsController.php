<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\MasterItemsService;

use Illuminate\Support\Facades\Validator;

class MasterItemsController extends Controller
{
    protected MasterItemsService $masterItemsService;

    public function __construct(MasterItemsService $masterItemsService)
    {
        $this->masterItemsService = $masterItemsService;
    }

    public function list(Request $request)
    {
        return Response::success($this->masterItemsService->list());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_item' => 'required|string|max:255',
            'harga_item' => 'required|float',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $namaItem = $validated['nama_item'];
        $hargaItem = $validated['harga_item'];

        return Response::success($this->masterItemsService->store($namaItem, $hargaItem));
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_item' => 'required|integer',
            'nama_item' => 'required|string|max:255',
            'harga_item' => 'required|float',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idItem = $validated['id_item'];
        $namaItem = $validated['nama_item'];
        $hargaItem = $validated['harga_item'];

        return Response::success($this->masterItemsService->update($idItem, $namaItem, $hargaItem));
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_item' => 'required|integer',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $idItem = $validated['id_item'];

        return Response::success($this->masterItemsService->delete($idItem));
    }
}
