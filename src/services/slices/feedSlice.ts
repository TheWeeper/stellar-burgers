import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { TOrdersState } from './types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке заказов';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders.map((item) => ({ ...item }));
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      });
  }
});

export default feedSlice.reducer;
