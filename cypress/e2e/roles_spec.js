

describe('Roles', () => {


    beforeEach(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.visit('http://localhost:3000/#!/procuring_entity/1/roles');
    });

    afterEach(() => {
        cy.SignOut();
    });

    it('should should display roles list', () => {
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


    it.only('create new role', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/roles'
        },
            { fixture: 'roles/roles.json' }).as('getRoles');

        cy.intercept({
            method: 'POST',
            url: '/api/v1/roles'
        }, {
            statusCode: 200,
            fixture: 'roles/createRole.json'
        }).as('createRole');

        cy.intercept({
            method: 'GET',
            url: '/api/v1/permissions'
        },
            { fixture: 'roles/permissions.json' }).as('getPermissions');

        const roleFormId = 'role-form';
        cy.get('[data-testid="add-role-button"]').click();
        cy.wait('@getPermissions');
        cy.get(`#${roleFormId}`).within((form) => {
            cy.get(`#${roleFormId}_name`).type('New Role');
            cy.get(`#${roleFormId}_permissions`).click();
            cy.get(`#${roleFormId}_permissions`).type('create{enter}');
            cy.get('[title="Permissions"]').click();
            cy.get('[data-testid="role-form-submit-button"]').click();
        });
        cy.wait('@createRole');
        cy.contains('Role created successfully').should('be.visible');
    })



})