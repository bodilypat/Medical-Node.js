/* ******************************************************** */
/* File: #src/features/billing/components/InvoiceStatus.jsx */
/* ******************************************************** */

import React from 'react';

const STATUS_CONFIG = {
	paid: { label: 'Paid', tone: 'paid' },
	pending: { label: 'Pending', tone: 'pending' },
	overdue: { label: 'Overdue', tone: 'overdue' },
	cancelled: { label: 'Cancelled', tone: 'cancelled' },
	draft: { label: 'Draft', tone: 'draft' },
};

/** Renders the current payment state of a medical billing invoice. */
export default function InvoiceStatus({ status, className = '', ...props }) {
	const normalized = String(status ?? 'unknown').trim().toLowerCase();
	const config = STATUS_CONFIG[normalized];
	const label = config?.label ?? (normalized === 'unknown'
		? 'Unknown'
		: normalized.charAt(0).toUpperCase() + normalized.slice(1));

	return (
		<span
			className={[
				'invoice-status',
				`invoice-status--${config?.tone ?? 'unknown'}`,
				className,
			].filter(Boolean).join(' ')}
			role="status"
			{...props}
		>
			{label}
		</span>
	);
}
