import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import { selectAuthorizationStatus } from '../../store/user-process/user-process';

import { AppRoute, AuthorizationStatus } from '../../const';

type PropsType = {
  children: JSX.Element;
};

function PrivateRoute({children}: PropsType): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
