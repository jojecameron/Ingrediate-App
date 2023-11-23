describe('recipe component functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe');
  });

  it('should display a recipe title', () => {
    cy.get('.recipe-title');
  });

  it('should display a recipe text', () => {
    cy.get('.recipe-text');
  });

  it('should display a recipe link title', () => {
    cy.get('.recipe-linkTitle');
  });

  it('should display a recipe link', () => {
    cy.get('.recipe-link');
  });

  it('should delete a recipe', () => {
    cy.get('.Recipe').should('have.length', 1);
    cy.get('.delete').click();
    cy.get('.Recipe').should('have.length', 0);
  });

  it('should have hover text for delete, favorite, and unfavorite', () => {
    cy.get('.delete').trigger('mouseover');
    cy.contains('Delete recipe?');
    cy.get('.favorite').trigger('mouseover');
    cy.contains('Favorite recipe?').click();
    cy.get('.favorite').trigger('mouseover');
    cy.contains('Unfavorite?');
  });

  it('should favorite and unfavorite a recipe', () => {
    cy.get('.favorite').click();
    cy.contains('Unfavorite?');
    cy.get('.favorite').click();
    cy.contains('Favorite recipe?');
  });
});
