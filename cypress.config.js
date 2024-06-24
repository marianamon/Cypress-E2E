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
      
      //excludeSpecPattern: '*.js',
      specPattern: 'e2e/cypress/integration/**/*.{js}',
      //supportFile: 'cypress/support/e2e.js',
      //integrationFolder: "e2e/cypress/e2sse/**/*.{feature,features}",
      supportFile: false
    },
    retries: {
      runMode: 2,
      openMode: 2
    },
    
  });
