import { createSlice } from '@reduxjs/toolkit';

import { CITIES, NameSpace, SortList } from '../../const';

type OffersData = {
  city: string;
  sortType: string;
}

const initialState: OffersData = {
  city: CITIES[0],
  sortType: SortList.POPULAR,
};

export const offersData = createSlice({
  name: NameSpace.offersData,
  initialState,
  reducers: {
    cityChange: (state, action) => {
      state.city = action.payload;
    },
    sortChange: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {cityChange, sortChange} = offersData.actions;
