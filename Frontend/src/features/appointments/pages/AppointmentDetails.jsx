/* ************************************************************* */
/* File: #src/features/appointments/pages/AppointmentDetails.jsx */ 
/* ************************************************************* */

import { useNavigate, useParams } from "react-router-dom";

import AppointmentDetailsView from "../components/AppointmentDetails";
import AppointmentActions from "../components/AppointmentActions";
import useAppointment from "../hooks/useAppointment";
import useAppointmentActions from "../hooks/useAppointmentActions";

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    appointment,
    loading,
    error,
    refetch,
  } = useAppointment(id);

  const {
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointment,
    loading: actionLoading,
    error: actionError,
  } = useAppointmentActions();

  const handleConfirm = async (appointmentId) => {
    await confirmAppointment(appointmentId);
    await refetch();
  };

  const handleCancel = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    await refetch();
  };

  const handleComplete = async (appointmentId) => {
    await completeAppointment(appointmentId);
    await refetch();
  };

  const handleDelete = async (appointmentId) => {
    await deleteAppointment(appointmentId);

    navigate("/appointments");
  };

  if (loading) {
    return <div>Loading appointment...</div>;
  }

  if (error) {
    return (
      <section>
        <h1>Appointment</h1>
        <p>{error}</p>

        <button
          type="button"
          onClick={refetch}
        >
          Try Again
        </button>
      </section>
    );
  }

  if (!appointment) {
    return <p>Appointment not found.</p>;
  }

  return (
    <section className="appointment-details-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <AppointmentDetailsView
        appointment={appointment}
      />

      {actionError && (
        <p className="error-message">
          {actionError}
        </p>
      )}

      <AppointmentActions
        appointment={appointment}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onComplete={handleComplete}
        onDelete={handleDelete}
        loading={actionLoading}
      />
    </section>
  );
};

export default AppointmentDetailsPage;
