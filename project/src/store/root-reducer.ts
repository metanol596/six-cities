import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { offersProcess } from './offers-process/offers-process';
import { offerData } from './offer-data/offer-data';

export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess.reducer,
  [NameSpace.offersData]: offersData.reducer,
  [NameSpace.offersProcess]: offersProcess.reducer,
  [NameSpace.offerData]: offerData.reducer,
});

