/* ********************************************************************** */
/* File: #src/features/admin/components/appointments/AppointmetStatus.jsx */
/* ********************************************************************** */

import React from "react";

const APPOINTMENT_STATUSES = {
	scheduled: { label: "Scheduled", color: "blue" },
	confirmed: { label: "Confirmed", color: "green" },
	completed: { label: "Completed", color: "emerald" },
	cancelled: { label: "Cancelled", color: "red" },
	"no-show": { label: "No show", color: "orange" },
	pending: { label: "Pending", color: "yellow" },
};

/** Render a consistently styled status badge for an appointment. */
export default function AppointmentStatus({ status = "pending", className = "" }) {
	const key = String(status).trim().toLowerCase().replace(/[_ ]+/g, "-");
	const details = APPOINTMENT_STATUSES[key];
	const label = details?.label ?? key.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());
	const color = details?.color ?? "gray";

	return (
		<span
			className={`inline-flex items-center rounded-full bg-${color}-100 px-2.5 py-1 text-xs font-medium text-${color}-800 ${className}`.trim()}
			role="status"
			aria-label={`Appointment status: ${label}`}
		>
			{label || "Pending"}
		</span>
	);
}
