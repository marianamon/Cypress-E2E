import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { CreateBankAccountsActions } from '../actions/create-bank-accounts.actions';
import { BaseActions } from '../actions/base.action';

const createBankAccountActions = new CreateBankAccountsActions();
const baseActions = new BaseActions();

Given(/^that the user is in the "(Home|My Account|Bank Accounts|Notifications)" page$/, (option: string)=> {
    baseActions.generateTokenAndAuthentication();
    baseActions.goToThePage(option);
});
Given(/^the user clicks on the "(Create|Delete|Save|Dismiss)" button$/, (option: string)=> {
    baseActions.clickOnButton(option);
});
When(/^the user enters the data "(.*?)" "(.*?)" "(.*?)"$/, (accountName: string, routingNumber: string, accountNumber: string)=> {
    createBankAccountActions.createBankAccount(accountName, routingNumber, accountNumber);
});
Then(/^the bank account is visible in the user's account list$/, (accountName: string)=> {
    createBankAccountActions.verifyBankAccount(accountName);
});
