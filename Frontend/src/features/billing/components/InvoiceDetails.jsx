/* ********************************************************* */
/* File: #src/features/billing/components/InvoiceDetails.jsx */
/* ********************************************************* */
import React from 'react';

const formatMoney = (value, currency = 'USD') =>
	new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(value) || 0);

export default function InvoiceDetails({ invoice, onClose, onPrint }) {
	if (!invoice) return <section className="invoice-details"><p>Select an invoice to view details.</p></section>;

	const items = Array.isArray(invoice.items) ? invoice.items : [];
	const currency = invoice.currency || 'USD';
	const subtotal = Number(invoice.subtotal ?? items.reduce(
		(sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0,
	));
	const tax = Number(invoice.tax) || 0;
	const total = Number(invoice.total ?? subtotal + tax);

	return (
		<article className="invoice-details" aria-labelledby="invoice-details-title">
			<header className="invoice-details__header">
				<div>
					<h2 id="invoice-details-title">Invoice {invoice.invoiceNumber || invoice.id}</h2>
					<span className={`invoice-status invoice-status--${String(invoice.status || 'unknown').toLowerCase()}`}>
						{invoice.status || 'Status unavailable'}
					</span>
				</div>
				<div className="invoice-details__actions">
					{onPrint && <button type="button" onClick={onPrint}>Print</button>}
					{onClose && <button type="button" onClick={onClose}>Close</button>}
				</div>
			</header>

			<section aria-label="Invoice information">
				<dl className="invoice-details__summary">
					<div><dt>Patient</dt><dd>{invoice.patientName || '—'}</dd></div>
					<div><dt>Patient ID</dt><dd>{invoice.patientId || '—'}</dd></div>
					<div><dt>Provider</dt><dd>{invoice.providerName || '—'}</dd></div>
					<div><dt>Invoice date</dt><dd>{invoice.date || '—'}</dd></div>
					<div><dt>Due date</dt><dd>{invoice.dueDate || '—'}</dd></div>
					<div><dt>Payment method</dt><dd>{invoice.paymentMethod || '—'}</dd></div>
				</dl>
			</section>

			<div className="invoice-details__table-wrap">
				<table>
					<thead><tr><th scope="col">Service / item</th><th scope="col">Code</th><th scope="col">Quantity</th><th scope="col">Unit price</th><th scope="col">Amount</th></tr></thead>
					<tbody>
						{items.length ? items.map((item, index) => {
							const quantity = Number(item.quantity) || 0;
							const unitPrice = Number(item.unitPrice) || 0;
							return <tr key={item.id || `${item.code || 'item'}-${index}`}>
								<td>{item.description || item.name || '—'}</td><td>{item.code || '—'}</td>
								<td>{quantity}</td><td>{formatMoney(unitPrice, currency)}</td>
								<td>{formatMoney(item.amount ?? quantity * unitPrice, currency)}</td>
							</tr>;
						}) : <tr><td colSpan="5">No billed items.</td></tr>}
					</tbody>
				</table>
			</div>

			<dl className="invoice-details__totals">
				<div><dt>Subtotal</dt><dd>{formatMoney(subtotal, currency)}</dd></div>
				<div><dt>Tax</dt><dd>{formatMoney(tax, currency)}</dd></div>
				{Number(invoice.amountPaid) > 0 && <div><dt>Paid</dt><dd>−{formatMoney(invoice.amountPaid, currency)}</dd></div>}
				<div><dt>Total</dt><dd>{formatMoney(total, currency)}</dd></div>
				{invoice.balanceDue != null && <div><dt>Balance due</dt><dd>{formatMoney(invoice.balanceDue, currency)}</dd></div>}
			</dl>

			{invoice.notes && <section className="invoice-details__notes"><h3>Notes</h3><p>{invoice.notes}</p></section>}
		</article>
	);
}
