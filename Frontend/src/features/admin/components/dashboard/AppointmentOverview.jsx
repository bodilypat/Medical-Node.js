/* ********************************************************************** */
/* File: #src/features/admin/components/dashboard/AppointmentOverview.jsx */
/* ********************************************************************** */

import { useMemo, useState } from 'react';

const statusStyles = {
	Confirmed: 'bg-emerald-50 text-emerald-700',
	Pending: 'bg-amber-50 text-amber-700',
	'Checked in': 'bg-sky-50 text-sky-700',
	Cancelled: 'bg-rose-50 text-rose-700',
};

export default function AppointmentOverview({ appointments = [], onViewAll, onAppointmentSelect }) {
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('All statuses');

	const filteredAppointments = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return appointments.filter((appointment) => {
			const matchesQuery = !normalizedQuery || [appointment.patient, appointment.doctor, appointment.department, appointment.id]
				.some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery));
			return matchesQuery && (statusFilter === 'All statuses' || appointment.status === statusFilter);
		});
	}, [appointments, query, statusFilter]);

	return (
		<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="appointment-overview-title">
			<div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
				<div>
					<h2 id="appointment-overview-title" className="text-lg font-semibold text-slate-900">Appointment overview</h2>
					<p className="mt-1 text-sm text-slate-500">Manage and track your latest appointments</p>
				</div>
				<button type="button" onClick={onViewAll} className="self-start rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:self-auto">
					View all appointments <span aria-hidden="true">→</span>
				</button>
			</div>

			<div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:px-6">
				<label className="relative flex-1">
					<span className="sr-only">Search appointments</span>
					<svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8.5 3a5.5 5.5 0 1 0 3.446 9.787l3.633 3.634a.75.75 0 1 0 1.061-1.061l-3.634-3.633A5.5 5.5 0 0 0 8.5 3ZM4.5 8.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" /></svg>
					<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient, doctor, ID..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
				</label>
				<label>
					<span className="sr-only">Filter by appointment status</span>
					<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-44">
						<option>All statuses</option>
						{Object.keys(statusStyles).map((status) => <option key={status}>{status}</option>)}
					</select>
				</label>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[760px] text-left text-sm">
					<thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
						<tr><th className="px-6 py-3">Patient</th><th className="px-6 py-3">Doctor / Department</th><th className="px-6 py-3">Date &amp; time</th><th className="px-6 py-3">Status</th><th className="px-6 py-3"><span className="sr-only">Appointment details</span></th></tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{filteredAppointments.map((appointment) => (
							<tr key={appointment.id} className="transition hover:bg-slate-50/70">
								<td className="whitespace-nowrap px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">{appointment.initials || appointment.patient?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><p className="font-medium text-slate-900">{appointment.patient}</p><p className="mt-0.5 text-xs text-slate-500">{appointment.id}</p></div></div></td>
								<td className="whitespace-nowrap px-6 py-4"><p className="font-medium text-slate-800">{appointment.doctor}</p><p className="mt-0.5 text-xs text-slate-500">{appointment.department}</p></td>
								<td className="whitespace-nowrap px-6 py-4"><p className="text-slate-800">{appointment.date}</p><p className="mt-0.5 text-xs text-slate-500">{appointment.time}</p></td>
								<td className="whitespace-nowrap px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[appointment.status] || 'bg-slate-100 text-slate-700'}`}>{appointment.status}</span></td>
								<td className="px-6 py-4 text-right"><button type="button" onClick={() => onAppointmentSelect?.(appointment)} aria-label={`View appointment ${appointment.id}`} className="rounded-md px-2 py-1 font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">Details</button></td>
							</tr>
						))}
						{filteredAppointments.length === 0 && <tr><td colSpan="5" className="px-6 py-10 text-center text-sm text-slate-500">{appointments.length ? 'No appointments match your search.' : 'No appointments to display.'}</td></tr>}
					</tbody>
				</table>
			</div>
			<div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-500">Showing {filteredAppointments.length} of {appointments.length} appointments</div>
		</section>
	);
}
