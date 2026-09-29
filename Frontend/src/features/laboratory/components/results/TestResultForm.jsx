/* ******************************************************************** */
/* File: #src/features/laboratory/components/results/TestResultForm.jsx */
/* ******************************************************************** */

import { useState } from 'react';

const initialResult = {
	patientId: '',
	testName: '',
	result: '',
	unit: '',
	referenceRange: '',
	status: 'Normal',
	collectedAt: '',
	notes: '',
};

export default function TestResultForm({
	initialValues = {},
	patients = [],
	tests = [],
	isSubmitting = false,
	onSubmit,
	onCancel,
}) {
	const [values, setValues] = useState(() => ({ ...initialResult, ...initialValues }));
	const [error, setError] = useState('');

	const handleChange = ({ target: { name, value } }) => {
		setValues((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!values.patientId || !values.testName.trim() || !values.result.trim()) {
			setError('Patient, test, and result are required.');
			return;
		}

		setError('');
		try {
			await onSubmit?.({ ...values, testName: values.testName.trim(), result: values.result.trim() });
		} catch (submitError) {
			setError(submitError?.message || 'Unable to save the test result.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>{initialValues.id ? 'Update test result' : 'Record test result'}</h2>
			{error && <p role="alert">{error}</p>}

			<label htmlFor="patientId">Patient</label>
			<select id="patientId" name="patientId" value={values.patientId} onChange={handleChange} required>
				<option value="">Select patient</option>
				{patients.map((patient) => (
					<option key={patient.id} value={patient.id}>
						{patient.name || patient.fullName || patient.id}
					</option>
				))}
			</select>

			<label htmlFor="testName">Laboratory test</label>
			{tests.length ? (
				<select id="testName" name="testName" value={values.testName} onChange={handleChange} required>
					<option value="">Select test</option>
					{tests.map((test) => {
						const name = typeof test === 'string' ? test : test.name;
						return <option key={test.id || name} value={name}>{name}</option>;
					})}
				</select>
			) : (
				<input id="testName" name="testName" value={values.testName} onChange={handleChange} required />
			)}

			<label htmlFor="result">Result</label>
			<input id="result" name="result" value={values.result} onChange={handleChange} required />

			<label htmlFor="unit">Unit</label>
			<input id="unit" name="unit" value={values.unit} onChange={handleChange} />

			<label htmlFor="referenceRange">Reference range</label>
			<input id="referenceRange" name="referenceRange" value={values.referenceRange} onChange={handleChange} />

			<label htmlFor="status">Status</label>
			<select id="status" name="status" value={values.status} onChange={handleChange}>
				<option value="Normal">Normal</option>
				<option value="Abnormal">Abnormal</option>
				<option value="Critical">Critical</option>
				<option value="Pending">Pending</option>
			</select>

			<label htmlFor="collectedAt">Collection date and time</label>
			<input id="collectedAt" name="collectedAt" type="datetime-local" value={values.collectedAt} onChange={handleChange} />

			<label htmlFor="notes">Notes</label>
			<textarea id="notes" name="notes" value={values.notes} onChange={handleChange} rows={3} />

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Saving…' : 'Save result'}
			</button>
			{onCancel && <button type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</button>}
		</form>
	);
}

