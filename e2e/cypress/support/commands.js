Cypress.Commands.add('login', (username, password) => {
    Cypress.log({
      displayName: "AUTH0 LOGIN",
      message: [`🔐 Authenticating ...`],
    });
  
    const options = {
      url: Cypress.env('auth_url'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        audience: Cypress.env('auth_audience'),
        grant_type: 'password',
        client_id: Cypress.env('auth_client_id'),
        client_secret: Cypress.env('auth_client_secret'),
        scope: 'openid profile email',
        username: Cypress.env('auth_username'),
        password: Cypress.env('auth_password')
      },
      log: true,
    };
  
    cy.request(options).then((response) => {
      const { access_token } = response.body;
      const tokenData = {
        body: {
          access_token: access_token,
          scope: 'openid email profile',
          expires_in: 86400,
          token_type: 'Bearer',
          audience: 'cypress',
          oauthTokenScope: 'openid profile email',
          client_id: Cypress.env('auth_client_id')
        },
        expiresAt: Math.floor(Date.now() / 1000) + 86400
      };
      cy.window().then((win) => {
        win.localStorage.setItem('auth_token', JSON.stringify(tokenData));
        cy.log('Access token received and stored in local storage:', tokenData);
        win.dispatchEvent(new Event('storage'));
      });
    });

    
  });

  
  Cypress.Commands.add('visitAuthenticated', (url) => {
    cy.window().then((win) => {
      const tokenData = JSON.parse(win.localStorage.getItem('auth_token'));
      if (tokenData && tokenData.body && tokenData.body.access_token) {
        cy.log('Access token found in local storage:', tokenData.body.access_token);
        cy.visit(url, {
          onBeforeLoad: (win) => {
            win.localStorage.setItem('auth_token', JSON.stringify(tokenData));
            // Forzar la lectura del token desde local storage
            win.dispatchEvent(new Event('storage'));
          }
        });
      } else {
        cy.log('No access token found. Redirecting to login.');
        cy.login().then(() => {
          cy.window().then((win) => {
            const newTokenData = JSON.parse(win.localStorage.getItem('auth_token'));
            if (newTokenData && newTokenData.body && newTokenData.body.access_token) {
              cy.log('Access token obtained after login:', newTokenData.body.access_token);
              cy.visit(url, {
                onBeforeLoad: (win) => {
                  win.localStorage.setItem('auth_token', JSON.stringify(newTokenData));
                  win.dispatchEvent(new Event('storage'));
                }
              });
            } else {
              cy.log('Failed to obtain access token after login.');
            }
          });
        });
      }
    });
    cy.wait(3000);
          cy.get('.auth0-lock-input').first().type(Cypress.env('auth_username'));
          cy.get('.auth0-lock-input').last().type(Cypress.env('auth_password'));
          cy.get('.auth0-lock-submit').click();
          cy.url().should("equal",url);
  });
