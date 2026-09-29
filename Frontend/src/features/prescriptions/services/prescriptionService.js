/* ***************************************************************** */
/* File: #src/features/prescriptions/services/prescriptionService.js */
/* ***************************************************************** */

const API_BASE_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '');
const PRESCRIPTIONS_ENDPOINT = `${API_BASE_URL}/api/prescriptions`;

async function request(url, options = {}) {
	const response = await fetch(url, {
		...options,
		headers: {
			...(options.body ? { 'Content-Type': 'application/json' } : {}),
			...options.headers,
		},
	});

	if (!response.ok) {
		let message = `Request failed (${response.status})`;
		try {
			const error = await response.json();
			message = error.message || error.error || message;
		} catch {
			// Keep the status-based message when the response is not JSON.
		}
		throw new Error(message);
	}

	if (response.status === 204) return null;
	return response.json();
}

function buildQuery(filters = {}) {
	const query = new URLSearchParams();
	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			query.set(key, String(value));
		}
	});
	const serialized = query.toString();
	return serialized ? `?${serialized}` : '';
}

export const getPrescriptions = (filters) =>
	request(`${PRESCRIPTIONS_ENDPOINT}${buildQuery(filters)}`);

export const getPrescription = (id) => {
	if (!id) throw new Error('Prescription ID is required');
	return request(`${PRESCRIPTIONS_ENDPOINT}/${encodeURIComponent(id)}`);
};

export const createPrescription = (prescription) =>
	request(PRESCRIPTIONS_ENDPOINT, {
		method: 'POST',
		body: JSON.stringify(prescription),
	});

export const updatePrescription = (id, updates) => {
	if (!id) throw new Error('Prescription ID is required');
	return request(`${PRESCRIPTIONS_ENDPOINT}/${encodeURIComponent(id)}`, {
		method: 'PUT',
		body: JSON.stringify(updates),
	});
};

export const deletePrescription = (id) => {
	if (!id) throw new Error('Prescription ID is required');
	return request(`${PRESCRIPTIONS_ENDPOINT}/${encodeURIComponent(id)}`, {
		method: 'DELETE',
	});
};
