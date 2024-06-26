
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
const fs = require("fs-extra");
const path = require("path");


const fetchConfigurationByFile = async file => {
  const pathOfConfigurationFile = `config/config-${file}.json`;

  return (
    file && await fs.readJson(path.join(__dirname, "../", pathOfConfigurationFile))
  );
};

const fetchTestUsersByFile = async() => {
  const pathOfConfigurationFile = `config/test-users.json`;

  return (
    await fs.readJson(path.join(__dirname, "../", pathOfConfigurationFile))
  );
};

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

  /*on('after:run', (results) => {
    if (results) {
      fs.mkdirSync("cypress/.run", { recursive: true });
      fs.writeFile("cypress/.run/results.json", JSON.stringify(results));
      new ZephyrScaleReporter(results).reportZephyrResults();
    }
  });*/


  //const environment = config.env.NODE_ENV || "qa";
  //const configurationForEnvironment = await fetchConfigurationByFile(environment);
 // const testUsersData = await fetchTestUsersByFile();
  //const env = { ...testUsersData, ...configurationForEnvironment, ...configWithDotenv.parsed };
 // const result = { ...config, env };

  //return result;
};