/* ****************************************************** */
/* File: #src/features/doctors/hooks/useMyAppointments.js */ 
/* ****************************************************** */

import { useCallback, useEffect, useState } from "react";

import appointmentService from "../services/appointmentService";

const useMyAppointments = (params = {}) => {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await appointmentService.getMyAppointments(params);

      setAppointments(
        data?.data ?? data?.appointments ?? []
      );

      setPagination(data?.pagination ?? null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load appointments."
      );
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    pagination,
    loading,
    error,
    refetch: fetchAppointments,
  };
};

export default useMyAppointments;
