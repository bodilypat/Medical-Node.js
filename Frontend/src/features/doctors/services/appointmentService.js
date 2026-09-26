/* ********************************************************** */
/* File: #src/features/doctors/services/appointmentService.js */ 
/* ********************************************************** */

import api from "../../../services/api";

const appointmentService = {
  getMyAppointments: async (params = {}) => {
    const response = await api.get("/doctor/appointments", {
      params,
    });

    return response.data;
  },

  getById: async (appointmentId) => {
    const response = await api.get(
      `/doctor/appointments/${appointmentId}`
    );

    return response.data;
  },

  updateStatus: async (appointmentId, status) => {
    const response = await api.patch(
      `/doctor/appointments/${appointmentId}/status`,
      { status }
    );

    return response.data;
  },

  complete: async (appointmentId, data = {}) => {
    const response = await api.patch(
      `/doctor/appointments/${appointmentId}/complete`,
      data
    );

    return response.data;
  },
};

export default appointmentService;
