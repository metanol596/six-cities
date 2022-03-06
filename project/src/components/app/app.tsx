import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../../hocs/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';

type AppPageProps = {
  offersCount: number;
  offers: Offer[];
}

function App({offersCount, offers}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main offersCount={offersCount} offers={offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
