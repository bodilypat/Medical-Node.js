/* ************************************************************ */
/* File: #src/features/doctors/components/TodayAppointments.jsx */ 
/* ************************************************************ */

const TodayAppointments = ({ appointments = [] }) => {
  return (
    <section className="today-appointments">
      <h2>Today's Appointments</h2>

      {!appointments.length ? (
        <p>No appointments scheduled for today.</p>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <article key={appointment.id}>
              <strong>
                {appointment.patient?.firstName}{" "}
                {appointment.patient?.lastName}
              </strong>

              <span>
                {appointment.time || appointment.appointmentTime}
              </span>

              <span>{appointment.status}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodayAppointments;
