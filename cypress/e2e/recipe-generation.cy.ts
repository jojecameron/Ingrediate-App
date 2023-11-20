describe('recipe generation functionality', () => {

    it('should not generate a recipe without ingredients', () => {
        cy.visit('http://localhost:8080/');
        cy.contains('Generate Recipe').should('be.disabled');
    });

    it('should generate a recipe with ingredients', () => {
        cy.visit('http://localhost:8080/');
        cy.get('#autocompleteInput').type('Salt');
        cy.get('#autocompleteInput-option-0').click();
        cy.contains('Salt');
        cy.contains('Generate Recipe').should('not.be.disabled');
        cy.contains('Generate Recipe').click();
        cy.get('.Recipe');    
    });

    it('should generate multiple recipes', () => {
        cy.visit('http://localhost:8080/');
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
    
});