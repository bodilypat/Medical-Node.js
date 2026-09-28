/* ******************************************************* */
/* File: #src/features/appointments/pages/Appointments.jsx */ 
/* ******************************************************* */

import { useCallback, useMemo, useState } from "react";
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

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_APPOINTMENT_FILTERS);
  }, []);

  const handleView = useCallback((appointment) => {
    if (!appointment?.id) return;

    navigate(
      `/appointments/${appointment.id}`
    );
  }, [navigate]);

  return (
    <section className="appointments-page">
      <header>
        <h1>Appointments</h1>
        <p>Manage all medical appointments.</p>
      </header>

      <AppointmentFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      {!loading && !error && appointments?.length > 0 && (
        <AppointmentSummary appointments={appointments} />
      )}

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
        appointments={appointments ?? []}
        loading={loading}
        onView={handleView}
      />
    </section>
  );
};

export default Appointments;
