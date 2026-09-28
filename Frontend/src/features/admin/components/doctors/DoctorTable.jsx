/* ************************************************************ */
/* File: #src/features/admin/components/doctors/DoctorTable.jsx */
/* ************************************************************ */

import { useMemo, useState } from 'react';

const getDoctorName = (doctor) =>
	doctor.name || [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') || '—';

export default function DoctorTable({
	doctors = [],
	loading = false,
	onEdit,
	onDelete,
}) {
	const [query, setQuery] = useState('');

	const filteredDoctors = useMemo(() => {
		const term = query.trim().toLowerCase();
		if (!term) return doctors;

		return doctors.filter((doctor) =>
			[
				getDoctorName(doctor),
				doctor.email,
				doctor.phone,
				doctor.specialty || doctor.specialization,
				doctor.department,
			]
				.filter(Boolean)
				.some((value) => String(value).toLowerCase().includes(term)),
		);
	}, [doctors, query]);

	return (
		<section className="doctor-table" aria-label="Doctors">
			<div className="doctor-table__toolbar">
				<div>
					<h2 className="doctor-table__title">Doctors</h2>
					<p className="doctor-table__count">
						{filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
					</p>
				</div>
				<label className="doctor-table__search">
					<span className="sr-only">Search doctors</span>
					<input
						type="search"
						placeholder="Search doctors..."
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</label>
			</div>

			<div className="doctor-table__scroll">
				<table>
					<thead>
						<tr>
							<th scope="col">Doctor</th>
							<th scope="col">Specialty</th>
							<th scope="col">Contact</th>
							<th scope="col">Status</th>
							{(onEdit || onDelete) && <th scope="col">Actions</th>}
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan={onEdit || onDelete ? 5 : 4}>Loading doctors…</td></tr>
						) : filteredDoctors.length === 0 ? (
							<tr>
								<td colSpan={onEdit || onDelete ? 5 : 4} className="doctor-table__empty">
									{query ? 'No doctors match your search.' : 'No doctors found.'}
								</td>
							</tr>
						) : (
							filteredDoctors.map((doctor, index) => {
								const id = doctor.id ?? doctor._id ?? index;
								const active = doctor.isActive ?? doctor.active ?? doctor.status !== 'inactive';
								return (
									<tr key={id}>
										<td>
											<strong>{getDoctorName(doctor)}</strong>
											{doctor.licenseNumber && <small>License: {doctor.licenseNumber}</small>}
										</td>
										<td>{doctor.specialty || doctor.specialization || doctor.department || '—'}</td>
										<td>
											{doctor.email && <div>{doctor.email}</div>}
											{doctor.phone && <small>{doctor.phone}</small>}
											{!doctor.email && !doctor.phone && '—'}
										</td>
										<td>
											<span className={`doctor-table__status ${active ? 'is-active' : 'is-inactive'}`}>
												{active ? 'Active' : 'Inactive'}
											</span>
										</td>
										{(onEdit || onDelete) && (
											<td className="doctor-table__actions">
												{onEdit && <button type="button" onClick={() => onEdit(doctor)}>Edit</button>}
												{onDelete && (
													<button type="button" onClick={() => onDelete(doctor)} aria-label={`Delete ${getDoctorName(doctor)}`}>
														Delete
													</button>
												)}
											</td>
										)}
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
