import cn from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import {  toggleFavoriteStatusAction } from '../../store/api-actions';

import { selectAuthorizationStatus } from '../../store/user-process/selectors';

import { checkAuthorizatrion } from '../../utils';

type PropsType = {
  id: number;
  isFavorite: boolean | undefined;
  className: string;
}

function Bookmark({id, isFavorite, className}: PropsType): JSX.Element {
  const navigate = useNavigate();
  const [isFavoriteState, setFavoriteState] = useState(isFavorite);

  const toggleFavoriteState = () => {
    setFavoriteState(!isFavoriteState);
  };

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const iconWidth = className === 'place-card' ? '18' : '31';
  const iconHeight = className === 'place-card' ? '19' : '33';

  return (
    <button
      className={`${className}__bookmark-button button ${isFavoriteState && `${className}__bookmark-button--active`}`}
      type="button"
      onClick={() => {
        if (!checkAuthorizatrion(authorizationStatus)) {
          navigate(AppRoute.Login);
        }

        dispatch(toggleFavoriteStatusAction({id, status: Number(!isFavoriteState)}));
        toggleFavoriteState();
      }}
    >
      <svg
        className={
          cn({
            'place-card__bookmark-icon': className === 'place-card',
            'property__bookmark-icon': className === 'property',
          })
        }
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavoriteState ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
