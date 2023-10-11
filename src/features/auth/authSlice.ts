import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'models';

export interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  currentUser?: User;
}

export interface LoginPayload {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },

    loginSuccess: (state, action: PayloadAction<User>) => {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },

    loginFailed: (state) => {
      state.logging = false;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
