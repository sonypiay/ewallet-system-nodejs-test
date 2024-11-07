import { PrismaClient } from "@prisma/client";
import { Logger } from "./Logging.js";

export const Connection = new PrismaClient({
    log: [
        {
            level: 'query',
            emit: 'event'
        },
        {
            level: 'info',
            emit: 'event'
        },
        {
            level: 'warn',
            emit: 'event'
        },
        {
            level: 'error',
            emit: 'event'
        }
    ]
});

Connection.$on('query', (e) => {
    Logger.debug(e);
})

Connection.$on('info', (e) => {
    Logger.info(e);
})

Connection.$on('error', (e) => {
    Logger.error(e);
})

Connection.$on('warn', (e) => {
    Logger.error(e);
})