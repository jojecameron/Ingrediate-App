describe('modal functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('should open log in modal', () => {
    cy.contains('Log in').click();
    cy.get('#modal').contains('Log in');
    cy.get('#modal').find('input[value="Log in"]');
  });

  it('should open sign up modal', () => {
    cy.contains('Sign up').click();
    cy.get('#modal').contains('Sign up');
    cy.get('#modal').find('input[value="Sign up"]');
  });

  it('should close the modal when clicking the close button', () => {
    cy.contains('Log in').click();
    cy.get('#clear').click();
    cy.get('#modal').should('not.exist');
  });

  it('should close the modal when clicking outside the modal', () => {
    cy.contains('Log in').click();
    cy.get('.overlay').click({ force: true });
    cy.get('#modal').should('not.exist');
  });

  it('should switch between log in and sign up modals', () => {
    cy.contains('Log in').click();
    cy.get('h1').contains('Log in');
    cy.get('#modal').find('span').contains('Sign up').click();
    cy.get('h1').contains('Sign up');
    cy.get('#modal').find('span').contains('Log in').click();
    cy.get('h1').contains('Log in');
  });
});
