/* **************************************************** */
/* File: #src/features/doctors/pages/MyAppointments.jsx */ 
/* **************************************************** */

import { useMemo, useState } from "react";

import AppointmentTable from "../components/appointments/AppointmentTable";
import AppointmentFilters from "../components/appointments/AppointmentFilters";
import useMyAppointments from "../hooks/useMyAppointments";

const MyAppointments = () => {
  const [filters, setFilters] = useState({});

  const params = useMemo(
    () => ({ ...filters }),
    [filters]
  );

  const {
    appointments,
    loading,
    error,
    refetch,
  } = useMyAppointments(params);

  if (error) {
    return (
      <section>
        <h1>My Appointments</h1>
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="doctor-appointments-page">
      <header>
        <h1>My Appointments</h1>
        <p>Manage your scheduled patient appointments.</p>
      </header>

      <AppointmentFilters
        filters={filters}
        onChange={setFilters}
      />

      <AppointmentTable
        appointments={appointments}
        loading={loading}
      />
    </section>
  );
};

export default MyAppointments;
