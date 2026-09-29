/* ***************************************************** */
/* File: #src/features/laboratory/hooks/useLabActions.js */
/* ***************************************************** */

import { useCallback, useState } from 'react';

/** Shared actions for laboratory orders, tests, specimens, and results. */
export default function useLabActions(actions = {}) {
	const [pendingActions, setPendingActions] = useState(0);
	const [error, setError] = useState(null);

	const runAction = useCallback(async (name, ...args) => {
		const action = actions[name];
		if (typeof action !== 'function') {
			throw new Error(`Laboratory action "${name}" is not available`);
		}

		setPendingActions((count) => count + 1);
		setError(null);
		try {
			return await action(...args);
		} catch (actionError) {
			setError(actionError);
			throw actionError;
		} finally {
			setPendingActions((count) => Math.max(0, count - 1));
		}
	}, [actions]);

	const clearError = useCallback(() => setError(null), []);

	return {
		runAction,
		loading: pendingActions > 0,
		error,
		clearError,
		createOrder: (...args) => runAction('createOrder', ...args),
		updateOrder: (...args) => runAction('updateOrder', ...args),
		cancelOrder: (...args) => runAction('cancelOrder', ...args),
		recordSpecimen: (...args) => runAction('recordSpecimen', ...args),
		updateResult: (...args) => runAction('updateResult', ...args),
		validateResult: (...args) => runAction('validateResult', ...args),
	};
}
