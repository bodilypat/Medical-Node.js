/* ************************************************************ */
/* File: #src/features/admin/components/reports/ReportTable.jsx */
/* ************************************************************ */

import { useMemo, useState } from 'react';

const DEFAULT_PAGE_SIZE = 10;

function formatValue(value) {
	if (value == null || value === '') return '—';
	if (typeof value === 'boolean') return value ? 'Yes' : 'No';
	if (typeof value === 'object') return JSON.stringify(value);
	return String(value);
}

/**
 * Searchable, sortable and paginated table for administrative reports.
 *
 * Props:
 * - reports: report rows (objects)
 * - columns: [{ key, label, render?, sortable? }]
 * - loading, error: optional request state
 * - pageSize: optional number of rows per page
 * - onRowClick: optional callback invoked with a clicked report
 */
export default function ReportTable({
	reports = [],
	columns,
	loading = false,
	error = '',
	pageSize = DEFAULT_PAGE_SIZE,
	onRowClick,
	emptyMessage = 'No reports found.',
}) {
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState({ key: '', direction: 'asc' });
	const [page, setPage] = useState(0);

	const safeReports = Array.isArray(reports) ? reports : [];
	const resolvedColumns = useMemo(() => {
		if (Array.isArray(columns) && columns.length) return columns;
		const keys = [...new Set(safeReports.flatMap((report) => Object.keys(report || {})))];
		return keys.map((key) => ({
			key,
			label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase()),
		}));
	}, [columns, safeReports]);

	const filteredReports = useMemo(() => {
		const needle = query.trim().toLowerCase();
		const matching = !needle
			? safeReports
			: safeReports.filter((report) =>
					resolvedColumns.some((column) =>
						formatValue(report?.[column.key]).toLowerCase().includes(needle),
					),
				);

		if (!sort.key) return matching;
		return [...matching].sort((a, b) => {
			const first = a?.[sort.key];
			const second = b?.[sort.key];
			const comparison =
				typeof first === 'number' && typeof second === 'number'
					? first - second
					: formatValue(first).localeCompare(formatValue(second), undefined, {
							numeric: true,
							sensitivity: 'base',
						});
			return sort.direction === 'asc' ? comparison : -comparison;
		});
	}, [safeReports, query, resolvedColumns, sort]);

	const pageCount = Math.max(1, Math.ceil(filteredReports.length / Math.max(1, pageSize)));
	const currentPage = Math.min(page, pageCount - 1);
	const visibleReports = filteredReports.slice(
		currentPage * Math.max(1, pageSize),
		(currentPage + 1) * Math.max(1, pageSize),
	);

	function updateQuery(value) {
		setQuery(value);
		setPage(0);
	}

	function toggleSort(column) {
		if (column.sortable === false) return;
		setSort((current) => ({
			key: column.key,
			direction: current.key === column.key && current.direction === 'asc' ? 'desc' : 'asc',
		}));
		setPage(0);
	}

	return (
		<section className="report-table" aria-label="Medical reports">
			<div className="report-table__toolbar">
				<label className="report-table__search">
					<span className="report-table__search-label">Search reports</span>
					<input
						type="search"
						value={query}
						onChange={(event) => updateQuery(event.target.value)}
						placeholder="Search reports..."
						aria-label="Search reports"
					/>
				</label>
				<span className="report-table__count" aria-live="polite">
					{filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'}
				</span>
			</div>

			{error && <div className="report-table__error" role="alert">{error}</div>}

			<div className="report-table__scroll">
				<table>
					<thead>
						<tr>
							{resolvedColumns.map((column) => (
								<th key={column.key} scope="col">
									<button
										type="button"
										className="report-table__sort"
										onClick={() => toggleSort(column)}
										aria-label={`Sort by ${column.label}`}
										aria-sort={sort.key === column.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
										disabled={column.sortable === false}
									>
										{column.label}
										{sort.key === column.key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ''}
									</button>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan={Math.max(1, resolvedColumns.length)}>Loading reports…</td></tr>
						) : visibleReports.length ? (
							visibleReports.map((report, index) => (
								<tr
									key={report.id ?? report._id ?? `${currentPage}-${index}`}
									onClick={onRowClick ? () => onRowClick(report) : undefined}
									className={onRowClick ? 'report-table__row report-table__row--clickable' : 'report-table__row'}
								>
									{resolvedColumns.map((column) => (
										<td key={column.key}>
											{column.render ? column.render(report?.[column.key], report) : formatValue(report?.[column.key])}
										</td>
									))}
								</tr>
							))
						) : (
							<tr><td colSpan={Math.max(1, resolvedColumns.length)}>{emptyMessage}</td></tr>
						)}
					</tbody>
				</table>
			</div>

			<nav className="report-table__pagination" aria-label="Report pages">
				<button type="button" onClick={() => setPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0 || loading}>
					Previous
				</button>
				<span>Page {currentPage + 1} of {pageCount}</span>
				<button type="button" onClick={() => setPage(Math.min(pageCount - 1, currentPage + 1))} disabled={currentPage >= pageCount - 1 || loading}>
					Next
				</button>
			</nav>
		</section>
	);
}

