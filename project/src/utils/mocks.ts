import { datatype, lorem } from 'faker';

export const makeFakeComments = () => ({
  review: {
    comments: lorem.text(),
    rating: Math.floor(Math.random() * 6),
  },
  id: datatype.number(),
});
