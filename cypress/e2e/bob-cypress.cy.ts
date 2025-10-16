describe('Bob Browser (Cypress)', (): void => {
  it('Bob sees Alice message and responds in real-time', (): void => {
    cy.visit('/');

    cy.get('#username').type('user2');
    cy.get('#password').type('StrongPass456$%^');
    cy.get('button').contains('Login').click();

    cy.get('#user-display').should('contain', 'Bob');

    cy.wait(3000);

    cy.get('#text-input').should('contain.value', 'Alice: Hello!');

    cy.get('#text-input').type('Bob: Hi Alice! ');

    cy.wait(3000);

    cy.get('#text-input').should('contain.value', 'How are you?');

    cy.get('#text-input').type("I'm doing great!");

    cy.wait(2000);

    cy.log('Bob successfully communicated with Alice in real-time!');
  });
});