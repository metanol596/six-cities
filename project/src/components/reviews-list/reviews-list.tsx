import Review from '../review/review';

import { Comment } from '../../types/comment';

type PropsType = {
  comments: Comment[];
}

function ReviewsList({comments}: PropsType): JSX.Element {
  const commentsForReverse = [...comments];

  return (
    <ul className="reviews__list">
      {
        commentsForReverse.reverse().map((comment) => (
          <Review
            key={comment.id}
            commentItem={comment}
          />
        ))
      }
    </ul>
  );
}

export default ReviewsList;
