describe('Projects', () => {

    before(() => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool')
    });

    // beforeEach(() => {

    // });

    it('should show loader before rendering projects', () => {
        cy.get('.ant-spin-spinning').should('have.css', 'font-size', '14px')
    });

    it('should render the top navigation bar', () => {
        cy.get('.Breadcrumb a').should('contain', 'Projects');
        cy.get('.UserMenu').should('be.visible').as('userIcon').trigger('mouseover')
        cy.get('.UserProfileMenu > li').should(($lis) => {
            expect($lis).to.have.length(2)
            expect($lis.eq(0)).to.contain('Change Password')
            expect($lis.eq(1)).to.contain('Sign Out')
        })
        cy.get('@userIcon').trigger('mouseout');
        cy.get('.UserProfileMenu > li').should('not.be.visible');

    });

    
    it('should display list of project(s) if there is any', () => {
        cy.get('.List .ListHeader > div').should(($div) => { expect($div).to.have.length(9) });
        cy.get('.List ul > div').should(($item) => { expect($item).to.have.length(3) });
        cy.get('.ListItem > div').then(listitem => {
            expect(listitem[0]).to.contain('Dar es Salaam Metropolitan Development Project', 'P123134', 'DMDP')
            expect(listitem[2]).to.contain('P165128', 'BIGZ')
            expect(listitem[4]).to.contain('Tanzania Cities Transforming Infrastructure & Competitiveness Project')

        });

    });


    it('search projects successful', () => {
        cy.get('.TopbarSearch').should('be.visible')
        cy.intercept('GET', '/api/v1/projects?filter[name]=d', { fixture: 'Projects/search_projects.json' })
        cy.get('[data-cy=search]').type('d{enter}').get('.ListItem > div').then(listitem => {
            expect(listitem[0]).to.contain('Dar es Salaam Metropolitan Development Project')
            expect(listitem[2]).to.contain('P165128')

        });
        cy.intercept('GET', '/api/v1/projects?filter[name]=da', { fixture: 'Projects/search_project_200.json' })
        cy.intercept('GET', '/api/v1/projects?filter[name]=dar', { fixture: 'Projects/search_project_200.json' })
        cy.get('[data-cy=search]').type('ar{enter}').get('.ListItem > div').then(listitem => {
            expect(listitem[0]).to.contain('Dar es Salaam Metropolitan Development Project')
        });

    });

    it('should cancel search successful and return all projects', () => {
        cy.intercept('GET', '/api/v1/projects?filter[name]=', { fixture: 'Projects/projects_200.json' })
        cy.get('span[role=button]').should('be.visible').click()
        cy.get('.ListItem > div').should(($itemList) => {
            expect($itemList[0]).to.contain('Dar es Salaam Metropolitan Development Project', 'P123134', 'DMDP')
            expect($itemList[2]).to.contain('P165128', 'BIGZ')
            expect($itemList[4]).to.contain('Tanzania Cities Transforming Infrastructure & Competitiveness Project')

        });
    });


    it('should display no data if search is not matched', () => {
        cy.intercept('GET', '/api/v1/projects?filter[name]=omm', { fixture: 'Projects/projects_no_result.json' })
        cy.get('[data-cy=search]').type('omm{enter}').get('.ant-empty-description').should('contain', 'No Data')
    });

    it('should show no data when project is empty', () => {
        cy.intercept('GET', '/api/v1/projects', { fixture: 'Projects/projects_no_result.json' })
        cy.get('.ant-empty-description').should('contain', 'No Data')

    });

    it('should reflesh projects successful', () => {
        cy.Refresh('/api/v1/projects', 'Projects/projects_200.json')
    })

})