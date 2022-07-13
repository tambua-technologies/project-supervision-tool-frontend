

describe('SubProjects Map', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.get('.geonode-layers-control').click('center', { force: true });
    });

    after(() => {
        cy.get('.ant-drawer-close').click();
    })

    it('should dispaly sub-projects on map', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/sub_projects_locations'
        }, 
        { fixture: 'SubProjects/sub_projects_with_location.json' }).as('subProjects');
        cy.wait('@subProjects');
        
    
        cy.window().then(win => {
            const map = win.leafletMap;
            let expectedLayers = [];
            map.eachLayer(layer => {
                if(layer?.feature)expectedLayers.push(layer.feature);
            });
            expect(expectedLayers).to.have.length(2);
        })
       
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

        cy.get('[data-testid="close-temeke_field_notes"]').click();


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

        cy.get('[data-testid="close-temeke_safeguard_concerns"]').click();

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