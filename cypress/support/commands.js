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


Cypress.Commands.add('Signin', (username, password) => {
    cy.visit('http://localhost:3000');
    cy.get('.Logo h2').should('contain', 'Projects Supervison tool');
    cy.get('.Logo h5').should('contain', 'Please Login to your account');

    cy.get('#email').type(username);
    cy.get('#password').type(password);

    cy.intercept('POST', '/api/v1/focal_people/login', { fixture: 'Auth/login_200.json' }).as('login');

    cy.get('button[type=submit]').should('exist').should('contain', 'Log In').click();
    cy.url().should('include', '/#!/procuring_entity/1/sub-projects-map');
})


Cypress.Commands.add('Wrong_credentials', (username, password) => {
    cy.intercept('POST', '/api/v1/focal_people/login', {
        statusCode: 401,
        fixture: 'Auth/login_401.json'
    }).as('login');
    cy.visit('http://localhost:3000/#!/signin');
    cy.get('.Logo h2').should('contain', 'Projects Supervison tool');
    cy.get('.Logo h5').should('contain', 'Please Login to your account');

    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('button[type=submit]').should('exist').should('contain', 'Log In').click();
    cy.get('.Logo + div').should('contain', 'These credentials do not match our records');
})

Cypress.Commands.add('SignOut', (url, response) => {
    cy.get('.UserButton').click();
    cy.contains('Sign Out').click();
})