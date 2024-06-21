import cypress from "cypress";
import { CreateBankAccountsPage } from "../../pages/create-bank-accounts.page";


export class CreateBankAccountsActions extends CreateBankAccountsPage {
    createBankAccount(accountName: string, routingNumber: string, accountNumber: string){
        cy.wait(1000);
        cy.get(this.bankNameInput).type(accountName);
        cy.get(this.routingNumberInput).type(routingNumber);
        cy.get(this.accountNumberInput).type(accountNumber);
    }

    verifyBankAccountCreated(){
        cy.wait(3000);
        cy.get(this.bankAccountsList).should('be.visible');
    }

    verifyBankAccountDeleted(){
        cy.wait(3000);
        cy.get(this.bankAccountDeletedLabel).should('be.visible');
    }

}