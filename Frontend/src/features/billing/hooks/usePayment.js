/* *********************************************** */
/* File: #src/features/billing/hooks/usePayment.js */
/* *********************************************** */

import { useCallback, useState } from 'react';

const DEFAULT_ENDPOINT = '/api/billing/payments';

async function sendRequest(url, options = {}) {
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
	return response.status === 204 ? null : response.json();
}

/** React hook for listing and managing medical billing payments. */
export default function usePayment({ endpoint = DEFAULT_ENDPOINT, initialPayments = [] } = {}) {
	const [payments, setPayments] = useState(initialPayments);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const execute = useCallback(async (operation) => {
		setLoading(true);
		setError(null);
		try {
			return await operation();
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchPayments = useCallback(() => execute(async () => {
		const result = await sendRequest(endpoint);
		const records = Array.isArray(result) ? result : result?.payments ?? [];
		setPayments(records);
		return records;
	}), [endpoint, execute]);

	const createPayment = useCallback((payment) => execute(async () => {
		const result = await sendRequest(endpoint, {
			method: 'POST',
			body: JSON.stringify(payment),
		});
		const created = result?.payment ?? result;
		if (created) setPayments((current) => [...current, created]);
		return created;
	}), [endpoint, execute]);

	const updatePayment = useCallback((id, changes) => execute(async () => {
		const result = await sendRequest(`${endpoint}/${encodeURIComponent(id)}`, {
			method: 'PATCH',
			body: JSON.stringify(changes),
		});
		const updated = result?.payment ?? result;
		if (updated) {
			setPayments((current) => current.map((item) => item.id === id ? updated : item));
		}
		return updated;
	}), [endpoint, execute]);

	const deletePayment = useCallback((id) => execute(async () => {
		await sendRequest(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
		setPayments((current) => current.filter((item) => item.id !== id));
	}), [endpoint, execute]);

	return { payments, loading, error, fetchPayments, createPayment, updatePayment, deletePayment };
}
