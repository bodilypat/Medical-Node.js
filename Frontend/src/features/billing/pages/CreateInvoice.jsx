/* *************************************************** */
/* File: #src/features/billing/pages/CreateInvoice.jsx */
/* *************************************************** */

import React, { useMemo, useState } from 'react';

const newItem = (id) => ({ id, description: '', quantity: 1, rate: 0 });

export default function CreateInvoice() {
	const [patient, setPatient] = useState({ name: '', id: '', email: '', phone: '' });
	const [details, setDetails] = useState({ number: `INV-${Date.now().toString().slice(-6)}`, date: new Date().toISOString().slice(0, 10), dueDate: '', notes: '' });
	const [items, setItems] = useState([newItem(1)]);
	const [tax, setTax] = useState(0);
	const [discount, setDiscount] = useState(0);

	const totals = useMemo(() => {
		const subtotal = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0);
		const discountAmount = subtotal * Number(discount || 0) / 100;
		const taxAmount = (subtotal - discountAmount) * Number(tax || 0) / 100;
		return { subtotal, discountAmount, taxAmount, total: subtotal - discountAmount + taxAmount };
	}, [items, tax, discount]);

	const update = (setter, field, value) => setter((current) => ({ ...current, [field]: value }));
	const updateItem = (id, field, value) => setItems((current) => current.map((item) => item.id === id ? { ...item, [field]: value } : item));
	const money = (value) => `$${value.toFixed(2)}`;

	const submit = (event) => {
		event.preventDefault();
		window.dispatchEvent(new CustomEvent('invoice:create', { detail: { patient, details, items, totals } }));
	};

	return (
		<main className="create-invoice-page">
			<header className="page-header"><div><p className="eyebrow">Billing / Invoices</p><h1>Create invoice</h1><p className="muted">Prepare a new medical invoice for a patient.</p></div><div className="header-actions"><button type="button" className="button secondary" onClick={() => window.history.back()}>Cancel</button><button type="submit" form="invoice-form" className="button primary">Save invoice</button></div></header>
			<form id="invoice-form" onSubmit={submit}>
				<section className="card"><div className="section-heading"><div><h2>Patient details</h2><p className="muted">Link this invoice to a patient record.</p></div><span className="status-badge">Draft</span></div><div className="form-grid four"><label>Patient name<input required value={patient.name} onChange={(e) => update(setPatient, 'name', e.target.value)} placeholder="Search patient name" /></label><label>Patient ID<input value={patient.id} onChange={(e) => update(setPatient, 'id', e.target.value)} placeholder="PT-00124" /></label><label>Email<input type="email" value={patient.email} onChange={(e) => update(setPatient, 'email', e.target.value)} placeholder="patient@example.com" /></label><label>Phone<input value={patient.phone} onChange={(e) => update(setPatient, 'phone', e.target.value)} placeholder="+1 000 000 0000" /></label></div></section>
				<section className="card"><h2>Invoice information</h2><div className="form-grid three"><label>Invoice number<input value={details.number} onChange={(e) => update(setDetails, 'number', e.target.value)} /></label><label>Issue date<input type="date" required value={details.date} onChange={(e) => update(setDetails, 'date', e.target.value)} /></label><label>Due date<input type="date" value={details.dueDate} onChange={(e) => update(setDetails, 'dueDate', e.target.value)} /></label></div></section>
				<section className="card"><div className="section-heading"><div><h2>Services and charges</h2><p className="muted">Add consultations, procedures, medication, and other billable items.</p></div><button type="button" className="button secondary" onClick={() => setItems((current) => [...current, newItem(Date.now())])}>+ Add service</button></div><div className="items-table"><div className="table-row table-head"><span>Description</span><span>Qty</span><span>Rate</span><span>Amount</span><span /></div>{items.map((item) => <div className="table-row" key={item.id}><input required value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Service or procedure" /><input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', e.target.value)} /><input type="number" min="0" step="0.01" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', e.target.value)} /><strong>{money(Number(item.quantity || 0) * Number(item.rate || 0))}</strong><button type="button" className="icon-button" onClick={() => setItems((current) => current.length > 1 ? current.filter(({ id }) => id !== item.id) : current)} aria-label="Remove service">×</button></div>)}</div><div className="totals"><div><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div><div><label>Discount (%)<input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} /></label><strong>- {money(totals.discountAmount)}</strong></div><div><label>Tax (%)<input type="number" min="0" max="100" value={tax} onChange={(e) => setTax(e.target.value)} /></label><strong>{money(totals.taxAmount)}</strong></div><div className="grand-total"><strong>Total due</strong><strong>{money(totals.total)}</strong></div></div></section>
				<section className="card"><h2>Notes and payment</h2><div className="form-grid two"><label>Payment method<select defaultValue="card"><option value="card">Credit / debit card</option><option value="cash">Cash</option><option value="transfer">Bank transfer</option><option value="insurance">Insurance</option></select></label><label>Additional notes<textarea rows="3" value={details.notes} onChange={(e) => update(setDetails, 'notes', e.target.value)} placeholder="Add a note for the patient or billing team..." /></label></div></section>
			</form>
		</main>
	);
}
