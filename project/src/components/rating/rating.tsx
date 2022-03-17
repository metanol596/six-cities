import {ChangeEvent, Fragment} from 'react';
import { Rates } from '../../const';

type PropsType = {
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function Rating({onRatingChange}: PropsType) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        Object.entries(Rates).map(([rate, title]) => (
          <Fragment key={rate}>
            <input onChange={onRatingChange} className="form__rating-input visually-hidden" name="rating" value={rate} id={`${rate}-stars`} type="radio" />
            <label htmlFor={`${rate}-stars`} className="reviews__rating-label form__rating-label" title={title}>
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
