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

const normalizeMedicines = (medicines) =>
	(Array.isArray(medicines) ? medicines : []).map(createMedicine);

/**
 * Keeps prescription medicines in one place and exposes safe immutable updates.
 */
export default function usePrescriptionMedicine(initialMedicines = []) {
	const [medicines, setMedicines] = useState(() =>
		normalizeMedicines(initialMedicines),
	);

	const replaceMedicines = useCallback((nextMedicines) => {
		setMedicines(normalizeMedicines(nextMedicines));
	}, []);

	const resetMedicines = useCallback(() => {
		setMedicines(normalizeMedicines(initialMedicines));
	}, [initialMedicines]);

	const clearMedicines = useCallback(() => {
		setMedicines([]);
	}, []);

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
					? {
							...medicine,
							...(typeof changes === 'function'
								? changes(medicine)
								: changes),
						}
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
		replaceMedicines,
		resetMedicines,
		clearMedicines,
		addMedicine,
		removeMedicine,
		updateMedicine,
		updateDosage,
		updateFrequency,
		updateDuration,
	};
}
