import { useState } from 'react';
import cn from 'classnames';

import OfferCard from '../../components/offer-card/offer-card';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  className: string;
  isSmall?: boolean;
}

function OffersList({offers, className, isSmall}: PropsType):JSX.Element {
  const [, setActiveOfferCard] = useState(0);

  const handleOfferCardMouseEnter = (id: number) => {
    setActiveOfferCard(id);
  };

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
            className={className}
            isSmall={isSmall}
          />
        ))
      }
    </div>
  );
}

export default OffersList;
