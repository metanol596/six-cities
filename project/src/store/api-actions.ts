import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store';

import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

import { APIRoute, AppRoute, AuthorizationStatus } from '../const';

import { loadOffers, redirectToRoute, requireAuthorization } from './action';

import { saveToken } from '../services/token';
import { errorHandle } from '../services/error-handle';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
