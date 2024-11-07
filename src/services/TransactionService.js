import { ConnectionPrisma } from "../application/Connection.js";
import BadRequestException from "../exceptions/BadRequestException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import TransactionRequest from "../validation/TransactionRequest.js";

export const TransactionsService = {};

const maximumDeposit = 5000;

TransactionsService.credit = async (request) => {
    const storeRequest = TransactionRequest.storeRequest(request.body);

    const [totalAmount, resultTransaction] = await ConnectionPrisma.$transaction(async (tx) => {
        const userId = storeRequest.user_id;
        const amount = parseFloat(storeRequest.amount);

        if( amount == 0 ) throw new BadRequestException("Invalid amount");

        const getUsers = await tx.users.findUnique({
            select: {
                balance: true
            },
            where: {
                id: userId
            }
        });

        if( getUsers === null ) throw new NotFoundException("Transaksi gagal. User tidak ditemukan");

        const currentBalance = parseFloat(getUsers.balance);
        const totalAmount = currentBalance + amount;

        if( totalAmount > maximumDeposit ) throw new BadRequestException(`Anda tidak bisa menambah dana karena melebihi batas maksimum dana yang dimiliki.`);
        if( currentBalance > maximumDeposit ) throw new BadRequestException("Anda tidak bisa menambah dana karena sudah mencapai batas maksimum");

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

        return [totalAmount, resultTransaction];
    });

    return {
        statusCode: 201,
        response: {
            status: "success",
            transaction_id: resultTransaction.id,
            new_balance: totalAmount,
        }
    };
}

TransactionsService.debit = async (request) => {
    const storeRequest = TransactionRequest.storeRequest(request.body);

    const [totalAmount, resultTransaction] = await ConnectionPrisma.$transaction(async (tx) => {
        const userId = storeRequest.user_id;
        let amount = parseFloat(storeRequest.amount);

        if( amount == 0 ) throw new BadRequestException("Invalid amount");
        if( amount > 0 ) amount = amount * -1;

        const getUsers = await tx.users.findUnique({
            select: {
                balance: true
            },
            where: {
                id: userId
            }
        });

        if( getUsers === null ) throw new NotFoundException("Transaksi gagal. User tidak ditemukan");
        
        const currentBalance = parseFloat(getUsers.balance);
        const totalAmount = currentBalance + amount;

        if( currentBalance == 0 || totalAmount < 0 ) throw new BadRequestException("Anda tidak memiliki cukup dana. Silakan isi ulang.");

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
                type: 'debit',
                created_at: new Date(),
            },
            select: {
                id: true,
                amount: true,
                created_at: true,
            }
        });

        return [totalAmount, resultTransaction];
    });

    return {
        statusCode: 201,
        response: {
            status: "success",
            transaction_id: resultTransaction.id,
            new_balance: totalAmount,
        }
    };
}