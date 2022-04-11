import { State } from '../../types/state';

import { NameSpace } from '../../const';

const selectOffersProcessState = (state: State) => state[NameSpace.offersProcess];

export const selectSortType = (state: State) => selectOffersProcessState(state).sortType;
export const selectFavoritesOffers = (state: State) => selectOffersProcessState(state).favoritesOffers;
export const selectFavoritesOffersStatus = (state: State) => selectOffersProcessState(state).isFavoritesOffersLoaded;
export const selectOffers = (state: State) => selectOffersProcessState(state).offers;
export const selectOffersStatus = (state: State) => selectOffersProcessState(state).offersFetchStatus;
export const selectOffer = (state: State) => selectOffersProcessState(state).offer;
export const selectNearbyOffers = (state: State) => selectOffersProcessState(state).nearbyOffers;
