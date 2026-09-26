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
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <section>
        <h1>Doctor Dashboard</h1>
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </section>
    );
  }

  const stats = dashboard?.stats || {};
  const todayAppointments =
    dashboard?.todayAppointments || [];
  const upcomingAppointments =
    dashboard?.upcomingAppointments || [];
  const recentPatients =
    dashboard?.recentPatients || [];

  return (
    <section className="doctor-dashboard">
      <header>
        <h1>Doctor Dashboard</h1>
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
