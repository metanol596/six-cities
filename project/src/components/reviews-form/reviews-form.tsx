import {ChangeEvent, FormEvent, useState} from 'react';
import { toast } from 'react-toastify';

import Rating from '../rating/rating';

import { useAppDispatch } from '../../hooks';

import { fetchCommentAction } from '../../store/api-actions';

import { NewComment } from '../../types/comment';

const MAX_REVIEW_LENGTH = 300;
const MIN_REVIEW_LENGTH = 50;

type PropsType = {
  offerId: number;
}

function ReviewsForm({offerId}: PropsType): JSX.Element {
  const [formData, setFormData] = useState<{[key: string]: string}>({
    review: '',
    rating: '',
  });

  const dispatch = useAppDispatch();

  const reviewLength = formData.review.length;
  const isValidReviewLength = reviewLength < MIN_REVIEW_LENGTH || reviewLength > MAX_REVIEW_LENGTH;
  const isDisabled = formData.rating === '' || isValidReviewLength;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const commentData: NewComment = {
      review: {
        comment: formData.review,
        rating: +formData.rating,
      },
      id: offerId,
    };

    dispatch(fetchCommentAction(commentData))
      .then(() => setFormData({
        ...formData,
        review: '',
        rating: '',
      }))
      .catch(() => toast.info('Comment not sended. Please, try again later'));
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
        Your review
      </label>

      <Rating onRatingChange={handleChange} currentRating={+formData.rating} />

      <textarea
        onChange={handleChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
