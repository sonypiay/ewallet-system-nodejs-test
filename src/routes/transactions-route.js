import express from "express";
import { TransactionController } from "../controller/transactions-controller.js";

const routes = {
    credit: {
        path: '/api/transactions/credit',
        handler: TransactionController.credit
    },
    debit: {
        path: '/api/transactions/debit',
        handler: TransactionController.debit
    },
};

export const TransactionRoute = express.Router();

TransactionRoute.post(routes.credit.path, routes.credit.handler);
TransactionRoute.post(routes.debit.path, routes.debit.handler);