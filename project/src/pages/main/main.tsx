import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Locations from '../../components/locations/locations';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';

import { Offer } from '../../types/offer';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
}

function Main({offersCount, offers}: MainPageProps): JSX.Element {
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
            <OffersList offers={offers} className="cities" isSmall={false} />
          </section>
          <div className="cities__right-section">
            <Map className="cities__map" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
