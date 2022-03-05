import {ChangeEvent, useState} from 'react';
import Rating from '../rating/rating';

function ReviewsForm(): JSX.Element {
  const MAX_REVIEW_LENGTH = 300;
  const MIN_REVIEW_LENGTH = 50;

  const [formData, setFormData] = useState<{[key: string]: string}>({
    rating: '',
    review: '',
  });

  const [submitButtonState, setSubmitButtonState] = useState(true);

  const isDisabled = () => {
    if (formData.rating === '' || (formData.review.length < MIN_REVIEW_LENGTH || formData.review.length > MAX_REVIEW_LENGTH)) {
      return setSubmitButtonState(true);
    }

    return setSubmitButtonState(false);
  };

  const handleChangeField = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});

    isDisabled();
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <Rating onRatingChange={handleChangeField} />

      <textarea
        onChange={handleChangeField}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={submitButtonState}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
