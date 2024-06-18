Feature: Create Bank Accounts
   
    @regression_QA
    Scenario: Create a new Bank Accounts
       Given that the user is in the create account page
        And the user clicks on the create button
        When the user enters the data "Bank Name" "Routing Number" "Account Number"
        And the user clicks on the "Save" button
        Then the account is successfully created
        And it is visible in the user's account list.
