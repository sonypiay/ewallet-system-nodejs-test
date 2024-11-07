import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

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
    logger.debug(e);
})

Connection.$on('info', (e) => {
    logger.info(e);
})

Connection.$on('error', (e) => {
    logger.error(e);
})

Connection.$on('warn', (e) => {
    logger.error(e);
})