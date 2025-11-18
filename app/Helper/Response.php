<?php

namespace App\Helper;

use Illuminate\Http\Response as HttpResponse;

class Response
{
    protected $output;

    public function __construct()
    {
        $this->output = [
            'responseStatus' => true,
            'responseMessage' => 'Login success.',
            'responseBody' => []
        ];
    }

    public static function custome($data = null, $message = null, $status = false, $response)
    {
        return response()->json([
            'responseStatus' => $status,
            'responseMessage' => $message ?? 'Success',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], $response);
    }

    public static function success($data = null, $message = null)
    {
        return response()->json([
            'responseStatus' => true,
            'responseMessage' => $message ?? 'Success',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_OK);
    }

    public static function error($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Error',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_BAD_REQUEST);
    }

    public static function unauthorized($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Unauthorized',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_UNAUTHORIZED);
    }

    public static function notFound($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Not Found',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_NOT_FOUND);
    }

    public static function forbidden($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Forbidden',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_FORBIDDEN);
    }

    public static function serverError($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Server Error',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
    }

    public static function badRequest($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Bad Request',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_BAD_REQUEST);
    }

    public static function conflict($message = null, $data = null)
    {
        return response()->json([
            'responseStatus' => false,
            'responseMessage' => $message ?? 'Conflict',
            'responseBody' => $data instanceof \Illuminate\Support\Collection
                ? ($data->isEmpty() ? [] : $data)
                : (empty($data) ? null : $data),
        ], HttpResponse::HTTP_CONFLICT);
    }
}
