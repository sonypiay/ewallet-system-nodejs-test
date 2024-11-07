import { TransactionsService } from "../services/TransactionService.js";

export const TransactionController = {};

TransactionController.credit = async (request, response, next) => {
    try {
        const result = await TransactionsService.credit(request);
        return response.status(result.statusCode).json(result.response);
    } catch (error) {
        next(error);
    }
}

TransactionController.debit = async (request, response, next) => {
    try {
        const result = await TransactionsService.debit(request);
        return response.status(result.statusCode).json(result.response);
    } catch (error) {
        next(error);
    }
}