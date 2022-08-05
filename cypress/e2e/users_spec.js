

describe('Users', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.visit('http://localhost:3000/#!/procuring_entity/1/users');
    });

    after(() => {
        cy.SignOut();
    });

    it('should display users list', () => {
        cy.get('[data-testid="users-menu-item"]').contains('Users').should('be.visible');
        cy.intercept({
            method: 'GET',
            url: '/api/v1/users'
        }, 
        { fixture: 'users/users.json' }).as('getUsers');
        cy.wait('@getUsers');
        cy.contains('1 User').should('be.visible');
        cy.get('[data-testid="users-list"] ul .ListItem').should('have.length', 1);
       
    });

    it('should delete user', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/api/v1/users/4'
        }, {
            statusCode: 200,
            fixture: 'Users/deleteUser.json'

        }).as('deleteUser');

        cy.get('[data-testid="users-list"] ul .ListItem').first().within(() => {
            cy.get('[data-testid="list-item-actions"]').click();
        });
        cy.get('[data-testid="archive-user-4"]').click();
        cy.get('[data-testid="archive-user-4"]').should('not.be.visible');

        cy.get('[data-testid="archive-confirm-user-ok-button"]').click();
        cy.wait('@deleteUser');
        cy.contains('User deleted successfully').should('be.visible');
    });
})