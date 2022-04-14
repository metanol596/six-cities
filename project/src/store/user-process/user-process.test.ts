import { userProcess, requireAuthorization } from './user-process';

import { AuthorizationStatus, FetchStatus } from '../../const';

const state = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

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
