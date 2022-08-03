

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
        { fixture: 'Users/users.json' }).as('getUsers');
        cy.intercept({
            method: 'DELETE',
            url: '/api/v1/users/1'
        }).as('deleteUser');
        cy.wait('@getUsers');
        cy.contains('6 Users').should('be.visible');
        cy.get('[data-testid="users-list"] ul .ListItem').should('have.length', 6);
        cy.get('[data-testid="users-list"] ul .ListItem').first().within(() => {
            cy.get('[data-testid="list-item-actions"]').click();
        });
        cy.get('[data-testid="archive-user-1"]').contains('Archive User').click();
        cy.wait('@deleteUser');
        cy.get('[data-testid="archive-user-1"]').contains('Archive User').should('not.be.visible');
    });

    it('should delete user', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/api/v1/users/1'
        }).as('deleteUser');

        cy.get('[data-testid="users-list"] ul .ListItem').first().within(() => {
            cy.get('[data-testid="list-item-actions"]').click();
        });
        cy.get('[data-testid="archive-user-1"]').click();
        cy.wait('@deleteUser');
        cy.get('[data-testid="archive-user-1"]').should('not.be.visible');
    });
})