import Review from '../review/review';

import { Comment } from '../../types/comment';

type PropsType = {
  comments: Comment[];
}

function ReviewsList({comments}: PropsType): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map((comment) => (
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
