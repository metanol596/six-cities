import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter/types';
import thunk from 'redux-thunk';

import { createAPI } from '../services/api';

import { APIRoute } from '../const';

import { State } from '../types/state';

import { makeFakeComments } from '../utils/mocks';

import { fetchCommentsAction } from './api-actions';

import { loadComments } from './offer-data/offer-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Fetch comments when Get /comments/id', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${1}`)
      .reply(200, [makeFakeComments(), makeFakeComments()]);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });
});
