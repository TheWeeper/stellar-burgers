import orderReducer, { createOrder, clearOrder } from './index';

import { TOrderState } from './index';
import { TOrder } from '@utils-types';

describe('orderSlice reducer', () => {
  const initialState: TOrderState = {
    order: null,
    orderRequest: false,
    orderError: null
  };

  const mockOrder: TOrder = {
    _id: 'abc123',
    number: 1,
    name: 'Бургер',
    ingredients: ['1', '2'],
    status: 'done',
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:01:00Z'
  };

  describe('createOrder', () => {
    it('Проверка createOrder при pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.orderError).toBeNull();
    });

    it('Проверка createOrder при fulfilled', () => {
      const action = { type: createOrder.fulfilled.type, payload: mockOrder };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('Проверка createOrder при rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'Order Error' }
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderError).toBe('Order Error');
    });
  });
  describe('fetchOrderDetails', () => {
    it('Проверка fetchOrderDetails при pending', () => {
      const action = { type: 'order/fetchOrderDetails/pending' };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.orderError).toBeNull();
    });

    it('Проверка fetchOrderDetails при fulfilled', () => {
      const action = {
        type: 'order/fetchOrderDetails/fulfilled',
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('Проверка fetchOrderDetails при rejected', () => {
      const action = {
        type: 'order/fetchOrderDetails/rejected',
        error: { message: 'Order Error' }
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderError).toBe('Order Error');
    });
  });
  describe('clearOrder', () => {
    it('Проверка clearOrder', () => {
      const action = clearOrder();
      const stateWithOrder = {
        ...initialState,
        order: mockOrder,
        orderError: 'Order Error'
      };
      const state = orderReducer(stateWithOrder, action);
      expect(state.order).toBeNull();
      expect(state.orderError).toBeNull();
    });
  });
});
