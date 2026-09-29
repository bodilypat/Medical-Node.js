/* **************************************************** */
/* File: #src/features/laboratory/hooks/useLabOrders.js */
/* **************************************************** */

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ENDPOINT = '/api/lab-orders';

async function readResponse(response) {
	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Request failed (${response.status})`);
	}
	return response.status === 204 ? null : response.json();
}

/** Load and manage laboratory orders through the application's REST API. */
export default function useLabOrders({ endpoint = DEFAULT_ENDPOINT, enabled = true } = {}) {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(enabled);
	const [error, setError] = useState(null);

	const refresh = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await readResponse(await fetch(endpoint));
			const list = Array.isArray(result) ? result : result?.orders;
			setOrders(Array.isArray(list) ? list : []);
			return Array.isArray(list) ? list : [];
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, [endpoint]);

	useEffect(() => {
		if (enabled) refresh().catch(() => {});
	}, [enabled, refresh]);

	const createOrder = useCallback(async (order) => {
		const created = await readResponse(await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(order),
		}));
		if (created) setOrders((current) => [created, ...current]);
		return created;
	}, [endpoint]);

	const updateOrder = useCallback(async (id, updates) => {
		const updated = await readResponse(await fetch(`${endpoint}/${encodeURIComponent(id)}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		}));
		if (updated) {
			setOrders((current) => current.map((order) =>
				String(order.id ?? order._id) === String(id) ? updated : order,
			));
		}
		return updated;
	}, [endpoint]);

	const deleteOrder = useCallback(async (id) => {
		await readResponse(await fetch(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' }));
		setOrders((current) => current.filter((order) =>
			String(order.id ?? order._id) !== String(id),
		));
	}, [endpoint]);

	return { orders, loading, error, refresh, createOrder, updateOrder, deleteOrder };
}
