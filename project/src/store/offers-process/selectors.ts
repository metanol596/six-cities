import { State } from '../../types/state';

import { NameSpace } from '../../const';

const selectOffersProcessState = (state: State) => state[NameSpace.offersProcess];

export const selectFavoritesOffers = (state: State) => selectOffersProcessState(state).favoritesOffers;
export const selectFavoritesOffersStatus = (state: State) => selectOffersProcessState(state).favoritesOffersFetchStatus;

export const selectOffers = (state: State) => selectOffersProcessState(state).offers;
export const selectOffersStatus = (state: State) => selectOffersProcessState(state).offersFetchStatus;

export const selectOffer = (state: State) => selectOffersProcessState(state).offer;
export const selectOfferStatus = (state: State) => selectOffersProcessState(state).offerFetchStatus;

export const selectNearbyOffers = (state: State) => selectOffersProcessState(state).nearbyOffers;
export const selectNearbyOffersStatus = (state: State) => selectOffersProcessState(state).nearbyOffersFetchStatus;
