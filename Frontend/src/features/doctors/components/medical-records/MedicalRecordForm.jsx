/* **************************************************************************** */
/* File: #src/features/doctors/components/medical-records/MedicalRecordForm.jsx */
/* **************************************************************************** */

import { useState } from 'react';

const emptyRecord = {
	patientName: '',
	visitDate: new Date().toISOString().slice(0, 10),
	diagnosis: '',
	symptoms: '',
	treatment: '',
	medications: '',
	notes: '',
};

export default function MedicalRecordForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting = false,
	submitLabel,
}) {
	const [record, setRecord] = useState(() => ({ ...emptyRecord, ...initialData }));
	const [error, setError] = useState('');
	const editing = Boolean(initialData?.id);

	function updateField(event) {
		const { name, value } = event.target;
		setRecord((current) => ({ ...current, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (!record.patientName.trim() || !record.visitDate || !record.diagnosis.trim()) {
			setError('Patient name, visit date, and diagnosis are required.');
			return;
		}

		setError('');
		try {
			await onSubmit?.({
				...record,
				patientName: record.patientName.trim(),
				diagnosis: record.diagnosis.trim(),
			});
		} catch (submitError) {
			setError(submitError?.message || 'Unable to save the medical record.');
		}
	}

	return (
		<form className="medical-record-form" onSubmit={handleSubmit} noValidate>
			<header className="medical-record-form__header">
				<h2>{editing ? 'Edit medical record' : 'Create medical record'}</h2>
				<p>Document the patient's visit, diagnosis, and care plan.</p>
			</header>

			{error && <p className="medical-record-form__error" role="alert">{error}</p>}

			<div className="medical-record-form__grid">
				<label className="medical-record-form__field">
					Patient name <span aria-hidden="true">*</span>
					<input name="patientName" value={record.patientName || ''} onChange={updateField} required disabled={isSubmitting} autoComplete="name" />
				</label>
				<label className="medical-record-form__field">
					Visit date <span aria-hidden="true">*</span>
					<input name="visitDate" type="date" value={record.visitDate || ''} onChange={updateField} required disabled={isSubmitting} />
				</label>
				<label className="medical-record-form__field medical-record-form__field--full">
					Diagnosis <span aria-hidden="true">*</span>
					<input name="diagnosis" value={record.diagnosis || ''} onChange={updateField} required disabled={isSubmitting} />
				</label>
				<label className="medical-record-form__field">
					Symptoms
					<textarea name="symptoms" value={record.symptoms || ''} onChange={updateField} rows={3} disabled={isSubmitting} />
				</label>
				<label className="medical-record-form__field">
					Treatment plan
					<textarea name="treatment" value={record.treatment || ''} onChange={updateField} rows={3} disabled={isSubmitting} />
				</label>
				<label className="medical-record-form__field medical-record-form__field--full">
					Medications
					<textarea name="medications" value={record.medications || ''} onChange={updateField} rows={3} disabled={isSubmitting} />
				</label>
				<label className="medical-record-form__field medical-record-form__field--full">
					Additional notes
					<textarea name="notes" value={record.notes || ''} onChange={updateField} rows={4} disabled={isSubmitting} />
				</label>
			</div>

			<div className="medical-record-form__actions">
				{onCancel && <button type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</button>}
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Saving…' : submitLabel || (editing ? 'Update record' : 'Save record')}
				</button>
			</div>
		</form>
	);
}
