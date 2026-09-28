/* *************************************************************** */
/* File: #src/features/appointments/components/AppointmentCard.jsx */ 
/* *************************************************************** */

import AppointmentStatus from "./AppointmentStatus";

const AppointmentCard = ({
  appointment,
  onClick,
}) => {
  const patient = appointment?.patient;
  const doctor = appointment?.doctor;
  const patientName = [patient?.firstName, patient?.lastName]
    .filter(Boolean)
    .join(" ") || "Unknown patient";
  const doctorName = [doctor?.firstName, doctor?.lastName]
    .filter(Boolean)
    .join(" ") || "-";

  const handleKeyDown = (event) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(appointment);
    }
  };

  return (
    <article
      className="appointment-card"
      onClick={() => onClick?.(appointment)}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Appointment for ${patientName}` : undefined}
    >
      <div className="appointment-card__header">
        <strong>{patientName}</strong>

        <AppointmentStatus
          status={appointment?.status}
        />
      </div>

      <div className="appointment-card__body">
        <p>
          <strong>Doctor:</strong>{" "}
          {doctorName}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {appointment?.appointmentDate || "-"}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {appointment?.appointmentTime || "-"}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {appointment?.type || "-"}
        </p>
      </div>
    </article>
  );
};

export default AppointmentCard;
