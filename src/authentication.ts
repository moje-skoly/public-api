/// <reference path="../typings/tsd.d.ts" />

import * as passport from 'passport'; 
import { Request } from 'express';
import * as passportHttpBearer from 'passport-http-bearer';

passport.use(new passportHttpBearer.Strategy(
	(token: string, done: (error: any, user?: any, options?: any) => void) => {
		
	}
))

export = passport;
