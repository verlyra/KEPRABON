<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Nasi Liwet Keprabon Bu Darmi</title>
    <link rel="icon" href="{{ asset('favicon.png') }}" type="image/png">

    <link rel="stylesheet" href="https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css">
    
    @viteReactRefresh
    @vite('resources/frontend/js/main.tsx')
</head>
<body>
    <div id="root"></div>
</body>
</html>