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
        <dd>
          {patient?.firstName} {patient?.lastName}
        </dd>

        <dt>Doctor</dt>
        <dd>
          {doctor?.firstName} {doctor?.lastName}
        </dd>

        <dt>Date</dt>
        <dd>{appointment.appointmentDate}</dd>

        <dt>Time</dt>
        <dd>{appointment.appointmentTime}</dd>

        <dt>Type</dt>
        <dd>{appointment.type || "-"}</dd>

        <dt>Reason</dt>
        <dd>{appointment.reason || "-"}</dd>

        <dt>Notes</dt>
        <dd>{appointment.notes || "-"}</dd>
      </dl>
    </section>
  );
};

export default AppointmentDetails;
