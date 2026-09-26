/* ************************************************************ */
/* File: #src/features/doctors/services/medicalRecordService.js */ 
/* ************************************************************ */

import api from "../../../services/api";

const medicalRecordService = {
  getByPatient: async (patientId, params = {}) => {
    const response = await api.get(
      `/doctor/patients/${patientId}/medical-records`,
      { params }
    );

    return response.data;
  },

  getById: async (recordId) => {
    const response = await api.get(
      `/doctor/medical-records/${recordId}`
    );

    return response.data;
  },

  create: async (data) => {
    const response = await api.post(
      "/doctor/medical-records",
      data
    );

    return response.data;
  },

  update: async (recordId, data) => {
    const response = await api.put(
      `/doctor/medical-records/${recordId}`,
      data
    );

    return response.data;
  },

  addDiagnosis: async (recordId, diagnosis) => {
    const response = await api.post(
      `/doctor/medical-records/${recordId}/diagnosis`,
      diagnosis
    );

    return response.data;
  },
};

export default medicalRecordService;
