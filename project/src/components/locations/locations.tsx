import cn from 'classnames';

import { cities } from '../../const';

function Locations(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => (
            <li key={city} className="locations__item">
              <a className={cn('locations__item-link', 'tabs__item',
                {
                  'tabs__item--active': city === 'Amsterdam',
                })} href="/#"
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
