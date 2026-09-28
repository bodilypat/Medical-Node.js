/* ********************************************************* */
/* File: #src/features/appointments/hooks/useAppointments.js */ 
/* ********************************************************* */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import appointmentService from "../services/appointmentService";

const EMPTY_PARAMS = {};

const useAppointments = (params = EMPTY_PARAMS) => {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  // Inline params objects should not trigger a fetch on every render.
  const paramsKey = JSON.stringify(params);
  const stableParams = useMemo(
    () => (paramsKey ? JSON.parse(paramsKey) : {}),
    [paramsKey]
  );

  const fetchAppointments = useCallback(async () => {
    const currentRequestId = ++requestId.current;

    try {
      setLoading(true);
      setError(null);

      const result = await appointmentService.getAll(stableParams);

      if (currentRequestId !== requestId.current) return;

      setAppointments(
        result?.data ??
          result?.appointments ??
          []
      );

      setPagination(result?.pagination ?? null);
    } catch (err) {
      if (currentRequestId !== requestId.current) return;

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load appointments."
      );
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }, [stableParams]);

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

export default useAppointments;
