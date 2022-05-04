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

    cy.intercept('GET', '/api/v1/users/auth_user', { fixture: 'Auth/auth_user_200.json' }).as('auth_user');
    cy.intercept('POST', '/api/v1/focal_people/login', { fixture: 'Auth/login_200.json' }).as('login');
    cy.intercept('GET', '/api/v1/projects', { fixture: 'Projects/projects_200.json' }).as('projects');

    cy.get('button[type=submit]').should('exist').should('contain', 'Log In').click();
    cy.url().should('include', '/#!/projects');
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
    cy.get('.Logo + div').should('contain', 'Request failed with status code 401');
})

Cypress.Commands.add('Refresh', (url, response) => {
    console.log(url, response)
    cy.intercept('GET', url, {fixture: response});
    cy.get('[data-cy=reflesh]').find('span').should('contain', 'Refresh').click()
    cy.get('.ant-spin-spinning').should('have.css', 'font-size', '14px')
    cy.get('.List ul > div').should(($item) => { expect($item).to.have.length(3) });

})