/* ************************************************************* */
/* File: #src/features/appointments/pages/BookingAppointment.jsx */ 
/* ************************************************************* */

import { useNavigate } from "react-router-dom";

import AppointmentForm from "../components/AppointmentForm";
import useCreateAppointment from "../hooks/useCreateAppointment";

const BookingAppointment = () => {
  const navigate = useNavigate();

  const {
    createAppointment,
    loading,
    error,
  } = useCreateAppointment();

  const handleSubmit = async (data) => {
    try {
      const appointment =
        await createAppointment(data);

      const id = appointment?.id;

      if (id) {
        navigate(`/appointments/${id}`);
      } else {
        navigate("/appointments");
      }
    } catch {
      // The hook exposes the error to the UI.
    }
  };

  return (
    <section className="booking-appointment-page">
      <header>
        <h1>Book Appointment</h1>
        <p>Create a new patient appointment.</p>
      </header>

      {error && (
        <div className="error-state">
          {error}
        </div>
      )}

      <AppointmentForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </section>
  );
};

export default BookingAppointment;
