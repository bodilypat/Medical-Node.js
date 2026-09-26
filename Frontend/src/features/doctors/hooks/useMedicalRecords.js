/* ****************************************************** */
/* File: #src/features/doctors/hooks/useMedicalRecords.js */ 
/* ****************************************************** */

import { useCallback, useEffect, useState } from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecords = (patientId, params = {}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(Boolean(patientId));
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    if (!patientId) {
      setRecords([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await medicalRecordService.getByPatient(
          patientId,
          params
        );

      setRecords(
        data?.data ?? data?.records ?? []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load medical records."
      );
    } finally {
      setLoading(false);
    }
  }, [patientId, params]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
  };
};

export default useMedicalRecords;
