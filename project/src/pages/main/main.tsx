import { useState } from 'react';

import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Locations from '../../components/locations/locations';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';

import { Offer } from '../../types/offer';

import styles from './main.module.css';

type MainPageProps = {
  offers: Offer[];
  currentCity: string;
}

function Main({offers, currentCity}: MainPageProps): JSX.Element {
  const [selectedCard, setSelectedCard] = useState<number | undefined>(undefined);

  const onListCardHover = (id: number | undefined) => {
    setSelectedCard(id);
  };

  return (
    <>
      <Header />
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      <div className="cities">
        <div className={`cities__places-container container ${styles['cities__places-container']}`}>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {currentCity}</b>
            <Sort />
            <OffersList
              offers={offers}
              className="cities"
              isSmall={false}
              onListCardHover={onListCardHover}
            />
          </section>
          <div className="cities__right-section">
            <Map selectedPoint={selectedCard} className="cities__map" offers={offers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
