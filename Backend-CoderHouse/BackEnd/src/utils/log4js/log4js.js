const log4js = require("log4js")

log4js.configure({
    appenders: {
        miLoggerConsole: {type: 'console'},
        miLoggerFileWarn: { type: 'file', filename: 'warn.log'},
        miLoggerFileError: { type: 'file', filename: 'error.log'}
    },
    categories: {
        default: {appenders: ['miLoggerConsole'], level: 'trace'},
        info: {appenders: ['miLoggerConsole'], level: 'info'},
        warn: {appenders: ['miLoggerFileWarn'], level: 'warn'},
        error: {appenders: ['miLoggerFileError', 'miLoggerConsole'], level: 'error'}
    }
})

const logInfo = log4js.getLogger("info")
const logError = log4js.getLogger("error")

module.exports = { logInfo, logError }