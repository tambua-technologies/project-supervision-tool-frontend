

describe('Geonode Layers', () => {
    

    before(() => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/sub_projects_locations'
        }, 
        { fixture: 'SubProjects/empty_sub_projects.json' }).as('subProjects');
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.get('.geonode-layers-control').click('center', { force: true });
    });

    after(() => {
        cy.get('.ant-drawer-close').click();
        cy.SignOut();
    });


    it('should display geonode layer on map', () => {
        cy.intercept('/api/layers/?category=6&offset=0', { fixture: 'geonode_layer.json' }).as('geonodeLayer');
        cy.contains('Boundaries').click();
        cy.get('[data-testid="add-13"]').click();
        cy.get('[data-testid="transparence-13"]').within(() => cy.get('.ant-slider-horizontal').click());

        cy.window().then(win => {
            const map = win.leafletMap;
            let geonodeLayer = 0;

            map.eachLayer(layer => {
                if (layer?.wmsParams) {
                    geonodeLayer++;
                    const expectedOpacity = 0.5;
                    expect(layer.options.opacity).to.equal(expectedOpacity);
                }
            });
            expect(geonodeLayer).to.equal(1);
        });

        cy.get('[data-testid="close-13"]').click();
        cy.contains('Boundaries').click();
    });

})