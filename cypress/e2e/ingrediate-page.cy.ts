describe('ingrediate page', () => {
  it('should render the main page', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[type="radio"]').should('have.length', 4);
  });

  it('should display the header', () => {
    cy.visit('http://localhost:8080/');
    cy.get('header').should('have.length', 1);
    cy.get('header').find('p').should('have.length', 2);
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:8080/');
    cy.get('h1').contains('Ingrediate');
    cy.get('span').contains('Recipe Generator');
  });
});
