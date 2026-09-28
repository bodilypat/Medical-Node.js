/* *************************************************** */
/* File: #src/features/admin/services/reportService.js */
/* *************************************************** */

const API_BASE_URL = '/api/admin/reports';

async function request(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			...(options.body ? { 'Content-Type': 'application/json' } : {}),
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		let message = `Report request failed (${response.status})`;
		try {
			const error = await response.json();
			message = error.message || error.error || message;
		} catch {
			// Keep the status-based message when the response has no JSON body.
		}
		const failure = new Error(message);
		failure.status = response.status;
		throw failure;
	}

	if (response.status === 204) return null;
	return response.json();
}

function queryString(filters = {}) {
	const params = new URLSearchParams();
	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			params.set(key, String(value));
		}
	});
	const query = params.toString();
	return query ? `?${query}` : '';
}

const reportService = {
	/** List administrative reports using optional date, type, and pagination filters. */
	getReports(filters = {}, options = {}) {
		return request(queryString(filters), { signal: options.signal });
	},

	/** Retrieve a single report by its identifier. */
	getReport(reportId, options = {}) {
		if (!reportId) throw new TypeError('reportId is required');
		return request(`/${encodeURIComponent(reportId)}`, { signal: options.signal });
	},

	/** Generate a report from the supplied report type and filter parameters. */
	generateReport(payload, options = {}) {
		if (!payload || typeof payload !== 'object') {
			throw new TypeError('A report configuration is required');
		}
		return request('/generate', {
			method: 'POST',
			body: JSON.stringify(payload),
			signal: options.signal,
		});
	},

	/** Download a generated report in the requested format. */
	async downloadReport(reportId, format = 'csv', options = {}) {
		if (!reportId) throw new TypeError('reportId is required');
		const suffix = queryString({ format });
		const response = await fetch(
			`${API_BASE_URL}/${encodeURIComponent(reportId)}/download${suffix}`,
			{ credentials: 'include', signal: options.signal },
		);
		if (!response.ok) {
			const failure = new Error(`Report download failed (${response.status})`);
			failure.status = response.status;
			throw failure;
		}
		return response.blob();
	},
};

export { reportService };
export default reportService;
