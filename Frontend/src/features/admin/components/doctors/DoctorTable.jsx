/* *********************************************************** */
/* File: #src/features/admin/components/doctors/DoctorForm.jsx */
/* *********************************************************** */

import { useState } from 'react';

const EMPTY_DOCTOR = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	specialty: '',
	licenseNumber: '',
	department: '',
	status: 'active',
};

const SPECIALTIES = [
	'Cardiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
	'Internal Medicine', 'Neurology', 'Obstetrics & Gynecology', 'Oncology',
	'Pediatrics', 'Psychiatry', 'Surgery',
];

export default function DoctorForm({
	initialValues = EMPTY_DOCTOR,
	departments = [],
	onSubmit,
	onCancel,
	isSubmitting = false,
	error = '',
}) {
	const [values, setValues] = useState(() => ({ ...EMPTY_DOCTOR, ...initialValues }));
	const [validationError, setValidationError] = useState('');

	function handleChange(event) {
		const { name, value } = event.target;
		setValues((current) => ({ ...current, [name]: value }));
		setValidationError('');
	}

	function handleSubmit(event) {
		event.preventDefault();
		const doctor = {
			...values,
			firstName: values.firstName.trim(),
			lastName: values.lastName.trim(),
			email: values.email.trim(),
			phone: values.phone.trim(),
			licenseNumber: values.licenseNumber.trim(),
		};
		if (!doctor.firstName || !doctor.lastName || !doctor.email || !doctor.specialty || !doctor.licenseNumber) {
			setValidationError('Complete all required fields before saving.');
			return;
		}
		onSubmit?.(doctor);
	}

	const inputClass = 'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
	const labelClass = 'mb-1 block text-sm font-medium text-gray-700';

	return (
		<form onSubmit={handleSubmit} className="space-y-5" noValidate>
			{(error || validationError) && <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{validationError || error}</p>}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className={labelClass} htmlFor="doctor-firstName">First name *</label>
					<input className={inputClass} id="doctor-firstName" name="firstName" value={values.firstName} onChange={handleChange} autoComplete="given-name" required />
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-lastName">Last name *</label>
					<input className={inputClass} id="doctor-lastName" name="lastName" value={values.lastName} onChange={handleChange} autoComplete="family-name" required />
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-email">Email *</label>
					<input className={inputClass} id="doctor-email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" required />
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-phone">Phone</label>
					<input className={inputClass} id="doctor-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-specialty">Specialty *</label>
					<select className={inputClass} id="doctor-specialty" name="specialty" value={values.specialty} onChange={handleChange} required>
						<option value="">Select a specialty</option>
						{SPECIALTIES.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
					</select>
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-licenseNumber">License number *</label>
					<input className={inputClass} id="doctor-licenseNumber" name="licenseNumber" value={values.licenseNumber} onChange={handleChange} required />
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-department">Department</label>
					<select className={inputClass} id="doctor-department" name="department" value={values.department} onChange={handleChange}>
						<option value="">No department</option>
						{departments.map((department) => {
							const id = typeof department === 'string' ? department : department.id;
							const name = typeof department === 'string' ? department : department.name;
							return <option key={id} value={id}>{name}</option>;
						})}
					</select>
				</div>
				<div>
					<label className={labelClass} htmlFor="doctor-status">Status</label>
					<select className={inputClass} id="doctor-status" name="status" value={values.status} onChange={handleChange}>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>
			</div>
			<div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
				{onCancel && <button type="button" onClick={onCancel} disabled={isSubmitting} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">Cancel</button>}
				<button type="submit" disabled={isSubmitting} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
					{isSubmitting ? 'Saving…' : initialValues?.id ? 'Save changes' : 'Add doctor'}
				</button>
			</div>
		</form>
	);
}
