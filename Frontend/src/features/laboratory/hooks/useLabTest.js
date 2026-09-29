/* ************************************************** */
/* File: #src/features/laboratory/hooks/useLabTest.js */
/* ************************************************** */

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ENDPOINT = '/api/lab-tests';

async function sendRequest(url, options = {}) {
	const response = await fetch(url, {
		...options,
		headers: { 'Content-Type': 'application/json', ...options.headers },
	});

	if (!response.ok) {
		const detail = await response.text();
		throw new Error(detail || `Laboratory request failed (${response.status})`);
	}

	if (response.status === 204) return null;
	return response.json();
}

/** Fetch and manage laboratory test records through the laboratory API. */
export function useLabTest(endpoint = DEFAULT_ENDPOINT) {
	const [labTests, setLabTests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refresh = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await sendRequest(endpoint);
			const records = Array.isArray(result) ? result : result?.data;
			setLabTests(Array.isArray(records) ? records : []);
			return records;
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, [endpoint]);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);
		sendRequest(endpoint)
			.then((result) => {
				if (!mounted) return;
				const records = Array.isArray(result) ? result : result?.data;
				setLabTests(Array.isArray(records) ? records : []);
			})
			.catch((err) => {
				if (mounted) setError(err);
			})
			.finally(() => {
				if (mounted) setLoading(false);
			});
		return () => { mounted = false; };
	}, [endpoint]);

	const createLabTest = useCallback(async (values) => {
		const record = await sendRequest(endpoint, {
			method: 'POST',
			body: JSON.stringify(values),
		});
		await refresh();
		return record;
	}, [endpoint, refresh]);

	const updateLabTest = useCallback(async (id, values) => {
		const record = await sendRequest(`${endpoint}/${encodeURIComponent(id)}`, {
			method: 'PUT',
			body: JSON.stringify(values),
		});
		await refresh();
		return record;
	}, [endpoint, refresh]);

	const deleteLabTest = useCallback(async (id) => {
		await sendRequest(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
		setLabTests((records) => records.filter((record) => record.id !== id && record._id !== id));
	}, [endpoint]);

	return { labTests, loading, error, refresh, createLabTest, updateLabTest, deleteLabTest };
}

export default useLabTest;
