/* ********************************* */
/* File: #src/app/ProtectedRoute.jsx */
/* ********************************* */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication state has been resolved.
  if (loading) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span>Loading...</span>
      </div>
    );
  }

  // User is not authenticated.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // User is authenticated.
  return <Outlet />;
};

export default ProtectedRoute;
