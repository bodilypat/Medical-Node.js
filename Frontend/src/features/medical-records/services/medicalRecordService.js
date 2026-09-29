/* ******************************************************************** */
/* File: #src/features/medical-records/services/medicalRecordService.js */ 
/* ******************************************************************** */

import api from "../../../services/api";

const getData = (request) => request.then(({ data }) => data);

const medicalRecordService = {
  getAll: (params = {}) => {
    return getData(api.get("/medical-records", { params }));
  },

  getById: (recordId) => {
    return getData(api.get(`/medical-records/${recordId}`));
  },

  create: (data) => {
    return getData(api.post("/medical-records", data));
  },

  update: (recordId, data) => {
    return getData(api.put(`/medical-records/${recordId}`, data));
  },

  delete: (recordId) => {
    return getData(api.delete(`/medical-records/${recordId}`));
  },

  archive: (recordId) => {
    return getData(api.patch(`/medical-records/${recordId}/archive`));
  },

  restore: (recordId) => {
    return getData(api.patch(`/medical-records/${recordId}/restore`));
  },

  addDiagnosis: (recordId, data) => {
    return getData(api.post(`/medical-records/${recordId}/diagnoses`, data));
  },

  updateDiagnosis: (recordId, diagnosisId, data) => {
    return getData(
      api.put(`/medical-records/${recordId}/diagnoses/${diagnosisId}`, data)
    );
  },

  deleteDiagnosis: (recordId, diagnosisId) => {
    return getData(
      api.delete(`/medical-records/${recordId}/diagnoses/${diagnosisId}`)
    );
  },

  addClinicalNote: (recordId, data) => {
    return getData(
      api.post(`/medical-records/${recordId}/clinical-notes`, data)
    );
  },

  addTreatmentPlan: (recordId, data) => {
    return getData(
      api.post(`/medical-records/${recordId}/treatment-plans`, data)
    );
  },
};

export default medicalRecordService;
