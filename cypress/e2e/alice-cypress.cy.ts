describe('Alice Browser (Cypress)', (): void => {
  it('Alice types and sees Bob additions in real-time', (): void => {
    cy.visit('/');

    cy.get('#username').type('user1');
    cy.get('#password').type('SecurePass123!@#');
    cy.get('button').contains('Login').click();

    cy.get('#user-display').should('contain', 'Alice');

    cy.wait(2000);

    cy.get('#text-input').clear().type('Alice: Hello! ');

    cy.wait(3000);

    cy.get('#text-input').should('contain.value', 'Bob: Hi Alice!');

    cy.get('#text-input').type('How are you? ');

    cy.wait(3000);

    cy.get('#text-input').should('contain.value', "I'm doing great!");

    cy.log('Alice sees all messages from Bob in real-time!');
  });
});