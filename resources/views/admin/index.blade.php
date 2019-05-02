<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravue Dashboard</title>
    <link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/metismenu.min.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/style.css') }}" type="text/css" rel="stylesheet"/>
    <script>
        window.appSettings = {
            apiUrl: 'http://127.0.0.1:8000',
            debug: true,
        };
    </script>
</head>
<body>
<div id="app"></div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
