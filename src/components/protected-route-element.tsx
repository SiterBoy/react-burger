import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

interface Props {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

const ProtectedRouteElement: React.FC<Props> = ({ onlyUnAuth = false, children }) => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRouteElement; 