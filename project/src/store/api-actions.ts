import { createAsyncThunk } from '@reduxjs/toolkit';

import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Comment } from '../types/comment';

import { APIRoute, AppRoute, AuthorizationStatus } from '../const';

import { api, store } from '../store/index';
import {
  loadComments,
  //loadComment,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  login,
  redirectToRoute,
  requireAuthorization
} from './action';

import { handleError } from '../services/handle-error';
import { saveToken, dropToken } from '../services/token';


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

//export const fetchCommentAction = createAsyncThunk(
//  'data/fetchComment',
//  async ({id, comment, rating}: Comment) => {
//    try {
//      const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
//      store.dispatch(loadComment(data));
//    } catch (error) {
//      handleError(error);
//    }
//  },
//);

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
