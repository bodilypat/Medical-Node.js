/* ****************************************************** */
/* File: #src/features/admin/services/dashboardService.js */
/* ****************************************************** */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const dashboardApi = axios.create({
	baseURL: `${API_URL}/admin`,
	headers: { 'Content-Type': 'application/json' },
});

dashboardApi.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

const getData = async (request) => {
	const response = await request;
	return response.data;
};

/** Get the summary cards and activity data for the admin dashboard. */
export const getDashboardOverview = (params = {}) =>
	getData(dashboardApi.get('/dashboard', { params }));

/** Get dashboard statistics for a selected date range. */
export const getDashboardStats = (params = {}) =>
	getData(dashboardApi.get('/dashboard/stats', { params }));

/** Get recent appointments, registrations, or other admin activity. */
export const getRecentActivity = (params = {}) =>
	getData(dashboardApi.get('/dashboard/activity', { params }));

/** Get appointment counts grouped by status. */
export const getAppointmentSummary = (params = {}) =>
	getData(dashboardApi.get('/appointments/summary', { params }));

/** Get patient and staff totals used by dashboard charts. */
export const getUserSummary = (params = {}) =>
	getData(dashboardApi.get('/users/summary', { params }));

export default {
	getDashboardOverview,
	getDashboardStats,
	getRecentActivity,
	getAppointmentSummary,
	getUserSummary,
};
