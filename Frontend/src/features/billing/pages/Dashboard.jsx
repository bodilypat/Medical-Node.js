/* *********************************************** */
/* File: #src/features/billing/pages/Dashboard.jsx */
/* *********************************************** */

import React, { useMemo, useState } from 'react';

const currency = (value) => new Intl.NumberFormat('en-US', {
	style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value);

export default function Dashboard() {
	const [invoices, setInvoices] = useState([]);
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('All invoices');

	const visibleInvoices = useMemo(() => invoices.filter((invoice) => {
		const matchesQuery = `${invoice.id} ${invoice.patient} ${invoice.service}`.toLowerCase().includes(query.toLowerCase());
		return matchesQuery && (filter === 'All invoices' || invoice.status === filter);
	}), [invoices, query, filter]);

	const paidTotal = invoices.filter((invoice) => invoice.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0);
	const pendingTotal = invoices.filter((invoice) => invoice.status === 'Pending').reduce((sum, invoice) => sum + invoice.amount, 0);
	const overdueCount = invoices.filter((invoice) => invoice.status === 'Overdue').length;

	const markPaid = (id) => setInvoices((current) => current.map((invoice) => (
		invoice.id === id ? { ...invoice, status: 'Paid' } : invoice
	)));

	const styles = `
		.billing-dashboard { --ink:#172b4d; --muted:#718096; --line:#e8edf3; --blue:#3169dc; color:var(--ink); font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif; padding:32px; background:#f7f9fc; min-height:100vh; box-sizing:border-box; }
		.billing-dashboard * { box-sizing:border-box; }
		.billing-header { display:flex; justify-content:space-between; align-items:center; gap:16px; margin-bottom:28px; }
		.billing-header h1 { font-size:26px; margin:0 0 6px; letter-spacing:-.5px; }
		.billing-header p { color:var(--muted); margin:0; font-size:14px; }
		.billing-button { border:0; border-radius:8px; padding:11px 16px; background:var(--blue); color:white; font-weight:600; cursor:pointer; }
		.billing-button:hover { background:#2458c3; }
		.billing-metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; margin-bottom:24px; }
		.billing-card,.billing-panel { background:white; border:1px solid var(--line); border-radius:12px; }
		.billing-card { padding:20px 22px; }
		.billing-card-label { color:var(--muted); font-size:13px; }
		.billing-card-value { font-size:26px; font-weight:700; margin:9px 0 4px; }
		.billing-card-note { color:#8491a5; font-size:12px; }
		.billing-panel { overflow:hidden; }
		.billing-panel-heading { padding:20px 22px; display:flex; align-items:center; justify-content:space-between; gap:16px; border-bottom:1px solid var(--line); }
		.billing-panel-heading h2 { font-size:17px; margin:0; }
		.billing-controls { display:flex; gap:10px; }
		.billing-search,.billing-select { border:1px solid #dce3ed; border-radius:7px; background:white; padding:9px 11px; color:var(--ink); font:inherit; font-size:13px; }
		.billing-search { width:220px; }
		.billing-table-wrap { overflow-x:auto; }
		.billing-table { width:100%; border-collapse:collapse; text-align:left; white-space:nowrap; }
		.billing-table th { padding:12px 22px; color:#8491a5; font-size:11px; text-transform:uppercase; letter-spacing:.06em; font-weight:600; background:#fbfcfe; }
		.billing-table td { padding:15px 22px; border-top:1px solid #eef1f5; font-size:13px; }
		.billing-table tbody tr:hover { background:#fbfcff; }
		.invoice-id { color:var(--blue); font-weight:600; }
		.status { display:inline-flex; align-items:center; gap:6px; border-radius:20px; padding:5px 9px; font-size:11px; font-weight:600; }
		.status:before { content:''; width:6px; height:6px; border-radius:50%; background:currentColor; }
		.status-paid { color:#16845b; background:#e8f7f0; }
		.status-pending { color:#a86b00; background:#fff4d8; }
		.status-overdue { color:#c34444; background:#ffeded; }
		.billing-action { border:0; background:none; color:var(--blue); cursor:pointer; font:inherit; font-size:12px; font-weight:600; padding:4px; }
		.billing-action:disabled { color:#16845b; cursor:default; }
		.billing-empty { padding:36px; color:var(--muted); text-align:center; font-size:14px; }
		@media(max-width:700px) { .billing-dashboard{padding:20px 14px}.billing-header{align-items:flex-start;flex-direction:column}.billing-metrics{grid-template-columns:1fr}.billing-panel-heading{align-items:flex-start;flex-direction:column}.billing-controls{width:100%;flex-wrap:wrap}.billing-search{flex:1;min-width:150px} }
	`;

	return (
		<main className="billing-dashboard">
			<style>{styles}</style>
			<header className="billing-header">
				<div>
					<h1>Billing dashboard</h1>
					<p>Track payments and manage patient invoices.</p>
				</div>
				<button className="billing-button" type="button" onClick={() => window.print()}>＋&nbsp; Create invoice</button>
			</header>

			<section className="billing-metrics" aria-label="Billing summary">
				<article className="billing-card"><div className="billing-card-label">Collected payments</div><div className="billing-card-value">{currency(paidTotal)}</div><div className="billing-card-note">From paid invoices shown</div></article>
				<article className="billing-card"><div className="billing-card-label">Outstanding balance</div><div className="billing-card-value">{currency(pendingTotal)}</div><div className="billing-card-note">Awaiting payment</div></article>
				<article className="billing-card"><div className="billing-card-label">Overdue invoices</div><div className="billing-card-value">{overdueCount}</div><div className="billing-card-note">Require follow-up</div></article>
			</section>

			<section className="billing-panel" aria-labelledby="invoice-heading">
				<div className="billing-panel-heading">
					<h2 id="invoice-heading">Recent invoices</h2>
					<div className="billing-controls">
						<input className="billing-search" type="search" placeholder="Search invoices or patients" aria-label="Search invoices" value={query} onChange={(event) => setQuery(event.target.value)} />
						<select className="billing-select" aria-label="Filter invoices" value={filter} onChange={(event) => setFilter(event.target.value)}>
							{['All invoices', 'Paid', 'Pending', 'Overdue'].map((status) => <option key={status}>{status}</option>)}
						</select>
					</div>
				</div>
				<div className="billing-table-wrap">
					<table className="billing-table">
						<thead><tr><th>Invoice</th><th>Patient</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
						<tbody>
							{visibleInvoices.map((invoice) => <tr key={invoice.id}>
								<td className="invoice-id">{invoice.id}</td><td>{invoice.patient}</td><td>{invoice.service}</td>
								<td>{new Date(`${invoice.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
								<td>{currency(invoice.amount)}</td><td><span className={`status status-${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
								<td><button className="billing-action" type="button" disabled={invoice.status === 'Paid'} onClick={() => markPaid(invoice.id)}>{invoice.status === 'Paid' ? 'Paid' : 'Mark paid'}</button></td>
							</tr>)}
						</tbody>
					</table>
					{visibleInvoices.length === 0 && <div className="billing-empty">No invoices match your search.</div>}
				</div>
			</section>
		</main>
	);
}
