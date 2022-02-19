import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/heaer';

function Layout ():JSX.Element {
  return (
    <Fragment>
      <Header />
      <main className="page__main page__main--index">
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Layout;
