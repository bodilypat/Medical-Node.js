/* ******************************************************** */
/* File: #src/features/billing/components/RefundDetails.jsx */
/* ******************************************************** */

import React from 'react';

const currencyFormat = (amount, currency) => {
	const value = Number(amount);
	if (!Number.isFinite(value)) return '—';

	try {
		return new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: currency || 'USD',
		}).format(value);
	} catch {
		return `${currency || 'USD'} ${value.toFixed(2)}`;
	}
};

const dateFormat = (date) => {
	if (!date) return '—';
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime())
		? '—'
		: new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(parsed);
};

export default function RefundDetails({
	refund,
	currency = 'USD',
	onClose,
	onApprove,
	onReject,
	processing = false,
}) {
	if (!refund) {
		return (
			<section className="refund-details" aria-label="Refund details">
				<p>Select a refund to view its details.</p>
			</section>
		);
	}

	const status = refund.status || 'Pending';
	const pending = String(status).toLowerCase() === 'pending';
	const details = [
		['Refund ID', refund.refundId || refund.id],
		['Patient', refund.patientName || refund.patient?.name],
		['Patient ID', refund.patientId || refund.patient?.id],
		['Invoice', refund.invoiceNumber || refund.invoice?.number],
		['Payment method', refund.paymentMethod],
		['Reason', refund.reason],
		['Requested', dateFormat(refund.requestedAt || refund.createdAt)],
		['Processed', dateFormat(refund.processedAt)],
	];

	return (
		<section className="refund-details" aria-label="Refund details">
			<header className="refund-details__header">
				<div>
					<h2>Refund details</h2>
					<span className={`refund-details__status refund-details__status--${String(status).toLowerCase()}`}>
						{status}
					</span>
				</div>
				{onClose && (
					<button type="button" onClick={onClose} aria-label="Close refund details">
						Close
					</button>
				)}
			</header>

			<dl className="refund-details__list">
				{details.map(([label, value]) => (
					<div className="refund-details__row" key={label}>
						<dt>{label}</dt>
						<dd>{value || '—'}</dd>
					</div>
				))}
				<div className="refund-details__row refund-details__row--amount">
					<dt>Refund amount</dt>
					<dd>{currencyFormat(refund.amount, currency)}</dd>
				</div>
			</dl>

			{pending && (onApprove || onReject) && (
				<footer className="refund-details__actions">
					{onReject && (
						<button type="button" onClick={() => onReject(refund)} disabled={processing}>
							Reject refund
						</button>
					)}
					{onApprove && (
						<button type="button" onClick={() => onApprove(refund)} disabled={processing}>
							{processing ? 'Processing…' : 'Approve refund'}
						</button>
					)}
				</footer>
			)}
		</section>
	);
}
