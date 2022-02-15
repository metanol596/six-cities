import Main from '../main/main';
import Header from '../header/heaer';

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
    <>
      <Header />
      <Main
        offersCount={offersCount}
        offers={offers}
      />
    </>
  );
}

export default App;
