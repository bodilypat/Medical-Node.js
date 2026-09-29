/* ****************************************************** */
/* File: #src/features/billing/components/InvoiceForm.jsx */
/* ****************************************************** */

import React, { useMemo, useState } from 'react';

const createItem = () => ({ description: '', quantity: 1, unitPrice: 0 });

export default function InvoiceForm({ initialValues = {}, onSubmit }) {
	const [form, setForm] = useState({
		invoiceNumber: initialValues.invoiceNumber || '',
		patientName: initialValues.patientName || '',
		patientId: initialValues.patientId || '',
		invoiceDate: initialValues.invoiceDate || new Date().toISOString().slice(0, 10),
		dueDate: initialValues.dueDate || '',
		insuranceProvider: initialValues.insuranceProvider || '',
		notes: initialValues.notes || '',
		taxRate: initialValues.taxRate || 0,
		discount: initialValues.discount || 0,
		items: initialValues.items?.length ? initialValues.items : [createItem()],
	});

	const totals = useMemo(() => {
		const subtotal = form.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
		const discount = Math.min(Number(form.discount || 0), subtotal);
		const tax = ((subtotal - discount) * Number(form.taxRate || 0)) / 100;
		return { subtotal, discount, tax, total: subtotal - discount + tax };
	}, [form.items, form.discount, form.taxRate]);

	const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
	const updateItem = (index, field, value) => setForm((current) => ({
		...current,
		items: current.items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
	}));

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit?.({ ...form, totals });
	};

	return (
		<form className="invoice-form" onSubmit={handleSubmit}>
			<h2>Medical invoice</h2>
			<div className="invoice-form__grid">
				<label>Invoice number<input required value={form.invoiceNumber} onChange={(e) => update('invoiceNumber', e.target.value)} /></label>
				<label>Patient name<input required value={form.patientName} onChange={(e) => update('patientName', e.target.value)} /></label>
				<label>Patient ID<input value={form.patientId} onChange={(e) => update('patientId', e.target.value)} /></label>
				<label>Insurance provider<input value={form.insuranceProvider} onChange={(e) => update('insuranceProvider', e.target.value)} /></label>
				<label>Invoice date<input required type="date" value={form.invoiceDate} onChange={(e) => update('invoiceDate', e.target.value)} /></label>
				<label>Due date<input type="date" value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} /></label>
			</div>

			<h3>Services and treatments</h3>
			{form.items.map((item, index) => (
				<div className="invoice-form__item" key={index}>
					<input required placeholder="Description" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} />
					<input required min="1" type="number" aria-label="Quantity" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} />
					<input required min="0" step="0.01" type="number" aria-label="Unit price" value={item.unitPrice} onChange={(e) => updateItem(index, 'unitPrice', e.target.value)} />
					<span>{(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}</span>
					<button type="button" disabled={form.items.length === 1} onClick={() => update('items', form.items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
				</div>
			))}
			<button type="button" onClick={() => update('items', [...form.items, createItem()])}>Add service</button>

			<div className="invoice-form__summary">
				<label>Discount<input min="0" step="0.01" type="number" value={form.discount} onChange={(e) => update('discount', e.target.value)} /></label>
				<label>Tax (%)<input min="0" step="0.01" type="number" value={form.taxRate} onChange={(e) => update('taxRate', e.target.value)} /></label>
				<div>Subtotal: {totals.subtotal.toFixed(2)}</div>
				<div>Tax: {totals.tax.toFixed(2)}</div>
				<strong>Total: {totals.total.toFixed(2)}</strong>
			</div>
			<label>Notes<textarea rows="3" value={form.notes} onChange={(e) => update('notes', e.target.value)} /></label>
			<button type="submit">Save invoice</button>
		</form>
	);
}

