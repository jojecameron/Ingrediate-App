describe('Dish Form Functionality', () => {
  
  it('should default to breakfast', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[value="breakfast"]').should('be.checked');
  });

  it('should alternate between the selected dish types', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[value="lunch"]').click();
    cy.get('input[value="lunch"]').should('be.checked');
    cy.get('input[value="dinner"]').click();
    cy.get('input[value="dinner"]').should('be.checked');
    cy.get('input[value="dessert"]').click();
    cy.get('input[value="dessert"]').should('be.checked');
    cy.get('input[value="breakfast"]').click();
    cy.get('input[value="breakfast"]').should('be.checked');
  });

  it('should only have one dish type selected at a time', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[value="breakfast"]').should('be.checked');
    cy.get('input[value="lunch"]').click();
    cy.get('input[value="lunch"]').should('be.checked');
    cy.get('input[value="dinner"]').should('not.be.checked');
    cy.get('input[value="dessert"]').should('not.be.checked');
    cy.get('input[value="breakfast"]').should('not.be.checked');
  });
});