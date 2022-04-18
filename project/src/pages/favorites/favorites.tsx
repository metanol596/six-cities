import { useEffect } from 'react';

import Header from '../../components/header/header';
import FavoritesEmpty from './favorites-empty';
import FavoritesFull from './favorites-full';
import Spinner from '../../components/spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { selectFavoritesOffers, selectFavoritesOffersStatus } from '../../store/offers-process/selectors';
import { fetchFavoritesOffers } from '../../store/offers-process/offers-process';

import { FetchStatus } from '../../const';

function Favorites():JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector(selectFavoritesOffers);
  const isFavoritesOffersLoaded = useAppSelector(selectFavoritesOffersStatus);

  const isFavoritesOffers = favoritesOffers.length === 0;

  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  if (isFavoritesOffersLoaded === FetchStatus.Pending) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isFavoritesOffers ? <FavoritesEmpty /> : <FavoritesFull favoritesOffers={favoritesOffers} />}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
