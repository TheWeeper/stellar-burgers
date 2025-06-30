import ingredientsReducer, { fetchIngredients } from './index';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: null
  };
  const ingredientsMock: TIngredient[] = [
    {
      _id: '123',
      name: 'TestIngredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'img.jpg',
      image_large: 'img_large.jpg',
      image_mobile: 'img_mobile.jpg'
    }
  ];
  describe('fetchIngredients', () => {
    it('Проверка ingredientsRequest при pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({
        ingredients: [],
        ingredientsRequest: true,
        ingredientsError: null
      });
    });

    it('Проверка ingredientsRequest при fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: ingredientsMock
      };
      const state = ingredientsReducer(initialState, action);
      expect(state.ingredients).toEqual(ingredientsMock);
      expect(state.ingredientsRequest).toBe(false);
      expect(state.ingredientsError).toBeNull();
    });

    it('Проверка ingredientsRequest при rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ingredients error' }
      };
      const state = ingredientsReducer(initialState, action);
      expect(state.ingredientsRequest).toBe(false);
      expect(state.ingredientsError).toBe('Ingredients error');
    });
  });
});
