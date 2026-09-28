/* *********************************************************** */
/* File: #src/features/admin/components/reports/ReportCard.jsx */
/* *********************************************************** */

import React from 'react';

function displayDate(value) {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? String(value)
		: new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
}

export default function ReportCard({ report, onView, onDownload }) {
	if (!report) return null;

	const id = report.id ?? report._id ?? 'report';
	const title = report.title || report.name || 'Untitled report';
	const status = report.status || 'Available';
	const statusClass = String(status).toLowerCase().replace(/[^a-z0-9]+/g, '-');
	const date = report.generatedAt || report.createdAt;

	return (
		<article className="report-card" aria-labelledby={`report-card-title-${id}`}>
			<header className="report-card__header">
				<div>
					<h3 id={`report-card-title-${id}`} className="report-card__title">{title}</h3>
					{report.description && (
						<p className="report-card__description">{report.description}</p>
					)}
				</div>
				<span className={`report-card__status report-card__status--${statusClass}`}>
					{status}
				</span>
			</header>

			<dl className="report-card__details">
				{report.type && <div><dt>Type</dt><dd>{report.type}</dd></div>}
				{report.period && <div><dt>Period</dt><dd>{report.period}</dd></div>}
				{date && <div><dt>Generated</dt><dd>{displayDate(date)}</dd></div>}
				{report.fileSize && <div><dt>File size</dt><dd>{report.fileSize}</dd></div>}
			</dl>

			{(onView || onDownload) && (
				<footer className="report-card__actions">
					{onView && <button type="button" onClick={() => onView(report)}>View</button>}
					{onDownload && <button type="button" onClick={() => onDownload(report)}>Download</button>}
				</footer>
			)}
		</article>
	);
}

