/* ************************************************ */
/* File: #src/features/billing/hooks/useInvoices.js */
/* ************************************************ */

import { useCallback, useEffect, useState } from 'react';

const INVOICES_URL = '/api/billing/invoices';

/** Load and manage invoices from the billing API. */
export function useInvoices() {
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refresh = useCallback(async (signal) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(INVOICES_URL, { signal });
			if (!response.ok) throw new Error(`Failed to load invoices (${response.status})`);
			const result = await response.json();
			const rows = Array.isArray(result) ? result : result.invoices;
			if (!Array.isArray(rows)) throw new Error('Invalid invoice response');
			setInvoices(rows);
			return rows;
		} catch (cause) {
			if (cause.name !== 'AbortError') setError(cause);
			throw cause;
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		refresh(controller.signal).catch(() => {});
		return () => controller.abort();
	}, [refresh]);

	const createInvoice = useCallback(async (invoice) => {
		const response = await fetch(INVOICES_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(invoice),
		});
		if (!response.ok) throw new Error(`Failed to create invoice (${response.status})`);
		const created = await response.json();
		setInvoices((current) => [created, ...current]);
		return created;
	}, []);

	return { invoices, loading, error, refresh: () => refresh(), createInvoice };
}

export default useInvoices;
