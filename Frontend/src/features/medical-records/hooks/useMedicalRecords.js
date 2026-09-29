/* ************************************************************** */
/* File: #src/features/medical-records/hooks/useMedicalRecords.js */ 
/* ************************************************************** */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecords = (params = {}) => {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  // Avoid refetching when callers create an equivalent params object on each render.
  const paramsKey = useMemo(() => JSON.stringify(params), [params]);

  const fetchRecords = useCallback(async () => {
    const currentRequest = ++requestId.current;

    try {
      setLoading(true);
      setError(null);

      const result =
        await medicalRecordService.getAll(params);

      // Ignore responses from requests superseded by a newer request.
      if (currentRequest !== requestId.current) return;

      setRecords(
        result?.data?.records ??
          result?.data?.medicalRecords ??
          result?.data ??
          result?.records ??
          result?.medicalRecords ??
          []
      );

      setPagination(
        result?.pagination ??
          result?.data?.pagination ??
          null
      );
    } catch (err) {
      if (currentRequest !== requestId.current) return;

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load medical records."
      );
    } finally {
      setLoading(false);
    }
  }, [params, paramsKey]);

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
