import Review from '../review/review';

import { Comment } from '../../types/comment';

type PropsType = {
  comments: Comment[] | null;
}

function ReviewsList({comments}: PropsType): JSX.Element {
  if (comments) {
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

  return (
    <p>Comments are not found</p>
  );
}

export default ReviewsList;
