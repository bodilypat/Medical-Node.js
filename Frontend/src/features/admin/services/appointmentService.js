/* ******************************************************* */
/* File: #src/feature/admin/services/appointmentService.js */
/* ******************************************************* */
import axios from 'axios';

const API_URL = `${(import.meta.env?.VITE_API_URL || '/api').replace(/\/$/, '')}/appointments`;

const handleRequest = async (config) => {
	try {
		const { data } = await axios(config);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || error.message || 'Appointment request failed.';
		throw new Error(message);
	}
};

const requireId = (id) => {
	if (id === undefined || id === null || id === '') throw new Error('Appointment ID is required.');
	return encodeURIComponent(id);
};

export const getAppointments = (params = {}) =>
	handleRequest({ method: 'get', url: API_URL, params });

export const getAppointmentById = (id) =>
	handleRequest({ method: 'get', url: `${API_URL}/${requireId(id)}` });

export const createAppointment = (appointment) => {
	if (!appointment || typeof appointment !== 'object') throw new Error('Appointment details are required.');
	return handleRequest({ method: 'post', url: API_URL, data: appointment });
};

export const updateAppointment = (id, appointment) => {
	if (!appointment || typeof appointment !== 'object') throw new Error('Appointment details are required.');
	return handleRequest({ method: 'put', url: `${API_URL}/${requireId(id)}`, data: appointment });
};

export const updateAppointmentStatus = (id, status) => {
	if (!status) throw new Error('Appointment status is required.');
	return handleRequest({
		method: 'patch',
		url: `${API_URL}/${requireId(id)}/status`,
		data: { status },
	});
};

export const deleteAppointment = (id) =>
	handleRequest({ method: 'delete', url: `${API_URL}/${requireId(id)}` });

export default {
	getAppointments,
	getAppointmentById,
	createAppointment,
	updateAppointment,
	updateAppointmentStatus,
	deleteAppointment,
};

