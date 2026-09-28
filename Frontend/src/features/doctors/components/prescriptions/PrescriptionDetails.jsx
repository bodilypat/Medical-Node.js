/* **************************************************************************** */
/* File: #src/features/doctors/components/prescriptions/PrescriptionDetails.jsx */
/* **************************************************************************** */

import React from "react";

const valueOf = (item, ...keys) => keys.map((key) => item?.[key]).find(Boolean) || "—";

export default function PrescriptionDetails({ prescription, onClose, onEdit }) {
	if (!prescription) return <div className="prescription-details__empty">Select a prescription to view its details.</div>;

	const medicines = prescription.medicines || prescription.medications || [];
	const patient = prescription.patient || {};
	const doctor = prescription.doctor || {};
	const prescriptionId = valueOf(prescription, "id", "_id");
	const issuedDate = valueOf(prescription, "date", "issuedDate", "createdAt");

	return (
		<article className="prescription-details" aria-label="Prescription details">
			<header className="prescription-details__header">
				<div>
					<p className="prescription-details__eyebrow">Prescription #{prescriptionId}</p>
					<h2>Prescription details</h2>
				</div>
				<div className="prescription-details__actions">
					{onEdit && <button type="button" onClick={() => onEdit(prescription)}>Edit</button>}
					{onClose && <button type="button" onClick={onClose} aria-label="Close prescription details">×</button>}
				</div>
			</header>

			<dl className="prescription-details__summary">
				<div><dt>Patient</dt><dd>{valueOf(patient, "name", "fullName") || valueOf(prescription, "patientName")}</dd></div>
				<div><dt>Patient ID</dt><dd>{valueOf(patient, "id", "_id")}</dd></div>
				<div><dt>Prescribed by</dt><dd>{valueOf(doctor, "name", "fullName") || valueOf(prescription, "doctorName")}</dd></div>
				<div><dt>Date issued</dt><dd>{issuedDate !== "—" ? new Date(issuedDate).toLocaleDateString() : issuedDate}</dd></div>
			</dl>

			{prescription.diagnosis && <p className="prescription-details__note"><strong>Diagnosis:</strong> {prescription.diagnosis}</p>}

			<h3>Medicines ({medicines.length})</h3>
			{medicines.length ? (
				<div className="prescription-details__table-wrap">
					<table className="prescription-details__table">
						<thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead>
						<tbody>{medicines.map((medicine, index) => (
							<tr key={valueOf(medicine, "id", "_id") !== "—" ? valueOf(medicine, "id", "_id") : index}>
								<td><strong>{valueOf(medicine, "name", "medicineName")}</strong>{medicine.instructions && <small>{medicine.instructions}</small>}</td>
								<td>{valueOf(medicine, "dosage")}</td>
								<td>{valueOf(medicine, "frequency")}</td>
								<td>{valueOf(medicine, "duration")}</td>
							</tr>
						))}</tbody>
					</table>
				</div>
			) : <p className="prescription-details__empty">No medicines added.</p>}

			{(prescription.notes || prescription.instructions) && <p className="prescription-details__note"><strong>Notes:</strong> {prescription.notes || prescription.instructions}</p>}
		</article>
	);
}

