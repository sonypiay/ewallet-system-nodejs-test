import Joi from "joi";
import ValidationRequest from "./ValidationRequest.js";

class TransactionRequest extends ValidationRequest {
    static storeRequest(request) {
        const schema = Joi.object({
            user_id: Joi.string()
                .required()
                .messages({
                    'string.base': 'user_id must be a string',
                    'string.empty': 'user_id cannot be an empty field',
                    'string.required': 'Missing parameter user_id'
                }),
            amount: Joi
                .number()
                .required()
                .messages({
                    'number.base': 'amount must be a number',
                    'number.empty': 'amount cannot be an empty field',
                    'number.required': 'Missing parameter amount'
                })
        });

        return this.handler(schema, request);
    }
}

export default TransactionRequest;