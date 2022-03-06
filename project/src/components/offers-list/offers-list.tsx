import { useState } from 'react';
import cn from 'classnames';

import OfferCard from '../../components/offer-card/offer-card';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  favoriteCity?: string;
  className: string;
  isSmall?: boolean;
}

function OffersList({offers, favoriteCity, className, isSmall}: PropsType):JSX.Element {
  const [, setActiveOfferCard] = useState(0);

  const handleOfferCardMouseEnter = (id: number) => {
    setActiveOfferCard(id);
  };

  const handleOfferCardMouseLeave = () => {
    setActiveOfferCard(0);
  };

  if (isSmall) {
    offers = offers.filter((item) => item.city === favoriteCity);
  }

  return (
    <div className={cn({
      'cities__places-list places__list tabs__content': className === 'cities',
      'favorites__places': className === 'favorites',
    })}
    >
      {
        offers.map((offer) => (
          <OfferCard key={offer.id}
            offer={offer}
            onOfferCardMouseEnter={handleOfferCardMouseEnter}
            onOfferCardMouseLeave={handleOfferCardMouseLeave}
            className={className}
            isSmall={isSmall}
          />
        ))
      }
    </div>
  );
}

export default OffersList;
