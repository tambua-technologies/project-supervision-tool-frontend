

describe('Users', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
    });

    // after(() => {
    //     cy.SignOut();
    // });

    it('should should display users list', () => {
        cy.visit('http://localhost:3000/#!/procuring_entity/1/users');
        cy.intercept({
            method: 'GET',
            url: '/api/v1/users'
        }, 
        { fixture: 'Users/users.json' }).as('getUsers');
        cy.wait('@getUsers');

        

        cy.get('[data-testid="users-list"] ul .ListItem').should('have.length', 6);

    });
})