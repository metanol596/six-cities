import { Routes, Route } from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';

import PrivateRoute from '../../hocs/private-route/private-route';

import { AppRoute } from '../../const';


import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Room />
          }
        />
        <Route path="offer" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
