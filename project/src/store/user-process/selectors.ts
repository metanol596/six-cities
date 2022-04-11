import { State } from '../../types/state';

import { NameSpace } from '../../const';

const selectUserState = (state: State) => state[NameSpace.user];

export const selectAuthorizationStatus = (state: State) => selectUserState(state).authorizationStatus;
export const selectUser = (state: State) => selectUserState(state).user;
