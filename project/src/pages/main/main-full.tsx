import { useState } from 'react';

import Sort from '../../components/sorts/sorts';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import OffersList from '../../components/offers-list/offers-list';

import { isCheckedAuth, isPending } from '../../utils';

import { useAppSelector } from '../../hooks';

import { selectAuthorizationStatus } from '../../store/user-process/user-process';
import { selectCity, selectOffersFetchStatus } from '../../store/offers-data/offers-data';

import { Offer } from '../../types/offer';

import styles from './main.module.css';

type PropsType = {
  offers: Offer[];
}

function MainFull({offers}: PropsType) {
  const [selectedCard, setSelectedCard] = useState<number | undefined>(undefined);

  const onListCardHover = (id: number | undefined) => {
    setSelectedCard(id);
  };

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const fetchOffersStatus = useAppSelector(selectOffersFetchStatus);
  const currentCity = useAppSelector(selectCity);
  const filteredOffers = offers.filter(({city}) => city.name === currentCity);

  return (
    <div className="cities">
      {
        (isCheckedAuth(authorizationStatus) || isPending(fetchOffersStatus)) ? <Spinner />
          : (
            <div className={`cities__places-container container ${styles.citiesPlacesContainer}`}>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>
                <Sort />
                <OffersList
                  offers={filteredOffers}
                  className="cities"
                  isSmall={false}
                  onListCardHover={onListCardHover}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  offers={filteredOffers}
                  selectedPoint={selectedCard}
                />
              </div>
            </div>
          )
      }
    </div>
  );
}

export default MainFull;
