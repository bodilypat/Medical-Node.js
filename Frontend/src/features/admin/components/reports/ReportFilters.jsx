/* ************************************************************** */
/* File: #src/features/admin/components/reports/ReportFilters.jsx */
/* ************************************************************** */

import React from 'react';

const DEFAULT_FILTERS = {
	search: '',
	reportType: '',
	status: '',
	dateFrom: '',
	dateTo: '',
};

const inputClassName =
	'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

/** Filters used to narrow the reports shown in the admin dashboard. */
export default function ReportFilters({
	filters = DEFAULT_FILTERS,
	onChange = () => {},
	onReset,
	reportTypes = [
		{ value: 'appointments', label: 'Appointments' },
		{ value: 'patients', label: 'Patients' },
		{ value: 'revenue', label: 'Revenue' },
		{ value: 'staff', label: 'Staff' },
	],
	statuses = [
		{ value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'cancelled', label: 'Cancelled' },
	],
}) {
	const currentFilters = { ...DEFAULT_FILTERS, ...filters };

	const updateFilter = (name, value) => {
		onChange({ ...currentFilters, [name]: value });
	};

	const resetFilters = () => {
		if (onReset) {
			onReset();
			return;
		}
		onChange({ ...DEFAULT_FILTERS });
	};

	return (
		<section aria-label="Report filters" className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
				<div className="sm:col-span-2 lg:col-span-2">
					<label htmlFor="report-search" className="mb-1 block text-sm font-medium text-gray-700">
						Search reports
					</label>
					<input
						id="report-search"
						type="search"
						className={inputClassName}
						placeholder="Search by report name..."
						value={currentFilters.search}
						onChange={(event) => updateFilter('search', event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="report-type" className="mb-1 block text-sm font-medium text-gray-700">
						Report type
					</label>
					<select
						id="report-type"
						className={inputClassName}
						value={currentFilters.reportType}
						onChange={(event) => updateFilter('reportType', event.target.value)}
					>
						<option value="">All types</option>
						{reportTypes.map((type) => (
							<option key={type.value} value={type.value}>
								{type.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="report-status" className="mb-1 block text-sm font-medium text-gray-700">
						Status
					</label>
					<select
						id="report-status"
						className={inputClassName}
						value={currentFilters.status}
						onChange={(event) => updateFilter('status', event.target.value)}
					>
						<option value="">All statuses</option>
						{statuses.map((status) => (
							<option key={status.value} value={status.value}>
								{status.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="report-date-from" className="mb-1 block text-sm font-medium text-gray-700">
						From date
					</label>
					<input
						id="report-date-from"
						type="date"
						className={inputClassName}
						value={currentFilters.dateFrom}
						max={currentFilters.dateTo || undefined}
						onChange={(event) => updateFilter('dateFrom', event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="report-date-to" className="mb-1 block text-sm font-medium text-gray-700">
						To date
					</label>
					<input
						id="report-date-to"
						type="date"
						className={inputClassName}
						value={currentFilters.dateTo}
						min={currentFilters.dateFrom || undefined}
						onChange={(event) => updateFilter('dateTo', event.target.value)}
					/>
				</div>
			</div>

			<div className="mt-4 flex justify-end">
				<button
					type="button"
					onClick={resetFilters}
					className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Clear filters
				</button>
			</div>
		</section>
	);
}
