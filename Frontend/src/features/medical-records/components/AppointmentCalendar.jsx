/* ******************************************************************* */
/* File: #src/features/appointments/components/AppointmentCalendar.jsx */ 
/* ******************************************************************* */

import AppointmentCard from "./AppointmentCard";

const AppointmentCalendar = ({
  appointments = [],
  onAppointmentClick,
}) => {
  const grouped = appointments.reduce((result, appointment) => {
    const date = appointment?.appointmentDate || "Unknown";

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(appointment);
    return result;
  }, {});

  const dates = Object.keys(grouped).sort((first, second) => {
    if (first === "Unknown") return 1;
    if (second === "Unknown") return -1;

    const firstTime = Date.parse(first);
    const secondTime = Date.parse(second);

    if (Number.isNaN(firstTime) || Number.isNaN(secondTime)) {
      return first.localeCompare(second);
    }

    return firstTime - secondTime;
  });

  return (
    <div className="appointment-calendar" aria-live="polite">
      {dates.length === 0 ? (
        <p className="appointment-calendar__empty">
          No appointments scheduled.
        </p>
      ) : (
        dates.map((date) => (
          <section
            key={date}
            className="appointment-calendar__day"
            aria-labelledby={`appointment-day-${date}`}
          >
            <h3 id={`appointment-day-${date}`}>{date}</h3>

            <div className="appointment-calendar__items">
              {grouped[date].map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id ?? `${date}-${index}`}
                  appointment={appointment}
                  onClick={onAppointmentClick}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default AppointmentCalendar;
