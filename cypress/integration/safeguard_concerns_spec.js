

describe('Safeguard Concerns', () => {
    
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
        cy.get('.ant-drawer-close').click();
        cy.SignOut();
    });

    it('should diplay safeguard concerns on map', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/safeguard_concerns'
        }, {fixture: 'safeguard_concerns.json'}).as('safeguardConcerns');

        cy.contains('Temeke Safeguard Concerns').should('be.visible');
        cy.get('[data-testid="add-temeke_safeguard_concerns"]').click();

        cy.wait('@safeguardConcerns');
        cy.window().then(win => {
            const map = win.leafletMap;

            let actualLayers = 0;
            map.eachLayer(layer => {
                if(layer?.feature?.properties?.dataType === 'safeguard_concern') actualLayers++;
            });

            expect(actualLayers).to.equal(12);

        });
    });

    it('it should display popup when clicking on safeguard concern', () => {
        cy.get('.leaflet-interactive').first().click('center', { force: true });
        cy.contains('TEMEKE-MBAGALA ROAD (9 m width and 3.5 km length)').should('be.visible');
    });

    it('should remove safeguard concerns from map', () => {
        cy.get('[data-testid="close-temeke_safeguard_concerns"]').click();
    });
})