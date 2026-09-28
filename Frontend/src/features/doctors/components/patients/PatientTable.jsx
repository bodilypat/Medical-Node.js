/* **************************************************************** */
/* File: #src/features/doctors/components/patients/PatientTable.jsx */
/* **************************************************************** */

import { useMemo, useState } from "react";

const formatDate = (value) => {
	if (!value) return "—";
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: new Intl.DateTimeFormat(undefined, {
				dateStyle: "medium",
				timeStyle: "short",
			}).format(date);
};

export default function PatientTable({
	patients = [],
	appointments = [],
	onViewPatient,
	onScheduleAppointment,
	onUpdateAppointment,
}) {
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const rows = useMemo(() => {
		const appointmentByPatient = new Map();
		appointments.forEach((appointment) => {
			const patientId = appointment.patientId ?? appointment.patient?._id;
			if (patientId != null) {
				const current = appointmentByPatient.get(String(patientId)) ?? [];
				current.push(appointment);
				appointmentByPatient.set(String(patientId), current);
			}
		});

		return patients.map((patient) => {
			const id = patient._id ?? patient.id;
			const patientAppointments = appointmentByPatient.get(String(id)) ?? [];
			const nextAppointment = patientAppointments
				.filter((appointment) => new Date(appointment.date ?? appointment.startTime) >= new Date())
				.sort(
					(a, b) =>
						new Date(a.date ?? a.startTime) - new Date(b.date ?? b.startTime),
				)[0];
			const status = nextAppointment?.status ?? "no appointment";
			return { patient, id, nextAppointment, status };
		});
	}, [patients, appointments]);

	const filteredRows = rows.filter(({ patient, status }) => {
		const name = `${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim();
		const matchesQuery = `${name} ${patient.email ?? ""} ${patient.phone ?? ""}`
			.toLowerCase()
			.includes(query.trim().toLowerCase());
		return (
			matchesQuery &&
			(statusFilter === "all" || status.toLowerCase() === statusFilter)
		);
	});

	return (
		<section className="patient-management" aria-label="Patient and appointment management">
			<div className="patient-management__toolbar">
				<label>
					<span className="sr-only">Search patients</span>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search patients by name, email, or phone"
					/>
				</label>
				<label>
					<span className="sr-only">Filter by appointment status</span>
					<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
						<option value="all">All patients</option>
						<option value="scheduled">Scheduled</option>
						<option value="confirmed">Confirmed</option>
						<option value="pending">Pending</option>
						<option value="no appointment">No upcoming appointment</option>
					</select>
				</label>
			</div>

			<div className="patient-management__table-wrap">
				<table className="patient-management__table">
					<thead>
						<tr>
							<th scope="col">Patient</th>
							<th scope="col">Contact</th>
							<th scope="col">Next appointment</th>
							<th scope="col">Status</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredRows.map(({ patient, id, nextAppointment, status }) => {
							const name = `${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim() || "Unnamed patient";
							return (
								<tr key={id ?? patient.email ?? name}>
									<td>{name}</td>
									<td>
										<div>{patient.email || "—"}</div>
										<div>{patient.phone || "—"}</div>
									</td>
									<td>
										{nextAppointment
											? formatDate(nextAppointment.date ?? nextAppointment.startTime)
											: "None scheduled"}
									</td>
									<td>
										<span className={`appointment-status appointment-status--${status.toLowerCase().replace(/\s+/g, "-")}`}>
											{status}
										</span>
									</td>
									<td>
										<div className="patient-management__actions">
											{onViewPatient && (
												<button type="button" onClick={() => onViewPatient(patient)}>
													View
												</button>
											)}
											{onScheduleAppointment && (
												<button type="button" onClick={() => onScheduleAppointment(patient)}>
													Schedule
												</button>
											)}
											{nextAppointment && onUpdateAppointment && (
												<button
													type="button"
													onClick={() => onUpdateAppointment(nextAppointment, patient)}
												>
													Manage appointment
												</button>
											)}
										</div>
									</td>
								</tr>
							);
						})}
						{filteredRows.length === 0 && (
							<tr>
								<td colSpan={5}>No patients match your search.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
