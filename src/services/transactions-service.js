// import { Connection } from '../application/database-connection.js';

export const TransactionsService = {};

TransactionsService.credit = async (request) => {
    return {
        body: request.body,
        path: request.path,
    };
}

TransactionsService.debit = async (request) => {
    return {
        body: request.body,
        path: request.path,
    }
}