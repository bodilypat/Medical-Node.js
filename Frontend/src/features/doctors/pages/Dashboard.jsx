/* *********************************************** */
/* File: #src/features/doctors/pages/Dashboard.jsx */ 
/* *********************************************** */

import DoctorStats from "../components/dashboard/DoctorStats";
import TodayAppointments from "../components/dashboard/TodayAppointments";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";
import RecentPatients from "../components/dashboard/RecentPatients";
import useDoctorDashboard from "../hooks/useDoctorDashboard";

const Dashboard = () => {
  const {
    dashboard,
    loading,
    error,
    refetch,
  } = useDoctorDashboard();

  if (loading) {
    return (
      <section className="doctor-dashboard" aria-busy="true" aria-live="polite">
        <h1>Doctor Dashboard</h1>
        <p>Loading dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="doctor-dashboard" aria-labelledby="doctor-dashboard-title">
        <h1 id="doctor-dashboard-title">Doctor Dashboard</h1>
        <p role="alert">{error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </section>
    );
  }

  const stats = dashboard?.stats ?? {};
  const todayAppointments = Array.isArray(dashboard?.todayAppointments)
    ? dashboard.todayAppointments
    : [];
  const upcomingAppointments = Array.isArray(dashboard?.upcomingAppointments)
    ? dashboard.upcomingAppointments
    : [];
  const recentPatients = Array.isArray(dashboard?.recentPatients)
    ? dashboard.recentPatients
    : [];

  return (
    <section className="doctor-dashboard" aria-labelledby="doctor-dashboard-title">
      <header>
        <h1 id="doctor-dashboard-title">Doctor Dashboard</h1>
        <p>Overview of your clinical activities.</p>
      </header>

      <DoctorStats stats={stats} />

      <div className="doctor-dashboard__grid">
        <TodayAppointments
          appointments={todayAppointments}
        />

        <UpcomingAppointments
          appointments={upcomingAppointments}
        />

        <RecentPatients
          patients={recentPatients}
        />
      </div>
    </section>
  );
};

export default Dashboard;
