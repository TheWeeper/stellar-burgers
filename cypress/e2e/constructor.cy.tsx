describe('Burger Constroctor Tests', () => {

  const BUN_NAME = 'Краторная булка N-200i';
  const BUN_SELECTOR = `[data-cy="ingredient-${BUN_NAME}"]`;

  const MAIN_NAME = 'Филе Люминесцентного тетраодонтимформа';
  const MAIN_SELECTOR = `[data-cy="ingredient-${MAIN_NAME}"]`;
  const MAIN_ID = '643d69a5c3f7b9001cfa093e';
  const MAIN_LINK_SELECTOR = `[data-cy="ingredient-link-${MAIN_ID}"]`;

  const SAUCE_NAME = 'Соус фирменный Space Sauce';
  const SAUCE_SELECTOR = `[data-cy="ingredient-${SAUCE_NAME}"]`;

  const CONSTRUCTOR_SECTION = '[data-cy="burger-constructor"]';
  const ORDER_BUTTON = '[data-cy="submit-order"]';
  const MODAL_ROOT = '#modals';
  const MODAL_TITLE = '[data-cy="modal-title"]';
  const MODAL_OVERLAY = '[data-cy="modal-overlay"]';

  beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '**/ingredients', {
        statusCode: 200,
        body: { success: true, data: ingredients }
      }).as('fetchIngredients');
    });

    cy.fixture('order.json').then((order) => {
      cy.intercept('POST', '**/orders', {
        statusCode: 200,
        body: order
      }).as('createOrder');
    });

    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', '**/auth/user', {
        statusCode: 200,
        body: user
      }).as('fetchUser');
    });

    window.localStorage.setItem('refreshToken', 'testFreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('/');
    cy.wait('@fetchIngredients');
    cy.wait('@fetchUser');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Загрузка и добавление ингредиентов', () => {
    it('Проверка корректной загрузки данных', () => {
      cy.get(BUN_SELECTOR).scrollIntoView().should('be.visible');
      cy.get(MAIN_SELECTOR).scrollIntoView().should('be.visible');
      cy.get(SAUCE_SELECTOR).scrollIntoView().should('be.visible');
    });

    it('Проверка корректности добавления ингредиентов', () => {
      cy.addIngredient(BUN_NAME);

      cy.get(CONSTRUCTOR_SECTION)
        .find('[data-cy="bun-top"]')
        .contains(`${BUN_NAME} (верх)`)
        .should('be.visible');

      cy.get(CONSTRUCTOR_SECTION)
        .find('[data-cy="bun-bottom"]')
        .contains(`${BUN_NAME} (низ)`)
        .should('be.visible');

      cy.addIngredient(MAIN_NAME);

      cy.get(CONSTRUCTOR_SECTION)
        .find('[data-cy="constructor-ingredients"]')
        .contains(MAIN_NAME)
        .should('be.visible');

      cy.addIngredient(SAUCE_NAME);

      cy.get(CONSTRUCTOR_SECTION)
        .find('[data-cy="constructor-ingredients"]')
        .contains(SAUCE_NAME)
        .should('be.visible');
    });
  });

  describe('Модальное окно для ингредиентов', () => {
    it('Проверка корректности открытия и закрытия модального окна', () => {
      cy.get(MAIN_LINK_SELECTOR).click();
      cy.get(MODAL_ROOT).contains(MAIN_NAME).should('be.visible');
      cy.get(MODAL_ROOT)
        .find(MODAL_TITLE)
        .contains('Информация об ингредиенте')
        .should('be.visible');
      cy.closeModal();
    });

    it('Проверка закрытия модального окна при нажатии на оверлей', () => {
      cy.get(MAIN_LINK_SELECTOR).click();
      cy.get(MODAL_OVERLAY).click({ force: true });
      cy.get(MODAL_ROOT).should('be.empty');
    });
  });

  describe('Создание заказа', () => {
    it('Проверка создания заказа', () => {
      cy.addIngredient(BUN_NAME);
      cy.addIngredient(MAIN_NAME);
      cy.addIngredient(SAUCE_NAME);
      cy.addIngredient(MAIN_NAME);

      cy.get(ORDER_BUTTON).click();

      cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

      cy.fixture('order.json').then((data) => {
        cy.get(MODAL_ROOT)
          .find('[data-cy="order-number"]')
          .contains(data.order.number.toString())
          .should('be.visible');
      });

      cy.get(MODAL_ROOT).contains('идентификатор заказа').should('be.visible');

      cy.get('[data-cy="total-price"]').contains('0').should('be.visible');
      cy.get(BUN_SELECTOR)
        .find(`[data-cy="ingredient-count-${BUN_NAME}"]`)
        .should('not.exist');
      cy.get(MAIN_SELECTOR)
        .find(`[data-cy="ingredient-count-${MAIN_NAME}"]`)
        .should('not.exist');
      cy.get(SAUCE_SELECTOR)
        .find(`[data-cy="ingredient-count-${SAUCE_NAME}"]`)
        .should('not.exist');
    });

    it('Проверка попытки создания заказа неавторизованым пользователем', () => {
      cy.clearLocalStorage('refreshToken');
      cy.clearCookie('accessToken');

      cy.intercept('GET', '**/auth/user', {
        statusCode: 403,
        body: {
          success: false,
        }
      })

      cy.visit('/');
      cy.wait('@fetchIngredients');

      cy.addIngredient(BUN_NAME);
      cy.get(ORDER_BUTTON).click();
      cy.url().should('include', '/login');
      cy.contains('Вход').should('be.visible');
    })
  });
});
