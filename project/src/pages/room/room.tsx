import {useState} from 'react';
import {useParams} from 'react-router-dom';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Badge from '../../components/badge/badge';
import Bookmark from '../../components/bookmark/bookmark';
import OffersList from '../../components/offers-list/offers-list';

import {getRatePercent} from '../../utils';

import {Offer} from '../../types/offer';
import {Comment} from '../../types/comment';

type PropsType = {
  offers: Offer[];
  comments: Comment[];
}

function Room({offers, comments}: PropsType):JSX.Element {
  const {id} = useParams();
  const offerId = Number(id);
  const currentOfferIndex = offers.findIndex((offer) => offer.id === offerId);
  const currentOffer = offers[currentOfferIndex];
  // eslint-disable-next-line no-console
  console.log(currentOffer);

  const {
    images,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = currentOffer;

  const {name, isPro, avatarUrl} = host;

  const nearbyOffers = offers.filter((offer) => offer.id !== offerId);

  const [selectedCard, setSelectedCard] = useState<number | undefined>(undefined);

  const onListCardHover = (cardId: number | undefined) => {
    setSelectedCard(cardId);
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <Badge text='Premium' className='property__mark' />}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <Bookmark isFavorite={isFavorite} className='property' />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatePercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((item) => (
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  <span className="property__user-status">
                    {isPro}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ReviewsList comments={comments} />
                <ReviewsForm />
              </section>
            </div>
          </div>
          <Map className="property__map" offers={nearbyOffers} selectedPoint={selectedCard} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              className='near'
              isSmall={false}
              onListCardHover={onListCardHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
