import cn from 'classnames';

import OfferCard from '../../components/offer-card/offer-card';
import { SortsList } from '../../const';

import { useAppSelector } from '../../hooks';

import { Offer } from '../../types/offer';

import { sortOffers } from '../../utils';

type PropsType = {
  offers: Offer[];
  className: string;
  isSmall?: boolean;
  onListCardHover: (id: number | undefined) => void;
}

function OffersList({offers, className, isSmall, onListCardHover}: PropsType):JSX.Element {
  const handleOfferCardMouseEnter = (id: number) => {
    onListCardHover(id);
  };

  const handleOfferCardMouseLeave = (id: number | undefined) => {
    onListCardHover(id);
  };

  const sortType = useAppSelector((state) => state.sortType);

  const sortedOffers = sortOffers(offers, SortsList, sortType);

  return (
    <div className={cn('places__list', {
      'cities__places-list tabs__content': className === 'cities',
      'near-places__list': className === 'near',
    })}
    >
      {
        sortedOffers.map((offer) => (
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
