import { PrismaClient } from "@prisma/client";
import { Logger } from "./Logging.js";

export const ConnectionPrisma = new PrismaClient({
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

if( process.env.NODE_ENV != 'production' ) {
    ConnectionPrisma.$on('query', (e) => {
        Logger.info(e);
    })
    
    ConnectionPrisma.$on('info', (e) => {
        Logger.info(e);
    })
    
    ConnectionPrisma.$on('error', (e) => {
        Logger.error(e);
    })
    
    ConnectionPrisma.$on('warn', (e) => {
        Logger.error(e);
    })
}