/* ******************************* */
/* File: #src/hooks/useDebounce.js */
/* ******************************* */

import { useEffect, useState } from 'react';

/**
 * Delays updating a value until it has remained unchanged for the given time.
 *
 * @param {*} value Value to debounce.
 * @param {number} delay Delay in milliseconds (default: 500).
 * @returns {*} Debounced value.
 */
export default function useDebounce(value, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
}
