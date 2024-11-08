import Joi from "joi";
import ValidationRequest from "./ValidationRequest.js";

class TransactionRequest extends ValidationRequest {
    static storeRequest(request) {
        const schema = Joi.object({
            user_id: Joi
                .number()
                .integer()
                .required()
                .messages({
                    'number.base': 'user_id must be a number',
                    'number.integer': 'user_id must be a number',
                    'number.empty': 'user_id cannot be an empty field',
                    'number.required': 'Missing parameter user_id'
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