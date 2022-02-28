import { Link } from 'react-router-dom';

import Header from '../../components/header/heaer';

import { AppRoute } from '../../const';

import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header />
      <section className="not-found-error">
        <p className="not-found-error__text">404. Page not found</p>
        <Link className="not-found-error__link" to={ AppRoute.Main }>Вернуться на главную</Link>
      </section>
    </>
  );
}

export default NotFoundPage;
