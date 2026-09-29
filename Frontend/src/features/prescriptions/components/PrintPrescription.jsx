/* ****************************************************************** */
/* File: #src/features/prescriptions/components/PrintPrescription.jsx */
/* ****************************************************************** */
import React from 'react';

const styles = {
	page: { maxWidth: 800, margin: '24px auto', padding: 32, color: '#172033', background: '#fff', fontFamily: 'Arial, sans-serif', border: '1px solid #d9dee8' },
	header: { display: 'flex', justifyContent: 'space-between', gap: 24, borderBottom: '2px solid #2457a7', paddingBottom: 18, marginBottom: 20 },
	title: { margin: 0, color: '#2457a7', fontSize: 26 },
	section: { margin: '20px 0' },
	sectionTitle: { margin: '0 0 10px', fontSize: 15, color: '#2457a7', textTransform: 'uppercase' },
	grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px 24px' },
	table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
	cell: { borderBottom: '1px solid #d9dee8', padding: '10px 8px', verticalAlign: 'top' },
	button: { display: 'inline-block', margin: '0 8px 18px 0', padding: '10px 18px', border: 0, borderRadius: 4, background: '#2457a7', color: '#fff', cursor: 'pointer' },
};

const display = (value) => (value === undefined || value === null || value === '' ? '—' : value);
const dateLabel = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

export default function PrintPrescription({ prescription = {}, clinic = {}, onClose }) {
	const patient = prescription.patient || {};
	const doctor = prescription.doctor || {};
	const medicines = prescription.medicines || prescription.items || [];

	return (
		<>
			<style>{'@media print { body * { visibility: hidden; } #prescription-print, #prescription-print * { visibility: visible; } #prescription-print { position: absolute; inset: 0; width: 100%; max-width: none; margin: 0; border: 0; } .prescription-actions { display: none !important; } }'}</style>
			<div className="prescription-actions">
				<button type="button" style={styles.button} onClick={() => window.print()}>Print prescription</button>
				{onClose && <button type="button" style={{ ...styles.button, background: '#596579' }} onClick={onClose}>Close</button>}
			</div>
			<article id="prescription-print" style={styles.page}>
				<header style={styles.header}>
					<div>
						<h1 style={styles.title}>{display(clinic.name || 'Medical Prescription')}</h1>
						{clinic.address && <div>{clinic.address}</div>}
						{clinic.phone && <div>Phone: {clinic.phone}</div>}
					</div>
					<div style={{ textAlign: 'right' }}>
						<strong>PRESCRIPTION</strong>
						<div>Prescription #: {display(prescription.id || prescription.prescriptionNumber)}</div>
						<div>Date: {dateLabel(prescription.date || prescription.createdAt || new Date())}</div>
					</div>
				</header>

				<section style={styles.section}>
					<h2 style={styles.sectionTitle}>Patient information</h2>
					<div style={styles.grid}>
						<div><strong>Name:</strong> {display(patient.name || prescription.patientName)}</div>
						<div><strong>Patient ID:</strong> {display(patient.id || prescription.patientId)}</div>
						<div><strong>Age / sex:</strong> {display(patient.age)} / {display(patient.gender || patient.sex)}</div>
						<div><strong>Allergies:</strong> {display(patient.allergies || prescription.allergies)}</div>
					</div>
				</section>

				<section style={styles.section}>
					<h2 style={styles.sectionTitle}>Medication</h2>
					<table style={styles.table}>
						<thead><tr>{['Medicine', 'Dose', 'Route', 'Frequency', 'Duration', 'Quantity'].map((heading) => <th key={heading} style={styles.cell}>{heading}</th>)}</tr></thead>
						<tbody>
							{medicines.length ? medicines.map((medicine, index) => (
								<tr key={medicine.id || index}>
									<td style={styles.cell}><strong>{display(medicine.name || medicine.medicineName)}</strong>{medicine.instructions && <div>{medicine.instructions}</div>}</td>
									<td style={styles.cell}>{display(medicine.dose || medicine.dosage)}</td>
									<td style={styles.cell}>{display(medicine.route)}</td>
									<td style={styles.cell}>{display(medicine.frequency)}</td>
									<td style={styles.cell}>{display(medicine.duration)}</td>
									<td style={styles.cell}>{display(medicine.quantity)}</td>
								</tr>
							)) : <tr><td style={styles.cell} colSpan="6">No medication listed.</td></tr>}
						</tbody>
					</table>
				</section>

				{prescription.notes && <section style={styles.section}><h2 style={styles.sectionTitle}>Notes</h2><p>{prescription.notes}</p></section>}
				<footer style={{ ...styles.section, marginTop: 48 }}>
					<div><strong>Prescriber:</strong> {display(doctor.name || prescription.doctorName)}</div>
					<div><strong>License:</strong> {display(doctor.licenseNumber || prescription.doctorLicense)}</div>
					<div style={{ width: 220, borderTop: '1px solid #172033', marginTop: 48, paddingTop: 8 }}>Prescriber signature</div>
				</footer>
			</article>
		</>
	);
}
