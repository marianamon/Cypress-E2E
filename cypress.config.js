const { defineConfig } = require("cypress");

module.exports = defineConfig(
  {
    chromeWebSecurity: false,
    video: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: false,
    experimentalInteractiveRunEvents: true,
    experimentalMemoryManagement: true,
    projectId: 'ryx4xk',
    viewportWidth: 1366,
    viewportHeight: 768,
    pageLoadTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    numTestsKeptInMemory: 0,
    
    e2e: {
      setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config);
      },
      env: {
        allure: true,
        allureResultsPath: 'cypress/report/allure-result/',
        allureSkipAutomaticScreenshots: true,
        allureReuseAfterSpec: true,

      },
      excludeSpecPattern: '*.js',
      specPattern: 'cypress/e2e/**/*.feature',
    },
    retries: {
      runMode: 2,
      openMode: 2
    },
    
    
  });
