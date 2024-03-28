// request-logger.middleware.ts

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        Logger.log(`${req.method} ${JSON.stringify(req.originalUrl)} `);
        next();
    }
}
