/* ********************************************************************** */
/* File: #src/features/admin/components/appointments/AppointmentTable.jsx */
/* ********************************************************************** */
import { useMemo, useState } from "react";

const STATUS_OPTIONS = ["All statuses", "Scheduled", "Confirmed", "Completed", "Cancelled"];


const statusClass = (status) => status.toLowerCase();

export default function AppointmentTable({ appointments = [], onView, onEdit }) {
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All statuses");
	const [sortOrder, setSortOrder] = useState("newest");

	const filteredAppointments = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return [...appointments]
			.filter((appointment) => {
				const matchesStatus = statusFilter === "All statuses" || appointment.status === statusFilter;
				const searchable = [
					appointment.id,
					appointment.patient,
					appointment.email,
					appointment.provider,
					appointment.department,
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
			})
			.sort((a, b) => {
				const difference = new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
				return sortOrder === "newest" ? -difference : difference;
			});
	}, [appointments, query, sortOrder, statusFilter]);

	return (
		<section className="appointment-management" aria-labelledby="appointments-heading">
			<header className="appointment-management__header">
				<div>
					<p className="appointment-management__eyebrow">Administration</p>
					<h1 id="appointments-heading">Appointments</h1>
					<p className="appointment-management__description">
						Review and manage patient appointments across your facility.
					</p>
				</div>
				<button className="appointment-management__primary" type="button" onClick={() => onEdit?.(null)}>
					<span aria-hidden="true">＋</span> New appointment
				</button>
			</header>

			<div className="appointment-management__toolbar" role="search">
				<label className="appointment-management__search">
					<span className="sr-only">Search appointments</span>
					<span aria-hidden="true">⌕</span>
					<input
						type="search"
						placeholder="Search patient, provider, or ID..."
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</label>
				<label className="appointment-management__filter">
					<span className="sr-only">Filter by appointment status</span>
					<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
						{STATUS_OPTIONS.map((status) => (
							<option key={status} value={status}>{status}</option>
						))}
					</select>
				</label>
				<button
					className="appointment-management__sort"
					type="button"
					onClick={() => setSortOrder((current) => current === "newest" ? "oldest" : "newest")}
					aria-label={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"} first`}
				>
					↕ <span>{sortOrder === "newest" ? "Newest first" : "Oldest first"}</span>
				</button>
			</div>

			<div className="appointment-management__table-wrap">
				<table className="appointment-management__table">
					<thead>
						<tr>
							<th scope="col">Appointment</th>
							<th scope="col">Patient</th>
							<th scope="col">Provider</th>
							<th scope="col">Date &amp; time</th>
							<th scope="col">Status</th>
							<th scope="col"><span className="sr-only">Actions</span></th>
						</tr>
					</thead>
					<tbody>
						{filteredAppointments.map((appointment) => (
							<tr key={appointment.id}>
								<td><span className="appointment-management__id">{appointment.id}</span><span className="appointment-management__department">{appointment.department}</span></td>
								<td><span className="appointment-management__person">{appointment.patient}</span><span className="appointment-management__muted">{appointment.email}</span></td>
								<td><span className="appointment-management__person">{appointment.provider}</span><span className="appointment-management__muted">{appointment.department}</span></td>
								<td><span className="appointment-management__person">{appointment.date}</span><span className="appointment-management__muted">{appointment.time}</span></td>
								<td><span className={`appointment-management__status appointment-management__status--${statusClass(appointment.status)}`}>{appointment.status}</span></td>
								<td>
									<div className="appointment-management__actions">
										<button type="button" onClick={() => onView?.(appointment)} aria-label={`View ${appointment.id}`}>View</button>
										<button type="button" onClick={() => onEdit?.(appointment)} aria-label={`Edit ${appointment.id}`}>Edit</button>
									</div>
								</td>
							</tr>
						))}
						{filteredAppointments.length === 0 && (
							<tr><td className="appointment-management__empty" colSpan={6}>No appointments match your search.</td></tr>
						)}
					</tbody>
				</table>
			</div>
			<footer className="appointment-management__footer">
				Showing <strong>{filteredAppointments.length}</strong> of <strong>{appointments.length}</strong> appointments
			</footer>
		</section>
	);
}
