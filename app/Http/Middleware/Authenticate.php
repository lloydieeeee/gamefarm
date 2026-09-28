<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as MiddlewareAuthenticate;

class Authenticate extends MiddlewareAuthenticate
{
    public function unauthenticated($request, array $guards): void
    {
        foreach ($guards as $guard)
        {
            switch ($guard)
            {
                case 'admin':
                    throw new AuthenticationException(redirectTo: route('admin.login'));
                default:
                    throw new AuthenticationException(redirectTo: route('login'));
            }
        }
    }
}
