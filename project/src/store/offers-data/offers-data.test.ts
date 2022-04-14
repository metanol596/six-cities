import { cityChange, offersData, sortChange } from './offers-data';

import { CITIES, SortList } from '../../const';

const state = {
  city: CITIES[0],
  sortType: SortList.POPULAR,
};

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change city', () => {
    expect(offersData.reducer(state, cityChange(CITIES[1])))
      .toEqual({
        ...state,
        city: CITIES[1],
      });
  });

  it('should sort cards', () => {
    expect(offersData.reducer(state, sortChange(SortList.PRICE_TO_HIGH)))
      .toEqual({
        ...state,
        sortType: SortList.PRICE_TO_HIGH,
      });
  });
});
