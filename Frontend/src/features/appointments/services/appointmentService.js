/* *************************************************************** */
/* File: #src/features/appointments/services/appointmentService.js */ 
/* *************************************************************** */

import api from "../../../services/api";

const appointmentService = {
  getAll: async (params = {}) => {
    const response = await api.get("/appointments", {
      params,
    });

    return response.data;
  },

  getById: async (appointmentId) => {
    const response = await api.get(
      `/appointments/${appointmentId}`
    );

    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/appointments", data);

    return response.data;
  },

  update: async (appointmentId, data) => {
    const response = await api.put(
      `/appointments/${appointmentId}`,
      data
    );

    return response.data;
  },

  updateStatus: async (appointmentId, status) => {
    const response = await api.patch(
      `/appointments/${appointmentId}/status`,
      { status }
    );

    return response.data;
  },

  cancel: async (appointmentId, reason = "") => {
    const response = await api.patch(
      `/appointments/${appointmentId}/cancel`,
      { reason }
    );

    return response.data;
  },

  confirm: async (appointmentId) => {
    const response = await api.patch(
      `/appointments/${appointmentId}/confirm`
    );

    return response.data;
  },

  complete: async (appointmentId, data = {}) => {
    const response = await api.patch(
      `/appointments/${appointmentId}/complete`,
      data
    );

    return response.data;
  },

  delete: async (appointmentId) => {
    const response = await api.delete(
      `/appointments/${appointmentId}`
    );

    return response.data;
  },

  getAvailableSlots: async (params = {}) => {
    const response = await api.get(
      "/appointments/available-slots",
      { params }
    );

    return response.data;
  },
};

export default appointmentService;
