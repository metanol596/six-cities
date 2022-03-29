import { useState } from 'react';

import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Locations from '../../components/locations/locations';
import Sort from '../../components/sorts/sorts';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';

import { useAppSelector } from '../../hooks';

import { isCheckedAuth } from '../../utils';

import styles from './main.module.css';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const filteredOffers = offers.filter(({city}) => city.name === currentCity);

  const [selectedCard, setSelectedCard] = useState<number | undefined>(undefined);

  const onListCardHover = (id: number | undefined) => {
    setSelectedCard(id);
  };

  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  return (
    <>
      <Header />
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      <div className="cities">
        {
          (isCheckedAuth(authorizationStatus) || !isDataLoaded) ? <Spinner />
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
    </>
  );
}

export default Main;
