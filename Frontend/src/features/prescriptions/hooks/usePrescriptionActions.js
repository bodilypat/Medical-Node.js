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

		try {
			const printDocument = printWindow.document;
			printDocument.open();
			printDocument.write('<!doctype html><html><head><meta charset="utf-8"><title>Prescription</title></head><body></body></html>');
			printDocument.close();
			printDocument.body.innerHTML = element.outerHTML;

			const print = () => {
				if (printWindow.closed) return;
				printWindow.focus();
				printWindow.print();
			};
			if (printDocument.readyState === 'complete') print();
			else printWindow.addEventListener('load', print, { once: true });
			return true;
		} catch {
			if (!printWindow.closed) printWindow.close();
			return false;
		}
	}, [getPrescriptionElement]);

	const exportPrescriptionPDF = useCallback(async (...args) => {
		if (typeof exportPDF !== 'function') return null;
		try {
			const file = await exportPDF(...args);
			if (file && typeof downloadFile === 'function') await downloadFile(file);
			return file;
		} catch {
			return null;
		}
	}, [exportPDF, downloadFile]);

	return { printPrescription, exportPDF: exportPrescriptionPDF, downloadFile };
}
