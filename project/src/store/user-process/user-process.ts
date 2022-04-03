import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthData } from '../../types/auth-data';
import { UserData } from '../../types/user-data';
import { State } from '../../types/state';

import { AuthorizationStatus, NameSpace, APIRoute, AppRoute, FetchStatus } from '../../const';

import { api, store } from '../../store/index';

import { redirectToRoute } from './../action';

import { handleError } from '../../services/handle-error';
import { saveToken, dropToken } from '../../services/token';

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
}

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      handleError(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const res = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(res.data.token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
      return res.data;
    } catch (error) {
      handleError(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      handleError(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    }
  },
);

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = FetchStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginStatus = FetchStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loginStatus = FetchStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logoutStatus = FetchStatus.Pending;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.logoutStatus = FetchStatus.Success;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.logoutStatus = FetchStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.Auth;
      });
  },
});

export const {requireAuthorization} = userProcess.actions;

const selectUserState = (state: State) => state[NameSpace.user];

export const selectAuthorizationStatus = (state: State) => selectUserState(state).authorizationStatus;
export const selectUser = (state: State) => selectUserState(state).user;
export const selectLoginStatus = (state: State) => selectUserState(state).loginStatus;
export const selectLogoutStatus = (state: State) => selectUserState(state).logoutStatus;
