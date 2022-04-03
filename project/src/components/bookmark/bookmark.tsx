import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const';

import { useAppSelector } from '../../hooks';

import { selectAuthorizationStatus } from '../../store/user-process/user-process';

import { isAuth } from '../../utils';

type PropsType = {
  isFavorite: boolean | undefined;
  className: string;
}

function Bookmark({isFavorite, className}: PropsType): JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const iconWidth = className === 'place-card' ? '18' : '31';
  const iconHeight = className === 'place-card' ? '19' : '33';

  return (
    <button
      className={cn(`${className}__bookmark-button`, 'button', {
        'place-card__bookmark-button--active': isFavorite && className === 'place-card',
        'property__bookmark-button--active' : isFavorite && className === 'property',
      })}
      type="button"
      onClick={() => {
        if (!isAuth(authorizationStatus)) {
          navigate(AppRoute.Login);
        }
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
      <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
