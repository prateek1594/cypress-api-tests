import { defineConfig } from "cypress";
const customLogger = require('./cypress/support/customLogger');

export default defineConfig({

  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  
  //reporters
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        logInfo(message) {
          customLogger.logInfo(message);
          return null;
        },
        logError(message) {
          customLogger.logError(message);
          return null;
        },
        logDebug(message) {
          customLogger.logDebug(message);
          return null;
        },
        logWarn(message) {
          customLogger.logWarn(message);
          return null;  
        },
    },
  )},
      baseUrl: "https://petstore.swagger.io/v2",
      specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
    },
  },
  );
