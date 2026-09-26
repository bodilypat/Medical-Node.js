/* ********************************************** */
/* File: #src/features/patients/patientService.js */ 
/* ********************************************** */

import api from "../../../services/api";

const handleRequest = async (requestFn, action) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error(`Patient service error during ${action}:`, {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    throw error;
  }
};

const patientPath = (patientId) =>
  `/patients/${encodeURIComponent(String(patientId))}`;

const patientService = {
  getAll: async (params = {}) =>
    handleRequest(() => api.get("/patients", { params }), "getAll"),

  getById: async (patientId) =>
    handleRequest(() => api.get(patientPath(patientId)), "getById"),

  create: async (patientData) =>
    handleRequest(() => api.post("/patients", patientData), "create"),

  update: async (patientId, patientData) =>
    handleRequest(
      () => api.put(patientPath(patientId), patientData),
      "update"
    ),

  remove: async (patientId) =>
    handleRequest(() => api.delete(patientPath(patientId)), "remove"),

  getMedicalHistory: async (patientId) =>
    handleRequest(
      () => api.get(`${patientPath(patientId)}/medical-history`),
      "getMedicalHistory"
    ),

  getStats: async () =>
    handleRequest(() => api.get("/patients/stats"), "getStats"),
};

export default patientService;
