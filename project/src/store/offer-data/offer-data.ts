import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { Comment } from '../../types/comment';

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
