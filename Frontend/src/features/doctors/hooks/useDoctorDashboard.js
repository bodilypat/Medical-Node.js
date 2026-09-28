/* ******************************************************* */
/* File: #src/features/doctors/hooks/useDoctorDashboard.js */
/* ******************************************************* */

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_API_URL = '/api/doctors';

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }
  return data;
}

/** Loads doctor dashboard data and exposes doctor management actions. */
export default function useDoctorDashboard(apiUrl = DEFAULT_API_URL) {
  const [doctors, setDoctors] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [doctorData, dashboardData] = await Promise.all([
        requestJson(apiUrl),
        requestJson(`${apiUrl}/dashboard`),
      ]);
      setDoctors(Array.isArray(doctorData) ? doctorData : doctorData?.doctors || []);
      setSummary(dashboardData);
    } catch (cause) {
      setError(cause);
      throw cause;
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  const createDoctor = useCallback(async (doctor) => {
    const created = await requestJson(apiUrl, {
      method: 'POST',
      body: JSON.stringify(doctor),
    });
    await refresh();
    return created;
  }, [apiUrl, refresh]);

  const updateDoctor = useCallback(async (id, changes) => {
    const updated = await requestJson(`${apiUrl}/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(changes),
    });
    await refresh();
    return updated;
  }, [apiUrl, refresh]);

  const deleteDoctor = useCallback(async (id) => {
    await requestJson(`${apiUrl}/${encodeURIComponent(id)}`, { method: 'DELETE' });
    await refresh();
  }, [apiUrl, refresh]);

  return { doctors, summary, loading, error, refresh, createDoctor, updateDoctor, deleteDoctor };
}
