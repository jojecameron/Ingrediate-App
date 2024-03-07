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

  it('should delete a recipe', () => {
    cy.get('.Recipe').should('have.length', 1);
    cy.get('.delete').click();
  });

  it('should display a favorite recipe', () => {
    cy.get('.favorite').click();
    cy.contains('Favorites').click();
    cy.get('.Recipe').should('have.length', 1);
  });

  it('should have hover text for delete, favorite, and unfavorite', () => {
    cy.get('.delete').trigger('mouseover');
    cy.contains('Delete recipe?');
    cy.get('.favorite').trigger('mouseover');
    cy.contains('Favorite recipe?').click();
    cy.contains('Favorites').click();
    cy.get('.favorite').trigger('mouseover');
    cy.contains('Delete favorite?');
  });

  it('should favorite and unfavorite a recipe', () => {
    cy.get('.favorite').click();
    cy.contains('Favorites').click();
    cy.get('.Recipe').should('have.length', 1);
    cy.get('.favorite').click();
  });

  it('should update a recipe title', () => {
    cy.get('.recipe-title').click();
    cy.get('.recipe-title-edit').type('New Title{enter}');
    cy.get('.recipe-title').contains('New Title');
  });

  it('should update a favorite title', () => {
    cy.get('.favorite').click();
    cy.contains('Favorites').click();
    cy.get('.recipe-title').click();
    cy.get('.recipe-title-edit').type('New Title{enter}');
    cy.get('.recipe-title').contains('New Title');
  });
});
