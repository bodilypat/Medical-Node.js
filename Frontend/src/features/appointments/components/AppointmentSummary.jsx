/* ******************************************************* */
/* File: #src/features/appointments/AppointmentSummary.jsx */ 
/* ******************************************************* */

const AppointmentSummary = ({
  appointments = [],
}) => {
  const total = appointments.length;

  const completed = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  ).length;

  const cancelled = appointments.filter(
    (appointment) =>
      appointment.status === "CANCELLED"
  ).length;

  const scheduled = appointments.filter(
    (appointment) =>
      appointment.status === "SCHEDULED" ||
      appointment.status === "CONFIRMED"
  ).length;

  const items = [
    {
      label: "Total",
      value: total,
    },
    {
      label: "Scheduled",
      value: scheduled,
    },
    {
      label: "Completed",
      value: completed,
    },
    {
      label: "Cancelled",
      value: cancelled,
    },
  ];

  return (
    <div className="appointment-summary">
      {items.map((item) => (
        <div
          key={item.label}
          className="appointment-summary__item"
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default AppointmentSummary;
