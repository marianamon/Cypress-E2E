import { defineConfig } from 'cypress';
import * as webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on('file:preprocessor', webpack({
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js', '.feature'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: 'ts-loader',
              },
            ],
          },
          {
            test: /\.feature$/,
            use: [
              {
                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                options: config,
              },
            ],
          },
        ],
      },
    },
  }));

  return config;
}

export default defineConfig({
  e2e: {
    specPattern: 'e2e/cypress/fixtures/*.{feature,features}',
    supportFile: false,
    setupNodeEvents,
  },
});
