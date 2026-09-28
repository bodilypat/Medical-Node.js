/* ************************************************************************ */
/* File: #src/features/doctors/components/appointments/AppointmentTable.jsx */
/* ************************************************************************ */

import React, { useMemo, useState } from 'react';

const STATUS_OPTIONS = ['All', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'];

const formatDate = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatTime = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
};

/** Appointment management table for the doctor's dashboard. */
export default function AppointmentTable({
	appointments = [],
	loading = false,
	error = '',
	onView,
	onEdit,
	onCancel,
	onStatusChange,
}) {
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('All');

	const filteredAppointments = useMemo(() => {
		const search = query.trim().toLowerCase();
		return appointments.filter((appointment) => {
			const patient = appointment.patient || appointment.patientName || {};
			const patientName = typeof patient === 'string'
				? patient
				: `${patient.firstName || ''} ${patient.lastName || ''}`.trim();
			const matchesSearch = !search || [
				patientName,
				appointment.reason,
				appointment.type,
				appointment.date,
			].some((value) => String(value || '').toLowerCase().includes(search));
			const matchesStatus = status === 'All'
				|| String(appointment.status || '').toLowerCase() === status.toLowerCase();
			return matchesSearch && matchesStatus;
		});
	}, [appointments, query, status]);

	const getPatientName = (appointment) => {
		const patient = appointment.patient || appointment.patientName;
		if (typeof patient === 'string') return patient;
		return `${patient?.firstName || ''} ${patient?.lastName || ''}`.trim() || 'Unknown patient';
	};

	return (
		<section className="appointment-table" aria-label="Appointment management">
			<div className="appointment-table__toolbar">
				<input
					type="search"
					value={query}
					placeholder="Search patient or appointment..."
					aria-label="Search appointments"
					onChange={(event) => setQuery(event.target.value)}
				/>
				<select value={status} aria-label="Filter by status" onChange={(event) => setStatus(event.target.value)}>
					{STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
				</select>
			</div>

			{error && <p className="appointment-table__error" role="alert">{error}</p>}
			<div className="appointment-table__responsive">
				<table>
					<thead>
						<tr><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Actions</th></tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan="6" className="appointment-table__empty">Loading appointments...</td></tr>
						) : filteredAppointments.length === 0 ? (
							<tr><td colSpan="6" className="appointment-table__empty">No appointments found.</td></tr>
						) : filteredAppointments.map((appointment) => {
							const id = appointment.id || appointment._id;
							const appointmentStatus = appointment.status || 'Scheduled';
							return (
								<tr key={id}>
									<td>{getPatientName(appointment)}</td>
									<td>{formatDate(appointment.date || appointment.startAt)}</td>
									<td>{formatTime(appointment.time || appointment.startAt)}</td>
									<td>{appointment.type || appointment.reason || 'Consultation'}</td>
									<td>
										<select
											className={`status status--${appointmentStatus.toLowerCase()}`}
											value={appointmentStatus}
											aria-label={`Status for ${getPatientName(appointment)}`}
											onChange={(event) => onStatusChange?.(appointment, event.target.value)}
										>
											{STATUS_OPTIONS.slice(1).map((option) => <option key={option}>{option}</option>)}
										</select>
									</td>
									<td className="appointment-table__actions">
										<button type="button" onClick={() => onView?.(appointment)}>View</button>
										<button type="button" onClick={() => onEdit?.(appointment)}>Edit</button>
										{appointmentStatus.toLowerCase() !== 'cancelled' && (
											<button type="button" onClick={() => onCancel?.(appointment)}>Cancel</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
}
