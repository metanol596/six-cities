import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';

import { createAPI } from '../../services/api';

import {
  userProcess,
  requireAuthorization,
  checkAuthAction,
  loginAction,
  logoutAction
} from './user-process';

import { redirectToRoute } from '../action';

import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  FetchStatus
} from '../../const';

import { State } from '../../types/state';
import { AuthData } from '../../types/auth-data';

const state = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

describe('User process slice', () => {
  describe('Reducer: userProcess', () => {
    it('without additional parameters should return initial state', () => {
      expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
        .toEqual(state);
    });

    it('should update authorization status', () => {
      expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.Auth,
        });
    });
  });

  describe('User async actions', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];

    const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(requireAuthorization.toString());
    });

    it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = { email: 'test@test.de', password: 'kek123456' };

      mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secretToken' });

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();
      Storage.prototype.setItem('six-cities-token', 'secretToken');

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(loginAction.pending.type);
      expect(actions).toContain(redirectToRoute(AppRoute.Main).type);
      expect(actions).toContain(loginAction.fulfilled.type);
      expect(actions).not.toContain(loginAction.rejected.type);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secretToken');
    });

    it('should dispatch Logout when Delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();
      Storage.prototype.removeItem('six-cities-token');

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(logoutAction.pending.type);
      expect(actions).toContain(logoutAction.fulfilled.type);
      expect(actions).not.toContain(logoutAction.rejected.type);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    });
  });
});
