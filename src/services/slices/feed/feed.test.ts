import feedReducer, { fetchFeed, fetchOrders } from './index';
import { TOrder } from '@utils-types';

describe('feedSlice reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const ordersMock: TOrder[] = [
    {
      _id: 'abc123',
      number: 1,
      name: 'Бургер',
      ingredients: ['1', '2'],
      status: 'done',
      createdAt: '2025-06-01T10:00:00Z',
      updatedAt: '2025-06-01T10:01:00Z'
    }
  ];

  const feedPayload = {
    orders: ordersMock,
    total: 1500,
    totalToday: 150
  };

  describe('fetchFeed', () => {
    it('Проверка fetchFeed при pending', () => {
      const action = { type: fetchFeed.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверка fetchFeed при fulfilled', () => {
      const action = { type: fetchFeed.fulfilled.type, payload: feedPayload };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(ordersMock);
      expect(state.total).toBe(1500);
      expect(state.totalToday).toBe(150);
    });

    it('Проверка fetchFeed при rejected', () => {
      const action = {
        type: fetchFeed.rejected.type,
        error: { message: 'Feed error' }
      };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Feed error');
    });
  });

  describe('fetchOrders', () => {
    it('Проверка fetchOrders при pending', () => {
      const action = { type: fetchOrders.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверка fetchOrders при fulfilled', () => {
      const action = { type: fetchOrders.fulfilled.type, payload: ordersMock };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(ordersMock);
    });

    it('Проверка fetchOrders при rejected', () => {
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'Orders error' }
      };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Orders error');
    });
  });
});
