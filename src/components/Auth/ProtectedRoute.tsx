import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserType } from './types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { state } = useAuth();

  // Show loading spinner only in main content area
  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-primary text-xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(state.user?.userType as UserType)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;