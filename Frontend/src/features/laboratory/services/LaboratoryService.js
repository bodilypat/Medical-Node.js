/* ************************************************************ */
/* File: #src/features/laboratory/services/LaboratoryService.js */
/* ************************************************************ */

const API_BASE_URL = '/api/laboratory';

async function request(path, { method = 'GET', body, signal, headers = {} } = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		method,
		signal,
		headers: {
			Accept: 'application/json',
			...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
			...headers,
		},
		...(body === undefined ? {} : { body: JSON.stringify(body) }),
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		const error = new Error(errorBody?.message || `Laboratory request failed (${response.status})`);
		error.status = response.status;
		error.details = errorBody;
		throw error;
	}

	if (response.status === 204) return null;
	return response.json();
}

const encodeId = (id) => encodeURIComponent(id);

/** Laboratory management API: tests, orders, specimens, and results. */
const LaboratoryService = {
	listTests(params = {}, options = {}) {
		const query = new URLSearchParams(params).toString();
		return request(`/tests${query ? `?${query}` : ''}`, options);
	},

	getTest(id, options = {}) {
		return request(`/tests/${encodeId(id)}`, options);
	},

	createTest(data, options = {}) {
		return request('/tests', { ...options, method: 'POST', body: data });
	},

	updateTest(id, data, options = {}) {
		return request(`/tests/${encodeId(id)}`, { ...options, method: 'PUT', body: data });
	},

	deleteTest(id, options = {}) {
		return request(`/tests/${encodeId(id)}`, { ...options, method: 'DELETE' });
	},

	listOrders(params = {}, options = {}) {
		const query = new URLSearchParams(params).toString();
		return request(`/orders${query ? `?${query}` : ''}`, options);
	},

	getOrder(id, options = {}) {
		return request(`/orders/${encodeId(id)}`, options);
	},

	createOrder(data, options = {}) {
		return request('/orders', { ...options, method: 'POST', body: data });
	},

	updateOrder(id, data, options = {}) {
		return request(`/orders/${encodeId(id)}`, { ...options, method: 'PUT', body: data });
	},

	updateOrderStatus(id, status, options = {}) {
		return request(`/orders/${encodeId(id)}/status`, {
			...options,
			method: 'PATCH',
			body: { status },
		});
	},

	listSpecimens(params = {}, options = {}) {
		const query = new URLSearchParams(params).toString();
		return request(`/specimens${query ? `?${query}` : ''}`, options);
	},

	updateSpecimen(id, data, options = {}) {
		return request(`/specimens/${encodeId(id)}`, { ...options, method: 'PATCH', body: data });
	},

	getResults(orderId, options = {}) {
		return request(`/orders/${encodeId(orderId)}/results`, options);
	},

	submitResults(orderId, results, options = {}) {
		return request(`/orders/${encodeId(orderId)}/results`, {
			...options,
			method: 'POST',
			body: { results },
		});
	},
};

export default LaboratoryService;
export { LaboratoryService };
