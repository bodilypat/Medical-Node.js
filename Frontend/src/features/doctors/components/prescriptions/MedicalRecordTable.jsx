/* ***************************************************************************** */
/* File: #src/features/doctors/components/medical-records/MedicalRecordTable.jsx */
/* ***************************************************************************** */

import React from 'react';

const formatDate = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			});
};

const getPatientName = (record) => {
	if (record.patientName) return record.patientName;
	if (record.patient?.name) return record.patient.name;
	return [record.patient?.firstName, record.patient?.lastName]
		.filter(Boolean)
		.join(' ') || 'Unknown patient';
};

const MedicalRecordTable = ({
	records = [],
	loading = false,
	error = '',
	onView,
	onEdit,
	onDelete,
}) => {
	if (loading) {
		return <div className="medical-record-table__state">Loading medical records…</div>;
	}

	if (error) {
		return <div className="medical-record-table__state medical-record-table__state--error">{error}</div>;
	}

	return (
		<div className="medical-record-table" role="region" aria-label="Medical records" tabIndex="0">
			<table>
				<thead>
					<tr>
						<th scope="col">Patient</th>
						<th scope="col">Record type</th>
						<th scope="col">Diagnosis</th>
						<th scope="col">Date</th>
						<th scope="col">Status</th>
						<th scope="col"><span className="sr-only">Actions</span></th>
					</tr>
				</thead>
				<tbody>
					{!records.length ? (
						<tr>
							<td colSpan="6" className="medical-record-table__empty">No medical records found.</td>
						</tr>
					) : records.map((record) => {
						const id = record.id || record._id;
						return (
							<tr key={id}>
								<td>{getPatientName(record)}</td>
								<td>{record.recordType || record.type || '—'}</td>
								<td>{record.diagnosis || '—'}</td>
								<td>{formatDate(record.date || record.createdAt)}</td>
								<td>
									<span className={`medical-record-table__status medical-record-table__status--${String(record.status || 'active').toLowerCase()}`}>
										{record.status || 'Active'}
									</span>
								</td>
								<td className="medical-record-table__actions">
									{onView && <button type="button" onClick={() => onView(record)}>View</button>}
									{onEdit && <button type="button" onClick={() => onEdit(record)}>Edit</button>}
									{onDelete && <button type="button" onClick={() => onDelete(record)} aria-label={`Delete record for ${getPatientName(record)}`}>Delete</button>}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MedicalRecordTable;
