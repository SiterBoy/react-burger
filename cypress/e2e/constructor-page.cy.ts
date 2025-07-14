import login from '../fixtures/login.json';
import { testUrl, SELECTORS } from '../support/commands';

describe('Constructor page functionality', () => {
  it('should create order with drag and drop ingredients and login flow', () => {
    cy.visit(testUrl);

    cy.window().then((win) => {
      const accessToken = win.localStorage.getItem('accessToken');
      const refreshToken = win.localStorage.getItem('refreshToken');
      cy.log(`Access token: ${accessToken}`);
      cy.log(`Refresh token: ${refreshToken}`);
    });

    cy.get(SELECTORS.ingredientsBun).as('buns-list');
    cy.get(SELECTORS.ingredientsMain).as('ingredients-list');

    cy.get('@buns-list').find(SELECTORS.ingredientCard).first().as('bun');
    cy.get('@ingredients-list').find(SELECTORS.ingredientCard).first().as('ingredient');

    cy.get(SELECTORS.constructor).as('constructor');
    cy.get(SELECTORS.orderButton).as('order-button');

    cy.dragIngredientToConstructor('@bun', '@constructor');
    cy.dragIngredientToConstructor('@ingredient', '@constructor');

    cy.get(SELECTORS.bunTop).should('exist');
    cy.get(SELECTORS.bunBottom).should('exist');
    cy.get(SELECTORS.ingredientsArea).should('not.be.empty');

    cy.get('@order-button').should('not.be.disabled');
    cy.log('Кнопка заказа активна, кликаем...');

    cy.get('@order-button').click({ force: true });
    cy.log('Клик по кнопке заказа выполнен');

    cy.url().should('include', '/login');
    cy.contains('Вход', { timeout: 10000 });
    
    cy.loginUI(login.email, login.password);

    cy.url().should('eq', `${testUrl}/`);
    
    cy.get('@buns-list').find(SELECTORS.ingredientCard).first().as('bun2');
    cy.get('@ingredients-list').find(SELECTORS.ingredientCard).first().as('ingredient2');
    cy.dragIngredientToConstructor('@bun2', '@constructor');
    cy.dragIngredientToConstructor('@ingredient2', '@constructor');

    cy.get('@order-button').click({ force: true });

    cy.get(SELECTORS.orderDetailsNumber, { timeout: 20000 }).invoke('text').should('match', /\d+/);

    cy.get(SELECTORS.modalClose).click({ force: true });

    cy.get('@order-button').should('be.disabled');
  });

  it('should open ingredient details modal when clicking on ingredient card', () => {
    cy.visit(testUrl);
    cy.get(SELECTORS.ingredientCard).first().click({ force: true });
    cy.get(SELECTORS.ingredientModal, { timeout: 5000 }).should('be.visible');
  });

  it('should load constructor page and display available ingredients', () => {
    cy.visit(testUrl);
    cy.contains('Соберите бургер', { timeout: 10000 });
    cy.get(SELECTORS.ingredientCard, { timeout: 10000 }).should('have.length.greaterThan', 0);
  });
});
