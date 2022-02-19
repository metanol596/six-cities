import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="not-found-error">
      <p className="not-found-error__text">404. Page not found</p>
      <Link className="not-found-error__link" to={ AppRoute.Main }>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
