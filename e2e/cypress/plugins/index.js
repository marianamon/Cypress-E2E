
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require("fs-extra");




/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };

  on('file:preprocessor', cucumber(options));

  console.log('Setting up Allure plugin');
  allureWriter(on, config);
  console.log('Allure plugin setup completed');
  

  on('after:run', (results) => {
    if (results) {
      fs.mkdirSync("cypress/report/cucumber-json/", { recursive: true });
      fs.writeFile("cypress/report/cucumber-json/results.json", JSON.stringify(results));
    }
  });


  

  
};