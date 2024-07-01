import { BasePage } from "../../pages/base.page"
import { AppPagesEnum } from "../../src/shared/app-pages.enum";
import { ButtonTextEnum } from "../../src/shared/button-text.enum";
import { LoginApi } from "../../services/api-login";

const loginApi = new LoginApi();

export class BaseActions extends BasePage{
   generateTokenAndAuthentication(){
    loginApi.login();
    loginApi.visitAuthenticated(Cypress.env('auth_base_url'))  
    }
    
    goToThePage(option: string){
        cy.wait(1000);
        switch (option){
            case AppPagesEnum.HOME:
                cy.get(this.menuOptions).contains('Home').click();
                break;
            case AppPagesEnum.MYACCOUNT:
                cy.get(this.menuOptions).contains('My Account').click();;
                break;
            case AppPagesEnum.BANKACCOUNTS:
                cy.get(this.menuOptions).contains('Bank Accounts').click();;
                break;
            case AppPagesEnum.NOTIFICATIONS:
                cy.get(this.menuOptions).contains('Notifications').click();;
                break;
            default:
                throw Error(`Wrong page option: ${option}`);

        }
    }
    
    clickOnButton(option: string){
      cy.wait(1000)
      switch(option){
        case ButtonTextEnum.NEXT:
            cy.get(this.buttonOptions).should('be.visible').contains('Next').click({force:true});
            break;
        case ButtonTextEnum.CREATE:
            cy.get(this.buttonOptions).should('be.visible').contains('Create').click({force:true});
            break;
        case ButtonTextEnum.DELETE:
            cy.get(this.buttonOptions).should('be.visible').contains('Delete').click({force:true});
            break;
        case ButtonTextEnum.SAVE:
            cy.get(this.buttonOptions).should('be.visible').contains('Save').click({force:true});
            break; 
        case ButtonTextEnum.DISMISS:
            cy.get('body').then(($body) => {
                if ($body.find(this.buttonOptions).length > 6) {
                    cy.get(this.buttonOptions).contains('Dismiss').first().click({ force: true });
                } else {
                    cy.get(this.buttonOptions).contains('Dismiss').should('not.exist');
                }
            })
            break; 
        case ButtonTextEnum.NEW:
            cy.get(this.buttonOptions).should('be.visible').contains('New').click({force:true});
            break;
        case ButtonTextEnum.PAY:
            cy.get(this.buttonOptions).should('be.visible').contains('Pay').click({force:true});
            break;
        case ButtonTextEnum.REQUEST:
            cy.get(this.buttonOptions).should('be.visible').contains('Request').click({force:true});
            break;
        default:
            throw Error(`Wrong botton option: ${option}`);
      }
    }
}