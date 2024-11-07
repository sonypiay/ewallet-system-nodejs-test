import { Logger } from '../application/Logging.js';
import ErrorException from '../exceptions/ErrorException.js';
import NotFoundException from '../exceptions/NotFoundException.js';

export const ErrorMiddleware = async(err, request, response, next) => {
    if( ! err ) {
        next(); return;
    }

    Logger.error(JSON.stringify({
        path: request.path,
        message: err.message,
    }));

    if( err instanceof NotFoundException || err instanceof ErrorException ) {
        err.render(response);
    } else {
        response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        }).end();
    }
}