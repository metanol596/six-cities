import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

import { AppRoute } from '../../const';

import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <>
      <Header />
      <section className={styles.notFound}>
        <p className={styles.notFound__text}>404. Page not found</p>
        <Link className={styles.notFound__link} to={AppRoute.Main}>Вернуться на главную</Link>
      </section>
    </>
  );
}

export default NotFound;
