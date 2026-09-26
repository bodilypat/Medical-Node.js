/* ****************************************************** */
/* File: #src/features/doctors/components/DoctorStats.jsx */ 
/* ****************************************************** */

const DoctorStats = ({ stats = {} }) => {
  const items = [
    {
      label: "Today's Appointments",
      value: stats.todayAppointments ?? 0,
    },
    {
      label: "Upcoming",
      value: stats.upcomingAppointments ?? 0,
    },
    {
      label: "Total Patients",
      value: stats.totalPatients ?? 0,
    },
    {
      label: "Completed",
      value: stats.completedAppointments ?? 0,
    },
  ];

  return (
    <div className="doctor-stats">
      {items.map((item) => (
        <div className="doctor-stats__card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default DoctorStats;
