/* ************************************************************************* */
/* File: #src/features/doctors/components/appointments/AppointmentStatus.jsx */
/* ************************************************************************* */

import React from 'react';

const STATUSES = [
	{ value: 'scheduled', label: 'Scheduled', color: '#2563eb' },
	{ value: 'confirmed', label: 'Confirmed', color: '#059669' },
	{ value: 'completed', label: 'Completed', color: '#64748b' },
	{ value: 'cancelled', label: 'Cancelled', color: '#dc2626' },
	{ value: 'no-show', label: 'No show', color: '#d97706' },
];

/**
 * Displays and updates the status of a doctor's appointment.
 * `onChange` receives the selected status value.
 */
const AppointmentStatus = ({
	status = 'scheduled',
	onChange,
	disabled = false,
	compact = false,
}) => {
	const current = STATUSES.find((item) => item.value === status) || {
		value: status,
		label: status || 'Unknown',
		color: '#64748b',
	};

	if (compact) {
		return (
			<span
				aria-label={`Appointment status: ${current.label}`}
				style={{
					alignItems: 'center',
					backgroundColor: `${current.color}18`,
					borderRadius: 999,
					color: current.color,
					display: 'inline-flex',
					fontSize: 12,
					fontWeight: 600,
					gap: 6,
					padding: '4px 10px',
					textTransform: 'capitalize',
				}}
			>
				<span aria-hidden="true" style={{ backgroundColor: current.color, borderRadius: '50%', height: 7, width: 7 }} />
				{current.label}
			</span>
		);
	}

	return (
		<label style={{ display: 'inline-flex', flexDirection: 'column', gap: 6 }}>
			<span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>Appointment status</span>
			<select
				aria-label="Appointment status"
				disabled={disabled}
				onChange={(event) => onChange?.(event.target.value)}
				value={current.value}
				style={{
					border: `1px solid ${current.color}`,
					borderRadius: 6,
					color: current.color,
					cursor: disabled ? 'not-allowed' : 'pointer',
					fontWeight: 600,
					minWidth: 150,
					padding: '8px 10px',
				}}
			>
				{STATUSES.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</label>
	);
};

export { STATUSES };
export default AppointmentStatus;
