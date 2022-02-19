import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
//import Header from '../header/heaer';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferPage from '../../pages/offer-page/offer-page';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';

type Offer = {
  id: number;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  imgPath: string;
  title: string;
  roomType: string;
}

type AppPageProps = {
  offersCount: number;
  offers: Offer[];
}

function App({offersCount, offers}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<Main offersCount={offersCount} offers={offers} />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
