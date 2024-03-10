// logger.js
const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Clear log files on initialization
const clearLogFiles = () => {
  fs.writeFileSync(path.join(logsDir, 'combined.log'), '');
  fs.writeFileSync(path.join(logsDir, 'error.log'), '');
};

clearLogFiles(); // Clear log files when the logger is initialized

// Configure winston logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
    })
  ]
});

// Add log file for error level logs
logger.add(new winston.transports.File({
  filename: path.join(logsDir, 'error.log'),
  level: 'error',
}));

module.exports = logger;
