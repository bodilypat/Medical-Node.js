/* ******************************************************** */
/* File: #src/features/doctors/services/dashboardService.js */
/* ******************************************************** */

import api from "../../../services/api";

const dashboardService = {
  getDashboard: async () => {
    const response = await api.get("/doctor/dashboard");

    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/doctor/dashboard/stats");

    return response.data;
  },

  getTodayAppointments: async () => {
    const response = await api.get(
      "/doctor/dashboard/today-appointments"
    );

    return response.data;
  },

  getUpcomingAppointments: async () => {
    const response = await api.get(
      "/doctor/dashboard/upcoming-appointments"
    );

    return response.data;
  },

  getRecentPatients: async () => {
    const response = await api.get(
      "/doctor/dashboard/recent-patients"
    );

    return response.data;
  },
};

export default dashboardService;
