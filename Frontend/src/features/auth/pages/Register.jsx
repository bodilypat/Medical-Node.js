/* src/features/auth/pages/Register.jsx */

import React from "react";
import RegisterForm from "../components/RegisterForm";
import "../styles/Register.css";

const Register = () => {
    return (
        <div className="register-page">
            <div className="register-card">
                <h1>Medical Management System</h1>

                <p>Create your account</p>

                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
