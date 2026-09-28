/* ******************************************************* */
/* File: #src/features/appointments/AppointmentSummary.jsx */ 
/* ******************************************************* */

const AppointmentSummary = ({
  appointments = [],
}) => {
  const counts = appointments.reduce(
    (summary, appointment) => {
      const status = String(appointment?.status || "").toUpperCase();

      if (status === "COMPLETED") summary.completed += 1;
      if (status === "CANCELLED") summary.cancelled += 1;
      if (status === "SCHEDULED" || status === "CONFIRMED") {
        summary.scheduled += 1;
      }

      return summary;
    },
    { completed: 0, cancelled: 0, scheduled: 0 }
  );

  const items = [
    {
      label: "Total",
      value: appointments.length,
    },
    {
      label: "Scheduled",
      value: counts.scheduled,
    },
    {
      label: "Completed",
      value: counts.completed,
    },
    {
      label: "Cancelled",
      value: counts.cancelled,
    },
  ];

  return (
    <section
      className="appointment-summary"
      aria-label="Appointment summary"
    >
      {items.map((item) => (
        <article
          key={item.label}
          className="appointment-summary__item"
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
};

export default AppointmentSummary;
