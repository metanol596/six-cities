import { createAction } from '@reduxjs/toolkit';

import { AppRoute, AuthorizationStatus } from '../const';
import { Comment } from '../types/comment';

import { Offer } from './../types/offer';

export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  LOAD_OFFERS: 'LOAD_OFFERS',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  LOAD_OFFER: 'LOAD_OFFER',
  LOAD_NEARBY_OFFERS: 'LOAD_NEARBY_OFFERS',
  SORT_CHANGE: 'SORT_CHANGE',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  LOGIN: 'LOGIN',
};

export const cityChange = createAction(Action.CITY_CHANGE, (city) => ({payload: city}));
export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);
export const loadOffer = createAction<Offer>(Action.LOAD_OFFER);
export const loadNearbyOffers = createAction<Offer[]>(Action.LOAD_NEARBY_OFFERS);
export const loadComments = createAction<Comment[]>(Action.LOAD_COMMENTS);
export const sortChange = createAction(Action.SORT_CHANGE, (sortType) => ({payload: sortType}));
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTH);
export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
export const login = createAction(Action.LOGIN, (user) => ({payload: user}));
