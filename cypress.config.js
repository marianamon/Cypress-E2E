const { defineConfig } = require('cypress')

module.exports = defineConfig({

  'cypress-cucumber-preprocessor': {

    nonGlobalStepDefinitions: false,

    //step_definitions: './cypress/e2e/login/',

  },

  e2e: {

    setupNodeEvents(on, config) {

      return require('./e2e/cypress/plugins/index.js')(on, config)

    },

    specPattern: 'e2e/cypress/fixtures/*.{feature,features}',

    supportFile:false

  },

})