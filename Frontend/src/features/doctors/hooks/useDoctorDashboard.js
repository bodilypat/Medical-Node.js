/* ******************************************************* */
/* File: #src/features/doctors/hooks/useDoctorDashboard.js */ 
/* ******************************************************* */

import { useCallback, useEffect, useState } from "react";

import dashboardService from "../services/dashboardService";

const useDoctorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardService.getDashboard();

      setDashboard(data?.data ?? data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load doctor dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useDoctorDashboard;
