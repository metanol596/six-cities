import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store';

import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

import { APIRoute, AppRoute, AuthorizationStatus } from '../const';

import { loadOffers, loadOffer, loadNearbyOffers, loadComments, login, redirectToRoute, requireAuthorization } from './action';

import { saveToken, dropToken } from '../services/token';
import { handleError } from '../services/handle-error';
import { Comment } from '../types/comment';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/fetchOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadOffer(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'data/fetchNearbyOffers',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadNearbyOffers(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadComments(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

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
      store.dispatch(login(res.data));
      store.dispatch(redirectToRoute(AppRoute.Main));
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
