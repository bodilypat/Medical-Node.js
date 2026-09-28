/* ******************************************************************************* */
/* File: #src/features/doctors/components/medical-records/MedicalRecordDetails.jsx */
/* ******************************************************************************* */

import React from 'react';

const formatDate = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
};

const valueOrDash = (value) => (value === null || value === undefined || value === '' ? '—' : value);

const MedicalRecordDetails = ({ record, onClose, onEdit }) => {
	if (!record) {
		return (
			<section className="medical-record-details medical-record-details--empty" aria-label="Medical record details">
				<p>No medical record selected.</p>
			</section>
		);
	}

	const patient = record.patient || {};
	const doctor = record.doctor || {};
	const medications = Array.isArray(record.medications) ? record.medications : [];
	const allergies = Array.isArray(record.allergies) ? record.allergies : [];

	return (
		<section className="medical-record-details" aria-labelledby="medical-record-details-title">
			<header className="medical-record-details__header">
				<div>
					<p className="medical-record-details__eyebrow">Medical record</p>
					<h2 id="medical-record-details-title">{valueOrDash(record.title || record.diagnosis || 'Record details')}</h2>
					<p className="medical-record-details__date">Created {formatDate(record.createdAt || record.date)}</p>
				</div>
				<div className="medical-record-details__actions">
					{onEdit && <button type="button" onClick={() => onEdit(record)}>Edit</button>}
					{onClose && <button type="button" onClick={onClose} aria-label="Close medical record">Close</button>}
				</div>
			</header>

			<div className="medical-record-details__grid">
				<div><strong>Patient</strong><span>{valueOrDash(patient.name || record.patientName)}</span></div>
				<div><strong>Doctor</strong><span>{valueOrDash(doctor.name || record.doctorName)}</span></div>
				<div><strong>Record type</strong><span>{valueOrDash(record.type)}</span></div>
				<div><strong>Status</strong><span>{valueOrDash(record.status)}</span></div>
				<div><strong>Blood group</strong><span>{valueOrDash(record.bloodGroup || patient.bloodGroup)}</span></div>
				<div><strong>Last updated</strong><span>{formatDate(record.updatedAt)}</span></div>
			</div>

			<div className="medical-record-details__section">
				<h3>Diagnosis</h3>
				<p>{valueOrDash(record.diagnosis)}</p>
			</div>
			<div className="medical-record-details__section">
				<h3>Clinical notes</h3>
				<p>{valueOrDash(record.notes || record.description)}</p>
			</div>
			<div className="medical-record-details__lists">
				<div><h3>Allergies</h3><p>{allergies.length ? allergies.join(', ') : 'None recorded'}</p></div>
				<div><h3>Medications</h3><p>{medications.length ? medications.map((item) => typeof item === 'string' ? item : item.name).join(', ') : 'None recorded'}</p></div>
			</div>
		</section>
	);
};

export default MedicalRecordDetails;
