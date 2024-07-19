
FROM cypress/base:20.14.0

RUN mkdir -p /e2e

WORKDIR /e2e

# Copy package files
COPY ./package.json .
COPY ./package-lock.json .

# Install dependencies
RUN npm install

# Copy remaining files
COPY ./cypress.config.js .
COPY ./tsconfig.json .
COPY ./cypress ./cypress

# Set NODE_PATH environment variable
ENV NODE_PATH=/usr/local/lib/node_modules

# Debugging commands
RUN echo "Contenido del directorio de trabajo:" && ls -l
RUN echo "Contenido del archivo de configuración:" && cat ./cypress.config.js

ENTRYPOINT ["npx","cypress","run"]
CMD [""]