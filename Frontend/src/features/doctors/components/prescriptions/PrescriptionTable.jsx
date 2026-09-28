/* ************************************************************************** */
/* File: #src/features/doctors/components/prescriptions/PrescriptionTable.jsx */
/* ************************************************************************** */
import React from 'react';

const displayDate = (date) => {
	if (!date) return '—';
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? String(date) : parsed.toLocaleDateString();
};

export default function PrescriptionTable({ prescriptions = [], loading = false, onView, onEdit, onDelete }) {
	if (loading) return <p role="status">Loading prescriptions…</p>;

	return (
		<div className="prescription-table__wrapper">
			<table className="prescription-table">
				<thead>
					<tr>
						<th scope="col">Patient</th>
						<th scope="col">Medication</th>
						<th scope="col">Dosage</th>
						<th scope="col">Frequency</th>
						<th scope="col">Start date</th>
						<th scope="col">End date</th>
						<th scope="col">Status</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{prescriptions.length === 0 ? (
						<tr><td colSpan={8}>No prescriptions found.</td></tr>
					) : prescriptions.map((prescription, index) => {
						const patient = prescription.patient?.name ?? prescription.patientName ?? '—';
						const medication = prescription.medication?.name ?? prescription.medicationName ?? prescription.medicine ?? '—';
						return (
							<tr key={prescription.id ?? prescription._id ?? index}>
								<td>{patient}</td>
								<td>{medication}</td>
								<td>{prescription.dosage || '—'}</td>
								<td>{prescription.frequency || '—'}</td>
								<td>{displayDate(prescription.startDate ?? prescription.issuedAt ?? prescription.createdAt)}</td>
								<td>{displayDate(prescription.endDate ?? prescription.expiresAt)}</td>
								<td>{prescription.status ?? 'Active'}</td>
								<td className="prescription-table__actions">
									{onView && <button type="button" onClick={() => onView(prescription)}>View</button>}
									{onEdit && <button type="button" onClick={() => onEdit(prescription)}>Edit</button>}
									{onDelete && <button type="button" onClick={() => onDelete(prescription)}>Delete</button>}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
