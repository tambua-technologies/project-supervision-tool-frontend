

describe('SubProjects', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool');
        cy.get('.geonode-layers-control').click('center', { force: true });
    });

    after(() => {
        cy.get('.ant-drawer-close').click();
        cy.SignOut();
    });

    it('should dispaly sub-projects on map', () => {
        cy.intercept({
            method: 'GET',
            url: '/api/v1/sub_projects_locations?filter[procuring_entity_id]=1'
        }, 
        { fixture: 'SubProjects/sub_projects_with_location.json' }).as('subProjects');
        cy.wait('@subProjects');
        
        
    
        cy.window().then(win => {
            const map = win.leafletMap;
            let expectedLayers = [];
            map.eachLayer(layer => {
                if(layer?.feature) expectedLayers.push(layer.feature);
            });
            expect(expectedLayers).to.have.length(2);
        })
       
    });

    it('it should display popup when clicking on sub-project', () => {
        cy.get('.leaflet-interactive').first().click('center', { force: true });
        cy.contains('TEMEKE-MBAGALA ROAD (9 m width and 3.5 km length)').should('be.visible');

    });
})