import FavoritesList from '../../components/favorites-list/favorites-list';

import { Offer } from '../../types/offer';

type PropsType = {
  favoritesOffers: Offer[];
}

function FavoritesFull({favoritesOffers}: PropsType) {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoritesList className="favorites" favoritesOffers={favoritesOffers} />
    </section>
  );
}

export default FavoritesFull;
