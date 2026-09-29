/* *********************************************** */
/* File: #src/features/billing/hooks/useBilling.js */
/* *********************************************** */

import { useCallback, useMemo, useState } from 'react';

const toAmount = (value) => Math.max(0, Number(value) || 0);

const normalizeItem = (item = {}) => ({
	...item,
	id: item.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
	description: item.description || item.name || 'Medical service',
	quantity: Math.max(1, Number(item.quantity) || 1),
	unitPrice: toAmount(item.unitPrice ?? item.price),
	discount: toAmount(item.discount),
	tax: toAmount(item.tax),
});

/** Billing state and calculations for medical services and invoices. */
export default function useBilling(initialItems = [], options = {}) {
	const [items, setItems] = useState(() => initialItems.map(normalizeItem));
	const [paymentStatus, setPaymentStatus] = useState(options.paymentStatus || 'unpaid');

	const addItem = useCallback((item) => {
		const nextItem = normalizeItem(item);
		setItems((current) => [...current, nextItem]);
		return nextItem;
	}, []);

	const updateItem = useCallback((id, changes) => {
		setItems((current) => current.map((item) => (
			item.id === id ? normalizeItem({ ...item, ...changes, id }) : item
		)));
	}, []);

	const removeItem = useCallback((id) => {
		setItems((current) => current.filter((item) => item.id !== id));
	}, []);

	const clearItems = useCallback(() => setItems([]), []);

	const totals = useMemo(() => {
		const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
		const discount = items.reduce((sum, item) => sum + item.discount, 0);
		const tax = items.reduce((sum, item) => sum + item.tax, 0);
		return {
			subtotal,
			discount,
			tax,
			total: Math.max(0, subtotal - discount + tax),
		};
	}, [items]);

	const markAsPaid = useCallback(() => setPaymentStatus('paid'), []);
	const markAsUnpaid = useCallback(() => setPaymentStatus('unpaid'), []);

	return {
		items,
		setItems,
		paymentStatus,
		setPaymentStatus,
		...totals,
		addItem,
		updateItem,
		removeItem,
		clearItems,
		markAsPaid,
		markAsUnpaid,
	};
}
