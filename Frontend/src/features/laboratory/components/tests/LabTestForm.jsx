/* *************************************************************** */
/* File: #src/features/laboratory/components/tests/LabTestForm.jsx */
/* *************************************************************** */
import { useState } from 'react';

const EMPTY_TEST = {
	name: '',
	code: '',
	category: '',
	specimen: '',
	method: '',
	unit: '',
	referenceRange: '',
	price: '',
	turnaroundTime: '',
	description: '',
	isActive: true,
};

const fields = [
	{ name: 'name', label: 'Test name', required: true },
	{ name: 'code', label: 'Test code', required: true },
	{ name: 'category', label: 'Category' },
	{ name: 'specimen', label: 'Specimen type' },
	{ name: 'method', label: 'Testing method' },
	{ name: 'unit', label: 'Unit' },
	{ name: 'referenceRange', label: 'Reference range' },
	{ name: 'price', label: 'Price', type: 'number', min: '0', step: '0.01' },
	{ name: 'turnaroundTime', label: 'Turnaround time', placeholder: 'e.g. 24 hours' },
];

export default function LabTestForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting = false,
}) {
	const [values, setValues] = useState(() => ({ ...EMPTY_TEST, ...initialData }));
	const [error, setError] = useState('');

	function handleChange(event) {
		const { name, value, checked, type } = event.target;
		setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setError('');
		try {
			await onSubmit?.({
				...values,
				name: values.name.trim(),
				code: values.code.trim(),
				price: values.price === '' ? '' : Number(values.price),
			});
		} catch (submitError) {
			setError(submitError?.message || 'Unable to save the laboratory test.');
		}
	}

	const inputStyle = {
		boxSizing: 'border-box',
		width: '100%',
		padding: '0.6rem 0.7rem',
		border: '1px solid #cbd5e1',
		borderRadius: 6,
		font: 'inherit',
	};
	const labelStyle = { display: 'grid', gap: 6, fontWeight: 500 };

	return (
		<form onSubmit={handleSubmit}>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
				{fields.map(({ name, label, ...inputProps }) => (
					<label key={name} style={labelStyle}>
						<span>{label}{inputProps.required && <span aria-hidden="true"> *</span>}</span>
						<input
							{...inputProps}
							id={name}
							name={name}
							value={values[name] ?? ''}
							onChange={handleChange}
							required={inputProps.required}
							style={inputStyle}
						/>
					</label>
				))}
				<label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
					<span>Description</span>
					<textarea
						id="description"
						name="description"
						value={values.description ?? ''}
						onChange={handleChange}
						rows={3}
						style={{ ...inputStyle, resize: 'vertical' }}
					/>
				</label>
				<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<input name="isActive" type="checkbox" checked={Boolean(values.isActive)} onChange={handleChange} />
					Active test
				</label>
			</div>

			{error && <p role="alert" style={{ color: '#b91c1c', marginTop: 16 }}>{error}</p>}

			<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
				{onCancel && <button type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</button>}
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Saving…' : initialData ? 'Update test' : 'Create test'}
				</button>
			</div>
		</form>
	);
}
