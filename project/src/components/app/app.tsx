import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../../hocs/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';

import { useAppSelector } from '../../hooks';

import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';

type AppPageProps = {
  offers: Offer[];
  comments: Comment[];
}

function App({offers, comments}: AppPageProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const filteredOffers = offers.filter(({city}) => city.name === currentCity);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              offers={filteredOffers}
              currentCity={currentCity}
            />
          }
        />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Room
              offers={filteredOffers}
              comments={comments}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
