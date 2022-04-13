import { useState } from 'react';

import SortItem from '../sort-item/sort-item';

import { SortList } from '../../const';

import { useAppSelector } from '../../hooks';

import { selectSortType } from '../../store/offers-data/selectors';

function Sorts(): JSX.Element {
  const [visible, setVisible] = useState(false);

  const toggleSortBlock = () => {
    setVisible(!visible);
  };

  const sortType = useAppSelector(selectSortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span className="places__sorting-type" onClick={toggleSortBlock} tabIndex={0}>
        {sortType}{' '}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${visible && 'places__options--opened'}`}>
        {
          Object.values(SortList).map((sortItem) => (
            <SortItem
              key={sortItem}
              sortType={sortItem}
              toggleSortBlock={toggleSortBlock}
            />
          ))
        }
      </ul>
    </form>
  );
}

export default Sorts;
