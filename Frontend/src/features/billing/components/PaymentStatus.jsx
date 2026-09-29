/* ******************************************************** */
/* File: #src/features/billing/components/PaymentStatus.jsx */
/* ******************************************************** */
import React from 'react';

const PAYMENT_STATUSES = {
	paid: { label: 'Paid', modifier: 'paid', icon: '✓' },
	pending: { label: 'Pending', modifier: 'pending', icon: '◷' },
	overdue: { label: 'Overdue', modifier: 'overdue', icon: '!' },
	failed: { label: 'Failed', modifier: 'failed', icon: '×' },
	refunded: { label: 'Refunded', modifier: 'refunded', icon: '↩' },
	cancelled: { label: 'Cancelled', modifier: 'cancelled', icon: '−' },
};

/** Show the current payment state on a billing record or invoice. */
export default function PaymentStatus({
	status = 'pending',
	className = '',
	showIcon = true,
}) {
	const value = String(status).trim().toLowerCase();
	const knownStatus = PAYMENT_STATUSES[value];
	const label = knownStatus?.label ?? (value
		? value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
		: 'Unknown');
	const modifier = knownStatus?.modifier ?? 'unknown';

	return (
		<span
			className={`payment-status payment-status--${modifier} ${className}`.trim()}
			role="status"
			aria-label={`Payment status: ${label}`}
		>
			{showIcon && (
				<span className="payment-status__icon" aria-hidden="true">
					{knownStatus?.icon ?? '•'}
				</span>
			)}
			<span className="payment-status__label">{label}</span>
		</span>
	);
}
