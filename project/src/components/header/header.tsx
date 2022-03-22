import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { logoutAction } from '../../store/api-actions';

function Header (): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  const isAuth = () => authorizationStatus === AuthorizationStatus.Auth;

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
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {
                    isAuth() ?
                      <span className='header__user-name user__name'>Oliver.conner@gmail.com</span> :
                      <span className='header__login'>Sign in</span>
                  }
                </Link>
              </li>
              {
                isAuth() && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                      title="Sign out"
                      onClick={() => dispatch(logoutAction())}
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
