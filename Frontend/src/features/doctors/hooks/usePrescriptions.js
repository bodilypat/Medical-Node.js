/* ***************************************************** */
/* File: #src/features/doctors/hooks/usePrescriptions.js */ 
/* ***************************************************** */

import { useCallback, useEffect, useState } from "react";

import prescriptionService from "../services/prescriptionService";

const usePrescriptions = (params = {}) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await prescriptionService.getAll(params);

      setPrescriptions(
        data?.data ?? data?.prescriptions ?? []
      );

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
  }, [params]);

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
