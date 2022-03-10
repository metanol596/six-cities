import OfferCard from '../../components/offer-card/offer-card';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  className: string;
  isSmall?: boolean;
  onListCardHover: (id: number) => void;
}

function OffersList({offers, className, isSmall, onListCardHover}: PropsType):JSX.Element {
  const handleOfferCardMouseEnter = (id: number) => {
    onListCardHover(id);
  };

  const handleOfferCardMouseLeave = () => {
    onListCardHover(0);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
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
