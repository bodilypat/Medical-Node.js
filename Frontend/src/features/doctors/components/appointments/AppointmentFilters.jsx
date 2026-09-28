/* ************************************************************************** */
/* File: #src/features/doctors/components/appointments/AppointmentFilters.jsx */
/* ************************************************************************** */

import React from 'react';

const DEFAULT_FILTERS = {
	search: '',
	status: 'all',
	date: '',
	type: 'all',
};

/**
 * Filters used by the doctor's appointment management view.
 * Supports both controlled and uncontrolled usage.
 */
export default function AppointmentFilters({
	filters,
	onChange,
	onReset,
	statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'],
	typeOptions = ['all', 'in-person', 'telemedicine'],
}) {
	const isControlled = filters != null;
	const [localFilters, setLocalFilters] = React.useState({ ...DEFAULT_FILTERS });
	const values = { ...DEFAULT_FILTERS, ...(isControlled ? filters : localFilters) };

	const updateFilter = (name, value) => {
		const nextFilters = { ...values, [name]: value };
		if (!isControlled) setLocalFilters(nextFilters);
		onChange?.(nextFilters);
	};

	const resetFilters = () => {
		if (!isControlled) setLocalFilters({ ...DEFAULT_FILTERS });
		onReset?.();
		onChange?.({ ...DEFAULT_FILTERS });
	};

	return (
		<section className="appointment-filters" aria-label="Appointment filters">
			<div className="appointment-filters__search">
				<label htmlFor="appointment-search">Search appointments</label>
				<input
					id="appointment-search"
					type="search"
					value={values.search}
					placeholder="Search patient or appointment..."
					onChange={(event) => updateFilter('search', event.target.value)}
				/>
			</div>

			<div className="appointment-filters__fields">
				<div>
					<label htmlFor="appointment-date">Date</label>
					<input
						id="appointment-date"
						type="date"
						value={values.date}
						onChange={(event) => updateFilter('date', event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="appointment-status">Status</label>
					<select
						id="appointment-status"
						value={values.status}
						onChange={(event) => updateFilter('status', event.target.value)}
					>
						{statusOptions.map((status) => (
							<option key={status} value={status}>
								{status === 'all' ? 'All statuses' : status.replace(/-/g, ' ').replace(/^\w/, (letter) => letter.toUpperCase())}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="appointment-type">Appointment type</label>
					<select
						id="appointment-type"
						value={values.type}
						onChange={(event) => updateFilter('type', event.target.value)}
					>
						{typeOptions.map((type) => (
							<option key={type} value={type}>
								{type === 'all' ? 'All types' : type.replace(/-/g, ' ').replace(/^\w/, (letter) => letter.toUpperCase())}
							</option>
						))}
					</select>
				</div>

				<button type="button" className="appointment-filters__reset" onClick={resetFilters}>
					Reset filters
				</button>
			</div>
		</section>
	);
}

AppointmentFilters.defaultProps = {
	filters: undefined,
	onChange: undefined,
	onReset: undefined,
};
