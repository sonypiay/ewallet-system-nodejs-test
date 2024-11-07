// import { Connection } from '../application/database-connection.js';

import ErrorException from "../exceptions/ErrorException.js";
import NotFoundException from "../exceptions/NotFoundException.js";

export const TransactionsService = {};

TransactionsService.credit = async (request) => {
    throw new ErrorException("Testing error exception");

    // return {
    //     body: request.body,
    //     path: request.path,
    // };
}

TransactionsService.debit = async (request) => {
    throw new NotFoundException("Data not found");
}