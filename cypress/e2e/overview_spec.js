import { wait } from "@testing-library/react";


describe('Overview', () => {
    
    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
    });

    after(() => {
        cy.SignOut();
    });

    it('should be able to import safeguard concerns', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/procuring_entities/statistics/1'
        }, 
        { fixture: 'procuring_entities_statistics.json' }).as('procuring_entities_statistics');
        cy.intercept({
            method: 'POST',
            url: '/api/v1/safeguard_concerns/import'
        }, 
        { fixture: 'safeguard_concerns_import_respose.json' }).as('importSafeguardConcerns');
        
        cy.visit('http://localhost:3000/#!/procuring_entity/1/overview');
        cy.contains('Import OHS or Safeguard concerns').should('exist').click();
        cy.get('#import-ohs-or-safeguard-concerns').selectFile('cypress/fixtures/safeguard_concerns_demo_data.xlsx', { force: true });
        cy.wait('@importSafeguardConcerns').its('response.statusCode').should('eq', 200);


    });
})