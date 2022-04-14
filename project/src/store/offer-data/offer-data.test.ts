import { offerData } from './offer-data';
import { loadComments } from './offer-data';
import { makeFakeComment } from '../../utils/mocks';

const fakeComments = new Array(4).fill(null).map(makeFakeComment);

describe('Reducer: offerData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({comments: []});
  });

  it('should load comments', () => {
    const state = {comments: []};

    expect(offerData.reducer(state, loadComments(fakeComments)))
      .toEqual({comments: fakeComments});
  });
});
