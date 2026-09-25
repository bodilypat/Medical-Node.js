/* ************************************* */
/* File: src/features/auth/hooks/useAuth.js */
/* ************************************* */

import { useMemo } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
    const {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshUser,
    } = useAuthStore((state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login: state.login,
        logout: state.logout,
        refreshUser: state.refreshUser,
    }));

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles = []) => {
        return roles.includes(user?.role);
    };

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission);
    };

    const hasAnyPermission = (permissions = []) => {
        return permissions.some((permission) =>
            user?.permissions?.includes(permission)
        );
    };

    const auth = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            loading,
            login,
            logout,
            refreshUser,
            hasRole,
            hasAnyRole,
            hasPermission,
            hasAnyPermission,
        }),
        [
            user,
            token,
            isAuthenticated,
            loading,
            login,
            logout,
            refreshUser,
        ]
    );

    return auth;
};
