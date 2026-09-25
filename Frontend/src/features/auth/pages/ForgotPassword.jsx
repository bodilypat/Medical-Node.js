/* src/features/auth/pages/ForgotPassword.jsx */

import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">

                <h1>Medical Management System</h1>

                <p>
                    Enter your registered information to recover your password.
                </p>

                <ForgotPasswordForm />

            </div>
        </div>
    );
};

export default ForgotPassword;
