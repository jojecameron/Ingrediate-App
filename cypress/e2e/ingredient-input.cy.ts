describe('ingredient input', () => {
  it('should populate and depopulate the ingredient input', () => {
    cy.visit('http://localhost:8080/');
    //populates ingredient input
    cy.get('#autocompleteInput').type('Salt');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.get('#autocompleteInput').type('Pepper');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Pepper');
    //depoulates ingredient input
    cy.get('[data-tag-index="1"]').find('svg').click();
    cy.contains('Pepper').should('not.exist');
    cy.contains('Salt');
    cy.get('[data-tag-index="0"]').find('svg').click();
    cy.contains('Salt').should('not.exist');
  });
  
  it('should autocomplete the ingredient input', () => {
    cy.visit('http://localhost:8080/');
    cy.get('#autocompleteInput').type('S');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.get('#autocompleteInput').type('P');
    cy.get('#autocompleteInput-option-0').click();
    cy.contains('Salt');
    cy.contains('Pepper');
  });
});
