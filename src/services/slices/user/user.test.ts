import userReducer, {
  fetchUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  setAuthChecked
} from './index';

import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@email.com',
  name: 'Test User'
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  error: null,
  loading: false
};

describe('userSlice reducer', () => {
  describe('setAuthChecked', () => {
    it('should handle setAuthChecked', () => {
      const state = userReducer(initialState, setAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('fetchUser', () => {
    it('Проверка fetchUser при pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isAuthChecked).toBe(false);
    });

    it('Проверка fetchUser при fulfilled', () => {
      const action = { type: fetchUser.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('Проверка fetchUser при rejected', () => {
      const action = { type: fetchUser.rejected.type };
      const state = userReducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('Проверка registerUser при pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });

    it('Проверка registerUser при fulfilled', () => {
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Проверка registerUser при rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'User Error' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('User Error');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    it('Проверка loginUser при pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });

    it('Проверка loginUser при fulfilled', () => {
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Проверка loginUser при rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'User Error' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('User Error');
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logoutUser', () => {
    it('Проверка logoutUser при pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверка logoutUser при fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const modifiedState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };
      const state = userReducer(modifiedState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Проверка logoutUser при rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'User Error' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('User Error');
    });
  });

  describe('updateUser', () => {
    it('Проверка updateUser при pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('ПРоверка updateUser при fulfilled', () => {
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('Проверка updateUser при rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'User Error' }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('User Error');
    });
  });
});
