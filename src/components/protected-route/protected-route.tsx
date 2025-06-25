import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);
  if (!isAuthChecked) return <Preloader />;
  if (!isAuthenticated)
    return <Navigate replace to='/login' state={{ from: location }} />;
  return children;
};
