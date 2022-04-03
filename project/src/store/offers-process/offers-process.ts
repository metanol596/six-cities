import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, SortList } from '../../const';

import { State } from '../../types/state';

type OffersProcess = {
  sortType: string;
}

const initialState: OffersProcess = {
  sortType: SortList.POPULAR,
};

export const offersProcess = createSlice({
  name: NameSpace.offersProcess,
  initialState,
  reducers: {
    sortChange: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {sortChange} = offersProcess.actions;

const selectOffersProcessState = (state: State) => state[NameSpace.offersProcess];

export const selectSortType = (state: State) => selectOffersProcessState(state).sortType;
