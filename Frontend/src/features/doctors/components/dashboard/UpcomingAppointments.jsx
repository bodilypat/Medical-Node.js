/* *************************************************************** */
/* File: #src/features/doctors/components/UpcomingAppointments.jsx */ 
/* *************************************************************** */

const UpcomingAppointments = ({ appointments = [] }) => {
  return (
    <section className="upcoming-appointments">
      <h2>Upcoming Appointments</h2>

      {!appointments.length ? (
        <p>No upcoming appointments.</p>
      ) : (
        appointments.map((appointment) => (
          <article key={appointment.id}>
            <strong>
              {appointment.patient?.firstName}{" "}
              {appointment.patient?.lastName}
            </strong>

            <span>
              {appointment.date || appointment.appointmentDate}
            </span>

            <span>{appointment.status}</span>
          </article>
        ))
      )}
    </section>
  );
};

export default UpcomingAppointments;
