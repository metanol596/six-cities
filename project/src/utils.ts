import { AuthorizationStatus } from './const';

import { Offer } from './types/offer';

export const getRatePercent = (rating: number) => {
  const MAX_RATE = 5;

  return rating * 100 / MAX_RATE;
};

export const sortOffers = (offers: Offer[], sortsList: {[key: string]: string}, type: string) => {
  switch (type) {
    case sortsList.PRICE_TO_HIGH:
      return offers.sort((a, b) => a.price - b.price);
      break;
    case sortsList.PRICE_TO_LOW:
      return offers.sort((a, b) => b.price - a.price);
      break;
    case sortsList.TOP_RATED:
      return offers.sort((a, b) => b.price - a.price);
      break;
    default:
      return offers;
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
