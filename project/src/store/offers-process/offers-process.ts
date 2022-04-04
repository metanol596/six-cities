import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, SortList } from '../../const';

import { State } from '../../types/state';

type OffersProcess = {
  sortType: string;
  offerFavoriteStatus: boolean;
}

const initialState: OffersProcess = {
  sortType: SortList.POPULAR,
  offerFavoriteStatus: false,
};

export const offersProcess = createSlice({
  name: NameSpace.offersProcess,
  initialState,
  reducers: {
    sortChange: (state, action) => {
      state.sortType = action.payload;
    },
    toggleFavoriteStatus: (state, action) => {
      state.offerFavoriteStatus = action.payload.isFavorite;
    },
  },
});

export const {sortChange, toggleFavoriteStatus} = offersProcess.actions;

const selectOffersProcessState = (state: State) => state[NameSpace.offersProcess];

export const selectSortType = (state: State) => selectOffersProcessState(state).sortType;
