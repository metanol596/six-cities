import {ChangeEvent, Fragment} from 'react';
import { rates } from '../../const';

type PropsType = {
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  currentRating: number;
}

function Rating({onRatingChange, currentRating}: PropsType) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        Object.entries(rates).map(([rate, title]) => (
          <Fragment key={rate}>
            <input
              onChange={onRatingChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={rate}
              id={`${rate}-stars`}
              type="radio"
              checked={currentRating === +rate}
            />
            <label
              htmlFor={`${rate}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </div>
  );
}

export default Rating;
