import store from './store'; // путь к store.ts
import ingredientsReducer from './slices/ingredients';
import constructorReducer from './slices/burger-constructor';
import feedReducer from './slices/feed';
import orderReducer from './slices/order';
import userReducer from './slices/user';

describe('rootReducer', () => {
  it('Проверяет корректность инициализации store', () => {
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
  });

  it('Проверяет использование корректных редьюсеров', () => {
    const state = store.getState();

    expect(state.ingredients).toEqual(ingredientsReducer(undefined, { type: '@@INIT' }));
    expect(state.burgerConstructor).toEqual(constructorReducer(undefined, { type: '@@INIT' }));
    expect(state.feed).toEqual(feedReducer(undefined, { type: '@@INIT' }));
    expect(state.order).toEqual(orderReducer(undefined, { type: '@@INIT' }));
    expect(state.user).toEqual(userReducer(undefined, { type: '@@INIT' }));
  });
});
