/* src/features/auth/pages/ResetPassword.jsx */

import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
    return (
        <div className="reset-password-page">
            <div className="reset-password-card">

                <h1>Medical Management System</h1>

                <p>Create your new password.</p>

                <ResetPasswordForm />

            </div>
        </div>
    );
};

export default ResetPassword;
