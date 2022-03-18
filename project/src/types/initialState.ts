import {Offer} from './offer';

export type InitialState = {
  city: string;
  offers: Offer[];
  sortType: string;
};
