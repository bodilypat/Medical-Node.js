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

  return (
    <article
      className="appointment-card"
      onClick={() => onClick?.(appointment)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="appointment-card__header">
        <strong>
          {patient?.firstName} {patient?.lastName}
        </strong>

        <AppointmentStatus
          status={appointment?.status}
        />
      </div>

      <div className="appointment-card__body">
        <p>
          <strong>Doctor:</strong>{" "}
          {doctor?.firstName} {doctor?.lastName}
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
