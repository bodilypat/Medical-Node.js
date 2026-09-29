/* ******************************************************* */
/* File: #src/features/prescriptions/hooks/prescription.js */ 
/* ******************************************************* */

import { useCallback, useEffect, useRef, useState } from 'react';

const API_URL = '/api/prescriptions';

async function request(url, options = {}) {
	const response = await fetch(url, {
		credentials: 'include',
		headers: { 'Content-Type': 'application/json', ...options.headers },
		...options,
	});

	if (!response.ok) {
		let message = `Request failed (${response.status})`;
		try {
			const body = await response.json();
			message = body.message || body.detail || message;
		} catch {
			// Ignore non-JSON error responses.
		}
		throw new Error(message);
	}

	if (response.status === 204) return null;
	const contentType = response.headers.get('content-type') || '';
	return contentType.includes('application/json') ? response.json() : null;
}

export default function usePrescription(id) {
	const [prescription, setPrescription] = useState(null);
	const [loading, setLoading] = useState(Boolean(id));
	const [error, setError] = useState(null);
	const requestVersion = useRef(0);

	const getPrescription = useCallback(async (prescriptionId = id) => {
		if (!prescriptionId) {
			setPrescription(null);
			setLoading(false);
			return null;
		}

		const version = ++requestVersion.current;
		setLoading(true);
		setError(null);
		try {
			const data = await request(
				`${API_URL}/${encodeURIComponent(String(prescriptionId))}`,
			);
			if (version === requestVersion.current) setPrescription(data);
			return data;
		} catch (err) {
			if (version === requestVersion.current) setError(err);
			throw err;
		} finally {
			if (version === requestVersion.current) setLoading(false);
		}
	}, [id]);

	const updateStatus = useCallback(async (prescriptionId, status) => {
		if (!prescriptionId) throw new Error('Prescription id is required');
		if (!['cancel', 'complete'].includes(status)) {
			throw new Error('Invalid prescription status');
		}
		setError(null);
		try {
			const data = await request(
				`${API_URL}/${encodeURIComponent(String(prescriptionId))}/${status}`,
				{ method: 'PATCH' },
			);
			setPrescription((current) => (current && data ? { ...current, ...data } : data));
			return data;
		} catch (err) {
			setError(err);
			throw err;
		}
	}, []);

	const cancelPrescription = useCallback(
		(prescriptionId = id) => updateStatus(prescriptionId, 'cancel'),
		[id, updateStatus],
	);

	const completePrescription = useCallback(
		(prescriptionId = id) => updateStatus(prescriptionId, 'complete'),
		[id, updateStatus],
	);

	useEffect(() => {
		if (id) getPrescription().catch(() => {});
	}, [id, getPrescription]);

	return {
		prescription,
		loading,
		error,
		getPrescription,
		cancelPrescription,
		completePrescription,
	};
}
