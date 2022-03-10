import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../../hocs/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';
import { City, Offer } from '../../types/offer';

type AppPageProps = {
  offersCount: number;
  offers: Offer[];
  city: City;
}

function App({offersCount, offers, city}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main offersCount={offersCount} offers={offers} city={city} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Room city={city} offers={offers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
