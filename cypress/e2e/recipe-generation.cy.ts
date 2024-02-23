describe('recipe generation functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('should not generate a recipe without ingredients', () => {
    cy.contains('Generate Recipe').should('be.disabled');
  });

  it('should generate a recipe with ingredients', () => {
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Generate Recipe').should('not.be.disabled');
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe');
  });

  it('should generate multiple recipes', () => {
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Generate Recipe').should('not.be.disabled');
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe');
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe').should('have.length', 2);
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe').should('have.length', 3);
  });

  it('should change the recipe container state from favorites to recipes when a recipe is generated', () => {
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Generate Recipe').click();
    cy.contains('Favorites').click();
    cy.get('.Recipe').should('have.length', 0);
    cy.contains('Generate Recipe').click();
    cy.get('.Recipe').should('have.length', 2);
  });
});
