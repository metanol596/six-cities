import Header from '../../components/header/header';
import FavoritesFull from './favorites-full';
import FavoritesEmpty from './favorites-empty';

function Favorites():JSX.Element {
  const isFavoritesEmpty = 1; // не придумал условие

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isFavoritesEmpty ? <FavoritesEmpty /> : <FavoritesFull />}
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
