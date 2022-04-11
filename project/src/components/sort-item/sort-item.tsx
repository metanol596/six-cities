import { useAppDispatch, useAppSelector } from '../../hooks';

import { sortChange } from '../../store/offers-process/offers-process';

import { selectSortType } from '../../store/offers-process/selectors';

type PropsType = {
  sortType: string;
  toggleSortBlock: () => void;
}

function SortItem({sortType, toggleSortBlock}: PropsType): JSX.Element {
  const currentSort = useAppSelector(selectSortType);

  const dispatch = useAppDispatch();

  return (
    <li
      className={`places__option ${currentSort === sortType && 'places__option--active'}`}
      tabIndex={0}
      onClick={
        () => {
          dispatch(sortChange(sortType));
          toggleSortBlock();
        }
      }
    >
      {sortType}
    </li>
  );
}

export default SortItem;
