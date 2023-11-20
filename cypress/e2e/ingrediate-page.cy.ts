describe('ingrediate page display', () => {

  it('should render the main page', () => {
    cy.visit('http://localhost:8080/');
  });

  it('should display the header', () => {
    cy.visit('http://localhost:8080/');
    cy.get('header').should('have.length', 1);
    cy.get('header').find('p').should('have.length', 2);
  });

  it('should display the MainContainer', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.MainContainer').should('exist');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:8080/');
    cy.get('h1').contains('Ingrediate');
  });

  it('should render the IngredientForm and autocompleteInput on the page', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.IngredientForm').should('exist');
    cy.get('#autocompleteInput').should('exist');
  });

  it('should render the RecipeContainer on the page', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.RecipeContainer').should('exist');
  });
});
