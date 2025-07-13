import React from 'react';
import { Navigate } from 'react-router-dom';

interface ResetPasswordGuardProps {
  children: React.ReactNode;
}

const ResetPasswordGuard: React.FC<ResetPasswordGuardProps> = ({
  children,
}) => {
  const wasOnForgotPassword = localStorage.getItem('canReset') === '1';

  if (!wasOnForgotPassword) {
    return <Navigate to='/forgot-password' replace />;
  }

  return <>{children}</>;
};

export default ResetPasswordGuard;
