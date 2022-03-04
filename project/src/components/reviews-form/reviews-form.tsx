import {useState} from 'react';
import Rating from '../rating/rating';

type FieldsType = {
  target: {
    name: string;
    value: string;
  }
}

function ReviewsForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const fieldChangeHandle = (evt: FieldsType) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Rating onRatingChange={fieldChangeHandle} />
      <textarea onChange={fieldChangeHandle} className="reviews__textarea form__textarea" id="review" name="review" value={formData.review} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
