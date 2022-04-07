import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

import { AppRoute } from '../../const';

import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <>
      <Header />
      <section className={styles.notFound}>
        <p className={styles.notFoundText}>Page not found</p>
        <Link className={styles.notFoundLink} to={AppRoute.Main}>To the main page</Link>
      </section>
    </>
  );
}

export default NotFound;
