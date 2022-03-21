import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { requireAuthorization } from '../../store/action';

function Header (): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
                  to={authorizationStatus === AuthorizationStatus.Auth ? AppRoute.Favorites : AppRoute.Login} title="Favorites"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className={authorizationStatus === AuthorizationStatus.Auth ? 'header__user-name user__name' : 'header__login'}>{authorizationStatus === AuthorizationStatus.Auth ? 'Oliver.conner@gmail.com' : 'Sign in'}</span>
                </Link>
              </li>
              {
                authorizationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login} title="Sign out">
                      <span
                        className="header__signout"
                        onClick={() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))}
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
