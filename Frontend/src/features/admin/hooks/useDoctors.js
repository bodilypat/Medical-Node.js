/* ********************************************* */
/* File: #src/features/admin/hooks/useDoctors.js */
/* ********************************************* */

import { useCallback, useEffect, useState } from 'react';

const API_URL = '/api/admin/doctors';

async function apiRequest(url, options = {}) {
	const response = await fetch(url, {
		credentials: 'include',
		...options,
		headers: {
			...(options.body ? { 'Content-Type': 'application/json' } : {}),
			...options.headers,
		},
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Request failed with status ${response.status}`);
	}

	if (response.status === 204) return null;
	return response.json();
}

/** Loads and manages doctor records for the admin dashboard. */
export default function useDoctors({ autoFetch = true } = {}) {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(autoFetch);
	const [error, setError] = useState(null);

	const fetchDoctors = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await apiRequest(API_URL);
			const records = Array.isArray(result) ? result : (result?.doctors ?? []);
			setDoctors(records);
			return records;
		} catch (requestError) {
			setError(requestError);
			throw requestError;
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (autoFetch) fetchDoctors().catch(() => {});
	}, [autoFetch, fetchDoctors]);

	const createDoctor = useCallback(async (doctor) => {
		const result = await apiRequest(API_URL, {
			method: 'POST',
			body: JSON.stringify(doctor),
		});
		const created = result?.doctor ?? result;
		if (created) setDoctors((current) => [...current, created]);
		return created;
	}, []);

	const updateDoctor = useCallback(async (id, changes) => {
		const result = await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, {
			method: 'PUT',
			body: JSON.stringify(changes),
		});
		const updated = result?.doctor ?? result;
		if (updated) {
			setDoctors((current) => current.map((doctor) =>
				String(doctor.id ?? doctor._id) === String(id) ? updated : doctor,
			));
		}
		return updated;
	}, []);

	const deleteDoctor = useCallback(async (id) => {
		await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
		setDoctors((current) => current.filter(
			(doctor) => String(doctor.id ?? doctor._id) !== String(id),
		));
	}, []);

	return { doctors, loading, error, fetchDoctors, createDoctor, updateDoctor, deleteDoctor };
}

