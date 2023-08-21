function setupLogger(Cypress) {
  const logLevels = {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug',
    WARN: 'warn',
  };

  const logColors = {
    [logLevels.INFO]: 'blue',
    [logLevels.ERROR]: 'red',
    [logLevels.DEBUG]: 'green',
    [logLevels.WARN]: 'orange',
  };

  function formatLogMessage(level, message) {
    const color = logColors[level] || 'black';
    return `%c{message}`;
  }

  function log(level, message) {
    const logMessage = formatLogMessage(level, message);
    const color = logColors[level] || 'black';
    switch (level) {
      case logLevels.INFO:
        Cypress.log({ message: logMessage, color, timeout: 0 });
        break;
      case logLevels.ERROR:
        Cypress.log({
          message: logMessage,
          color,
          timeout: 0,
          consoleProps: () => ({ message }),
        });
        break;
      case logLevels.DEBUG:
        Cypress.log({
          message: logMessage,
          color,
          timeout: 0,
          consoleProps: () => ({ message }),
        }).set({ consoleProps: () => ({ message }) });
        break;
      case logLevels.WARN:
        Cypress.log({
          message: logMessage,
          color,
          timeout: 0,
          consoleProps: () => ({ message }),
        }).set({ consoleProps: () => ({ message }) });
        break;
      default:
        Cypress.log({ message: logMessage, color, timeout: 0 });
    }
  }
  Cypress.Commands.add('logInfo', (message) => log(logLevels.INFO, message));
  Cypress.Commands.add('logError', (message) => log(logLevels.ERROR, message));
  Cypress.Commands.add('logDebug', (message) => log(logLevels.DEBUG, message));
  Cypress.Commands.add('logWarn', (message) => log(logLevels.WARN, message));

  return {
    logLevels,
  };
}
module.exports = setupLogger;
