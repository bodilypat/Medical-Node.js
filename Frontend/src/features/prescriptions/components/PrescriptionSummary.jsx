/* ******************************************************************** */
/* File: #src/features/prescriptions/components/PrescriptionSummary.jsx */
/* ******************************************************************** */

import React from 'react';

const displayDate = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? String(value)
		: date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

/** Read-only overview of a prescription and its prescribed medications. */
export default function PrescriptionSummary({ prescription, onClose }) {
	if (!prescription) return null;

	const patient = prescription.patient || {};
	const clinician = prescription.prescriber || prescription.doctor || {};
	const medications = prescription.medications || prescription.items || [];

	return (
		<section className="prescription-summary" aria-labelledby="prescription-summary-heading">
			<header className="prescription-summary__header">
				<div>
					<h2 id="prescription-summary-heading">Prescription summary</h2>
					<p>#{prescription.prescriptionNumber || prescription.id || prescription._id || '—'}</p>
				</div>
				{prescription.status && <span className="prescription-summary__status">{prescription.status}</span>}
				{onClose && <button type="button" onClick={onClose} aria-label="Close summary">Close</button>}
			</header>

			<dl className="prescription-summary__details">
				<div><dt>Patient</dt><dd>{patient.name || prescription.patientName || '—'}</dd></div>
				<div><dt>Prescribed by</dt><dd>{clinician.name || prescription.prescriberName || '—'}</dd></div>
				<div><dt>Date issued</dt><dd>{displayDate(prescription.issuedAt || prescription.createdAt || prescription.date)}</dd></div>
				<div><dt>Refills</dt><dd>{prescription.refills ?? prescription.refillCount ?? 0}</dd></div>
			</dl>

			<h3>Medications</h3>
			{medications.length > 0 ? (
				<ul className="prescription-summary__medications">
					{medications.map((medication, index) => (
						<li key={medication.id || medication._id || index}>
							<strong>{medication.medication?.name || medication.medicine?.name || medication.medicationName || medication.name || 'Medication'}</strong>
							<p>{[medication.dosage, medication.frequency, medication.duration].filter(Boolean).join(' · ') || 'Dosage details not provided'}</p>
							{medication.instructions && <p>{medication.instructions}</p>}
						</li>
					))}
				</ul>
			) : <p>No medications listed.</p>}

			{prescription.notes && <div className="prescription-summary__notes"><h3>Notes</h3><p>{prescription.notes}</p></div>}
		</section>
	);
}
