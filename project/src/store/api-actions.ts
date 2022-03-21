import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store';

import { Offer } from '../types/offer';

import { APIRoute } from '../const';

import { loadOffers } from './action';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);
