describe('ingrediate page display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('should render the main page', () => {});

  it('should display the header', () => {
    cy.get('header').should('have.length', 1);
    cy.get('header').find('p').should('have.length', 2);
  });

  it('should display the MainContainer', () => {
    cy.get('.MainContainer').should('exist');
  });

  it('should display the page title', () => {
    cy.get('h1').contains('Ingrediate');
  });

  it('should render the IngredientForm and autocompleteInput on the page', () => {
    cy.get('.IngredientForm').should('exist');
    cy.get('#autocompleteInput').should('exist');
  });

  it('should render the RecipeContainer on the page', () => {
    cy.get('.RecipeContainer').should('exist');
  });
});
