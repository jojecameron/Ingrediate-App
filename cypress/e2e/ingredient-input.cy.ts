describe('ingredient input functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('should populate and depopulate the ingredient input', () => {
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.get('#autocompleteInput').type('Pepper');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Pepper');
    cy.get('[data-tag-index="1"]').find('svg').click();
    cy.contains('Pepper').should('not.exist');
    cy.contains('Salt');
    cy.get('[data-tag-index="0"]').find('svg').click();
    cy.contains('Salt').should('not.exist');
  });

  it('should autocomplete the ingredient input', () => {
    cy.get('#autocompleteInput').type('S');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.get('#autocompleteInput').type('P');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Pepper');
  });

  it('should populate the ingredient input without typing', () => {
    cy.get('svg').click();
    cy.get('#autocompleteInput-option-166').click();
    cy.contains('Artichoke Hearts');
  });

  it('should populate the ingredient input with pressing return', () => {
    cy.get('#autocompleteInput').type('Artichoke Hearts');
    cy.get('#autocompleteInput-option-0').type('{enter}');
    cy.contains('Artichoke Hearts');
  });

  it('should depopulate the ingredient input with pressing delete', () => {
    cy.get('svg').click();
    cy.get('#autocompleteInput-option-166').click();
    cy.contains('Artichoke Hearts');
    cy.get('#autocompleteInput').type('{backspace}');
    cy.contains('Artichoke Hearts').should('not.exist');
  });
});
