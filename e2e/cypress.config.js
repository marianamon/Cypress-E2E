const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig(
  {
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: false,
    experimentalInteractiveRunEvents: true,
    experimentalMemoryManagement: true,
    projectId: 'u6c22n',
    viewportWidth: 1366,
    viewportHeight: 768,
    pageLoadTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    numTestsKeptInMemory: 0,
    
    e2e: {
      setupNodeEvents(on, config) {
        require('./cypress/plugins/index.js')(on, config);
        allureWriter(on, config);
            return config;
      },
      env: {
        allure: true,
        allureReuseAfterSpec: true, 
        //allureResultsPath: 'cypress/report/allure-result/',
        allureSkipAutomaticScreenshots: true,

      },
      excludeSpecPattern: '*.js',
      specPattern: 'cypress/e2e/**/*.feature',
    },
    retries: {
      runMode: 2,
      openMode: 2
    },
    
    
  });