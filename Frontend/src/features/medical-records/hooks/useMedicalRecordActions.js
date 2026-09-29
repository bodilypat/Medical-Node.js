/* ******************************************************************** */
/* File: #src/features/medical-records/hooks/useMedicalRecordActions.js */ 
/* ******************************************************************** */

import { useRef, useState } from "react";

import medicalRecordService from "../services/medicalRecordService";

const useMedicalRecordActions = () => {
  const activeActions = useRef(0);
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState(null);

  const execute = async (action) => {
    activeActions.current += 1;
    setLoading(true);
    try {
      setError(null);

      return await action();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Medical record action failed."
      );

      throw err;
    } finally {
      activeActions.current -= 1;
      setLoading(activeActions.current > 0);
    }
  };

  const updateRecord = (id, data) =>
    execute(() =>
      medicalRecordService.update(id, data)
    );

  const deleteRecord = (id) =>
    execute(() =>
      medicalRecordService.delete(id)
    );

  const archiveRecord = (id) =>
    execute(() =>
      medicalRecordService.archive(id)
    );

  const restoreRecord = (id) =>
    execute(() =>
      medicalRecordService.restore(id)
    );

  const addDiagnosis = (recordId, data) =>
    execute(() =>
      medicalRecordService.addDiagnosis(
        recordId,
        data
      )
    );

  const updateDiagnosis = (
    recordId,
    diagnosisId,
    data
  ) =>
    execute(() =>
      medicalRecordService.updateDiagnosis(
        recordId,
        diagnosisId,
        data
      )
    );

  const deleteDiagnosis = (
    recordId,
    diagnosisId
  ) =>
    execute(() =>
      medicalRecordService.deleteDiagnosis(
        recordId,
        diagnosisId
      )
    );

  const addClinicalNote = (recordId, data) =>
    execute(() =>
      medicalRecordService.addClinicalNote(
        recordId,
        data
      )
    );

  const addTreatmentPlan = (recordId, data) =>
    execute(() =>
      medicalRecordService.addTreatmentPlan(
        recordId,
        data
      )
    );

  return {
    updateRecord,
    deleteRecord,
    archiveRecord,
    restoreRecord,
    addDiagnosis,
    updateDiagnosis,
    deleteDiagnosis,
    addClinicalNote,
    addTreatmentPlan,
    loading,
    error,
  };
};

export default useMedicalRecordActions;
