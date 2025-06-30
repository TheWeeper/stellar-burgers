import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './index';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-id')
}));

const baseIngredient = {
  _id: '123',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('burgerConstructor reducer', () => {
  describe('addIngredient', () => {
    it('Проверяет добавление булки', () => {
      const bun = { ...baseIngredient, type: 'bun', _id: 'bun1', name: 'Bun' };
      const nextState = constructorReducer(undefined, addIngredient(bun));
      expect(nextState.bun).toEqual({ ...bun, id: 'mocked-id' });
      expect(nextState.ingredients).toEqual([]);
    });

    it('should replace the existing bun when a new one is added', () => {
      const initialBun = {
        ...baseIngredient,
        type: 'bun',
        _id: 'bun1',
        name: 'Old Bun',
        id: 'old-id'
      };

      const prevState = {
        bun: initialBun,
        ingredients: []
      };

      const newBun = {
        ...baseIngredient,
        type: 'bun',
        _id: 'bun2',
        name: 'New Bun'
      };

      const nextState = constructorReducer(prevState, addIngredient(newBun));

      expect(nextState.bun).toEqual({
        ...newBun,
        id: 'mocked-id'
      });

      expect(nextState.ingredients).toEqual([]);
    });

    it('Проверяет добавление начинки', () => {
      const main = { ...baseIngredient, type: 'main', _id: 'main1' };
      const nextState = constructorReducer(undefined, addIngredient(main));
      expect(nextState.ingredients).toEqual([{ ...main, id: 'mocked-id' }]);
      expect(nextState.bun).toBeNull();
    });
  });

  describe('removeIngredient', () => {
    it('Проверяет удаление ингредиента', () => {
      const prevState = {
        bun: null,
        ingredients: [
          { ...baseIngredient, id: 'id-1' },
          { ...baseIngredient, id: 'id-2' }
        ]
      };
      const nextState = constructorReducer(prevState, removeIngredient('id-1'));
      expect(nextState.ingredients).toEqual([
        { ...baseIngredient, id: 'id-2' }
      ]);
    });

    it('Проверяет удаление несуществующего ингредиента', () => {
      const prevState = {
        bun: null,
        ingredients: [{ ...baseIngredient, id: 'id-1' }]
      };
      const nextState = constructorReducer(prevState, removeIngredient('id-2'));
      expect(nextState.ingredients).toEqual([
        { ...baseIngredient, id: 'id-1' }
      ]);
    });
  });

  describe('moveIngredient', () => {
    it('Проверяет перемещение ингредиента', () => {
      const prevState = {
        bun: null,
        ingredients: [
          { ...baseIngredient, id: 'id-1', name: 'First' },
          { ...baseIngredient, id: 'id-2', name: 'Second' },
          { ...baseIngredient, id: 'id-3', name: 'Third' }
        ]
      };
      const nextState = constructorReducer(
        prevState,
        moveIngredient({ fromIndex: 0, toIndex: 2 })
      );
      expect(nextState.ingredients[0].name).toBe('Second');
      expect(nextState.ingredients[1].name).toBe('Third');
      expect(nextState.ingredients[2].name).toBe('First');
    });
  });
  describe('clearConstructor', () => {
    it('Проверка очищения конструктора', () => {
      const prevState = {
        bun: { ...baseIngredient, type: 'bun', id: 'bun-id' },
        ingredients: [{ ...baseIngredient, id: 'id-1' }]
      };
      const nextState = constructorReducer(prevState, clearConstructor());
      expect(nextState).toEqual({ bun: null, ingredients: [] });
    });
  });
});
