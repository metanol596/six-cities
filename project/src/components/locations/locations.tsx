import { MouseEvent } from 'react';

import { CITIES } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { cityChange } from '../../store/action';

function Locations(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li
              key={city}
              className="locations__item"
            >
              <a
                href='/#'
                className={`locations__item-link tabs__item ${currentCity === city && 'tabs__item--active'}`}
                onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
                  evt.preventDefault();
                  dispatch(cityChange(city));
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Locations;
