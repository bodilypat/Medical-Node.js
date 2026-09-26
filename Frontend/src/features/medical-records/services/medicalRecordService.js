/* ******************************************************************** */
/* File: #src/features/medical-records/services/medicalRecordService.js */ 
/* ******************************************************************** */

import api from "../../../services/api";

const medicalRecordService = {
  getAll: async (params = {}) => {
    const response = await api.get("/medical-records", {
      params,
    });

    return response.data;
  },

  getById: async (recordId) => {
    const response = await api.get(
      `/medical-records/${recordId}`
    );

    return response.data;
  },

  create: async (data) => {
    const response = await api.post(
      "/medical-records",
      data
    );

    return response.data;
  },

  update: async (recordId, data) => {
    const response = await api.put(
      `/medical-records/${recordId}`,
      data
    );

    return response.data;
  },

  delete: async (recordId) => {
    const response = await api.delete(
      `/medical-records/${recordId}`
    );

    return response.data;
  },

  archive: async (recordId) => {
    const response = await api.patch(
      `/medical-records/${recordId}/archive`
    );

    return response.data;
  },

  restore: async (recordId) => {
    const response = await api.patch(
      `/medical-records/${recordId}/restore`
    );

    return response.data;
  },

  addDiagnosis: async (recordId, data) => {
    const response = await api.post(
      `/medical-records/${recordId}/diagnoses`,
      data
    );

    return response.data;
  },

  updateDiagnosis: async (
    recordId,
    diagnosisId,
    data
  ) => {
    const response = await api.put(
      `/medical-records/${recordId}/diagnoses/${diagnosisId}`,
      data
    );

    return response.data;
  },

  deleteDiagnosis: async (
    recordId,
    diagnosisId
  ) => {
    const response = await api.delete(
      `/medical-records/${recordId}/diagnoses/${diagnosisId}`
    );

    return response.data;
  },

  addClinicalNote: async (recordId, data) => {
    const response = await api.post(
      `/medical-records/${recordId}/clinical-notes`,
      data
    );

    return response.data;
  },

  addTreatmentPlan: async (recordId, data) => {
    const response = await api.post(
      `/medical-records/${recordId}/treatment-plans`,
      data
    );

    return response.data;
  },
};

export default medicalRecordService;
