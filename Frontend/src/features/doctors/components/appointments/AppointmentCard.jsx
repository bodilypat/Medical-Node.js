/* *********************************************************************** */
/* File: #src/features/doctors/components/appointments/AppointmentCard.jsx */
/* *********************************************************************** */

import React from 'react';

const statusClasses = {
	scheduled: 'bg-blue-100 text-blue-700',
	confirmed: 'bg-emerald-100 text-emerald-700',
	completed: 'bg-slate-100 text-slate-700',
	cancelled: 'bg-red-100 text-red-700',
	'no-show': 'bg-amber-100 text-amber-700',
};

const formatDate = (value) => {
	if (!value) return 'Date not set';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (value) => {
	if (!value) return 'Time not set';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
};

export default function AppointmentCard({
	appointment = {}, onView, onConfirm, onComplete, onCancel, onReschedule,
}) {
	const { patient = {}, date, startTime, time, type = 'Consultation', status = 'scheduled', notes } = appointment;
	const currentStatus = String(status).toLowerCase();
	const patientName = patient.name || patient.fullName || appointment.patientName || 'Unknown patient';
	const initials = patientName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
	const manageable = !['cancelled', 'completed', 'no-show'].includes(currentStatus);

	return (
		<article className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-appointment-id={appointment.id}>
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div className="flex items-center gap-3">
					{patient.avatar ? <img src={patient.avatar} alt={patientName} className="h-12 w-12 rounded-full object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">{initials}</div>}
					<div><h3 className="font-semibold text-slate-900">{patientName}</h3><p className="text-sm text-slate-500">{type}</p></div>
				</div>
				<span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[currentStatus] || statusClasses.scheduled}`}>{currentStatus.replace('-', ' ')}</span>
			</div>
			<div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
				<div>📅 <strong className="font-medium text-slate-800">{formatDate(date)}</strong></div>
				<div>🕒 <strong className="font-medium text-slate-800">{formatTime(startTime || time)}</strong></div>
				{patient.phone && <div>☎ {patient.phone}</div>}
				{patient.email && <div className="truncate">✉ {patient.email}</div>}
			</div>
			{notes && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{notes}</p>}
			<div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
				<button type="button" onClick={() => onView?.(appointment)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">View details</button>
				{manageable && currentStatus === 'scheduled' && onConfirm && <button type="button" onClick={() => onConfirm(appointment)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Confirm</button>}
				{manageable && onComplete && <button type="button" onClick={() => onComplete(appointment)} className="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700">Mark completed</button>}
				{manageable && onReschedule && <button type="button" onClick={() => onReschedule(appointment)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">Reschedule</button>}
				{manageable && onCancel && <button type="button" onClick={() => onCancel(appointment)} className="rounded-lg px-3 py-2 text-sm font-medium text-red-600">Cancel</button>}
			</div>
		</article>
	);
}

