/* ******************************************* */
/* File: #src/features/admin/hooks/useStats.js */
/* ******************************************* */

import { useCallback, useEffect, useState } from 'react';

const EMPTY_STATS = {
	patients: 0,
	doctors: 0,
	appointments: 0,
	revenue: 0,
};

/** Fetches the summary metrics displayed on the admin dashboard. */
export default function useStats() {
	const [stats, setStats] = useState(EMPTY_STATS);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refetch = useCallback(async (signal) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch('/api/admin/stats', { signal });
			if (!response.ok) {
				throw new Error(`Failed to load admin statistics (${response.status})`);
			}

			const payload = await response.json();
			setStats({ ...EMPTY_STATS, ...(payload.data ?? payload) });
		} catch (err) {
			if (err.name !== 'AbortError') setError(err);
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		refetch(controller.signal);
		return () => controller.abort();
	}, [refetch]);

	return { stats, loading, error, refetch: () => refetch() };
}
