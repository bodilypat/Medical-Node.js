/* ********************************************************* */
/* File: #src/features/doctors/components/RecentPatients.jsx */ 
/* ********************************************************* */

const RecentPatients = ({ patients = [] }) => {
  return (
    <section className="recent-patients">
      <h2>Recent Patients</h2>

      {!patients.length ? (
        <p>No recent patients.</p>
      ) : (
        patients.map((patient) => (
          <article key={patient.id}>
            <strong>
              {patient.firstName} {patient.lastName}
            </strong>

            <span>{patient.phone || "No phone number"}</span>
          </article>
        ))
      )}
    </section>
  );
};

export default RecentPatients;
