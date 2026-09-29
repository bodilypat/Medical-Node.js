/* ******************************************************* */
/* File: #src/features/billing/components/PrintInvoice.jsx */
/* ******************************************************* */

import React from 'react';
import PropTypes from 'prop-types';

const money = (value, currency = 'USD') => new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency,
}).format(Number(value) || 0);

const dateLabel = (value) => {
	if (!value) return '—';
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat().format(date);
};

export default function PrintInvoice({ invoice = {}, onClose }) {
	const items = Array.isArray(invoice.items) ? invoice.items : [];
	const currency = invoice.currency || 'USD';
	const subtotal = invoice.subtotal ?? items.reduce(
		(sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0,
	);
	const discount = Number(invoice.discount) || 0;
	const tax = Number(invoice.tax) || 0;
	const total = invoice.total ?? subtotal - discount + tax;

	return (
		<main className="print-invoice" aria-labelledby="invoice-title">
			<header className="invoice-header">
				<div>
					<h1 id="invoice-title">Invoice</h1>
					<strong>{invoice.clinicName || 'Medical Clinic'}</strong>
					{invoice.clinicAddress && <p>{invoice.clinicAddress}</p>}
					{invoice.clinicPhone && <p>{invoice.clinicPhone}</p>}
				</div>
				<div className="invoice-meta">
					<p><strong>Invoice #:</strong> {invoice.number || invoice.id || '—'}</p>
					<p><strong>Date:</strong> {dateLabel(invoice.date || invoice.createdAt)}</p>
					<p><strong>Due date:</strong> {dateLabel(invoice.dueDate)}</p>
					<p><strong>Status:</strong> {invoice.status || 'Unpaid'}</p>
				</div>
			</header>

			<section className="invoice-patient" aria-label="Patient details">
				<h2>Bill to</h2>
				<p>{invoice.patient?.name || invoice.patientName || 'Patient'}</p>
				{(invoice.patient?.patientId || invoice.patientId) && (
					<p>Patient ID: {invoice.patient?.patientId || invoice.patientId}</p>
				)}
				{invoice.patient?.address && <p>{invoice.patient.address}</p>}
			</section>

			<table className="invoice-items">
				<thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead>
				<tbody>
					{items.length ? items.map((item, index) => {
						const quantity = Number(item.quantity) || 0;
						const unitPrice = Number(item.unitPrice) || 0;
						return (
							<tr key={item.id || `${item.description || 'item'}-${index}`}>
								<td>{item.description || item.name || 'Service'}</td>
								<td>{quantity}</td>
								<td>{money(unitPrice, currency)}</td>
								<td>{money(item.amount ?? quantity * unitPrice, currency)}</td>
							</tr>
						);
					}) : <tr><td colSpan="4">No invoice items</td></tr>}
				</tbody>
			</table>

			<section className="invoice-totals" aria-label="Invoice totals">
				<p><span>Subtotal</span><strong>{money(subtotal, currency)}</strong></p>
				{discount !== 0 && <p><span>Discount</span><strong>−{money(discount, currency)}</strong></p>}
				{tax !== 0 && <p><span>Tax</span><strong>{money(tax, currency)}</strong></p>}
				<p className="invoice-total"><span>Total</span><strong>{money(total, currency)}</strong></p>
				{invoice.amountPaid != null && <p><span>Paid</span><strong>{money(invoice.amountPaid, currency)}</strong></p>}
				{invoice.balanceDue != null && <p><span>Balance due</span><strong>{money(invoice.balanceDue, currency)}</strong></p>}
			</section>

			{invoice.notes && <section className="invoice-notes"><h2>Notes</h2><p>{invoice.notes}</p></section>}
			<footer className="invoice-footer">Thank you for choosing {invoice.clinicName || 'our clinic'}.</footer>
			<div className="invoice-actions">
				<button type="button" onClick={() => window.print()}>Print invoice</button>
				{onClose && <button type="button" onClick={onClose}>Close</button>}
			</div>

			<style>{`
				.print-invoice{max-width:850px;margin:2rem auto;padding:2rem;color:#172033;background:#fff;font:14px/1.5 Arial,sans-serif}
				.invoice-header{display:flex;justify-content:space-between;gap:2rem;border-bottom:2px solid #d9e0e8;padding-bottom:1rem}
				.print-invoice h1{margin:0;font-size:2rem}.print-invoice h2{font-size:1rem}.print-invoice p{margin:.25rem 0}
				.invoice-meta{text-align:right}.invoice-patient{margin:1.5rem 0}.invoice-items{width:100%;border-collapse:collapse}
				.invoice-items th,.invoice-items td{padding:.65rem;border-bottom:1px solid #d9e0e8;text-align:left}
				.invoice-items th:not(:first-child),.invoice-items td:not(:first-child){text-align:right}
				.invoice-totals{width:min(100%,320px);margin:1rem 0 1rem auto}.invoice-totals p{display:flex;justify-content:space-between;gap:1rem}
				.invoice-total{border-top:2px solid #172033;padding-top:.5rem;font-size:1.1rem}.invoice-notes{margin-top:1.5rem}
				.invoice-footer{margin-top:2rem;text-align:center}.invoice-actions{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem}
				.invoice-actions button{padding:.6rem 1rem;cursor:pointer}
				@media print{.print-invoice{max-width:none;margin:0;padding:0}.invoice-actions{display:none}}
				@media(max-width:600px){.print-invoice{margin:0;padding:1rem}.invoice-header{flex-direction:column}.invoice-meta{text-align:left}}
			`}</style>
		</main>
	);
}

PrintInvoice.propTypes = {
	invoice: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		number: PropTypes.string,
		date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		status: PropTypes.string,
		clinicName: PropTypes.string,
		clinicAddress: PropTypes.string,
		clinicPhone: PropTypes.string,
		patientName: PropTypes.string,
		patientId: PropTypes.string,
		patient: PropTypes.shape({ name: PropTypes.string, patientId: PropTypes.string, address: PropTypes.string }),
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			description: PropTypes.string,
			name: PropTypes.string,
			quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			unitPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		})),
		subtotal: PropTypes.number,
		discount: PropTypes.number,
		tax: PropTypes.number,
		total: PropTypes.number,
		amountPaid: PropTypes.number,
		balanceDue: PropTypes.number,
		currency: PropTypes.string,
		notes: PropTypes.string,
	}),
	onClose: PropTypes.func,
};
