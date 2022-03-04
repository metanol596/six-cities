import { Offer } from '../../types/offer';
import OffersList from '../offers-list/offers-list';


type PropsType = {
  offers: Offer[];
  className: string;
}

function FavoritesList({offers, className}: PropsType): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true);

  return (
    <ul className="favorites__list">
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="/#">
              <span>Amsterdam</span>
            </a>
          </div>
        </div>
        <OffersList offers={favoriteOffers} className={className} isSmall />
      </li>
    </ul>
  );
}

export default FavoritesList;
