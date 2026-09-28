/* ************************************************************** */
/* File: #src/features/admin/components/doctors/DoctorFilters.jsx */
/* ************************************************************** */

import { useEffect, useState } from "react";

const EMPTY_FILTERS = { search: "", specialty: "", status: "" };

export default function DoctorFilters({ specialties = [], filters, onChange, onReset }) {
	const [values, setValues] = useState(() => ({ ...EMPTY_FILTERS, ...filters }));

	useEffect(() => {
		if (filters) setValues({ ...EMPTY_FILTERS, ...filters });
	}, [filters]);

	const update = (key, value) => {
		const next = { ...values, [key]: value };
		setValues(next);
		onChange?.(next);
	};

	const reset = () => {
		setValues(EMPTY_FILTERS);
		onReset?.();
		onChange?.(EMPTY_FILTERS);
	};

	return (
		<section className="doctor-filters" aria-label="Filter doctors">
			<div className="doctor-filters__field">
				<label htmlFor="doctor-search">Search doctors</label>
				<input
					id="doctor-search"
					type="search"
					placeholder="Name, email, or phone"
					value={values.search}
					onChange={(event) => update("search", event.target.value)}
				/>
			</div>
			<div className="doctor-filters__field">
				<label htmlFor="doctor-specialty">Specialty</label>
				<select id="doctor-specialty" value={values.specialty} onChange={(event) => update("specialty", event.target.value)}>
					<option value="">All specialties</option>
					{specialties.map((item) => {
						const value = typeof item === "string" ? item : item.value;
						const label = typeof item === "string" ? item : item.label;
						return <option key={value} value={value}>{label}</option>;
					})}
				</select>
			</div>
			<div className="doctor-filters__field">
				<label htmlFor="doctor-status">Status</label>
				<select id="doctor-status" value={values.status} onChange={(event) => update("status", event.target.value)}>
					<option value="">All statuses</option>
					<option value="active">Active</option>
					<option value="pending">Pending</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>
			<button className="doctor-filters__reset" type="button" onClick={reset}>
				Clear filters
			</button>
		</section>
	);
}
