/* ************************************************************* */
/* File: #src/features/medical-records/hooks/useMedicalRecord.js */ 
/* ************************************************************* */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecord = (recordId) => {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] =
    useState(Boolean(recordId));
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const fetchRecord = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    if (!recordId) {
      setRecord(null);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result =
        await medicalRecordService.getById(
          recordId
        );

      if (requestId === requestIdRef.current) {
        setRecord(result?.data ?? result);
      }
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load medical record."
        );
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [recordId]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  return {
    record,
    loading,
    error,
    refetch: fetchRecord,
  };
};

export default useMedicalRecord;
