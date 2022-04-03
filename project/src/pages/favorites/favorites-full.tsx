import FavoritesList from '../../components/favorites-list/favorites-list';

function FavoritesFull() {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoritesList className="favorites" />
    </section>
  );
}

export default FavoritesFull;
