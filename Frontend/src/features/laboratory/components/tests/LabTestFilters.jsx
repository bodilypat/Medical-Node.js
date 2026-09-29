/* ****************************************************************** */
/* File: #src/features/laboratory/components/tests/LabTestFilters.jsx */
/* ****************************************************************** */
import { useState } from "react";

const EMPTY_FILTERS = { search: "", category: "", status: "" };

/** Search and filter controls for the laboratory test catalogue. */
export default function LabTestFilters({
	categories = [],
	statuses = ["active", "inactive"],
	initialFilters = EMPTY_FILTERS,
	onFilterChange,
	className = "",
}) {
	const [filters, setFilters] = useState(() => ({ ...EMPTY_FILTERS, ...initialFilters }));

	const changeFilter = (field, value) => {
		const next = { ...filters, [field]: value };
		setFilters(next);
		onFilterChange?.(next);
	};

	const clear = () => {
		const next = { ...EMPTY_FILTERS };
		setFilters(next);
		onFilterChange?.(next);
	};

	const categoryOption = (item) => typeof item === "string"
		? { value: item, label: item }
		: { value: item.value ?? item.id ?? item.name, label: item.label ?? item.name ?? item.value };
	const statusOption = (item) => typeof item === "string"
		? { value: item, label: item.charAt(0).toUpperCase() + item.slice(1) }
		: { value: item.value, label: item.label ?? item.value };

	return (
		<form className={`lab-test-filters ${className}`.trim()} onSubmit={(event) => event.preventDefault()}>
			<label className="lab-test-filters__field">
				<span>Search tests</span>
				<input
					type="search"
					name="search"
					value={filters.search}
					placeholder="Search by test name or code"
					onChange={(event) => changeFilter("search", event.target.value)}
				/>
			</label>
			<label className="lab-test-filters__field">
				<span>Category</span>
				<select name="category" value={filters.category} onChange={(event) => changeFilter("category", event.target.value)}>
					<option value="">All categories</option>
					{categories.map((item) => {
						const option = categoryOption(item);
						return <option key={option.value} value={option.value}>{option.label}</option>;
					})}
				</select>
			</label>
			<label className="lab-test-filters__field">
				<span>Status</span>
				<select name="status" value={filters.status} onChange={(event) => changeFilter("status", event.target.value)}>
					<option value="">All statuses</option>
					{statuses.map((item) => {
						const option = statusOption(item);
						return <option key={option.value} value={option.value}>{option.label}</option>;
					})}
				</select>
			</label>
			<button type="button" className="lab-test-filters__clear" onClick={clear}>
				Clear filters
			</button>
		</form>
	);
}
