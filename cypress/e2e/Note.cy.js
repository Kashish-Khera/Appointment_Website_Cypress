/* 

-> spec file is the main file 
-> to run this mai file , in cmd type cypress run --spec "spec filename" --browser -chrome
-> In the context of Cypress, both `spec.js` and `cy.js` files are used for writing tests, but they serve slightly different purposes:
In summary, `spec.js` files are the main test files where you write the actual tests, while `cy.js` files are used for creating custom Cypress commands or utilities to improve the readability and maintainability of your test code. Custom commands defined in `cy.js` files can be reused across multiple tests, making your test suite more modular and easier to manage.

*/

/*

-> ------------Copied the va;ue paramter of the input tag and then type this value in username field ------------

            cy.get("['aria-describedby =demo_password_label]'").then(($pw_value) => {

                let copiedName = $pw_value.val()
                cy.get('#txt-password').type(copiedName)
        })


-------------Extract the vaue attribute from a tag 
    $pw_value.val()

-------------Check the placeholder valuye 

        cy.get('#txt-password').should('have.attr', "placeholder" , "Password");





  */
