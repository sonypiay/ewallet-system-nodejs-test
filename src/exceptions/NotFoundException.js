import ErrorException from "./ErrorException.js";

class NotFoundException extends ErrorException {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

export default NotFoundException;