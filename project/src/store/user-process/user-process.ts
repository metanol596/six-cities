import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//import { store } from '../index';

//import { fetchOffersAction } from '../offers-process/offers-process';

import { dropToken } from './../../services/token';
import { deleteUser } from './../../services/user';
import { saveToken } from '../../services/token';
import { setUser } from '../../services/user';
import { handleError } from '../../services/handle-error';

import { fetchOffersAction } from '../offers-process/offers-process';

import { redirectToRoute } from '../action';

import { AuthData } from '../../types/auth-data';
import { UserData } from '../../types/user-data';

import {
  AuthorizationStatus,
  NameSpace,
  APIRoute,
  AppRoute,
  FetchStatus
} from '../../const';

import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: Record<string, never>;
  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
}

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      dispatch(redirectToRoute(AppRoute.Main));
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      //store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(fetchOffersAction());
    } catch (error) {
      handleError(error);
      //store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    //login: (state, action) => {
    //  state.user = action.payload;
    //},
    //logout: (state) => {
    //  state.user = {};
    //},
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = FetchStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginStatus = FetchStatus.Success;
        state.user = {};
        saveToken(action.payload.token);
        setUser(action.payload);
        state.authorizationStatus = AuthorizationStatus.Auth;
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
        state.user = {};
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        dropToken();
        deleteUser();
      })
      .addCase(logoutAction.rejected, (state) => {
        state.logoutStatus = FetchStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.Auth;
      });
  },
});

export const {requireAuthorization} = userProcess.actions;
