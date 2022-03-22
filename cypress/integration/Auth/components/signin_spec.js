describe('Signin', () => {

    it('should not signin with invalid credentials', () => {
     cy.Wrong_credentials('esting@project-supervision-tool.com', 'Pass@ol')
    });
    
    it('should signin with valid credentials', () => {
        cy.Signin('testing@project-supervision-tool.com', 'Pass@Tool')
    });

});