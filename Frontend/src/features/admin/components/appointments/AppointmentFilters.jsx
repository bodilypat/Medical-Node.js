/* ************************************************************************ */
/* File: #src/features/admin/components/appointments/AppointmentFilters.jsx */
/* ************************************************************************ */

import React from 'react';

/** Filters for the admin appointments list. */
export default function AppointmentFilters({
	filters = {},
	onChange,
	onReset,
	providers = [],
	patients = [],
}) {
	const update = (key) => (event) => {
		onChange?.({ ...filters, [key]: event.target.value });
	};

	return (
		<form
			className="appointment-filters"
			aria-label="Filter appointments"
			onSubmit={(event) => event.preventDefault()}
		>
			<div className="appointment-filters__field">
				<label htmlFor="appointment-search">Search</label>
				<input
					id="appointment-search"
					type="search"
					placeholder="Patient or appointment ID"
					value={filters.search ?? ''}
					onChange={update('search')}
				/>
			</div>

			<div className="appointment-filters__field">
				<label htmlFor="appointment-status">Status</label>
				<select id="appointment-status" value={filters.status ?? ''} onChange={update('status')}>
					<option value="">All statuses</option>
					<option value="pending">Pending</option>
					<option value="confirmed">Confirmed</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div>

			<div className="appointment-filters__field">
				<label htmlFor="appointment-date">Date</label>
				<input
					id="appointment-date"
					type="date"
					value={filters.date ?? ''}
					onChange={update('date')}
				/>
			</div>

			<div className="appointment-filters__field">
				<label htmlFor="appointment-provider">Provider</label>
				<select
					id="appointment-provider"
					value={filters.providerId ?? ''}
					onChange={update('providerId')}
				>
					<option value="">All providers</option>
					{providers.map((provider) => (
						<option key={provider.id ?? provider._id} value={provider.id ?? provider._id}>
							{provider.name ?? provider.fullName ?? 'Provider'}
						</option>
					))}
				</select>
			</div>

			<div className="appointment-filters__field">
				<label htmlFor="appointment-patient">Patient</label>
				<select
					id="appointment-patient"
					value={filters.patientId ?? ''}
					onChange={update('patientId')}
				>
					<option value="">All patients</option>
					{patients.map((patient) => (
						<option key={patient.id ?? patient._id} value={patient.id ?? patient._id}>
							{patient.name ?? patient.fullName ?? 'Patient'}
						</option>
					))}
				</select>
			</div>

			<button type="button" className="appointment-filters__reset" onClick={onReset}>
				Clear filters
			</button>
		</form>
	);
}
