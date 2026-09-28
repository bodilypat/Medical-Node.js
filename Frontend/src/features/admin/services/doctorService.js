/* *************************************************** */
/* File: #src/features/admin/services/doctorService.js */
/* *************************************************** */

const API_URL = '/api/admin/doctors';

async function sendRequest(path = '', options = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		credentials: 'include',
		...options,
		headers: {
			Accept: 'application/json',
			...(options.body ? { 'Content-Type': 'application/json' } : {}),
			...options.headers,
		},
	});

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new Error(body?.message || `Request failed with status ${response.status}`);
	}

	if (response.status === 204) return null;
	return response.json();
}

function serializeQuery(params = {}) {
	const query = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== '') {
			query.set(key, String(value));
		}
	}
	const value = query.toString();
	return value ? `?${value}` : '';
}

function requireId(id) {
	if (id === undefined || id === null || id === '') {
		throw new Error('Doctor ID is required');
	}
	return encodeURIComponent(id);
}

const doctorService = {
	list(params) {
		return sendRequest(serializeQuery(params));
	},

	getById(id) {
		return sendRequest(`/${requireId(id)}`);
	},

	create(doctor) {
		return sendRequest('', { method: 'POST', body: JSON.stringify(doctor) });
	},

	update(id, doctor) {
		return sendRequest(`/${requireId(id)}`, {
			method: 'PUT',
			body: JSON.stringify(doctor),
		});
	},

	remove(id) {
		return sendRequest(`/${requireId(id)}`, { method: 'DELETE' });
	},
};

export default doctorService;
