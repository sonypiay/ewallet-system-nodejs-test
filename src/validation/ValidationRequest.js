import BadRequestException from "../exceptions/BadRequestException.js";

class ValidationRequest {
    static handler(schema, request) {
        const result = schema.validate(request, {
            abortEarly: false,
            allowUnknown: false,
        });
    
        if( result.error ) throw new BadRequestException(result.error.message);
    
        return result.value;
    }
}

export default ValidationRequest;