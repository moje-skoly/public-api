// Type definitions for passport-http-bearer 1.0.1
// Project: https://github.com/jaredhanson/passport-http-bearer
// Definitions by: Šimon Rozsíval <https://github.com/simonrozsival>

/// <reference path="../passport/passport.d.ts"/>
/// <reference path="../express/express.d.ts"/>

declare module 'passport-http-bearer' {

    import passport = require('passport');
    import express = require('express');

    interface IStrategyOptions {
        
    }

    interface IStrategyOptionsWithRequest {
        
    }

    interface VerifyFunctionWithRequest {
        (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: any) => void): void;
    }

    interface VerifyFunction {
        (token: string, done: (error: any, user?: any, options?: any) => void): void;
    }

    class Strategy implements passport.Strategy {
        constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
        constructor(options: IStrategyOptions, verify: VerifyFunction);
        constructor(verify: VerifyFunction);

        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}