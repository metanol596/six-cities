import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import MainFull from './main-full';
import MainEmpty from './main-empty';

import { useAppSelector } from '../../hooks';

import { selectOffers } from '../../store/offers-data/offers-data';

function Main(): JSX.Element {
  const offers = useAppSelector(selectOffers);

  const isOffers = offers.length === 0;

  return (
    <>
      <Header />
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      {isOffers ? <MainEmpty /> : <MainFull offers={offers} />}
    </>
  );
}

export default Main;
