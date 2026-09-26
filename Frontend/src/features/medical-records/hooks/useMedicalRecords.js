/* ************************************************************** */
/* File: #src/features/medical-records/hooks/useMedicalRecords.js */ 
/* ************************************************************** */

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecords = (params = {}) => {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result =
        await medicalRecordService.getAll(params);

      setRecords(
        result?.data ??
          result?.records ??
          result?.medicalRecords ??
          []
      );

      setPagination(
        result?.pagination ?? null
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
  }, [params]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    pagination,
    loading,
    error,
    refetch: fetchRecords,
  };
};

export default useMedicalRecords;
