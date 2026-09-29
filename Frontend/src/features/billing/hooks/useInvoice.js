/* *********************************************** */
/* File: #src/features/billing/hooks/useInvoice.js */
/* *********************************************** */

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ENDPOINT = '/api/invoices';

/** Fetch and manage invoices for the billing feature. */
export default function useInvoice({ endpoint = DEFAULT_ENDPOINT, autoLoad = true } = {}) {
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url, options = {}) => {
		const response = await fetch(url, {
			...options,
			headers: {
				...(options.body ? { 'Content-Type': 'application/json' } : {}),
				...options.headers,
			},
		});
		if (!response.ok) {
			throw new Error((await response.text()) || `Invoice request failed (${response.status})`);
		}
		return response.status === 204 ? null : response.json();
	}, []);

	const loadInvoices = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await request(endpoint);
			const records = Array.isArray(result) ? result : result?.invoices;
			setInvoices(Array.isArray(records) ? records : []);
			return Array.isArray(records) ? records : [];
		} catch (cause) {
			setError(cause);
			throw cause;
		} finally {
			setLoading(false);
		}
	}, [endpoint, request]);

	const createInvoice = useCallback(async (invoice) => {
		setError(null);
		try {
			const created = await request(endpoint, { method: 'POST', body: JSON.stringify(invoice) });
			if (created) setInvoices((current) => [...current, created]);
			return created;
		} catch (cause) {
			setError(cause);
			throw cause;
		}
	}, [endpoint, request]);

	const updateInvoice = useCallback(async (id, changes) => {
		setError(null);
		try {
			const updated = await request(`${endpoint}/${encodeURIComponent(id)}`, {
				method: 'PATCH',
				body: JSON.stringify(changes),
			});
			if (updated) {
				setInvoices((current) => current.map((invoice) =>
					String(invoice.id) === String(id) ? updated : invoice,
				));
			}
			return updated;
		} catch (cause) {
			setError(cause);
			throw cause;
		}
	}, [endpoint, request]);

	const deleteInvoice = useCallback(async (id) => {
		setError(null);
		try {
			await request(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
			setInvoices((current) => current.filter((invoice) => String(invoice.id) !== String(id)));
		} catch (cause) {
			setError(cause);
			throw cause;
		}
	}, [endpoint, request]);

	useEffect(() => {
		if (autoLoad) loadInvoices().catch(() => {});
	}, [autoLoad, loadInvoices]);

	return { invoices, loading, error, loadInvoices, createInvoice, updateInvoice, deleteInvoice };
}
