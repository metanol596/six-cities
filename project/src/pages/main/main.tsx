import { useState } from 'react';

import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Locations from '../../components/locations/locations';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';

import { City, Offer } from '../../types/offer';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
  city: City;
}

function Main({offersCount, offers, city}: MainPageProps): JSX.Element {
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
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            <Sort />
            <OffersList
              offers={offers}
              className="cities"
              isSmall={false}
              onListCardHover={onListCardHover}
            />
          </section>
          <div className="cities__right-section">
            <Map selectedPoint={selectedCard} className="cities__map" offers={offers} city={city} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
