// src/app/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../providers/AuthProvider";
import ProtectedRoute from "../routes/ProtectedRoute";

/* Layout */
import MainLayout from "../layout/MainLayout";

/* Pages */
import Login from "../../features/auth/pages/Login";
import Dashboard from "../../features/dashboard/pages/AdminDashboard" ;
import Patients from "../../features/patients/pages/PatientList";
import Doctors from "../../features/doctors/pages/DoctorList";
import Appointments from "../../features/appointments/pages/AppointmentList";
import Billing from "../../features/billing/pages/InvoiceList";
import Pharmacy from "../../features/pharmacy/pages/Pharmacy";
import NotFound from "../../features/not-found/NotFound";

import "../assets/styles/global.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}   
                    <Route path="/login" element={<Login />} />

                    {/* Protected Route */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/appointments" element={<Appointments />} />
                            <Route path="/billing" element={<Billing />} />
                            <Route path="/pharmacy" element={<Pharmacy />} />
                        </Route>
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>    
            </BrowserRouter>
        </AuthProvider>
    );
}
export default App; 
