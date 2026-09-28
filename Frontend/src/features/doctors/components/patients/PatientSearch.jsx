/* ***************************************************************** */
/* File: #src/features/doctors/components/patients/PatientSearch.jsx */
/* ***************************************************************** */

import { useMemo, useState } from 'react';

/**
 * Searches patients and starts appointment creation for the selected patient.
 * Pass an `onGenerateAppointment` handler to connect this component to the API
 * or appointment form.
 */
export default function PatientSearch({ patients = [], onGenerateAppointment }) {
	const [query, setQuery] = useState('');
	const [selectedPatient, setSelectedPatient] = useState(null);

	const results = useMemo(() => {
		const value = query.trim().toLowerCase();
		if (!value) return patients;

		return patients.filter((patient) =>
			[patient.name, patient.phone, patient.email]
				.filter(Boolean)
				.some((field) => String(field).toLowerCase().includes(value)),
		);
	}, [patients, query]);

	const generateAppointment = () => {
		if (!selectedPatient) return;
		onGenerateAppointment?.(selectedPatient);
	};

	return (
		<section className="patient-search" aria-labelledby="patient-search-title">
			<h2 id="patient-search-title">Generate appointment</h2>
			<label htmlFor="patient-search-input">Search patient</label>
			<input
				id="patient-search-input"
				type="search"
				value={query}
				placeholder="Search by name, phone, or email"
				onChange={(event) => setQuery(event.target.value)}
			/>

			<ul className="patient-search__results" aria-live="polite">
				{results.length ? (
					results.map((patient) => (
						<li key={patient.id}>
							<button
								type="button"
								className={selectedPatient?.id === patient.id ? 'selected' : ''}
								onClick={() => setSelectedPatient(patient)}
							>
								<strong>{patient.name}</strong>
								<span>{patient.phone || patient.email}</span>
							</button>
						</li>
					))
				) : (
					<li>{query.trim() ? 'No patients found.' : 'No patients available.'}</li>
				)}
			</ul>

			<button type="button" disabled={!selectedPatient} onClick={generateAppointment}>
				Generate appointment{selectedPatient ? ` for ${selectedPatient.name}` : ''}
			</button>
		</section>
	);
}
