/* ************************************************************************ */
/* File: #src/features/admin/components/appointments/AppointmentDetails.jsx */
/* ************************************************************************ */

import React from "react";

const formatDate = (value) => {
	if (!value) return "—";
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? String(value)
		: new Intl.DateTimeFormat(undefined, {
				dateStyle: "medium",
				timeStyle: "short",
			}).format(date);
};

const formatPerson = (person) => {
	if (!person) return "—";
	if (typeof person === "string") return person;
	return (
		person.name ||
		person.fullName ||
		[person.firstName, person.lastName].filter(Boolean).join(" ") ||
		person.email ||
		"—"
	);
};

export default function AppointmentDetails({ appointment, onClose, onEdit, onCancel }) {
	if (!appointment) {
		return (
			<section className="appointment-details" aria-live="polite">
				<h2>Appointment details</h2>
				<p>Select an appointment to view its details.</p>
			</section>
		);
	}

	const details = [
		["Patient", formatPerson(appointment.patient || appointment.patientName)],
		["Patient ID", appointment.patientId || appointment.patient?._id],
		["Provider", formatPerson(appointment.provider || appointment.doctor || appointment.providerName)],
		["Date and time", formatDate(appointment.date || appointment.appointmentDate || appointment.startTime)],
		["Duration", appointment.duration ? `${appointment.duration} minutes` : null],
		["Type", appointment.type || appointment.appointmentType],
		["Location", formatPerson(appointment.location || appointment.clinic)],
		["Reason", appointment.reason || appointment.notes],
	];

	return (
		<section className="appointment-details" aria-labelledby="appointment-details-title">
			<header className="appointment-details__header">
				<div>
					<h2 id="appointment-details-title">Appointment details</h2>
					<p>Reference: {appointment._id || appointment.id || "—"}</p>
				</div>
				{onClose && (
					<button type="button" onClick={onClose} aria-label="Close appointment details">
						Close
					</button>
				)}
			</header>

			<p className="appointment-details__status">
				<span>Status</span> <strong>{appointment.status || "Scheduled"}</strong>
			</p>

			<dl className="appointment-details__list">
				{details.map(([label, value]) => (
					<div className="appointment-details__row" key={label}>
						<dt>{label}</dt>
						<dd>{value || "—"}</dd>
					</div>
				))}
			</dl>

			{(onEdit || onCancel) && (
				<footer className="appointment-details__actions">
					{onEdit && (
						<button type="button" onClick={() => onEdit(appointment)}>
							Edit appointment
						</button>
					)}
					{onCancel && (
						<button type="button" onClick={() => onCancel(appointment)}>
							Cancel appointment
						</button>
					)}
				</footer>
			)}
		</section>
	);
}
