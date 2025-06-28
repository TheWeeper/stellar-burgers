import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  registerUserApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  error: string | null;
  loading: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  error: null,
  loading: false
};

export const fetchUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData: TRegisterData) => {
    const response = await registerUserApi(formData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (formData: Partial<TRegisterData>) => {
    const response = await updateUserApi(formData);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: TLoginData) => {
    const response = await loginUserApi(formData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка при регистрации пользователя';
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при обновлении профиля';
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при выходе из профиля';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при входе в аккаунт';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;

export default userSlice.reducer;
