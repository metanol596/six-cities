import { Comment } from './comment';
import {Offer} from './offer';

export type InitialState = {
  city: string;
  offers: Offer[];
  isDataLoaded: boolean;
  comments: Comment[];
  sortType: string;
};
