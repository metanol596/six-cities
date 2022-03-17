import cn from 'classnames';

type PropsType = {
  isFavorite: boolean;
  className: string;
}

function Bookmark({isFavorite, className}: PropsType): JSX.Element {
  const iconWidth = className === 'place-card' ? '18' : '31';
  const iconHeight = className === 'place-card' ? '19' : '33';

  return (
    <button className={cn(`${className}__bookmark-button`, 'button', {
      'place-card__bookmark-button--active': isFavorite && className === 'place-card',
      'property__bookmark-button--active' : isFavorite && className === 'property',
    })} type="button"
    >
      <svg
        className={
          cn({
            'place-card__bookmark-icon': className === 'place-card',
            'property__bookmark-icon': className === 'property',
          })
        }
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
