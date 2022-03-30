import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

import { AppRoute } from '../../const';

import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <>
      <Header />
      <section className={styles.notFound}>
        <p className={styles.notFoundText}>404. Page not found</p>
        <Link className={styles.notFoundLink} to={AppRoute.Main}>Вернуться на главную</Link>
      </section>
    </>
  );
}

export default NotFound;
