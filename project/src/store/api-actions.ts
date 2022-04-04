import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import { NewComment } from '../types/comment';
import { OfferFavoriteStatus } from '../types/favorites';

import {
  AuthorizationStatus,
  APIRoute,
  AppRoute
} from '../const';

import { redirectToRoute } from './action';

import { login, requireAuthorization } from './user-process/user-process';

import { api, store } from '../store/index';

import { loadComments, loadNearbyOffers, loadOffer } from './offer-data/offer-data';
import { loadOffers } from './offers-data/offers-data';

import { handleError } from '../services/handle-error';
import { saveToken, dropToken } from '../services/token';
import { toggleFavoriteStatus } from './offers-process/offers-process';

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
    }
  },
);

export const fetchCommentAction = createAsyncThunk(
  'data/fetchComment',
  async (newComment: NewComment) => {
    try {
      await api.post<NewComment>(`${APIRoute.Comments}/${newComment.id}`, newComment.review);
      store.dispatch(fetchCommentsAction(newComment.id));
    } catch (error) {
      handleError(error);
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
  async ({email, password}: AuthData) => {
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

export const toggleFavoriteStatusAction = createAsyncThunk(
  'data/toggleFavoriteStatus',
  async (offerFavoriteStatus: OfferFavoriteStatus) => {
    try {
      const {data: {isFavorite}} = await api.post<Offer>(`${APIRoute.Favorite}/${offerFavoriteStatus.id}/${offerFavoriteStatus.status}`, offerFavoriteStatus);
      store.dispatch(toggleFavoriteStatus(isFavorite));
    } catch (error) {
      handleError(error);
    }
  },
);
