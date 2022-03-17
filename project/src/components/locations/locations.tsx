import { Link } from 'react-router-dom';

import { Cities } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { cityChange } from '../../store/action';

function Locations(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          Object.values(Cities).map((city) => (
            <li
              key={city}
              className="locations__item"
              onClick={() => dispatch(cityChange(city))}
            >
              <Link
                to=''
                className={`locations__item-link tabs__item ${currentCity === city && 'tabs__item--active'}`}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Locations;
