/* ****************************************************** */
/* File: #src/features/doctors/hooks/useDoctorPatients.js */ 
/* ****************************************************** */

import { useCallback, useEffect, useState } from "react";

import patientService from "../services/patientService";

const useDoctorPatients = (params = {}) => {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await patientService.getMyPatients(params);

      setPatients(
        data?.data ?? data?.patients ?? []
      );

      setPagination(data?.pagination ?? null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load patients."
      );
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPatients();
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
