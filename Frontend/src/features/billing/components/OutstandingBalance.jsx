/* ************************************************************* */
/* File: #src/features/billing/components/OutstandingBalance.jsx */
/* ************************************************************* */

import React from 'react';

const currency = (value, currencyCode = 'USD') =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
	}).format(Number(value) || 0);

/**
 * Displays a patient's unpaid medical account balance and its billing items.
 * The component is intentionally presentation-focused; payment handling is
 * supplied by the optional onPay callback.
 */
const OutstandingBalance = ({
	patient,
	invoices = [],
	balance,
	currencyCode = 'USD',
	loading = false,
	onPay,
	onViewInvoice,
}) => {
	const outstanding = balance ?? invoices.reduce(
		(total, invoice) => total + (Number(invoice.amountDue ?? invoice.balance) || 0),
		0,
	);

	if (loading) {
		return (
			<section className="outstanding-balance" aria-busy="true" aria-label="Loading outstanding balance">
				<div className="outstanding-balance__loading">Loading billing information…</div>
			</section>
		);
	}

	return (
		<section className="outstanding-balance" aria-labelledby="outstanding-balance-title">
			<header className="outstanding-balance__header">
				<div>
					<h2 id="outstanding-balance-title">Outstanding balance</h2>
					{patient && (
						<p className="outstanding-balance__patient">
							{patient.name || `${patient.firstName || ''} ${patient.lastName || ''}`.trim()}
							{patient.patientId ? ` · Patient #${patient.patientId}` : ''}
						</p>
					)}
				</div>
				<strong className="outstanding-balance__amount">
					{currency(outstanding, currencyCode)}
				</strong>
			</header>

			{invoices.length > 0 ? (
				<div className="outstanding-balance__table-wrapper">
					<table className="outstanding-balance__table">
						<caption className="sr-only">Unpaid medical invoices</caption>
						<thead>
							<tr>
								<th scope="col">Invoice</th>
								<th scope="col">Service date</th>
								<th scope="col">Due date</th>
								<th scope="col">Amount due</th>
								{onViewInvoice && <th scope="col"><span className="sr-only">Actions</span></th>}
							</tr>
						</thead>
						<tbody>
							{invoices.map((invoice) => (
								<tr key={invoice.id || invoice.invoiceNumber}>
									<td>{invoice.invoiceNumber || invoice.id || '—'}</td>
									<td>{invoice.serviceDate || '—'}</td>
									<td>{invoice.dueDate || '—'}</td>
									<td>{currency(invoice.amountDue ?? invoice.balance, currencyCode)}</td>
									{onViewInvoice && (
										<td>
											<button type="button" onClick={() => onViewInvoice(invoice)}>
												View
											</button>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="outstanding-balance__empty">No outstanding charges.</p>
			)}

			{outstanding > 0 && onPay && (
				<footer className="outstanding-balance__footer">
					<button type="button" onClick={() => onPay(outstanding)}>
						Pay balance
					</button>
				</footer>
			)}
		</section>
	);
};

export default OutstandingBalance;
