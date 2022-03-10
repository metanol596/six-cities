import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type PropsType = {
  offers: Offer[];
  className: string;
}

type Accumulator = {
  [propertyKey: string]: Offer[];
};

const transformOffers = (offers: Offer[]) => offers.reduce((transformedOffers: Accumulator, offer) => {
  if (offer.city.name in transformedOffers) {
    transformedOffers[offer.city.name].push(offer);
    return transformedOffers;
  }

  transformedOffers[offer.city.name] = [offer];
  return transformedOffers;
}, {});

function FavoritesList({offers, className}: PropsType): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupedOffers = transformOffers(favoriteOffers);

  return (
    <ul className="favorites__list">
      {
        Object.entries(groupedOffers).map(([city, cityOffers]) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {
                cityOffers.map((cityOffer) => (
                  <OfferCard
                    key={cityOffer.id}
                    offer={cityOffer}
                    className={className}
                    isSmall
                  />
                ))
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default FavoritesList;
