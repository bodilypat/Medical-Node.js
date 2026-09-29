/* ********************************************************* */
/* File: #src/features/billing/components/InvoiceFilters.jsx */
/* ********************************************************* */

import React from 'react';

const EMPTY_FILTERS = {
	search: '',
	status: '',
	paymentStatus: '',
	dateFrom: '',
	dateTo: '',
};

export default function InvoiceFilters({
	value = EMPTY_FILTERS,
	onChange,
	onReset,
	className = '',
}) {
	const filters = { ...EMPTY_FILTERS, ...value };

	const updateFilter = (name, nextValue) => {
		onChange?.({ ...filters, [name]: nextValue });
	};

	const clearFilters = () => {
		if (onReset) onReset();
		else onChange?.({ ...EMPTY_FILTERS });
	};

	return (
		<form
			className={`invoice-filters ${className}`.trim()}
			onSubmit={(event) => event.preventDefault()}
			aria-label="Invoice filters"
		>
			<label>
				Search
				<input
					type="search"
					value={filters.search}
					placeholder="Invoice number or patient"
					onChange={(event) => updateFilter('search', event.target.value)}
				/>
			</label>

			<label>
				Status
				<select
					value={filters.status}
					onChange={(event) => updateFilter('status', event.target.value)}
				>
					<option value="">All statuses</option>
					<option value="draft">Draft</option>
					<option value="sent">Sent</option>
					<option value="overdue">Overdue</option>
					<option value="paid">Paid</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</label>

			<label>
				Payment
				<select
					value={filters.paymentStatus}
					onChange={(event) => updateFilter('paymentStatus', event.target.value)}
				>
					<option value="">All payment statuses</option>
					<option value="unpaid">Unpaid</option>
					<option value="partially_paid">Partially paid</option>
					<option value="paid">Paid</option>
					<option value="refunded">Refunded</option>
				</select>
			</label>

			<label>
				From
				<input
					type="date"
					value={filters.dateFrom}
					onChange={(event) => updateFilter('dateFrom', event.target.value)}
				/>
			</label>

			<label>
				To
				<input
					type="date"
					value={filters.dateTo}
					onChange={(event) => updateFilter('dateTo', event.target.value)}
				/>
			</label>

			<button type="button" onClick={clearFilters}>
				Clear filters
			</button>
		</form>
	);
}

export { EMPTY_FILTERS };
