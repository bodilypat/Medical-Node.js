/* ************************************************************ */
/* File: #src/features/prescriptions/components/MedicineRow.jsx */
/* ************************************************************ */

import React from 'react';

const medicineFields = [
	{ name: 'name', label: 'Medicine name', placeholder: 'Enter medicine name', autoComplete: 'off', required: true },
	{ name: 'dosage', label: 'Dosage', placeholder: 'Enter dose (e.g. 500 mg)', required: true },
	{ name: 'route', label: 'Route', placeholder: 'Enter route (e.g. oral)' },
	{ name: 'frequency', label: 'Frequency', placeholder: 'Enter frequency' },
	{ name: 'duration', label: 'Duration', placeholder: 'Enter duration' },
	{ name: 'quantity', label: 'Quantity', placeholder: 'Enter units', type: 'number', min: 1, step: 1 },
];

export default function MedicineRow({
	medicine = {},
	index = 0,
	onChange,
	onRemove,
	readOnly = false,
}) {
	const handleChange = ({ target: { name, value } }) => {
		onChange?.(index, { ...medicine, [name]: value });
	};

	return (
		<fieldset className="medicine-row" disabled={readOnly}>
			<legend>Medicine {index + 1}</legend>
			<div className="medicine-row__fields">
				{medicineFields.map(({ name, label, placeholder, type = 'text', min, step, autoComplete, required }) => (
					<label className="medicine-row__field" key={name}>
						<span>{label}{required ? ' *' : ''}</span>
						<input
							name={name}
							type={type}
							min={min}
							step={step}
							autoComplete={autoComplete}
							required={required}
							value={medicine[name] ?? ''}
							placeholder={placeholder}
							onChange={handleChange}
						/>
					</label>
				))}
				<label className="medicine-row__field medicine-row__field--instructions">
					<span>Instructions</span>
					<input
						name="instructions"
						type="text"
						value={medicine.instructions ?? ''}
						placeholder="Enter special directions for the patient"
						onChange={handleChange}
					/>
				</label>
			</div>
			{!readOnly && (
				<button
					className="medicine-row__remove"
					type="button"
					onClick={() => onRemove?.(index)}
					aria-label={`Remove medicine ${index + 1}`}
				>
					Remove
				</button>
			)}
		</fieldset>
	);
}
