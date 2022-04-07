import { createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/state';

import {
  AuthorizationStatus,
  NameSpace
} from '../../const';

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: Record<string, never>;
}

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const {requireAuthorization, login, logout} = userProcess.actions;

const selectUserState = (state: State) => state[NameSpace.user];

export const selectAuthorizationStatus = (state: State) => selectUserState(state).authorizationStatus;
export const selectUser = (state: State) => selectUserState(state).user;
