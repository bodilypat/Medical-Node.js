/* ******************************************************************* */
/* File: #src/features/appointments/components/AppointmentCalendar.jsx */ 
/* ******************************************************************* */

import AppointmentCard from "./AppointmentCard";

const AppointmentCalendar = ({
  appointments = [],
  onAppointmentClick,
}) => {
  const grouped = appointments.reduce(
    (result, appointment) => {
      const date =
        appointment.appointmentDate || "Unknown";

      if (!result[date]) {
        result[date] = [];
      }

      result[date].push(appointment);

      return result;
    },
    {}
  );

  return (
    <div className="appointment-calendar">
      {Object.entries(grouped).map(
        ([date, items]) => (
          <section
            key={date}
            className="appointment-calendar__day"
          >
            <h3>{date}</h3>

            <div>
              {items.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onClick={onAppointmentClick}
                />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default AppointmentCalendar;
