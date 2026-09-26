/* *********************************************************** */
/* File: #src/features/doctors/services/prescriptionService.js */ 
/* *********************************************************** */

import api from "../../../services/api";

const prescriptionService = {
  getAll: async (params = {}) => {
    const response = await api.get("/doctor/prescriptions", {
      params,
    });

    return response.data;
  },

  getById: async (prescriptionId) => {
    const response = await api.get(
      `/doctor/prescriptions/${prescriptionId}`
    );

    return response.data;
  },

  create: async (data) => {
    const response = await api.post(
      "/doctor/prescriptions",
      data
    );

    return response.data;
  },

  update: async (prescriptionId, data) => {
    const response = await api.put(
      `/doctor/prescriptions/${prescriptionId}`,
      data
    );

    return response.data;
  },

  cancel: async (prescriptionId) => {
    const response = await api.patch(
      `/doctor/prescriptions/${prescriptionId}/cancel`
    );

    return response.data;
  },
};

export default prescriptionService;
