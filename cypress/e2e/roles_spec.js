

describe('Roles', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
    });

    after(() => {
        cy.SignOut();
    });

    it('should should display roles list', () => {
        cy.visit('http://localhost:3000/#!/procuring_entity/1/roles');
        cy.get('[data-testid="roles-menu-item"]').contains('Roles & Permission').should('be.visible');

        cy.intercept({
            method: 'GET',
            url: '/api/v1/roles'
        }, 
        { fixture: 'Roles/roles.json' }).as('getRoles');
        cy.wait('@getRoles');
        cy.contains('4 Roles').should('be.visible');
        cy.get('[data-testid="roles-list"] ul .ListItem').should('have.length', 4);
    });
})