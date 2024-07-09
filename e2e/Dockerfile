
FROM cypress/base:20.14.0

RUN mkdir -p /e2e

WORKDIR /e2e

# dependencies will be installed only if the package files change

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./tsconfig.json .
#use ./cypress.env.json whe do you need run test in docker desktop
#COPY ./cypress.env.json .
COPY ./cypress ./cypress
# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
#ENV CI=1
RUN npm install
# verify that Cypress has been installed correctly.
# running this command separately from "cypress run" will also cache its result
# to avoid verifying again when running the tests
ENTRYPOINT ["npx","cypress","run"]
CMD [ "" ]