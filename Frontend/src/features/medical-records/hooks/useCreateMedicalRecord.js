/* ******************************************************************* */
/* File: #src/features/medical-records/hooks/useCreateMedicalRecord.js */ 
/* ******************************************************************* */

import { useState } from "react";

import medicalRecordService from "../services/medicalRecordService";

const useCreateMedicalRecord = () => {
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState(null);

  const createMedicalRecord = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const result =
        await medicalRecordService.create(data);

      return result?.data ?? result;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create medical record."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createMedicalRecord,
    loading,
    error,
  };
};

export default useCreateMedicalRecord;
