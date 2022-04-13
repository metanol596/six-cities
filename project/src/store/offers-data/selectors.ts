import { State } from '../../types/state';

import { NameSpace } from '../../const';

const selectOffersDataState = (state: State) => state[NameSpace.offersData];

export const selectCity = (state: State) => selectOffersDataState(state).city;
export const selectSortType = (state: State) => selectOffersDataState(state).sortType;
