import { datatype, lorem } from 'faker';

export const makeFakeComment = () => ({
  review: {
    comments: lorem.text(),
    rating: Math.floor(Math.random() * 6),
  },
  id: datatype.number(),
});
