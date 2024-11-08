import { ConnectionPrisma } from "../../src/application/Connection.js";

export const TestUtils = {
    createUser: async() => {
        await ConnectionPrisma.users.create({
            data: {
                username: 'sonypiay',
                created_at: new Date(),
            }
        });
    },
    deleteUser: async() => {
        await ConnectionPrisma.users.delete({
            where: {
                username: 'sonypiay'
            }
        });
    },
    getUser: async() => {
        return await ConnectionPrisma.users.findUnique({
            where: {
                username: 'sonypiay',
            }
        });
    },
    deleteTransaction: async() => {
        await ConnectionPrisma.transactions.deleteMany();
    },
    currentBalance: async() => {
        const result = await ConnectionPrisma.users.findUnique({
            where: {
                username: 'sonypiay',
            },
            select: {
                balance: true
            }
        });

        return parseFloat(result.balance);
    }
};