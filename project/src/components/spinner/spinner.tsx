import cn from 'classnames';

import styles from './spinner.module.css';

type PropsType = {
  className?: string;
}

function Spinner({className}: PropsType): JSX.Element {
  return (
    <>
      <div className={cn(styles['loadingio-spinner-spinner-9ecgq5xjpn6'], {
        [styles['small-spinner']]: className === 'small',
      })}
      >
        <div className={cn(styles['ldio-exa0pmmy6su'])}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <style type="text/css">
      </style>
    </>
  );
}

export default Spinner;
