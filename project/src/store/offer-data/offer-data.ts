import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { Comment } from '../../types/comment';
import { State } from '../../types/state';

type OfferData = {
  comments: Comment[] | undefined;
};

const initialState: OfferData = {
  comments: [],
};

export const offerData = createSlice({
  name: NameSpace.offerData,
  initialState,
  reducers: {
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {loadComments} = offerData.actions;

const selectOfferDataState = (state: State) => state[NameSpace.offerData];

export const selectComments = (state: State) => selectOfferDataState(state).comments;
