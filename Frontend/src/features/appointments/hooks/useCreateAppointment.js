/* ************************************************************** */
/* File: #src/features/appointments/hooks/useCreateAppointment.js */ 
/* ************************************************************** */

import { useState } from "react";

import appointmentService from "../services/appointmentService";

const useCreateAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAppointment = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const result =
        await appointmentService.create(data);

      return result?.data ?? result;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create appointment.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAppointment,
    loading,
    error,
  };
};

export default useCreateAppointment;
