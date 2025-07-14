import login from '../fixtures/login.json';

describe('Constructor page functionality', () => {
  it('should create order with drag and drop ingredients and login flow', () => {
    cy.visit('http://localhost:3000');

    cy.window().then((win) => {
      const accessToken = win.localStorage.getItem('accessToken');
      const refreshToken = win.localStorage.getItem('refreshToken');
      cy.log(`Access token: ${accessToken}`);
      cy.log(`Refresh token: ${refreshToken}`);
    });

    cy.get('[data-testid="ingredients-bun"]').as('buns-list');
    cy.get('[data-testid="ingredients-main"]').as('ingredients-list');

    cy.get('@buns-list').find('[data-testid="ingredient-card"]').first().as('bun');
    cy.get('@ingredients-list').find('[data-testid="ingredient-card"]').first().as('ingredient');

    cy.get('[data-testid="constructor"]').as('constructor');
    cy.get('[data-testid="order-button"]').as('order-button');

    cy.get('@bun').trigger('dragstart', { force: true });
    cy.get('@constructor').trigger('drop', { force: true });
    cy.get('@ingredient').trigger('dragstart', { force: true });
    cy.get('@constructor').trigger('drop', { force: true });

    cy.get('[data-testid="bun-top"]').should('exist');
    cy.get('[data-testid="bun-bottom"]').should('exist');
    cy.get('[data-testid="ingredients-area"]').should('not.be.empty');

    cy.get('@order-button').should('not.be.disabled');
    cy.log('Кнопка заказа активна, кликаем...');

    cy.get('@order-button').click({ force: true });
    cy.log('Клик по кнопке заказа выполнен');

    cy.url().should('include', '/login');
    cy.contains('Вход', { timeout: 10000 });
    
    cy.get('[name=email]').type(login.email);
    cy.get('[name=password]').type(login.password);
    cy.contains('button', 'Войти').click({ force: true });

    cy.url().should('eq', 'http://localhost:3000/');
    
    cy.get('@buns-list').find('[data-testid="ingredient-card"]').first().as('bun2');
    cy.get('@ingredients-list').find('[data-testid="ingredient-card"]').first().as('ingredient2');
    cy.get('@bun2').trigger('dragstart', { force: true });
    cy.get('@constructor').trigger('drop', { force: true });
    cy.get('@ingredient2').trigger('dragstart', { force: true });
    cy.get('@constructor').trigger('drop', { force: true });

    cy.get('@order-button').click({ force: true });

    cy.get('[data-testid="order-details-number"]', { timeout: 20000 }).invoke('text').should('match', /\d+/);

    cy.get('[data-testid="modal-close"]').click({ force: true });

    cy.get('@order-button').should('be.disabled');
  });

  it('should open ingredient details modal when clicking on ingredient card', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="ingredient-card"]').first().click({ force: true });
    cy.get('[data-testid="ingredient-modal"]', { timeout: 5000 }).should('be.visible');
  });

  it('should load constructor page and display available ingredients', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер', { timeout: 10000 });
    cy.get('[data-testid="ingredient-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });
});
