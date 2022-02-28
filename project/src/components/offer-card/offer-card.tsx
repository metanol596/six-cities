import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../const';

import { Offer } from '../../types/offer';

type PropsType = {
  offer: Offer;
  onOfferCardMouseEnter: (id: number) => void;
  activeCard: number;
  page: string;
}

function OfferCard({offer, page, onOfferCardMouseEnter, activeCard}: PropsType): JSX.Element {
  const {id, price, isPremium, isFavorite, imgPath, title, roomType} = offer;
  const favoriteClassName = 'place-card__bookmark-button button';

  const handleMouseEnter = () => {
    onOfferCardMouseEnter(id);
  };

  return (
    <article key={id} className={cn('place-card',
      {
        'cities__place-card': page === 'main',
        'favorites__card': page === 'favorites',
      })} onMouseEnter={handleMouseEnter}
    >
      <div className="place-card__mark" style={{display: `${isPremium ? 'block' : 'none'}`}}>
        <span>Premium</span>
      </div>
      <div className={cn('place-card__image-wrapper',
        {
          'cities__image-wrapper': page === 'main',
          'favorites__image-wrapper': page === 'favorites',
        })}
      >
        <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>
          <img className="place-card__image" src={imgPath} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className={cn('place-card__info',
        {
          'favorites__card-info': page === 'favorites',
        })}
      >
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
          <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>{title}</Link>
        </h2>
        <p className="place-card__type">{roomType}</p>
      </div>
    </article>
  );
}

export default OfferCard;
