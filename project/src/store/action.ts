import { createAction } from '@reduxjs/toolkit';

import { AppRoute, AuthorizationStatus } from '../const';

export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  SORT_CHANGE: 'SORT_CHANGE',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
};

export const cityChange = createAction(Action.CITY_CHANGE, (city) => ({payload: city}));
export const sortChange = createAction(Action.SORT_CHANGE, (sortType) => ({payload: sortType}));
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTH);
export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
