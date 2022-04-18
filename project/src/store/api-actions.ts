import { createAsyncThunk } from '@reduxjs/toolkit';

import { Offer } from '../types/offer';
import { NewComment, PostCommentActionType } from '../types/comment';
import { OfferFavoriteStatus } from '../types/favorites';

import {
  APIRoute,
  AppRoute
} from '../const';

import { redirectToRoute } from './action';

import { api, store } from '../store/index';

import { loadComments } from './offer-data/offer-data';
import { updateFavorites } from './offers-process/offers-process';

import { handleError } from '../services/handle-error';

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
