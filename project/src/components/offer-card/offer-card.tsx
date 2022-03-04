import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import Bookmark from '../bookmark/bookmark';
import Badge from '../badge/badge';

import { AppRoute } from '../../const';

import { Offer } from '../../types/offer';

type PropsType = {
  offer: Offer;
  className: string;
  onOfferCardMouseEnter: (id: number) => void;
  isSmall?: boolean;
}

function OfferCard({offer, className, onOfferCardMouseEnter, isSmall}: PropsType): JSX.Element {
  const {id, price, isPremium, isFavorite, imgPath, title, roomType} = offer;

  const imgWidth = !isSmall ? '260' : '150';
  const imgHeight = !isSmall ? '200' : '110';

  return (
    <article key={id} className={cn('place-card',
      {
        'cities__place-card': className === 'cities',
        'favorites__card': className === 'favorites',
      })} onMouseEnter={() => {onOfferCardMouseEnter(id);}}
    >
      {isPremium && <Badge text='Premium' className='place-card' />}
      <div className={cn('place-card__image-wrapper',
        {
          'cities__image-wrapper': className === 'cities',
          'favorites__image-wrapper': className === 'favorites',
        })}
      >
        <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>
          <img className="place-card__image" src={imgPath} width={imgWidth} height={imgHeight} alt="Place" />
        </Link>
      </div>
      <div className={cn('place-card__info', {'favorites__card-info': className === 'favorites'})}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isFavorite={isFavorite} />
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
