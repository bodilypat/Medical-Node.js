/* *************************************************** */
/* File: #src/features/laboratory/pages/LabResults.jsx */
/* *************************************************** */

import React, { useMemo, useState } from 'react';

const statusClass = (status) => status.toLowerCase().replace(/\s+/g, '-');

export default function LabResults({ results: providedResults = [] }) {
	const [results, setResults] = useState(providedResults);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('All statuses');
	const [category, setCategory] = useState('All categories');
	const [selected, setSelected] = useState(null);

	const filteredResults = useMemo(() => results.filter((item) => {
		const matchesQuery = [item.patient, item.mrn, item.test, item.id].some((value) => value.toLowerCase().includes(query.toLowerCase()));
		return matchesQuery && (status === 'All statuses' || item.status === status) && (category === 'All categories' || item.category === category);
	}), [results, query, status, category]);

	const markReviewed = (id) => setResults((items) => items.map((item) => item.id === id ? { ...item, status: 'Completed' } : item));

	return (
		<main className="lab-results-page">
			<header className="page-header">
				<div>
					<p className="eyebrow">Laboratory management</p>
					<h1>Lab results</h1>
					<p className="muted">Review, verify, and manage patient laboratory results.</p>
				</div>
				<button className="primary-button" type="button" onClick={() => window.print()}>Export report</button>
			</header>

			<section className="summary-grid" aria-label="Laboratory summary">
				<article><span>Total results</span><strong>{results.length}</strong><small>All recorded results</small></article>
				<article><span>Pending review</span><strong>{results.filter((item) => item.status === 'Pending review').length}</strong><small>Require verification</small></article>
				<article><span>Processing</span><strong>{results.filter((item) => item.status === 'Processing').length}</strong><small>Tests in progress</small></article>
				<article><span>Abnormal results</span><strong>{results.filter((item) => item.result === 'Abnormal').length}</strong><small>Need attention</small></article>
			</section>

			<section className="results-card">
				<div className="toolbar">
					<label className="search-box">⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient, test, or result ID" /></label>
					<select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Completed</option><option>Pending review</option><option>Processing</option></select>
					<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option><option>Hematology</option><option>Biochemistry</option><option>Microbiology</option></select>
				</div>
				<div className="table-wrap">
					<table>
						<thead><tr><th>Result ID</th><th>Patient</th><th>Test</th><th>Collected</th><th>Priority</th><th>Status</th><th>Result</th><th aria-label="Actions" /></tr></thead>
						<tbody>{filteredResults.map((item) => <tr key={item.id}>
							<td><strong>{item.id}</strong><small>{item.mrn}</small></td>
							<td>{item.patient}<small>{item.orderedBy}</small></td>
							<td>{item.test}<small>{item.category}</small></td>
							<td>{item.collected}</td>
							<td><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span></td>
							<td><span className={`status ${statusClass(item.status)}`}>{item.status}</span></td>
							<td><span className={item.result === 'Abnormal' ? 'result abnormal' : 'result'}>{item.result}</span></td>
							<td><button className="link-button" type="button" onClick={() => setSelected(item)}>View</button></td>
						</tr>)}</tbody>
					</table>
					{!filteredResults.length && <p className="empty-state">No laboratory results match your filters.</p>}
				</div>
			</section>

			{selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="details-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
				<button className="close-button" type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
				<p className="eyebrow">Result details</p><h2>{selected.test}</h2><p className="muted">{selected.patient} · {selected.mrn}</p>
				<dl><dt>Result ID</dt><dd>{selected.id}</dd><dt>Collected</dt><dd>{selected.collected}</dd><dt>Ordered by</dt><dd>{selected.orderedBy}</dd><dt>Finding</dt><dd className={selected.result === 'Abnormal' ? 'abnormal' : ''}>{selected.result}</dd></dl>
				{selected.status === 'Pending review' && <button className="primary-button" type="button" onClick={() => { markReviewed(selected.id); setSelected(null); }}>Mark as reviewed</button>}
			</section></div>}
		</main>
	);
}
