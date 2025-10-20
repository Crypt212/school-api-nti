const winston = require("winston");

module.exports = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/requests.log', level: 'info' }),
    ]
});
