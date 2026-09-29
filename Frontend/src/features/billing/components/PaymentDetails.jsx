/* ********************************************************* */
/* File: #src/features/billing/components/PaymentDetails.jsx */
/* ********************************************************* */

import { useState } from 'react';

const initialPayment = {
	method: 'card',
	cardholderName: '',
	cardNumber: '',
	expiryDate: '',
	cvv: '',
	billingAddress: '',
};

/**
 * Payment details form used when collecting a patient's invoice payment.
 * The component is intentionally payment-provider agnostic; submit the data
 * through the supplied onSubmit handler and tokenize it in the billing API.
 */
export default function PaymentDetails({
	amount,
	currency = 'USD',
	loading = false,
	onSubmit,
}) {
	const [payment, setPayment] = useState(initialPayment);
	const [error, setError] = useState('');

	const updateField = ({ target }) => {
		setPayment((current) => ({ ...current, [target.name]: target.value }));
		setError('');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!payment.cardholderName || !payment.cardNumber || !payment.expiryDate || !payment.cvv) {
			setError('Please complete all required payment fields.');
			return;
		}
		onSubmit?.(payment);
	};

	return (
		<section className="payment-details" aria-labelledby="payment-details-title">
			<div className="payment-details__header">
				<div>
					<h2 id="payment-details-title">Payment details</h2>
					<p>Securely pay the patient invoice.</p>
				</div>
				{amount !== undefined && (
					<strong aria-label="Payment amount">
						{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)}
					</strong>
				)}
			</div>

			<form onSubmit={handleSubmit} noValidate>
				<fieldset disabled={loading}>
					<legend className="sr-only">Payment method</legend>
					<label htmlFor="payment-method">Payment method</label>
					<select id="payment-method" name="method" value={payment.method} onChange={updateField}>
						<option value="card">Credit or debit card</option>
						<option value="cash">Cash</option>
						<option value="insurance">Insurance</option>
					</select>

					{payment.method === 'card' && (
						<div className="payment-details__card-fields">
							<label htmlFor="cardholder-name">Cardholder name *</label>
							<input id="cardholder-name" name="cardholderName" value={payment.cardholderName} onChange={updateField} autoComplete="cc-name" required />

							<label htmlFor="card-number">Card number *</label>
							<input id="card-number" name="cardNumber" value={payment.cardNumber} onChange={updateField} inputMode="numeric" autoComplete="cc-number" maxLength="19" required />

							<div className="payment-details__row">
								<div>
									<label htmlFor="expiry-date">Expiry date *</label>
									<input id="expiry-date" name="expiryDate" value={payment.expiryDate} onChange={updateField} placeholder="MM/YY" autoComplete="cc-exp" required />
								</div>
								<div>
									<label htmlFor="cvv">Security code *</label>
									<input id="cvv" name="cvv" value={payment.cvv} onChange={updateField} inputMode="numeric" autoComplete="cc-csc" maxLength="4" required />
								</div>
							</div>
						</div>
					)}

					<label htmlFor="billing-address">Billing address</label>
					<textarea id="billing-address" name="billingAddress" value={payment.billingAddress} onChange={updateField} rows="3" autoComplete="street-address" />
				</fieldset>

				{error && <p role="alert" className="payment-details__error">{error}</p>}
				<button type="submit" disabled={loading}>
					{loading ? 'Processing…' : 'Submit payment'}
				</button>
			</form>
		</section>
	);
}
