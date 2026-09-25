/* **************************** */
/* File: #src/app/RoleRoute.jsx */
/* **************************** */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const RoleRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for authentication state to be resolved.
  if (loading) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span>Loading...</span>
      </div>
    );
  }

  // No authenticated user.
  // ProtectedRoute normally handles this, but keeping this guard
  // makes RoleRoute safe to use independently.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Normalize the role so comparisons are consistent.
  const userRole = String(user.role || "").toUpperCase();

  const normalizedRoles = allowedRoles.map((role) =>
    String(role).toUpperCase()
  );

  // User does not have permission for this route.
  if (!normalizedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
