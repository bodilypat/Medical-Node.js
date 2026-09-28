/* ************************************************ */
/* File: #src/features/admin/pages/Appointments.jsx */
/* ************************************************ */
import { useMemo, useState } from 'react';

// Appointment records should be supplied by the application data source.
const initialAppointments = [];

const statusClasses = {
	Confirmed: 'bg-emerald-50 text-emerald-700',
	'Checked in': 'bg-blue-50 text-blue-700',
	Pending: 'bg-amber-50 text-amber-700',
	Cancelled: 'bg-rose-50 text-rose-700',
	Completed: 'bg-slate-100 text-slate-700',
};

export default function Appointments() {
	const [appointments, setAppointments] = useState(initialAppointments);
	const [search, setSearch] = useState('');
	const [filterStatus, setFilterStatus] = useState('All statuses');
	const [filterDate, setFilterDate] = useState('');

	const filtered = useMemo(() => appointments.filter((appointment) => {
		const text = `${appointment.patient} ${appointment.doctor} ${appointment.specialty} ${appointment.id}`.toLowerCase();
		return text.includes(search.toLowerCase())
			&& (filterStatus === 'All statuses' || appointment.status === filterStatus)
			&& (!filterDate || appointment.date === filterDate);
	}), [appointments, search, filterStatus, filterDate]);

	const todaysAppointments = appointments.filter((item) => !filterDate || item.date === filterDate);
	const updateStatus = (id, status) => setAppointments((items) => items.map((item) => item.id === id ? { ...item, status } : item));
	return (
		<main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-700">Administration / Scheduling</p>
						<h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
						<p className="mt-2 text-sm text-slate-500">Manage patient visits and your care team’s schedule.</p>
					</div>
					<button type="button" disabled title="Appointment creation is not connected to a scheduling data source" className="cursor-not-allowed rounded-lg bg-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600">+ New appointment</button>
				</header>

				<section aria-label="Appointment summary" className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{[
						['Appointments', todaysAppointments.length, 'Scheduled for selected day'],
						['Confirmed', todaysAppointments.filter((item) => item.status === 'Confirmed').length, 'Ready for the day'],
						['Awaiting confirmation', todaysAppointments.filter((item) => item.status === 'Pending').length, 'Needs your attention'],
						['Checked in', todaysAppointments.filter((item) => item.status === 'Checked in').length, 'Currently at the clinic'],
					].map(([label, value, caption]) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{caption}</p></article>)}
				</section>

				<section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
						<div><h2 className="text-lg font-semibold">Appointment schedule</h2><p className="mt-1 text-sm text-slate-500">Review and manage scheduled patient visits.</p></div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<label><span className="sr-only">Search appointments</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient or doctor..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-60" /></label>
							<label><span className="sr-only">Filter by date</span><input type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" /></label>
							<label><span className="sr-only">Filter by status</span><select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"><option>All statuses</option>{Object.keys(statusClasses).map((status) => <option key={status}>{status}</option>)}</select></label>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[800px] text-left text-sm">
							<thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Patient</th><th className="px-5 py-3 font-semibold">Specialty</th><th className="px-5 py-3 font-semibold">Doctor</th><th className="px-5 py-3 font-semibold">Date &amp; time</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold"><span className="sr-only">Update status</span></th></tr></thead>
							<tbody className="divide-y divide-slate-100">
								{filtered.map((appointment) => <tr key={appointment.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800">{appointment.initials}</span><div><p className="font-semibold">{appointment.patient}</p><p className="mt-0.5 text-xs text-slate-500">{appointment.id}</p></div></div></td><td className="px-5 py-4 text-slate-600">{appointment.specialty}</td><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{appointment.doctor}</td><td className="whitespace-nowrap px-5 py-4"><p className="font-medium">{new Date(`${appointment.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p><p className="mt-0.5 text-xs text-slate-500">{appointment.time}</p></td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[appointment.status] || statusClasses.Pending}`}>{appointment.status}</span></td><td className="px-5 py-4"><label className="sr-only" htmlFor={`status-${appointment.id}`}>Update {appointment.patient} status</label><select id={`status-${appointment.id}`} value={appointment.status} onChange={(event) => updateStatus(appointment.id, event.target.value)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600"><option>Confirmed</option><option>Checked in</option><option>Pending</option><option>Cancelled</option><option>Completed</option></select></td></tr>)}
								{filtered.length === 0 && <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500">No appointments found. Try changing your search or filters.</td></tr>}
							</tbody>
						</table>
					</div>
					<footer className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">Showing {filtered.length} of {appointments.length} appointments</footer>
				</section>
			</div>
		</main>
	);
}
