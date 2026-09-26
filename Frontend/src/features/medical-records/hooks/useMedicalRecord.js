/* ************************************************************* */
/* File: #src/features/medical-records/hooks/useMedicalRecord.js */ 
/* ************************************************************* */

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecord = (recordId) => {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] =
    useState(Boolean(recordId));
  const [error, setError] = useState(null);

  const fetchRecord = useCallback(async () => {
    if (!recordId) {
      setRecord(null);
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

      setRecord(result?.data ?? result);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load medical record."
      );
    } finally {
      setLoading(false);
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
