import L from 'leaflet';

describe('Projects', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool')
    });

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

    it('it should display datasets on map', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v2/assets/aLD6RspTPyijYdA63icUZ4/data/?format=json'
        }).as('fieldnotes');
        

        cy.intercept({
            method: 'GET',
            url: '/api/categories/'
        }).as('geonodeCategories');
        
        cy.get('.geonode-layers-control').click();
        cy.wait('@geonodeCategories');
        cy.contains('Kinondoni Field Notes').should('be.visible');

        cy.get('.add').click();
        cy.contains('Transparency:').should('be.visible');

       
        cy.wait('@fieldnotes');

        cy.get('.ant-slider-horizontal').click('center');

        cy.window().then(win => {
            const map = win.leafletMap;

            // assert that layer opacity is set to 0.5
            map.eachLayer(layer => {

                // assert for field notes layer
                if(layer?.feature?.properties?.packageName) {
                    const expectedOpacity = 0.5;
                    expect(layer.options.opacity).to.equal(expectedOpacity);
                }
            });

            
        });
        cy.get('.close').click();
        cy.get('.DataSetsMenuItemDetails')
        .within(() => {
            cy.contains('Field Notes').click();
            cy.contains('Boundaries').click();
            cy.get('.ant-collapse-item.ant-collapse-item-active').within(() => {
                cy.get('.add').click();
                cy.get('.ant-slider-horizontal').click('center');
            });
        });

        cy.window().then(win => {
            const map = win.leafletMap;

            // assert that layer opacity is set to 0.5
            map.eachLayer(layer => {
                if(layer?.wmsParams) {
                    const expectedOpacity = 0.5;
                    expect(layer.options.opacity).to.equal(expectedOpacity);
                }
            }); 
        });

    });


})