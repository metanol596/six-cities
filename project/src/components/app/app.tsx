import Main from '../main/main';
import Header from '../header/heaer';

type City = {
  id: number;
  label: string;
  isActive: boolean;
}

type AppPageProps = {
  offersCount: number;
  cities: City[];
}

function App({offersCount, cities}: AppPageProps): JSX.Element {
  return (
    <>
      <Header />
      <Main
        offersCount={offersCount}
        cities={cities}
      />
    </>
  );
}

export default App;
