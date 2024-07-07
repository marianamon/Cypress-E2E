
export class LoginApi {
    public login(){
      Cypress.log({
        displayName: "AUTH0 LOGIN",
        message: [`🔐 Authenticating ...`],
      });
        const options = {
        url: Cypress.env('AUTH_URL'),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          audience: Cypress.env('AUTH_AUDIENCE'),
          grant_type: 'password',
          client_id: Cypress.env('AUTH_CLIENT_ID'),
          client_secret: Cypress.env('AUTH_CLIENT_SECRET'),
          scope: 'openid profile email',
          username: Cypress.env('AUTH_USERNAME'),
          password: Cypress.env('AUTH_PASSWORD')
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
            client_id: Cypress.env('AUTH_CLIENT_ID')
          },
          expiresAt: Math.floor(Date.now() / 1000) + 86400
        };
        cy.window().then((win) => {
          win.localStorage.setItem('auth_token', JSON.stringify(tokenData));
          cy.log('Access token received and stored in local storage:', tokenData);
          win.dispatchEvent(new Event('storage'));
        });
      });
  
    }

    public visitAuthenticated(url: string){
        cy.window().then((win) => {
            const tokenString = win.localStorage.getItem('auth_token');
            if (tokenString) {
              const tokenData = JSON.parse(tokenString);
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
            cy.window().then((win) => {
              const tokenString = win.localStorage.getItem('auth_token');
              if (tokenString) {
                const newTokenData = JSON.parse(tokenString);
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
              } 
            });
          }
        }
      });
        cy.wait(3000);
        cy.get('.auth0-lock-input').first().type(Cypress.env('AUTH_USERNAME'));
        cy.get('.auth0-lock-input').last().type(Cypress.env('AUTH_PASSWORD'));
        cy.get('.auth0-lock-submit').click();
        cy.url().should("equal",url);
    };
}
