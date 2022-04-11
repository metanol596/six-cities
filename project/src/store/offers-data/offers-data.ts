import { createSlice } from '@reduxjs/toolkit';

import { CITIES, NameSpace } from '../../const';

type OffersData = {
  city: string;
}

const initialState: OffersData = {
  city: CITIES[0],
};

export const offersData = createSlice({
  name: NameSpace.offersData,
  initialState,
  reducers: {
    cityChange: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {cityChange} = offersData.actions;
