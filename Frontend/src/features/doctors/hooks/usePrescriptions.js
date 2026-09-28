/* ***************************************************** */
/* File: #src/features/doctors/hooks/usePrescriptions.js */ 
/* ***************************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";

import prescriptionService from "../services/prescriptionService";

const usePrescriptions = (params = {}) => {
  // Keep equivalent parameter objects stable across renders so the fetch effect
  // does not repeatedly run when callers pass an inline object.
  const paramsKey = JSON.stringify(params);
  const stableParams = useMemo(() => params, [paramsKey]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await prescriptionService.getAll(stableParams);

      const results = data?.data ?? data?.prescriptions ?? [];
      setPrescriptions(Array.isArray(results) ? results : []);

      setPagination(data?.pagination ?? null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load prescriptions."
      );
    } finally {
      setLoading(false);
    }
  }, [stableParams]);

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  return {
    prescriptions,
    pagination,
    loading,
    error,
    refetch: fetchPrescriptions,
  };
};

export default usePrescriptions;
