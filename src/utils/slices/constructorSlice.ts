import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    removeIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: action.payload._id + Math.random().toString(36).slice(2, 11)
      };
      state.ingredients.push(newIngredient);
    },
    setBun: (state, action: PayloadAction<TConstructorIngredient | null>) => {
      if (action.payload) {
        const bun = {
          ...action.payload,
          id: action.payload._id + Math.random().toString(36).slice(2, 11)
        };
        state.bun = bun;
      } else {
        state.bun = null;
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedIngredient] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
    addIngredient,
    setBun,
    removeIngredients,
    moveIngredient,
    clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
