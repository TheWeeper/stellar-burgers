import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  buildCreateSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  registerUserRequest: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false
};

const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  }
});
