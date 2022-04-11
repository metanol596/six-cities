import { createAsyncThunk } from '@reduxjs/toolkit';

//import { AuthData } from '../types/auth-data';
//import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import { NewComment, PostCommentActionType } from '../types/comment';
import { OfferFavoriteStatus } from '../types/favorites';

import {
  AuthorizationStatus,
  APIRoute,
  AppRoute
} from '../const';

import { redirectToRoute } from './action';

import { requireAuthorization } from './user-process/user-process';

import { api, store } from '../store/index';

import { loadComments } from './offer-data/offer-data';
import {
  //loadOffers,
  loadNearbyOffers,
  loadOffer,
  updateFavorites
} from './offers-process/offers-process';

import { handleError } from '../services/handle-error';
//import { saveToken, dropToken } from '../services/token';
//import { deleteUser, setUser } from '../services/user';

import { loadFavoritesOffers } from './offers-process/offers-process';

//export const fetchOffersAction = createAsyncThunk(
//  'data/fetchOffers',
//  async () => {
//    try {
//      const {data} = await api.get<Offer[]>(APIRoute.Offers);
//      //store.dispatch(loadOffers(data));
//      return data;
//    } catch (error) {
//      handleError(error);
//      throw error;
//    }
//  },
//);

export const fetchOfferAction = createAsyncThunk(
  'data/fetchOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadOffer(data));
    } catch (error) {
      handleError(error);
      store.dispatch(redirectToRoute(AppRoute.NotFound));
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

export const postCommentAction = createAsyncThunk(
  'data/postComment',
  async ({newComment, onSuccess, onError}: PostCommentActionType) => {
    try {
      const {data} = await api.post<NewComment>(`${APIRoute.Comments}/${newComment.id}`, newComment.review);
      store.dispatch(loadComments(data));
      onSuccess();
    } catch (error) {
      if (onError) {
        onError();
      } else {
        handleError(error, () => store.dispatch(redirectToRoute(AppRoute.NotFound)));
      }
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

//export const loginAction = createAsyncThunk(
//  'user/login',
//  async ({email, password}: AuthData) => {
//    try {
//      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
//      saveToken(data.token);
//      setUser(data);
//      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
//      store.dispatch(login(data));
//      store.dispatch(redirectToRoute(AppRoute.Main));
//    } catch (error) {
//      handleError(error);
//      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//    }
//  },
//);

//export const logoutAction = createAsyncThunk(
//  'user/logout',
//  async () => {
//    try {
//      await api.delete(APIRoute.Logout);
//      dropToken();
//      deleteUser();
//      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//      store.dispatch(fetchOffersAction());
//    } catch (error) {
//      handleError(error);
//      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
//    }
//  },
//);

export const fetchFavoritesOffers = createAsyncThunk(
  'data/fetchFavoritesOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavoritesOffers(data));
    } catch (error) {
      handleError(error);
    }
  },
);

export const toggleFavoriteStatusAction = createAsyncThunk(
  'data/toggleFavoriteStatus',
  async (offerFavoriteStatus: OfferFavoriteStatus) => {
    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerFavoriteStatus.id}/${offerFavoriteStatus.status}`);
      store.dispatch(updateFavorites(data));
    } catch (error) {
      handleError(error);
    }
  },
);
