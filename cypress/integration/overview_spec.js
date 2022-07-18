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

    // after(() => {
    //     cy.SignOut();
    // });

    it('should be able to import safeguard concerns', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/procuring_entities/statistics/1'
        }, 
        { fixture: 'procuring_entities_statistics.json' });
        cy.visit('http://localhost:3000/#!/procuring_entity/1/overview');
        cy.contains('Import EHS or Safeguard concerns').should('exist').click();
        cy.wait(10000);
    });
})