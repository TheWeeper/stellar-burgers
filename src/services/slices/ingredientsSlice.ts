import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type IngredientsState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: null
};

const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsError =
          action.error.message || 'Ошибка при загрузке ингредиентов';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
