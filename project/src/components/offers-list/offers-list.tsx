import { useState } from 'react';

import OfferCard from '../../components/offer-card/offer-card';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  page: string;
}

function OffersList({offers, page = 'main'}: PropsType):JSX.Element {
  const [activeOfferCard, setActiveOfferCard] = useState(0);

  const handleOfferCardMouseEnter = (id: number) => {
    setActiveOfferCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <OfferCard key={offer.id}
            offer={offer}
            onOfferCardMouseEnter={handleOfferCardMouseEnter}
            activeCard={activeOfferCard}
            page={page}
          />))
      }
    </div>
  );
}

export default OffersList;
