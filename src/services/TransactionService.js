import { ConnectionPrisma } from "../application/Connection.js";
import ErrorException from "../exceptions/ErrorException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import TransactionRequest from "../validation/TransactionRequest.js";

export const TransactionsService = {};

TransactionsService.credit = async (request) => {
    const storeRequest = TransactionRequest.storeRequest(request.body);

    const [resultTransaction] = await ConnectionPrisma.$transaction(async (tx) => {
        const userId = parseInt(storeRequest.user_id);
        const amount = parseFloat(storeRequest.amount);

        const currentBalance = await tx.users.findUnique({
            select: {
                balance: true
            },
            where: {
                id: userId
            }
        });

        if( currentBalance === null ) throw new NotFoundException('No user found');

        const totalAmount = parseFloat(currentBalance.balance) + amount;

        await tx.users.update({
            data: {
                balance: totalAmount,
            },
            where: {
                id: userId
            }
        });

        const resultTransaction = await tx.transactions.create({
            data: {
                user_id: userId,
                amount: amount,
                type: 'credit',
                created_at: new Date(),
            },
            select: {
                id: true,
                amount: true,
                created_at: true,
            }
        });

        return [resultTransaction];
    });

    return {
        status: "success",
        transaction_id: resultTransaction.id,
        new_balance: parseFloat(resultTransaction.amount),
    };
}

TransactionsService.debit = async (request) => {
    const storeRequest = TransactionRequest.storeRequest(request.body);
    return storeRequest;
}