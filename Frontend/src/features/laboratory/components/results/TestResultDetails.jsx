/* *********************************************************************** */
/* File: #src/features/laboratory/components/results/TestResultDetails.jsx */
/* *********************************************************************** */

import React from 'react';

const statusStyles = {
	normal: 'bg-green-100 text-green-700',
	abnormal: 'bg-red-100 text-red-700',
	pending: 'bg-yellow-100 text-yellow-700',
	cancelled: 'bg-gray-100 text-gray-600',
};

const formatDate = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? value
		: date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

const getStatus = (result) => {
	if (result.status) return result.status.toLowerCase();
	if (result.flag === 'H' || result.flag === 'L' || result.flag === 'A') return 'abnormal';
	return 'normal';
};

/**
 * Displays a laboratory test result and its individual observations.
 * The component intentionally accepts both a single result object and an
 * observations array so it can be used by list and detail views alike.
 */
export default function TestResultDetails({ result = {}, onClose, onApprove, onPrint }) {
	const observations = result.observations || result.results || [];
	const status = getStatus(result);
	const statusClass = statusStyles[status] || 'bg-blue-100 text-blue-700';

	return (
		<section className="rounded-lg border border-gray-200 bg-white shadow-sm" aria-label="Test result details">
			<header className="flex items-start justify-between border-b border-gray-200 p-5">
				<div>
					<p className="text-sm text-gray-500">Laboratory test result</p>
					<h2 className="mt-1 text-xl font-semibold text-gray-900">
						{result.testName || result.name || 'Unnamed test'}
					</h2>
					{result.accessionNumber && (
						<p className="mt-1 text-sm text-gray-500">Accession: {result.accessionNumber}</p>
					)}
				</div>
				<span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}>
					{status}
				</span>
			</header>

			<div className="grid gap-4 border-b border-gray-200 p-5 sm:grid-cols-2 lg:grid-cols-4">
				<div><dt className="text-xs uppercase text-gray-500">Patient</dt><dd className="mt-1 font-medium text-gray-900">{result.patientName || '—'}</dd></div>
				<div><dt className="text-xs uppercase text-gray-500">Patient ID</dt><dd className="mt-1 font-medium text-gray-900">{result.patientId || '—'}</dd></div>
				<div><dt className="text-xs uppercase text-gray-500">Requested by</dt><dd className="mt-1 font-medium text-gray-900">{result.requestedBy || result.doctorName || '—'}</dd></div>
				<div><dt className="text-xs uppercase text-gray-500">Collected</dt><dd className="mt-1 font-medium text-gray-900">{formatDate(result.collectedAt || result.collectionDate)}</dd></div>
			</div>

			<div className="overflow-x-auto p-5">
				<h3 className="mb-3 font-semibold text-gray-900">Observations</h3>
				{observations.length ? (
					<table className="w-full min-w-[620px] text-left text-sm">
						<thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
							<tr><th className="px-3 py-2">Analyte</th><th className="px-3 py-2">Value</th><th className="px-3 py-2">Reference range</th><th className="px-3 py-2">Flag</th></tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{observations.map((item, index) => {
								const abnormal = item.flag && item.flag !== 'N';
								return <tr key={item.id || `${item.name}-${index}`}>
									<td className="px-3 py-3 font-medium text-gray-900">{item.name || item.testName || '—'}</td>
									<td className="px-3 py-3 text-gray-700">{item.value ?? '—'} {item.unit || ''}</td>
									<td className="px-3 py-3 text-gray-500">{item.referenceRange || item.normalRange || '—'}</td>
									<td className={`px-3 py-3 font-medium ${abnormal ? 'text-red-600' : 'text-green-600'}`}>{item.flag || 'Normal'}</td>
								</tr>;
							})}
						</tbody>
					</table>
				) : <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-500">No observations available.</p>}
			</div>

			{(result.comments || result.notes) && <div className="border-t border-gray-200 px-5 py-4"><h3 className="text-sm font-semibold text-gray-900">Comments</h3><p className="mt-1 text-sm text-gray-600">{result.comments || result.notes}</p></div>}
			<footer className="flex justify-end gap-2 border-t border-gray-200 p-4">
				{onPrint && <button type="button" onClick={onPrint} className="rounded-md border px-4 py-2 text-sm">Print</button>}
				{onClose && <button type="button" onClick={onClose} className="rounded-md border px-4 py-2 text-sm">Close</button>}
				{onApprove && status === 'pending' && <button type="button" onClick={() => onApprove(result)} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">Approve result</button>}
			</footer>
		</section>
	);
}

