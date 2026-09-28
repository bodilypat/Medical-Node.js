/* ********************************************* */
/* File: #src/features/admin/hooks/useReports.js */
/* ********************************************* */

import { useCallback, useEffect, useState } from 'react';

/** Fetches administrative reports and exposes loading/error state. */
export default function useReports({
	endpoint = '/api/admin/reports',
	filters = {},
	enabled = true,
} = {}) {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(enabled);
	const [error, setError] = useState(null);
	const filterKey = JSON.stringify(filters);

	const refetch = useCallback(async (extraFilters = {}) => {
		const params = new URLSearchParams({
			...JSON.parse(filterKey),
			...extraFilters,
		});
		const url = params.toString() ? `${endpoint}?${params}` : endpoint;

		setLoading(true);
		setError(null);
		try {
			const response = await fetch(url, {
				headers: { Accept: 'application/json' },
				credentials: 'include',
			});
			if (!response.ok) throw new Error(`Failed to load reports (${response.status})`);

			const result = await response.json();
			const rows = Array.isArray(result) ? result : result?.reports;
			if (!Array.isArray(rows)) throw new Error('Invalid reports response');
			setReports(rows);
			return rows;
		} catch (cause) {
			setError(cause);
			throw cause;
		} finally {
			setLoading(false);
		}
	}, [endpoint, filterKey]);

	useEffect(() => {
		if (!enabled) {
			setLoading(false);
			return undefined;
		}
		refetch().catch(() => {});
		return undefined;
	}, [enabled, refetch]);

	return { reports, loading, error, refetch, setReports };
}
