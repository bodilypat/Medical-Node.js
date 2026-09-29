/* ******************************************************************** */
/* File: #src/features/laboratory/components/records/PrintLabReport.jsx */
/* ******************************************************************** */

import React from "react";

const show = (value) => (value === null || value === undefined || value === "" ? "—" : value);

function dateLabel(value) {
	if (!value) return "—";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export default function PrintLabReport({ report = {}, clinic = {}, onClose }) {
	const patient = report.patient || {};
	const tests = Array.isArray(report.tests) ? report.tests : [];

	return (
		<main className="lab-report">
			<style>{`
				.lab-report { max-width: 900px; margin: 24px auto; padding: 32px; color: #172033; background: white; font: 14px/1.5 Arial, sans-serif; }
				.lab-report__header { display: flex; justify-content: space-between; gap: 24px; padding-bottom: 16px; border-bottom: 2px solid #334155; }
				.lab-report h1 { margin: 0; font-size: 24px; }
				.lab-report h2 { margin: 24px 0 10px; font-size: 16px; }
				.lab-report__muted { color: #64748b; }
				.lab-report__details { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 24px; }
				.lab-report__details p { margin: 0; }
				.lab-report table { width: 100%; border-collapse: collapse; }
				.lab-report th, .lab-report td { padding: 9px; text-align: left; border: 1px solid #cbd5e1; }
				.lab-report th { background: #f1f5f9; }
				.lab-report__actions { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 16px; }
				.lab-report button { padding: 8px 14px; border: 0; border-radius: 4px; cursor: pointer; }
				.lab-report__signature { width: 220px; margin: 48px 0 0 auto; padding-top: 8px; text-align: center; border-top: 1px solid #64748b; }
				@media print { .lab-report { max-width: none; margin: 0; padding: 0; } .lab-report__actions { display: none; } }
			`}</style>

			<div className="lab-report__actions">
				{onClose && <button type="button" onClick={onClose}>Close</button>}
				<button type="button" onClick={() => window.print()}>Print report</button>
			</div>
			<header className="lab-report__header">
				<div>
					<h1>{show(clinic.name || "Laboratory Report")}</h1>
					{clinic.address && <div className="lab-report__muted">{clinic.address}</div>}
					{clinic.phone && <div className="lab-report__muted">{clinic.phone}</div>}
				</div>
				<div><strong>Report #: {show(report.reportNumber || report.id)}</strong><br />
					<span className="lab-report__muted">Date: {dateLabel(report.reportDate || report.createdAt)}</span>
				</div>
			</header>

			<section>
				<h2>Patient information</h2>
				<div className="lab-report__details">
					<p><strong>Name:</strong> {show(patient.name || report.patientName)}</p>
					<p><strong>Patient ID:</strong> {show(patient.id || report.patientId)}</p>
					<p><strong>Age / Gender:</strong> {show(patient.age)} / {show(patient.gender)}</p>
					<p><strong>Referred by:</strong> {show(report.referredBy)}</p>
					<p><strong>Sample collected:</strong> {dateLabel(report.collectedAt)}</p>
					<p><strong>Sample type:</strong> {show(report.sampleType)}</p>
				</div>
			</section>

			<section>
				<h2>Test results</h2>
				<table>
					<thead><tr><th>Test</th><th>Result</th><th>Unit</th><th>Reference range</th><th>Status</th></tr></thead>
					<tbody>
						{tests.length ? tests.map((test, index) => (
							<tr key={test.id || `${test.name || "test"}-${index}`}>
								<td>{show(test.name)}</td><td>{show(test.result ?? test.value)}</td>
								<td>{show(test.unit)}</td><td>{show(test.referenceRange || test.normalRange)}</td>
								<td>{show(test.status)}</td>
							</tr>
						)) : <tr><td colSpan="5">No test results available.</td></tr>}
					</tbody>
				</table>
			</section>

			{report.notes && <section><h2>Notes</h2><p>{report.notes}</p></section>}
			<div className="lab-report__signature">
				<strong>{show(report.reviewedBy || report.technician)}</strong><br />
				<span className="lab-report__muted">Authorized signature</span>
			</div>
		</main>
	);
}

