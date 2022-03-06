import OffersList from '../offers-list/offers-list';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  className: string;
}

function FavoritesList({offers, className}: PropsType): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const uniqueCities = new Set<string>();

  favoriteOffers.forEach((item) => uniqueCities.add(item.city));

  const favoriteCities = [...uniqueCities.values()];

  return (
    <ul className="favorites__list">
      {
        favoriteCities.map((item) => (
          <li key={item} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/#">
                  <span>{item}</span>
                </a>
              </div>
            </div>
            <OffersList offers={favoriteOffers} favoriteCity={item} className={className} isSmall />
          </li>
        ))
      }
    </ul>
  );
}

export default FavoritesList;
