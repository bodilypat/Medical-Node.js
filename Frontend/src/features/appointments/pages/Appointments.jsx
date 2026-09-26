/* ******************************************************* */
/* File: #src/features/appointments/pages/Appointments.jsx */ 
/* ******************************************************* */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppointmentTable from "../components/AppointmentTable";
import AppointmentFilters from "../components/AppointmentFilters";
import AppointmentSummary from "../components/AppointmentSummary";
import useAppointments from "../hooks/useAppointments";

import {
  DEFAULT_APPOINTMENT_FILTERS,
} from "../constants/appointmentConstants";

const Appointments = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(
    DEFAULT_APPOINTMENT_FILTERS
  );

  const params = useMemo(
    () => ({
      ...filters,
    }),
    [filters]
  );

  const {
    appointments,
    loading,
    error,
    refetch,
  } = useAppointments(params);

  const resetFilters = () => {
    setFilters(DEFAULT_APPOINTMENT_FILTERS);
  };

  const handleView = (appointment) => {
    navigate(
      `/appointments/${appointment.id}`
    );
  };

  return (
    <section className="appointments-page">
      <header>
        <h1>Appointments</h1>
        <p>Manage all medical appointments.</p>
      </header>

      <AppointmentSummary
        appointments={appointments}
      />

      <AppointmentFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      {error && (
        <div className="error-state">
          <p>{error}</p>

          <button
            type="button"
            onClick={refetch}
          >
            Try Again
          </button>
        </div>
      )}

      <AppointmentTable
        appointments={appointments}
        loading={loading}
        onView={handleView}
      />
    </section>
  );
};

export default Appointments;
