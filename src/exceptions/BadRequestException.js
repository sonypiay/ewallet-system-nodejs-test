import ErrorException from "./ErrorException.js";

class BadRequestException extends ErrorException {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

export default BadRequestException;