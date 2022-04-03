import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIRoute, FetchStatus, NameSpace } from '../../const';

import { Offer } from '../../types/offer';
import { Comment, NewComment } from '../../types/comment';
import { State } from '../../types/state';

import { handleError } from '../../services/handle-error';

import { api, store } from '../../store/index';

type OfferData = {
  offer: Offer | null;
  nearbyOffers: Offer[] | undefined;
  comments: Comment[] | undefined;
  offerFetchStatus: FetchStatus;
  nearbyOffersFetchStatus: FetchStatus;
  commentsFetchStatus: FetchStatus;
  commentFetchStatus: FetchStatus;
};

const initialState: OfferData = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  offerFetchStatus: FetchStatus.Idle,
  nearbyOffersFetchStatus: FetchStatus.Idle,
  commentsFetchStatus: FetchStatus.Idle,
  commentFetchStatus: FetchStatus.Idle,
};

export const fetchOffer = createAsyncThunk(
  'data/fetchOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchNearbyOffers = createAsyncThunk(
  'data/fetchNearbyOffers',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      return data;
    } catch (error) {
      handleError(error);
    }
  },
);

export const fetchComments = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  },
);

export const fetchComment = createAsyncThunk(
  'data/fetchComment',
  async (newComment: NewComment) => {
    try {
      await api.post<NewComment>(`${APIRoute.Comments}/${newComment.id}`, newComment.review);
      store.dispatch(fetchComments(newComment.id));
    } catch (error) {
      handleError(error);
    }
  },
);

export const offerData = createSlice({
  name: NameSpace.offerData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.offerFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerFetchStatus = FetchStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offerFetchStatus = FetchStatus.Failed;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.nearbyOffersFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffersFetchStatus = FetchStatus.Success;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.nearbyOffersFetchStatus = FetchStatus.Failed;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsFetchStatus = FetchStatus.Success;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsFetchStatus = FetchStatus.Failed;
      })
      .addCase(fetchComment.pending, (state) => {
        state.commentFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchComment.fulfilled, (state) => {
        state.commentFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchComment.rejected, (state) => {
        state.commentFetchStatus = FetchStatus.Failed;
      });
  },
});

const selectOfferDataState = (state: State) => state[NameSpace.offerData];

export const selectoffer = (state: State) => selectOfferDataState(state).offer;
export const selectNearbyOffers = (state: State) => selectOfferDataState(state).nearbyOffers;
export const selectComments = (state: State) => selectOfferDataState(state).comments;
export const selectOfferFetchStatus = (state: State) => selectOfferDataState(state).offerFetchStatus;
export const selectNearbyOffersFetchStatus = (state: State) => selectOfferDataState(state).nearbyOffersFetchStatus;
export const selectCommentsFetchStatus = (state: State) => selectOfferDataState(state).commentsFetchStatus;
export const selectCommentFetchStatus = (state: State) => selectOfferDataState(state).commentFetchStatus;
