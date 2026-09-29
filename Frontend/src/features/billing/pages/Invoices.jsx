/* ********************************************** */
/* File: #src/features/billing/pages/Invoices.jsx */
/* ********************************************** */

import { useEffect, useMemo, useState } from 'react';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function Invoices({ invoices: invoiceData = [] }) {
	const [invoices, setInvoices] = useState(invoiceData);
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');

	useEffect(() => {
		setInvoices(invoiceData);
	}, [invoiceData]);

	const filteredInvoices = useMemo(() => invoices.filter((invoice) => {
		const matchesQuery = `${invoice.id} ${invoice.patient} ${invoice.service}`.toLowerCase().includes(query.toLowerCase());
		return matchesQuery && (statusFilter === 'All' || invoice.status === statusFilter);
	}), [invoices, query, statusFilter]);

	const totalOutstanding = invoices
		.filter((invoice) => invoice.status !== 'Paid')
		.reduce((total, invoice) => total + invoice.amount, 0);

	function markPaid(invoiceId) {
		setInvoices((current) => current.map((invoice) => (
			invoice.id === invoiceId ? { ...invoice, status: 'Paid' } : invoice
		)));
	}

	return (
		<main className="billing-page">
			<header className="billing-page__header">
				<div>
					<p className="billing-page__eyebrow">Billing &amp; payments</p>
					<h1>Invoices</h1>
					<p>Review patient charges and track payment status.</p>
				</div>
				<button className="billing-page__primary" type="button" onClick={() => window.print()}>
					Print invoices
				</button>
			</header>

			<section className="billing-page__summary" aria-label="Invoice summary">
				<article className="billing-page__card">
					<span>Invoices</span>
					<strong>{invoices.length}</strong>
				</article>
				<article className="billing-page__card">
					<span>Outstanding balance</span>
					<strong>{currency.format(totalOutstanding)}</strong>
				</article>
				<article className="billing-page__card">
					<span>Paid</span>
					<strong>{invoices.filter((invoice) => invoice.status === 'Paid').length}</strong>
				</article>
			</section>

			<section className="billing-page__list" aria-labelledby="invoice-list-heading">
				<div className="billing-page__list-header">
					<div>
						<h2 id="invoice-list-heading">Recent invoices</h2>
						<p>Manage billing records for your patients.</p>
					</div>
					<div className="billing-page__filters">
						<label className="billing-page__visually-hidden" htmlFor="invoice-search">Search invoices</label>
						<input
							id="invoice-search"
							type="search"
							placeholder="Search patient or invoice"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<label className="billing-page__visually-hidden" htmlFor="invoice-status">Filter by status</label>
						<select id="invoice-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
							<option>All</option>
							<option>Paid</option>
							<option>Pending</option>
							<option>Overdue</option>
						</select>
					</div>
				</div>

				<div className="billing-page__table-wrap">
					<table>
						<thead>
							<tr>
								<th scope="col">Invoice</th>
								<th scope="col">Patient</th>
								<th scope="col">Service</th>
								<th scope="col">Issue date</th>
								<th scope="col">Due date</th>
								<th scope="col">Amount</th>
								<th scope="col">Status</th>
								<th scope="col"><span className="billing-page__visually-hidden">Actions</span></th>
							</tr>
						</thead>
						<tbody>
							{filteredInvoices.map((invoice) => (
								<tr key={invoice.id}>
									<td><strong>{invoice.id}</strong></td>
									<td>{invoice.patient}</td>
									<td>{invoice.service}</td>
									<td>{invoice.date}</td>
									<td>{invoice.dueDate}</td>
									<td>{currency.format(invoice.amount)}</td>
									<td><span className={`billing-page__status billing-page__status--${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
									<td>
										{invoice.status !== 'Paid' && (
											<button className="billing-page__text-button" type="button" onClick={() => markPaid(invoice.id)}>
												Mark paid
											</button>
										)}
									</td>
								</tr>
							))}
							{filteredInvoices.length === 0 && (
								<tr><td colSpan="8" className="billing-page__empty">No invoices match your search.</td></tr>
							)}
						</tbody>
					</table>
				</div>
			</section>

			<style>{`
				.billing-page { color: #172b4d; padding: 28px; font-family: inherit; }
				.billing-page__header, .billing-page__list-header { align-items: center; display: flex; gap: 20px; justify-content: space-between; }
				.billing-page__header h1 { font-size: 28px; margin: 4px 0; }
				.billing-page__header p, .billing-page__list-header p { color: #68778d; margin: 4px 0; }
				.billing-page__eyebrow { color: #5268c9 !important; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
				.billing-page__primary { background: #5268c9; border: 0; border-radius: 7px; color: white; cursor: pointer; font: inherit; font-weight: 600; padding: 11px 16px; }
				.billing-page__summary { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 24px 0; }
				.billing-page__card, .billing-page__list { background: white; border: 1px solid #e5e9f0; border-radius: 10px; }
				.billing-page__card { display: grid; gap: 10px; padding: 18px 20px; }
				.billing-page__card span { color: #68778d; font-size: 14px; }
				.billing-page__card strong { font-size: 24px; }
				.billing-page__list { overflow: hidden; }
				.billing-page__list-header { padding: 20px; }
				.billing-page__list-header h2 { font-size: 18px; margin: 0; }
				.billing-page__filters { display: flex; gap: 10px; }
				.billing-page__filters input, .billing-page__filters select { background: white; border: 1px solid #d8deea; border-radius: 6px; color: #26364d; font: inherit; padding: 9px 11px; }
				.billing-page__table-wrap { overflow-x: auto; }
				.billing-page table { border-collapse: collapse; min-width: 850px; text-align: left; width: 100%; }
				.billing-page th { background: #f7f8fb; color: #68778d; font-size: 12px; font-weight: 600; }
				.billing-page th, .billing-page td { border-top: 1px solid #edf0f5; padding: 13px 16px; white-space: nowrap; }
				.billing-page td { font-size: 14px; }
				.billing-page__status { border-radius: 20px; display: inline-block; font-size: 12px; font-weight: 600; padding: 5px 9px; }
				.billing-page__status--paid { background: #e7f6ee; color: #218653; }
				.billing-page__status--pending { background: #fff4d9; color: #946b00; }
				.billing-page__status--overdue { background: #fde9e8; color: #b43834; }
				.billing-page__text-button { background: none; border: 0; color: #5268c9; cursor: pointer; font: inherit; font-size: 13px; font-weight: 600; padding: 4px; }
				.billing-page__empty { color: #68778d; padding: 30px !important; text-align: center; }
				.billing-page__visually-hidden { clip: rect(0, 0, 0, 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px; }
				@media (max-width: 700px) { .billing-page { padding: 16px; } .billing-page__header, .billing-page__list-header { align-items: stretch; flex-direction: column; } .billing-page__summary { grid-template-columns: 1fr; } .billing-page__filters { flex-direction: column; } }
			`}</style>
		</main>
	);
}
