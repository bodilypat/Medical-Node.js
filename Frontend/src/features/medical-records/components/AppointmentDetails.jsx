/* ****************************************************************** */
/* File: #src/features/appointments/components/AppointmentDetails.jsx */ 
/* ****************************************************************** */

import AppointmentStatus from "./AppointmentStatus";

const AppointmentDetails = ({ appointment }) => {
  if (!appointment) {
    return null;
  }

  const patient = appointment.patient;
  const doctor = appointment.doctor;
  const formatName = (person) =>
    [person?.firstName, person?.lastName].filter(Boolean).join(" ") || "-";
  const formatValue = (value) =>
    value === null || value === undefined || value === "" ? "-" : value;

  return (
    <section className="appointment-details">
      <header>
        <h2>Appointment Details</h2>

        <AppointmentStatus
          status={appointment.status}
        />
      </header>

      <dl>
        <dt>Patient</dt>
        <dd>{formatName(patient)}</dd>

        <dt>Doctor</dt>
        <dd>{formatName(doctor)}</dd>

        <dt>Date</dt>
        <dd>{formatValue(appointment.appointmentDate)}</dd>

        <dt>Time</dt>
        <dd>{formatValue(appointment.appointmentTime)}</dd>

        <dt>Type</dt>
        <dd>{formatValue(appointment.type)}</dd>

        <dt>Reason</dt>
        <dd>{formatValue(appointment.reason)}</dd>

        <dt>Notes</dt>
        <dd>{formatValue(appointment.notes)}</dd>
      </dl>
    </section>
  );
};

export default AppointmentDetails;
