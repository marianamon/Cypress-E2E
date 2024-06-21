Feature: Payments management
   
    Scenario Outline: Received a new Payment
        Given that the user is in the "Home" page
        And the user clicks on the "New" button
        When the user select a contact
        And the user enters the data <Amount> <Add a Note>
        And the user clicks on the "Pay" button
        Then the payment is successfully executed
        Examples:
          | Amount    | Add a Note            |
          | "1000"    | "Promocion valida"    | 

    Scenario Outline: Request a new Payment
        Given that the user is in the "Home" page
        And the user clicks on the "New" button
        When the user select a contact
        And the user enters the data <Amount> <Add a Note>
        And the user clicks on the "Request" button
        Then the payment is successfully executed
        Examples:
          | Amount    | Add a Note           |
          | "1000"    | "Lo que te debia"    | 