/* ******************************************************** */
/* File: src/features/auth/components/ResetPasswordForm.jsx */
/* ******************************************************** */

import React from "react";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordForm = () => {

    const {

        form,

        loading,

        error,

        success,

        handleChange,

        handleSubmit,

        backToLogin,

    } = useResetPassword();

    return (

        <form
            className="reset-password-form"
            onSubmit={handleSubmit}
        >

            <h2>Reset Password</h2>

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}

            {success && (

                <div className="success-message">
                    {success}
                </div>

            )}

            <input
                type="password"
                name="password"
                placeholder="New Password"
                value={form.password}
                onChange={handleChange}
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
            />

            <button
                type="submit"
                disabled={loading}
            >

                {loading
                    ? "Resetting..."
                    : "Reset Password"}

            </button>

            <button
                type="button"
                onClick={backToLogin}
            >
                Back to Login
            </button>

        </form>

    );

};

export default ResetPasswordForm;
