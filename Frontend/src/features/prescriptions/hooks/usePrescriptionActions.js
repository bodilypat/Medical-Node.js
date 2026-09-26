/* **************************************************************** */
/* File: #src/features/prescriptions/hooks/usePrescriptionActions.js */
/* **************************************************************** */

import { useCallback } from 'react';

/** Provides prescription printing and PDF export actions. */
export default function usePrescriptionPrints({
	getPrescriptionElement,
	exportPDF,
	downloadFile,
} = {}) {
	const printPrescription = useCallback(() => {
		const element = getPrescriptionElement?.();
		if (!element || typeof window === 'undefined') return false;

		const printWindow = window.open('', '_blank');
		if (!printWindow) return false;

		printWindow.document.open();
		printWindow.document.write(
			`<!doctype html><html><head><title>Prescription</title></head><body>${element.outerHTML}</body></html>`,
		);
		printWindow.document.close();
		printWindow.addEventListener('load', () => {
			printWindow.focus();
			printWindow.print();
			printWindow.close();
		}, { once: true });
		return true;
	}, [getPrescriptionElement]);

	const exportPrescriptionPDF = useCallback(async (...args) => {
		if (typeof exportPDF !== 'function') return null;
		const file = await exportPDF(...args);
		if (file && typeof downloadFile === 'function') await downloadFile(file);
		return file;
	}, [exportPDF, downloadFile]);

	return { printPrescription, exportPDF: exportPrescriptionPDF, downloadFile };
}
