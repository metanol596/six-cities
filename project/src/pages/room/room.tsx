import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Badge from '../../components/badge/badge';
import Bookmark from '../../components/bookmark/bookmark';
import OffersList from '../../components/offers-list/offers-list';
import Spinner from '../../components/spinner/spinner';
import NotFound from '../not-found/not-found';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchOfferAction, fetchNearbyOffersAction } from '../../store/offers-process/offers-process';
import {
  selectNearbyOffers,
  selectNearbyOffersStatus,
  selectOffer,
  selectOfferStatus
} from '../../store/offers-process/selectors';
import { selectComments } from '../../store/offer-data/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

import {
  fetchCommentsAction
} from '../../store/api-actions';

import {
  getRatePercent,
  checkAuthorizatrion,
  toUpperCaseFirstChar
} from '../../utils';

import { FetchStatus } from '../../const';

function Room():JSX.Element | null {
  const {id} = useParams();
  const offerId = Number(id);

  const dispatch = useAppDispatch();

  const offer = useAppSelector(selectOffer);
  const offerStatus = useAppSelector(selectOfferStatus);

  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const nearbyOffersStatus = useAppSelector(selectNearbyOffersStatus);

  const comments = useAppSelector(selectComments);

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearbyOffersAction(offerId));
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  if (offerStatus === FetchStatus.Pending) {
    return <Spinner />;
  }

  if (offerStatus === FetchStatus.Failed) {
    return <NotFound />;
  }

  if (!offer || !nearbyOffers || !comments) {
    return null;
  }

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
  } = offer;

  const newType = toUpperCaseFirstChar(type);

  const {name, isPro, avatarUrl} = host;

  const slicedImages = images.slice(0, 6);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {slicedImages.map((image) => (
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
                <Bookmark id={offerId} isFavorite={isFavorite} className='property' />
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
                  {newType}
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
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
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
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewsList comments={comments} />
                {checkAuthorizatrion(authorizationStatus) && <ReviewsForm offerId={offerId} />}
              </section>
            </div>
          </div>
          <Map
            className="property__map"
            offers={[...nearbyOffers, offer]}
            selectedPoint={offerId}
          />
        </section>
        <div className="container">
          {nearbyOffersStatus === FetchStatus.Failed && (<p>Something went wrong. Please, reload the page</p>)}
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              className='near'
              isSmall={false}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
