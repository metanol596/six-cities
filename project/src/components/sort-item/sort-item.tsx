import { useAppDispatch, useAppSelector } from '../../hooks';

import { sortChange } from '../../store/action';

type PropsType = {
  sortType: string;
  toggleSortBlock: () => void;
}

function SortItem({sortType, toggleSortBlock}: PropsType): JSX.Element {
  const currentSort = useAppSelector((state) => state.sortType);

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
