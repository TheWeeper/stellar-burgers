/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientName: string): Chainable<void>;

      closeModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.get(`[data-cy="ingredient-${ingredientName}"]`)
    .contains('button', 'Добавить')
    .click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('#modals').find('[data-cy="modal-close-button"]').click();
  cy.get('#modals').should('be.empty');
});

export {};
