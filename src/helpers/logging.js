import winston from "winston";

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/debug.log',
            level: 'debug'
        })
    ]
})