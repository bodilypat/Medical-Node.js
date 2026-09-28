/* ************************************************************************* */
/* File: #src/features/doctors/components/medical-records/DiagnosistForm.jsx */
/* ************************************************************************* */

import { useState } from 'react';

const emptyRecord = {
	diagnosis: '',
	symptoms: '',
	treatment: '',
	medications: '',
	followUpDate: '',
	notes: '',
};

export default function DiagnosistForm({ initialData = {}, onSubmit, submitting = false }) {
	const [record, setRecord] = useState(() => ({ ...emptyRecord, ...initialData }));
	const [error, setError] = useState('');

	function handleChange(event) {
		const { name, value } = event.target;
		setRecord((current) => ({ ...current, [name]: value }));
		if (error) setError('');
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const diagnosis = record.diagnosis.trim();
		if (!diagnosis) {
			setError('Enter a diagnosis before saving.');
			return;
		}

		setError('');
		await onSubmit?.({ ...record, diagnosis });
	}

	return (
		<form className="diagnosis-form" onSubmit={handleSubmit}>
			<h2>Diagnosis and treatment</h2>
			<p>Record the clinical assessment and care plan.</p>

			<div className="diagnosis-form__field">
				<label htmlFor="diagnosis">Diagnosis <span aria-hidden="true">*</span></label>
				<input id="diagnosis" name="diagnosis" value={record.diagnosis} onChange={handleChange} required />
				{error && <span role="alert">{error}</span>}
			</div>

			<div className="diagnosis-form__field">
				<label htmlFor="symptoms">Symptoms and findings</label>
				<textarea id="symptoms" name="symptoms" rows={3} value={record.symptoms} onChange={handleChange} />
			</div>

			<div className="diagnosis-form__field">
				<label htmlFor="treatment">Treatment plan</label>
				<textarea id="treatment" name="treatment" rows={3} value={record.treatment} onChange={handleChange} />
			</div>

			<div className="diagnosis-form__field">
				<label htmlFor="medications">Medications</label>
				<textarea id="medications" name="medications" rows={2} value={record.medications} onChange={handleChange} placeholder="Medication, dosage, and instructions" />
			</div>

			<div className="diagnosis-form__field">
				<label htmlFor="followUpDate">Follow-up date</label>
				<input id="followUpDate" name="followUpDate" type="date" value={record.followUpDate} onChange={handleChange} />
			</div>

			<div className="diagnosis-form__field">
				<label htmlFor="notes">Additional notes</label>
				<textarea id="notes" name="notes" rows={3} value={record.notes} onChange={handleChange} />
			</div>

			<button type="submit" disabled={submitting}>
				{submitting ? 'Saving…' : 'Save medical record'}
			</button>
		</form>
	);
}

