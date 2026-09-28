/* ************************************************** */
/* File: #src/features/admin/hooks/useAppointments.js */
/* ************************************************** */

import { useCallback, useEffect, useState } from 'react';

const APPOINTMENTS_URL = '/api/admin/appointments';

async function apiRequest(url, options = {}) {
	const response = await fetch(url, {
		...options,
		headers: {
			...(options.body ? { 'Content-Type': 'application/json' } : {}),
			...options.headers,
		},
	});
	const data = response.status === 204 ? null : await response.json().catch(() => null);
	if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`);
	return data;
}

/** Admin appointments data and CRUD operations. */
export default function useAppointments({ autoFetch = true } = {}) {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(autoFetch);
	const [error, setError] = useState(null);

	const fetchAppointments = useCallback(async (filters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const params = new URLSearchParams();
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') params.set(key, value);
			});
			const url = params.toString() ? `${APPOINTMENTS_URL}?${params}` : APPOINTMENTS_URL;
			const result = await apiRequest(url);
			const items = Array.isArray(result) ? result : result?.appointments;
			setAppointments(Array.isArray(items) ? items : []);
			return Array.isArray(items) ? items : [];
		} catch (err) {
			setError(err.message || 'Unable to load appointments');
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const createAppointment = useCallback(async (appointment) => {
		setError(null);
		try {
			const result = await apiRequest(APPOINTMENTS_URL, {
				method: 'POST', body: JSON.stringify(appointment),
			});
			const created = result?.appointment || result;
			if (created) setAppointments((items) => [created, ...items]);
			return created;
		} catch (err) {
			setError(err.message || 'Unable to create appointment');
			throw err;
		}
	}, []);

	const updateAppointment = useCallback(async (id, changes) => {
		setError(null);
		try {
			const result = await apiRequest(`${APPOINTMENTS_URL}/${encodeURIComponent(id)}`, {
				method: 'PATCH', body: JSON.stringify(changes),
			});
			const updated = result?.appointment || result;
			setAppointments((items) => items.map((item) =>
				String(item._id ?? item.id) === String(id) ? { ...item, ...updated } : item,
			));
			return updated;
		} catch (err) {
			setError(err.message || 'Unable to update appointment');
			throw err;
		}
	}, []);

	const deleteAppointment = useCallback(async (id) => {
		setError(null);
		try {
			await apiRequest(`${APPOINTMENTS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
			setAppointments((items) => items.filter((item) =>
				String(item._id ?? item.id) !== String(id),
			));
		} catch (err) {
			setError(err.message || 'Unable to delete appointment');
			throw err;
		}
	}, []);

	useEffect(() => {
		if (autoFetch) fetchAppointments().catch(() => {});
	}, [autoFetch, fetchAppointments]);

	return { appointments, loading, error, fetchAppointments, createAppointment, updateAppointment, deleteAppointment, setAppointments };
}

