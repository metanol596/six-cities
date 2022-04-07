import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { selectAuthorizationStatus } from '../../store/user-process/user-process';

import { logoutAction } from '../../store/api-actions';

import { getUser } from '../../services/user';

import { isAuth } from '../../utils';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const dispatch = useAppDispatch();

  const {avatarUrl, email} = getUser();

  const DEFAULT_AVATAR_URL = '../img/avatar.svg';
  const currentAvatarUrl = isAuth(authorizationStatus) ? avatarUrl : DEFAULT_AVATAR_URL;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active"
              to={AppRoute.Main}
              title="Main Page"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Favorites} title="Favorites"
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={{
                      backgroundImage: `url(${currentAvatarUrl})`,
                      borderRadius: '50%',
                    }}
                  >
                  </div>
                  {
                    isAuth(authorizationStatus) ?
                      <span className='header__user-name user__name'>{email}</span> :
                      <span className='header__login'>Sign in</span>
                  }
                </Link>
              </li>
              {
                isAuth(authorizationStatus) && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                      title="Sign out"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span
                        className="header__signout"
                      >
                        Sign out
                      </span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
