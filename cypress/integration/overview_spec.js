import { wait } from "@testing-library/react";


describe('Overview', () => {
    
    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.intercept({
            method: 'GET',
            url: '/api/v1/sub_projects_locations'
        }, 
        { fixture: 'SubProjects/empty_sub_projects.json' });
        cy.get('.geonode-layers-control').click('center', { force: true });
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
        cy.contains('Import EHS or Safeguard concerns').should('exist').click();
        cy.get('#import-ehs-or-safeguard-concerns').selectFile('cypress/fixtures/safeguard_concerns_demo_data.xlsx', { force: true });
        cy.wait('@importSafeguardConcerns').its('response.statusCode').should('eq', 200);


    });
})