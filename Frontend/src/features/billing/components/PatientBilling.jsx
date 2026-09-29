/* ********************************************************* */
/* File: #src/features/billing/components/PatientBilling.jsx */
/* ********************************************************* */

import React, { useMemo, useState } from 'react';

const defaultInvoices = [
	{ id: 'INV-1001', date: '2024-06-18', description: 'General consultation', amount: 120, status: 'Paid' },
	{ id: 'INV-1002', date: '2024-06-21', description: 'Laboratory services', amount: 85, status: 'Pending' },
	{ id: 'INV-1003', date: '2024-06-25', description: 'Prescription medication', amount: 45, status: 'Overdue' },
];

const money = (amount) => `$${Number(amount || 0).toFixed(2)}`;

export default function PatientBilling({ patient, invoices = defaultInvoices, onPay, onDownload }) {
	const [status, setStatus] = useState('All');
	const [search, setSearch] = useState('');
	const [invoiceToPay, setInvoiceToPay] = useState(null);

	const filteredInvoices = useMemo(() => invoices.filter((invoice) => {
		const matchesStatus = status === 'All' || invoice.status === status;
		const searchable = `${invoice.id} ${invoice.description}`.toLowerCase();
		return matchesStatus && searchable.includes(search.toLowerCase());
	}), [invoices, search, status]);

	const total = invoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
	const paid = invoices.filter((invoice) => invoice.status === 'Paid')
		.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);

	const confirmPayment = () => {
		if (invoiceToPay && onPay) onPay(invoiceToPay);
		setInvoiceToPay(null);
	};

	return (
		<section className="patient-billing" aria-labelledby="patient-billing-title">
			<header className="patient-billing__header">
				<div>
					<p>Medical management</p>
					<h1 id="patient-billing-title">Patient billing</h1>
					<p>Manage invoices and payments{patient?.name ? ` for ${patient.name}` : ''}.</p>
				</div>
				<button type="button" onClick={() => window.print()}>Print statement</button>
			</header>

			<div className="patient-billing__summary" aria-label="Billing summary">
				<div><span>Total billed</span><strong>{money(total)}</strong></div>
				<div><span>Paid</span><strong>{money(paid)}</strong></div>
				<div><span>Outstanding</span><strong>{money(total - paid)}</strong></div>
			</div>

			<div className="patient-billing__toolbar">
				<input type="search" placeholder="Search invoices" aria-label="Search invoices" value={search} onChange={(event) => setSearch(event.target.value)} />
				<select aria-label="Filter invoice status" value={status} onChange={(event) => setStatus(event.target.value)}>
					<option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option>
				</select>
			</div>

			<div className="patient-billing__table-wrap">
				<table className="patient-billing__table">
					<caption>Patient invoices</caption>
					<thead><tr><th>Invoice</th><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
					<tbody>
						{filteredInvoices.length === 0 ? <tr><td colSpan="6">No invoices found.</td></tr> : filteredInvoices.map((invoice) => (
							<tr key={invoice.id}>
								<td>{invoice.id}</td><td>{invoice.date}</td><td>{invoice.description}</td><td>{money(invoice.amount)}</td>
								<td><span className={`status status-${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
								<td>
									<button type="button" onClick={() => onDownload?.(invoice)}>Download</button>{' '}
									{invoice.status !== 'Paid' && <button type="button" onClick={() => setInvoiceToPay(invoice)}>Pay now</button>}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{invoiceToPay && <div className="patient-billing__dialog" role="dialog" aria-modal="true" aria-labelledby="payment-title">
				<div>
					<h2 id="payment-title">Pay {invoiceToPay.id}</h2>
					<p>Amount due: <strong>{money(invoiceToPay.amount)}</strong></p>
					<button type="button" onClick={() => setInvoiceToPay(null)}>Cancel</button>{' '}
					<button type="button" onClick={confirmPayment}>Confirm payment</button>
				</div>
			</div>}
		</section>
	);
}
