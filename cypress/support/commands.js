// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const defaultData = {
    firstName: "Jhon",
    lastName: "Doe",
    email: "jhondoe@teste.com",
    text: "Teste",
  };

Cypress.Commands.add("fillMandatoryFieldAndSubmit", (data = {}) => {
  const formData = { ...defaultData, ...data };
  
  cy.get("#firstName").type(formData.firstName);
  cy.get("#lastName").type(formData.lastName);
  cy.get("#email").type(formData.email);
  cy.get("#open-text-area").type(formData.text, { delay: 0 });
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("fillMandatoryField", (data = {}) => {

  const formData = { ...defaultData, ...data };

  cy.get("#firstName").type(formData.firstName);
  cy.get("#lastName").type(formData.lastName);
  cy.get("#email").type(formData.email);
  cy.get("#open-text-area").type(formData.text, { delay: 0 });
});
