/* **************************************************************** */
/* File: #src/features/prescriptions/hooks/useCreatePrescription.js */
/* **************************************************************** */

import { useCallback, useState } from 'react';

const createMedicine = (medicine = {}) => ({
	id: medicine.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
	name: medicine.name ?? '',
	dosage: medicine.dosage ?? '',
	frequency: medicine.frequency ?? '',
	duration: medicine.duration ?? '',
	...medicine,
});

/**
 * Keeps prescription medicines in one place and exposes safe immutable updates.
 */
export default function usePrescriptionMedicine(initialMedicines = []) {
	const [medicines, setMedicines] = useState(() =>
		initialMedicines.map(createMedicine),
	);

	const addMedicine = useCallback((medicine = {}) => {
		const newMedicine = createMedicine(medicine);
		setMedicines((current) => [...current, newMedicine]);
		return newMedicine;
	}, []);

	const removeMedicine = useCallback((id) => {
		setMedicines((current) => current.filter((medicine) => medicine.id !== id));
	}, []);

	const updateMedicine = useCallback((id, changes) => {
		setMedicines((current) =>
			current.map((medicine) =>
				medicine.id === id
					? { ...medicine, ...(typeof changes === 'function' ? changes(medicine) : changes) }
					: medicine,
			),
		);
	}, []);

	const updateDosage = useCallback(
		(id, dosage) => updateMedicine(id, { dosage }),
		[updateMedicine],
	);

	const updateFrequency = useCallback(
		(id, frequency) => updateMedicine(id, { frequency }),
		[updateMedicine],
	);

	const updateDuration = useCallback(
		(id, duration) => updateMedicine(id, { duration }),
		[updateMedicine],
	);

	return {
		medicines,
		setMedicines,
		addMedicine,
		removeMedicine,
		updateMedicine,
		updateDosage,
		updateFrequency,
		updateDuration,
	};
}
