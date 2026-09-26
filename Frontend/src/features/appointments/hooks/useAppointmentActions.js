/* *************************************************************** */
/* File: #src/features/appointments/hooks/useAppointmentActions.js */ 
/* *************************************************************** */

import { useState } from "react";

import appointmentService from "../services/appointmentService";

const useAppointmentActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (action) => {
    try {
      setLoading(true);
      setError(null);

      return await action();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Appointment action failed.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id, status) =>
    execute(() =>
      appointmentService.updateStatus(id, status)
    );

  const confirmAppointment = (id) =>
    execute(() =>
      appointmentService.confirm(id)
    );

  const cancelAppointment = (id, reason) =>
    execute(() =>
      appointmentService.cancel(id, reason)
    );

  const completeAppointment = (id, data) =>
    execute(() =>
      appointmentService.complete(id, data)
    );

  const deleteAppointment = (id) =>
    execute(() =>
      appointmentService.delete(id)
    );

  return {
    updateStatus,
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointment,
    loading,
    error,
  };
};

export default useAppointmentActions;
