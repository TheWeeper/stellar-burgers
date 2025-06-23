import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type IngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
        action.error.message || 'Ошибка при загрузке ингредиентов';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
