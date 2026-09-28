/* ************************************************************************* */
/* File: #src/features/doctors/components/prescriptions/PrescriptionForm.jsx */
/* ************************************************************************* */

import { useEffect, useState } from 'react';

const emptyMedicine = { name: '', dosage: '', frequency: '', duration: '', instructions: '' };

const createInitialValues = (prescription = {}) => ({
	patientId: prescription.patientId || '',
	diagnosis: prescription.diagnosis || '',
	notes: prescription.notes || '',
	medicines: prescription.medicines?.length
		? prescription.medicines.map((medicine) => ({ ...emptyMedicine, ...medicine }))
		: [{ ...emptyMedicine }],
});

export default function PrescriptionForm({
	patients = [],
	initialPrescription,
	onSubmit,
	onCancel,
	loading = false,
}) {
	const [form, setForm] = useState(() => createInitialValues(initialPrescription));

	useEffect(() => {
		setForm(createInitialValues(initialPrescription));
	}, [initialPrescription]);

	const updateMedicine = (index, field, value) => {
		setForm((current) => ({
			...current,
			medicines: current.medicines.map((medicine, medicineIndex) =>
				medicineIndex === index ? { ...medicine, [field]: value } : medicine,
			),
		}));
	};

	const submit = (event) => {
		event.preventDefault();
		onSubmit?.(form);
	};

	return (
		<form className="prescription-form" onSubmit={submit}>
			<h2>{initialPrescription ? 'Edit prescription' : 'Create prescription'}</h2>

			<label>
				Patient
				<select
					value={form.patientId}
					onChange={(event) => setForm({ ...form, patientId: event.target.value })}
					required
				>
					<option value="">Select patient</option>
					{patients.map((patient) => {
						const id = patient.id || patient._id;
						return <option key={id} value={id}>{patient.name || `${patient.firstName || ''} ${patient.lastName || ''}`.trim()}</option>;
					})}
				</select>
			</label>

			<label>
				Diagnosis
				<input
					value={form.diagnosis}
					onChange={(event) => setForm({ ...form, diagnosis: event.target.value })}
					placeholder="Enter diagnosis"
					required
				/>
			</label>

			<fieldset>
				<legend>Medicines</legend>
				{form.medicines.map((medicine, index) => (
					<div className="medicine-row" key={index}>
						{Object.keys(emptyMedicine).map((field) => (
							<input
								key={field}
								value={medicine[field]}
								onChange={(event) => updateMedicine(index, field, event.target.value)}
								placeholder={field[0].toUpperCase() + field.slice(1)}
								required={field !== 'instructions'}
							/>
						))}
						{form.medicines.length > 1 && (
							<button type="button" onClick={() => setForm({ ...form, medicines: form.medicines.filter((_, i) => i !== index) })}>
								Remove
							</button>
						)}
					</div>
				))}
				<button type="button" onClick={() => setForm({ ...form, medicines: [...form.medicines, { ...emptyMedicine }] })}>
					Add medicine
				</button>
			</fieldset>

			<label>
				Additional notes
				<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows="3" />
			</label>

			<div className="prescription-form__actions">
				{onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
				<button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Save prescription'}</button>
			</div>
		</form>
	);
}
