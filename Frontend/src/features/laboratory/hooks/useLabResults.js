/* ***************************************************** */
/* File: #src/features/laboratory/hooks/useLabResults.js */
/* ***************************************************** */

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_ENDPOINT = '/api/laboratory/results';

/** Fetch, filter, paginate, and refresh laboratory results. */
export default function useLabResults({
	endpoint = DEFAULT_ENDPOINT,
	initialFilters = {},
	initialPage = 1,
	initialLimit = 20,
} = {}) {
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(initialPage);
	const [limit, setLimit] = useState(initialLimit);
	const [filters, setFilters] = useState(initialFilters);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const requestRef = useRef(null);

	const refresh = useCallback(async () => {
		requestRef.current?.abort();
		const controller = new AbortController();
		requestRef.current = controller;
		setLoading(true);
		setError(null);

		const query = new URLSearchParams({ page: String(page), limit: String(limit) });
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
		});

		try {
			const response = await fetch(`${endpoint}?${query}`, { signal: controller.signal });
			if (!response.ok) throw new Error(`Failed to load laboratory results (${response.status})`);
			const payload = await response.json();
			const rows = Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [];
			setResults(rows);
			setTotal(Array.isArray(payload) ? rows.length : payload.total ?? rows.length);
		} catch (requestError) {
			if (requestError.name !== 'AbortError') setError(requestError);
		} finally {
			if (requestRef.current === controller) {
				requestRef.current = null;
				setLoading(false);
			}
		}
	}, [endpoint, filters, limit, page]);

	useEffect(() => {
		refresh();
		return () => requestRef.current?.abort();
	}, [refresh]);

	const updateFilters = useCallback((nextFilters) => {
		setFilters((current) => ({ ...current, ...nextFilters }));
		setPage(1);
	}, []);

	return {
		results,
		total,
		page,
		limit,
		filters,
		loading,
		error,
		setPage,
		setLimit,
		setFilters: updateFilters,
		refresh,
	};
}
