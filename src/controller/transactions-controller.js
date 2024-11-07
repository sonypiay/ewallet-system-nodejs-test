import { TransactionsService } from "../services/transactions-service.js";

export const TransactionController = {};

TransactionController.credit = async (request, response) => {
    const result = await TransactionsService.credit(request);
    return response.status(200).json(result);
}

TransactionController.debit = async (request, response) => {
    const result = await TransactionsService.debit(request);
    return response.status(200).json(result);
}