describe('modal functionality', () => {
  it('should open log in modal', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('Log in').click();
    cy.get('#modal').contains('Log in');
    cy.get('#modal').find('input[value="Log in"]');
  });

  it('should open sign up modal', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('Sign up').click();
    cy.get('#modal').contains('Sign up');
    cy.get('#modal').find('input[value="Sign up"]');
  });
});