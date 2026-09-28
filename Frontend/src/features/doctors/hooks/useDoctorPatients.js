/* ****************************************************** */
/* File: #src/features/doctors/hooks/useDoctorPatients.js */ 
/* ****************************************************** */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import patientService from "../services/patientService";

const useDoctorPatients = (params = {}) => {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  // Keep inline parameter objects from triggering a fetch on every render.
  const paramsKey = JSON.stringify(params);
  const stableParams = useMemo(() => params, [paramsKey]);

  const fetchPatients = useCallback(async () => {
    const currentRequest = ++requestId.current;
    try {
      setLoading(true);
      setError(null);

      const data =
        await patientService.getMyPatients(stableParams);

      if (currentRequest !== requestId.current) return;

      setPatients(
        data?.data ?? data?.patients ?? []
      );

      setPagination(data?.pagination ?? null);
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load patients."
      );
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [stableParams]);

  useEffect(() => {
    fetchPatients();
    return () => {
      requestId.current += 1;
    };
  }, [fetchPatients]);

  return {
    patients,
    pagination,
    loading,
    error,
    refetch: fetchPatients,
  };
};

export default useDoctorPatients;
