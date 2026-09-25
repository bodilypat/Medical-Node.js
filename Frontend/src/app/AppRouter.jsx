/* **************************** */
/* File: #src/app/AppRouter.jsx */
/* **************************** */

import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Auth
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

// Admin
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminDoctors from "../features/admin/pages/Doctors";
import AdminAppointments from "../features/admin/pages/Appointments";
import AdminReports from "../features/admin/pages/Reports";

// Doctor
import DoctorDashboard from "../features/doctors/pages/Dashboard";
import DoctorAppointments from "../features/doctors/pages/MyAppointments";
import DoctorPatients from "../features/doctors/pages/Patients";
import DoctorMedicalRecords from "../features/doctors/pages/MedicalRecords";
import DoctorPrescriptions from "../features/doctors/pages/Prescriptions";

// Patient
import PatientDashboard from "../features/patients/pages/Patients";
import PatientAppointments from "../features/appointments/pages/Appointments";
import PatientMedicalRecords from "../features/medical-records/pages/MedicalRecords";
import PatientPrescriptions from "../features/prescriptions/pages/Prescriptions";
import PatientBilling from "../features/billing/pages/PatientBilling";

// Shared
import NotFound from "../components/feedback/ErrorState";

const ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
};

function AppRouter() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
        </Route>
      </Route>

      {/* =====================================================
          DOCTOR ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={[ROLES.DOCTOR]} />}>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="patients" element={<DoctorPatients />} />
            <Route
              path="medical-records"
              element={<DoctorMedicalRecords />}
            />
            <Route
              path="prescriptions"
              element={<DoctorPrescriptions />}
            />
          </Route>
        </Route>
      </Route>

      {/* =====================================================
          PATIENT ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={[ROLES.PATIENT]} />}>
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route
              path="medical-records"
              element={<PatientMedicalRecords />}
            />
            <Route
              path="prescriptions"
              element={<PatientPrescriptions />}
            />
            <Route path="billing" element={<PatientBilling />} />
          </Route>
        </Route>
      </Route>

      {/* =====================================================
          ROOT
      ===================================================== */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =====================================================
          404
      ===================================================== */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
