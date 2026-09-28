/* ****************************************************** */
/* File: #src/features/doctors/hooks/useMedicalRecords.js */ 
/* ****************************************************** */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecords = (patientId, params = {}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(Boolean(patientId));
  const [error, setError] = useState(null);
  const requestId = useRef(0);
  const paramsKey = JSON.stringify(params);
  const stableParams = useMemo(() => JSON.parse(paramsKey), [paramsKey]);

  const fetchRecords = useCallback(async () => {
    const currentRequestId = ++requestId.current;

    if (!patientId) {
      setRecords([]);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await medicalRecordService.getByPatient(
          patientId,
          stableParams
        );

      if (currentRequestId === requestId.current) {
        setRecords(data?.data ?? data?.records ?? []);
      }
    } catch (err) {
      if (currentRequestId === requestId.current) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load medical records."
        );
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }, [patientId, stableParams]);

  useEffect(() => {
    fetchRecords();
    return () => {
      requestId.current += 1;
    };
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
  };
};

export default useMedicalRecords;
