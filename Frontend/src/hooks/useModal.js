/* **************************** */
/* File: #src/hooks/useModal.js */
/* **************************** */

import { useCallback, useState } from 'react';

/**
 * Manages the visibility and optional data for a modal dialog.
 *
 * @param {boolean} initialOpen Whether the modal should start open.
 * @returns {{isOpen: boolean, open: (data?: unknown) => void, close: () => void, toggle: () => void, data: unknown}}
 */
const useModal = (initialOpen = false) => {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const [data, setData] = useState(null);

	const open = useCallback((nextData = null) => {
		setData(nextData);
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
		setData(null);
	}, []);

	const toggle = useCallback(() => {
		setIsOpen((currentlyOpen) => !currentlyOpen);
	}, []);

	return { isOpen, open, close, toggle, data };
};

export default useModal;
