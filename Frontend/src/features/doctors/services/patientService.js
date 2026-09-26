/* ****************************************************** */
/* File: #src/features/doctors/services/patientService.js */ 
/* ****************************************************** */

import api from "../../../services/api";

const patientService = {
  getMyPatients: async (params = {}) => {
    const response = await api.get("/doctor/patients", {
      params,
    });

    return response.data;
  },

  getPatient: async (patientId) => {
    const response = await api.get(
      `/doctor/patients/${patientId}`
    );

    return response.data;
  },

  searchPatients: async (search) => {
    const response = await api.get("/doctor/patients/search", {
      params: { search },
    });

    return response.data;
  },
};

export default patientService;
