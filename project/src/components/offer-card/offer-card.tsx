type Offer = {
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  imgPath: string;
  title: string;
  roomType: string;
}

function OfferCard({price, isPremium, isFavorite, imgPath, title, roomType}: Offer): JSX.Element {
  const favoriteClassName = 'place-card__bookmark-button button';

  return (
    <>
      <div className="place-card__mark" style={{display: `${isPremium ? 'block' : 'none'}`}}>
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img className="place-card__image" src={imgPath} width="260" height="200" alt="Place" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite ? `${favoriteClassName} place-card__bookmark-button--active` : `${favoriteClassName}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{title}</a>
        </h2>
        <p className="place-card__type">{roomType}</p>
      </div>
    </>
  );
}

export default OfferCard;
