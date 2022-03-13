import Review from '../review/review';

import {Offer} from '../../types/offer';

type PropsType = {
  nearbyOffers: Offer[];
}

function ReviewsList({nearbyOffers}: PropsType): JSX.Element {
  return (
    <ul className="reviews__list">
      <Review />
    </ul>
  );
}

export default ReviewsList;
