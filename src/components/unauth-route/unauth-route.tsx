import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

import { useSelector } from '../../services/store';

type UnauthRouteProps = {
  children: ReactElement;
};

export const UnauthRoute = ({ children }: UnauthRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);
  if (!isAuthChecked) return <Preloader />;
  if (isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }
  return children;
};
