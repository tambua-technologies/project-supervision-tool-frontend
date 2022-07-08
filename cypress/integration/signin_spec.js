describe('Signin', () => {

    it('should not signin with invalid credentials', () => {
     cy.Wrong_credentials('esting@project-supervision-tool.com', 'Pass@ol')
    });
});