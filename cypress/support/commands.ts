/// <reference types="cypress" />

export const testUrl = 'http://localhost:3001';

export const SELECTORS = {
  ingredientsBun: '[data-testid="ingredients-bun"]',
  ingredientsMain: '[data-testid="ingredients-main"]',
  ingredientCard: '[data-testid="ingredient-card"]',
  constructor: '[data-testid="constructor"]',
  orderButton: '[data-testid="order-button"]',
  bunTop: '[data-testid="bun-top"]',
  bunBottom: '[data-testid="bun-bottom"]',
  ingredientsArea: '[data-testid="ingredients-area"]',
  orderDetailsNumber: '[data-testid="order-details-number"]',
  modalClose: '[data-testid="modal-close"]',
  ingredientModal: '[data-testid="ingredient-modal"]',
};

// @ts-ignore
Cypress.Commands.add('dragIngredientToConstructor', (ingredientSelector: string, constructorSelector: string) => {
  cy.get(ingredientSelector).trigger('dragstart', { force: true });
  cy.get(constructorSelector).trigger('drop', { force: true });
});

// @ts-ignore
Cypress.Commands.add('loginUI', (email: string, password: string) => {
  cy.get('[name=email]').type(email);
  cy.get('[name=password]').type(password);
  cy.contains('button', 'Войти').click({ force: true });
});

declare global {
  namespace Cypress {
    interface Chainable {
      dragIngredientToConstructor(ingredientSelector: string, constructorSelector: string): any;
      loginUI(email: string, password: string): any;
    }
  }
}

export {};
