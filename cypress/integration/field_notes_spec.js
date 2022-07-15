

describe('Field Notes', () => {
    

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

    it('should diplay field notes on map', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v2/assets/aLD6RspTPyijYdA63icUZ4/data/?format=json'
        }, {fixture: 'field_notes.json'}).as('fieldnotes');

        cy.contains('Temeke Field Notes').should('be.visible');
        cy.get('[data-testid="add-temeke_field_notes"]').click();

        cy.wait('@fieldnotes');
        cy.window().then(win => {
            const map = win.leafletMap;

            let actualLayers = 0;
            map.eachLayer(layer => {
                if(layer?.feature?.properties?.dataType === 'field_note') actualLayers++;
            });

            expect(actualLayers).to.equal(3);

        });

        


    });
   

    it('it should display popup when clicking on field note', () => {
        cy.get('.leaflet-interactive').first().click('center', { force: true });
        cy.get('.popup-content-body-image').should('be.visible');
        cy.contains('Kijichi_Tuangoma_road_(3.2_km_length)').should('be.visible');
    });

    it('should remove field notes from map', () => {
        cy.get('[data-testid="close-temeke_field_notes"]').click();
    });
})