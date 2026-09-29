/* ***************************************************************** */
/* File: #src/features/prescriptions/components/MedicineSelector.jsx */
/* ***************************************************************** */

import { useMemo, useState } from 'react';

/** Searchable medicine selector for prescription entry forms. */
export default function MedicineSelector({
	medicines = [],
	value = null,
	onChange,
	disabled = false,
	label = 'Medicine',
	id = 'medicine-selector',
}) {
	const [search, setSearch] = useState('');
	const selectedId = value && typeof value === 'object' ? value.id : value;

	const filteredMedicines = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return medicines;
		return medicines.filter((medicine) =>
			[medicine.name, medicine.genericName, medicine.strength, medicine.form]
				.filter(Boolean)
				.some((field) => String(field).toLowerCase().includes(term)),
		);
	}, [medicines, search]);

	const handleSelect = (event) => {
		const medicine = medicines.find(
			(item) => String(item.id) === event.target.value,
		);
		onChange?.(medicine ?? null);
	};

	return (
		<div className="medicine-selector">
			<label htmlFor={`${id}-search`}>{label}</label>
			<input
				id={`${id}-search`}
				type="search"
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				placeholder="Search medicines"
				disabled={disabled}
				aria-label={`Search ${label.toLowerCase()}`}
			/>
			<select
				id={id}
				value={selectedId == null ? '' : String(selectedId)}
				onChange={handleSelect}
				disabled={disabled}
				aria-label={label}
			>
				<option value="">Select a medicine</option>
				{filteredMedicines.map((medicine) => (
					<option key={medicine.id} value={String(medicine.id)}>
						{[medicine.name, medicine.strength, medicine.form]
							.filter(Boolean)
							.join(' — ')}
					</option>
				))}
			</select>
			{search && filteredMedicines.length === 0 && (
				<p role="status">No medicines found.</p>
			)}
		</div>
	);
}
