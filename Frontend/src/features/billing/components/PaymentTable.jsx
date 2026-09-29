/* ******************************************************* */
/* File: #src/features/billing/components/PaymentTable.jsx */
/* ******************************************************* */

import React from 'react';

const currency = (amount) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		Number(amount) || 0,
	);

export default function PaymentTable({
	payments = [],
	loading = false,
	onView,
	onRefund,
}) {
	if (loading) {
		return <p className="payment-table__message">Loading payments...</p>;
	}

	return (
		<div className="payment-table" role="region" aria-label="Payment history">
			<table>
				<thead>
					<tr>
						<th scope="col">Payment ID</th>
						<th scope="col">Patient</th>
						<th scope="col">Invoice</th>
						<th scope="col">Date</th>
						<th scope="col">Method</th>
						<th scope="col">Amount</th>
						<th scope="col">Status</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{payments.length === 0 ? (
						<tr>
							<td colSpan="8" className="payment-table__message">No payments found.</td>
						</tr>
					) : (
						payments.map((payment) => {
							const status = String(payment.status || 'pending').toLowerCase();
							return (
								<tr key={payment.id || payment.invoice}>
									<td>{payment.id || '—'}</td>
									<td>{payment.patientName || payment.patient?.name || '—'}</td>
									<td>{payment.invoice || payment.invoiceNumber || '—'}</td>
									<td>{payment.date ? new Date(payment.date).toLocaleDateString() : '—'}</td>
									<td>{payment.method || '—'}</td>
									<td>{currency(payment.amount)}</td>
									<td><span className={`payment-status payment-status--${status}`}>{status}</span></td>
									<td>
										{onView && <button type="button" onClick={() => onView(payment)}>View</button>}
										{onRefund && status === 'paid' && (
											<button type="button" onClick={() => onRefund(payment)}>Refund</button>
										)}
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
