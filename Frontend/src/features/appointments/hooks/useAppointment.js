/* ******************************************************** */
/* File: #src/features/appointments/hooks/useAppointment.js */ 
/* ******************************************************** */

import { useCallback, useEffect, useState } from "react";

import appointmentService from "../services/appointmentService";

const useAppointment = (appointmentId) => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(Boolean(appointmentId));
  const [error, setError] = useState(null);

  const fetchAppointment = useCallback(async () => {
    if (!appointmentId) {
      setAppointment(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result =
        await appointmentService.getById(
          appointmentId
        );

      setAppointment(result?.data ?? result);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load appointment."
      );
    } finally {
      setLoading(false);
    }
  }, [appointmentId]);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  return {
    appointment,
    loading,
    error,
    refetch: fetchAppointment,
  };
};

export default useAppointment;
