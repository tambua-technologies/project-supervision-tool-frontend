import L from 'leaflet';

describe('Projects', () => {
    

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool')
    });

    it('should dispaly markers when zoom level  < 10 ', () => {
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
        });
       
    });


})