import { getRatePercent } from '../../utils';

import { Comment } from '../../types/comment';

type PropsType = {
  commentItem: Comment;
}

function Review({commentItem}: PropsType):JSX.Element {
  const {id, user, rating, comment, date} = commentItem;
  const {avatarUrl, name} = user;

  return (
    <li key={id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatePercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime='2019-04-24'>{date}</time>
      </div>
    </li>
  );
}

export default Review;
