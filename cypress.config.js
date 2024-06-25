const { defineConfig } = require('cypress')

module.exports = defineConfig({

  'cypress-cucumber-preprocessor': {

    nonGlobalStepDefinitions: false,

    step_definitions: './e2e/cypress/support/step_definitions/**/',

  },

  e2e: {

    setupNodeEvents(on, config) {

      return require('./e2e/cypress/plugins/index.js')(on, config)

    },

    specPattern: 'e2e/cypress/fixtures/*.{feature,features}',

    supportFile:false

  },

}) 