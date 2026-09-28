/* *************************************************************** */
/* File: #src/features/doctors/components/patients/PatientCard.jsx */
/* *************************************************************** */

import React from 'react';

const statusStyles = {
	scheduled: 'bg-blue-50 text-blue-700',
	confirmed: 'bg-emerald-50 text-emerald-700',
	completed: 'bg-slate-100 text-slate-700',
	cancelled: 'bg-red-50 text-red-700',
	pending: 'bg-amber-50 text-amber-700',
};

const formatDate = (value) => {
	if (!value) return 'Date not set';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (value) => {
	if (!value) return 'Not set';
	const date = new Date(`1970-01-01T${value}`);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export default function PatientCard({
	patient = {},
	appointment = {},
	onView,
	onReschedule,
	onCancel,
}) {
	const name = patient.name || [patient.firstName, patient.lastName].filter(Boolean).join(' ') || 'Unnamed patient';
	const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
	const status = String(appointment.status || 'scheduled').toLowerCase();
	const date = appointment.date || appointment.appointmentDate;
	const canManage = status !== 'cancelled' && status !== 'completed';

	return (
		<article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					{patient.avatar ? (
						<img className="h-12 w-12 rounded-full object-cover" src={patient.avatar} alt={name} />
					) : (
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">{initials}</div>
					)}
					<div className="min-w-0">
						<h3 className="truncate font-semibold text-slate-900">{name}</h3>
						<p className="truncate text-sm text-slate-500">
							{patient.age ? `${patient.age} years` : 'Patient'}{patient.gender ? ` • ${patient.gender}` : ''}
						</p>
					</div>
				</div>
				<span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
					{status}
				</span>
			</div>

			<div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-sm">
				<div><p className="text-slate-500">Appointment</p><p className="font-medium text-slate-800">{formatDate(date)}</p></div>
				<div><p className="text-slate-500">Time</p><p className="font-medium text-slate-800">{formatTime(appointment.time)}</p></div>
				<div className="col-span-2"><p className="text-slate-500">Reason</p><p className="truncate font-medium text-slate-800">{appointment.reason || appointment.type || 'General consultation'}</p></div>
			</div>

			<div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
				<button type="button" onClick={() => onView?.(patient, appointment)} className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">View details</button>
				{canManage && <>
					<button type="button" onClick={() => onReschedule?.(patient, appointment)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Reschedule</button>
					<button type="button" onClick={() => onCancel?.(patient, appointment)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Cancel</button>
				</>}
			</div>
		</article>
	);
}
