/* ********************************************** */
/* File: #src/featurs/admin/hooks/useDashboard.js */
/* ********************************************** */

import { useCallback, useEffect, useState } from 'react';

const DASHBOARD_URL = '/api/admin/dashboard';

const EMPTY_DASHBOARD = {
	totalPatients: 0,
	totalDoctors: 0,
	totalAppointments: 0,
	pendingAppointments: 0,
	recentAppointments: [],
};

/** Loads and exposes the data shown on the admin dashboard. */
export default function useDashboard() {
	const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refresh = useCallback(async (signal) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(DASHBOARD_URL, {
				method: 'GET',
				credentials: 'include',
				headers: { Accept: 'application/json' },
				signal,
			});

			if (!response.ok) {
				throw new Error(`Unable to load dashboard (${response.status})`);
			}

			const result = await response.json();
			setDashboard({ ...EMPTY_DASHBOARD, ...(result.data ?? result) });
		} catch (requestError) {
			if (requestError.name !== 'AbortError') {
				setError(requestError.message || 'Unable to load dashboard');
			}
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		refresh(controller.signal);
		return () => controller.abort();
	}, [refresh]);

	return { dashboard, loading, error, refresh: () => refresh() };
}
