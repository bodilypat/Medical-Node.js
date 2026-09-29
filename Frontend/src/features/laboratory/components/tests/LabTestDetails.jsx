/* ****************************************************************** */
/* File: #src/features/laboratory/components/tests/LabTestDetails.jsx */
/* ****************************************************************** */

import React from 'react';

const formatValue = (value, fallback = '—') => {
	if (value === null || value === undefined || value === '') return fallback;
	return value;
};

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

/**
 * Displays a laboratory test and its result details.
 * The component accepts either a test prop or the commonly used test fields
 * directly, making it suitable for detail pages and modal views.
 */
const LabTestDetails = ({ test = {}, onClose, onEdit }) => {
	const {
		name,
		testName,
		code,
		category,
		description,
		status = 'Pending',
		result,
		resultValue,
		unit,
		referenceRange,
		normalRange,
		specimen,
		sampleType,
		patient,
		patientName,
		orderedBy,
		doctor,
		collectedAt,
		collectionDate,
		reportedAt,
		reportDate,
		notes,
	} = test;

	const title = name || testName || 'Laboratory test';
	const currentResult = result ?? resultValue;
	const currentPatient = patient?.name || patientName || patient;
	const statusClass = String(status).toLowerCase().replace(/\s+/g, '-');

	const details = [
		['Patient', currentPatient],
		['Test code', code],
		['Category', category],
		['Specimen', specimen || sampleType],
		['Ordered by', orderedBy || doctor],
		['Collected', formatDate(collectedAt || collectionDate)],
		['Reported', formatDate(reportedAt || reportDate)],
	];

	return (
		<section className="lab-test-details" aria-labelledby="lab-test-details-title">
			<header className="lab-test-details__header">
				<div>
					<p className="lab-test-details__eyebrow">Laboratory test</p>
					<h2 id="lab-test-details-title">{title}</h2>
					{description && <p className="lab-test-details__description">{description}</p>}
				</div>
				<span className={`lab-test-details__status lab-test-details__status--${statusClass}`}>
					{status}
				</span>
			</header>

			<div className="lab-test-details__result" aria-label="Test result">
				<span className="lab-test-details__label">Result</span>
				<strong>{formatValue(currentResult)}</strong>
				{unit && <span>{unit}</span>}
				{(referenceRange || normalRange) && (
					<small>Reference range: {referenceRange || normalRange}</small>
				)}
			</div>

			<dl className="lab-test-details__metadata">
				{details.map(([label, value]) => (
					<div key={label}>
						<dt>{label}</dt>
						<dd>{formatValue(value)}</dd>
					</div>
				))}
			</dl>

			{notes && (
				<div className="lab-test-details__notes">
					<h3>Notes</h3>
					<p>{notes}</p>
				</div>
			)}

			{(onEdit || onClose) && (
				<footer className="lab-test-details__actions">
					{onEdit && <button type="button" onClick={() => onEdit(test)}>Edit test</button>}
					{onClose && (
						<button type="button" onClick={onClose} className="lab-test-details__close">
							Close
						</button>
					)}
				</footer>
			)}
		</section>
	);
};

export default LabTestDetails;
