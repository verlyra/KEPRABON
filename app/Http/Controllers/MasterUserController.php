<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\MasterUserService;

use Illuminate\Support\Facades\Validator;

class MasterUserController extends Controller
{
    protected MasterUserService $MasterUserService;
    public function __construct(MasterUserService $MasterUserService)
    {
        $this->MasterUserService = $MasterUserService;
    }

    public function list(Request $request)
    {
        return Response::success($this->MasterUserService->list());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nip' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'aktif' => 'required|boolean',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $nip = $validated['nip'];
        $nama = $validated['nama'];
        $password = $validated['password'];
        $aktif = $validated['aktif'];

        return Response::success($this->MasterUserService->store($nip, $nama, $password, $aktif));
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nip_old' => 'required|string|max:20',
            'nip_new' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'aktif' => 'required|boolean',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $nip_old = $validated['nip_old'];
        $nip_new = $validated['nip_new'];
        $nama = $validated['nama'];
        $password = $validated['password'];
        $aktif = $validated['aktif'];

        return Response::success($this->MasterUserService->update($nip_old, $nip_new, $nama, $password, $aktif));
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nip' => 'required|string|max:20',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $nip = $validated['nip'];

        return Response::success($this->MasterUserService->delete($nip));
    }
}
