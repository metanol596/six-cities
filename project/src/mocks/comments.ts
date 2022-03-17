import { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    'id': 1,
    'user': {
      'id': 10,
      'isPro': true,
      'name': 'Max',
      'avatarUrl': 'https://9.react.pages.academy/static/avatar/1.jpg',
    },
    'rating': 4,
    'comment': 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    'date': 'May 2020',
  },
  {
    'id': 2,
    'user': {
      'id': 13,
      'isPro': false,
      'name': 'Zak',
      'avatarUrl': 'https://9.react.pages.academy/static/avatar/4.jpg',
    },
    'rating': 5,
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': 'April 2019',
  },
];
