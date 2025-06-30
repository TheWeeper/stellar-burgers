import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderError: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredints: string[]) => {
    const response = await orderBurgerApi(ingredints);
    return response.order;
  }
);

const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message || 'Ошибка при создании заказа';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message || 'Ошибка при загрузке заказа';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
