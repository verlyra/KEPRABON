<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Response;
use App\Services\TransactionService;

use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    protected TransactionService $transactionService;
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date_format:d-m-Y',
            'end_date' => 'required|date_format:d-m-Y',
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        
        return Response::success(
            $this->transactionService->getTransactions($validated['start_date'], $validated['end_date'])
        );
    }

    public function detail(Request $request)
    {
        $validated = $request->validate([
        'id' => 'required|integer',
        ]);
        return Response::success(
            $this->transactionService->getDetail($validated['id'])
        );
    }


    public function form()
    {
        return Response::success($this->transactionService->form());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id_cabang"=>'required|integer',
            "id_tipe_penjualan"=>'required|integer',
            "id_pembayaran"=>'required|integer',
            "tanggal_beli"=>'required',
            "nama_pembeli"=>'nullable|string|max:255',
            "telp_pembeli"=>'nullable|string|max:20',
            "items"=>'required|array',
            "items.*.id_item"=>'required|integer',
            "items.*.kuantitas"=>'required|integer',
            "items.*.harga"=>'required|numeric'
        ]);

        if ($validator->fails()) return Response::badRequest($validator->errors());

        $validated = $validator->validated();
        $id_cabang = $validated['id_cabang'];
        $id_tipe_penjualan = $validated['id_tipe_penjualan'];
        $id_pembayaran = $validated['id_pembayaran'];
        $tanggal_beli = $validated['tanggal_beli'];
        $nama_pembeli = $validated['nama_pembeli'];
        $telp_pembeli = $validated['telp_pembeli'];
        $items = $validated['items'];
        $user = $request->attributes->get('auth_user');
        
        return Response::success($this->transactionService->store($id_cabang, $id_tipe_penjualan, $id_pembayaran, $tanggal_beli, $nama_pembeli, $telp_pembeli, $items, $user->nip));
    }
}
