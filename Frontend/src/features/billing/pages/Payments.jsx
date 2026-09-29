/* ********************************************** */
/* File: #src/features/billing/pages/Payments.jsx */
/* ********************************************** */

import React, { useMemo, useState } from 'react';

const currency = (amount) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

export default function Payments() {
	const [payments, setPayments] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('All');
	const [form, setForm] = useState({ patient: '', amount: '', method: 'Card' });

	const visiblePayments = useMemo(() => payments.filter((payment) => {
		const text = `${payment.patient} ${payment.invoice} ${payment.id}`.toLowerCase();
		return text.includes(search.toLowerCase()) && (filter === 'All' || payment.status === filter);
	}), [payments, search, filter]);

	const addPayment = (event) => {
		event.preventDefault();
		const amount = Number(form.amount);
		if (!form.patient.trim() || !Number.isFinite(amount) || amount <= 0) return;
		setPayments((current) => [{
			id: `PMT-${Date.now()}`,
			patient: form.patient.trim(),
			invoice: 'Manual entry',
			date: new Date().toISOString().slice(0, 10),
			amount,
			method: form.method,
			status: 'Completed',
		}, ...current]);
		setForm({ patient: '', amount: '', method: 'Card' });
	};

	const collected = payments.filter((payment) => payment.status === 'Completed').reduce((sum, payment) => sum + payment.amount, 0);
	const pending = payments.filter((payment) => payment.status === 'Pending').reduce((sum, payment) => sum + payment.amount, 0);

	return (
		<main style={{ padding: 24, maxWidth: 1200, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
			<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
				<div><p style={{ color: '#2563eb', margin: 0 }}>BILLING</p><h1 style={{ margin: '6px 0' }}>Payments</h1><p style={{ color: '#64748b', margin: 0 }}>Track and manage medical payment transactions.</p></div>
				<form onSubmit={addPayment} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
					<input aria-label="Patient name" placeholder="Patient name" value={form.patient} onChange={(event) => setForm({ ...form, patient: event.target.value })} required />
					<input aria-label="Amount" type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} required />
					<select value={form.method} onChange={(event) => setForm({ ...form, method: event.target.value })}><option>Card</option><option>Cash</option><option>Insurance</option><option>Bank transfer</option></select>
					<button type="submit">Record payment</button>
				</form>
			</header>
			<section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
				<article><small>Total collected</small><h2>{currency(collected)}</h2></article><article><small>Pending payments</small><h2>{currency(pending)}</h2></article><article><small>Total transactions</small><h2>{payments.length}</h2></article>
			</section>
			<section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}><h2 style={{ margin: 0 }}>Payment history</h2><div><input placeholder="Search payments" value={search} onChange={(event) => setSearch(event.target.value)} /> <select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Completed</option><option>Pending</option><option>Failed</option></select></div></div>
				<div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr>{['Payment ID', 'Patient', 'Invoice', 'Date', 'Method', 'Amount', 'Status'].map((heading) => <th key={heading} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #cbd5e1' }}>{heading}</th>)}</tr></thead><tbody>{visiblePayments.map((payment) => <tr key={payment.id}>{[payment.id, payment.patient, payment.invoice, payment.date, payment.method, currency(payment.amount), payment.status].map((value) => <td key={`${payment.id}-${value}`} style={{ padding: 10, borderBottom: '1px solid #e2e8f0' }}>{value}</td>)}</tr>)}</tbody></table></div>
				{!visiblePayments.length && <p>{payments.length ? 'No payments match your search or filter.' : 'No payments recorded yet. Use the form above to record a payment.'}</p>}
			</section>
		</main>
	);
}
