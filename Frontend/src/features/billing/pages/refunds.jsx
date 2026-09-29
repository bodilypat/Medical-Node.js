/* ********************************************* */
/* File: #src/features/billing/pages/refunds.jsx */
/* ********************************************* */

import { useMemo, useState } from 'react';

const money = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

export default function Refunds() {
	const [requests, setRequests] = useState([]);
	const [patient, setPatient] = useState('');
	const [reference, setReference] = useState('');
	const [amount, setAmount] = useState('');
	const [reason, setReason] = useState('');
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('All');
	const [error, setError] = useState('');

	const filtered = useMemo(() => requests.filter((request) => {
		const matchesSearch = `${request.patient} ${request.reference} ${request.reason}`.toLowerCase().includes(search.toLowerCase());
		return matchesSearch && (status === 'All' || request.status === status);
	}), [requests, search, status]);

	function submit(event) {
		event.preventDefault();
		const value = Number(amount);
		if (!patient.trim() || !reference.trim() || !reason.trim() || !Number.isFinite(value) || value <= 0) {
			setError('Complete all fields and enter an amount greater than zero.');
			return;
		}
		setRequests((items) => [{
			id: `${Date.now()}-${Math.random()}`,
			date: new Date().toLocaleDateString(),
			patient: patient.trim(),
			reference: reference.trim(),
			reason: reason.trim(),
			amount: value,
			status: 'Pending',
		}, ...items]);
		setPatient(''); setReference(''); setAmount(''); setReason(''); setError('');
	}

	const refundedTotal = requests.filter((item) => item.status === 'Refunded').reduce((sum, item) => sum + item.amount, 0);

	return (
		<main className="space-y-6 p-6">
			<header>
				<h1 className="text-2xl font-semibold text-gray-900">Refunds</h1>
				<p className="mt-1 text-sm text-gray-600">Create and review patient payment refund requests.</p>
			</header>

			<section className="grid gap-4 sm:grid-cols-3" aria-label="Refund summary">
				<Summary label="Requests" value={requests.length} />
				<Summary label="Pending" value={requests.filter((item) => item.status === 'Pending').length} />
				<Summary label="Refunded total" value={money.format(refundedTotal)} />
			</section>

			<section className="rounded-lg border border-gray-200 bg-white p-5">
				<h2 className="text-lg font-semibold text-gray-900">New refund request</h2>
				<form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
					<Field label="Patient name"><input required value={patient} onChange={(e) => setPatient(e.target.value)} className="field-input" /></Field>
					<Field label="Payment reference"><input required value={reference} onChange={(e) => setReference(e.target.value)} className="field-input" /></Field>
					<Field label="Amount"><input required type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="field-input" /></Field>
					<Field label="Reason"><input required value={reason} onChange={(e) => setReason(e.target.value)} className="field-input" /></Field>
					<div className="sm:col-span-2">
						{error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}
						<button type="submit" className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">Submit request</button>
					</div>
				</form>
			</section>

			<section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-lg font-semibold text-gray-900">Refund history</h2>
					<div className="flex gap-2">
						<input aria-label="Search refunds" placeholder="Search patient or reference" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
						<select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 text-sm">
							<option>All</option><option>Pending</option><option>Refunded</option><option>Rejected</option>
						</select>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 text-left text-sm">
						<thead className="bg-gray-50 text-xs uppercase text-gray-500">
							<tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Payment reference</th><th className="px-4 py-3">Reason</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th></tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{filtered.map((item) => <tr key={item.id}>
								<td className="whitespace-nowrap px-4 py-3">{item.date}</td><td className="px-4 py-3">{item.patient}</td><td className="px-4 py-3">{item.reference}</td><td className="px-4 py-3">{item.reason}</td><td className="whitespace-nowrap px-4 py-3">{money.format(item.amount)}</td>
								<td className="px-4 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">{item.status}</span></td>
							</tr>)}
							{filtered.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">No refund requests found.</td></tr>}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
}

function Summary({ label, value }) {
	return <div className="rounded-lg border border-gray-200 bg-white p-4"><p className="text-sm text-gray-600">{label}</p><p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p></div>;
}

function Field({ label, children }) {
	return <label className="block space-y-1 text-sm font-medium text-gray-700"><span>{label}</span>{children}</label>;
}
