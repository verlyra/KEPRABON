<?php

namespace App\Http\Middleware;

use Closure;
use App\Helper\Response as HelperResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HmacMiddleware
{
    private function rightRotate($value, $bits)
    {
        return (($value >> $bits) | ($value << (32 - $bits))) & 0xFFFFFFFF;
    }

    /**
     * Algoritma SHA256 Custom
     */
    private function sha256_custom($message)
    {
        $H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];

        $K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        $message = unpack('C*', $message);
        $l = count($message) * 8;
        //padding
        $message[] = 0x80;

        while ((count($message) * 8) % 512 !== 448) {
            $message[] = 0x00;
        }

        for ($i = 7; $i >= 0; $i--) {
            $message[] = ($l >> ($i * 8)) & 0xFF;
        }

        for ($i = 0; $i < count($message); $i += 64) {
            $W = [];
            //message schedule (16 word pertama dari blok)
            for ($j = 0; $j < 16; $j++) {
                $W[$j] =
                    ($message[$i + (4 * $j) + 0] << 24) |
                    ($message[$i + (4 * $j) + 1] << 16) |
                    ($message[$i + (4 * $j) + 2] << 8)  |
                    ($message[$i + (4 * $j) + 3]);
            }
            //message schedule (16 word awal dikembangkan menjai 64 word)
            for ($j = 16; $j < 64; $j++) {
                $s0 = //sigma kecil 0
                    $this->rightRotate($W[$j - 15], 7) ^
                    $this->rightRotate($W[$j - 15], 18) ^
                    ($W[$j - 15] >> 3);

                $s1 = //sigma kecil 1
                    $this->rightRotate($W[$j - 2], 17) ^
                    $this->rightRotate($W[$j - 2], 19) ^
                    ($W[$j - 2] >> 10);
                //W[j] dihitung
                $W[$j] = (
                    $W[$j - 16] +
                    $s0 +
                    $W[$j - 7] +
                    $s1
                ) & 0xFFFFFFFF;
            }

            $a = $H[0];
            $b = $H[1];
            $c = $H[2];
            $d = $H[3];
            $e = $H[4];
            $f = $H[5];
            $g = $H[6];
            $h = $H[7];

            //compression function main loop
            for ($j = 0; $j < 64; $j++) {
                $S1 = //sigma besar 1
                    $this->rightRotate($e, 6) ^
                    $this->rightRotate($e, 11) ^
                    $this->rightRotate($e, 25);
                //choose
                $ch = ($e & $f) ^ ((~$e) & $g);
                //campur nilai
                $temp1 = (
                    $h +
                    $S1 +
                    $ch +
                    $K[$j] +
                    $W[$j]
                ) & 0xFFFFFFFF;
                
                $S0 = //sigma besar 0
                    $this->rightRotate($a, 2) ^
                    $this->rightRotate($a, 13) ^
                    $this->rightRotate($a, 22);
                //majority
                $maj = ($a & $b) ^ ($a & $c) ^ ($b & $c);
                //campur nilai sigma besar 0 dan majority
                $temp2 = ($S0 + $maj) & 0xFFFFFFFF;
                //rotasi nilai
                $h = $g;
                $g = $f;
                $f = $e;
                $e = ($d + $temp1) & 0xFFFFFFFF;
                $d = $c;
                $c = $b;
                $b = $a;
                $a = ($temp1 + $temp2) & 0xFFFFFFFF;
            }

            $H[0] = ($H[0] + $a) & 0xFFFFFFFF;
            $H[1] = ($H[1] + $b) & 0xFFFFFFFF;
            $H[2] = ($H[2] + $c) & 0xFFFFFFFF;
            $H[3] = ($H[3] + $d) & 0xFFFFFFFF;
            $H[4] = ($H[4] + $e) & 0xFFFFFFFF;
            $H[5] = ($H[5] + $f) & 0xFFFFFFFF;
            $H[6] = ($H[6] + $g) & 0xFFFFFFFF;
            $H[7] = ($H[7] + $h) & 0xFFFFFFFF;
        }

        $result = '';
        foreach ($H as $value) {
            $result .= str_pad(dechex($value), 8, '0', STR_PAD_LEFT);
        }

        return $result;
    }

    /**
     * Implementasi Manual HMAC menggunakan SHA256 Custom
     */
    private function hmac_custom($data, $key)
    {
        $block_size = 64;

        if (strlen($key) > $block_size) {
            $key = pack('H*', $this->sha256_custom($key));
        }

        $key = str_pad($key, $block_size, chr(0x00));

        $ipad = str_repeat(chr(0x36), $block_size);
        $opad = str_repeat(chr(0x5c), $block_size);

        $inner_hash = pack(
            'H*',
            $this->sha256_custom(($key ^ $ipad) . $data)
        );

        $outer_hash = $this->sha256_custom(
            ($key ^ $opad) . $inner_hash
        );

        return $outer_hash;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $clientSignature = $request->header('X-Signature');
        $clientTimestamp = $request->header('X-Timestamp');
        $masterSecret = config('microservices.API_CLIENT_SECRET');

        // Bypass untuk local development
        if (in_array($request->getHost(), ['localhost', '127.0.0.1'])) {
            return $next($request);
        }

        if (!$clientSignature || !$clientTimestamp || !$masterSecret) {
            return HelperResponse::unauthorized('Missing configuration');
        }

        // Cek kadaluarsa (toleransi 60 detik)
        if (abs(time() - (int) $clientTimestamp) > 60) {
            return HelperResponse::unauthorized('Configuration expired');
        }

        $method = strtoupper($request->getMethod());
        $uri = $request->getRequestUri();
        $body = $request->getContent();

        // 1. Hash body
        $bodyHash = $this->sha256_custom($body);

        // 2. Data yang di-sign
        $dataToSign = $method . $uri . $bodyHash;

        // 3. Signature
        $dynamicKey = $this->hmac_custom($clientTimestamp, $masterSecret);
        $serverSignature = $this->hmac_custom($dataToSign, $dynamicKey);

        // 4. Verifikasi
        if (!hash_equals($serverSignature, $clientSignature)) {
            return HelperResponse::unauthorized('Invalid signature');
        }

        return $next($request);
    }
}
