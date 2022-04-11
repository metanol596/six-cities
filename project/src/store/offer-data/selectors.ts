import { State } from '../../types/state';

import { NameSpace } from '../../const';

const selectOfferDataState = (state: State) => state[NameSpace.offerData];

export const selectComments = (state: State) => selectOfferDataState(state).comments;
