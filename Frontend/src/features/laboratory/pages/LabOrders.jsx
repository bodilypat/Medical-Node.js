/* ************************************************** */
/* File: #src/features/laboratory/pages/LabOrders.jsx */
/* ************************************************** */

import { useMemo, useState } from 'react';

const statusClasses = {
	Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
	'In progress': 'bg-blue-50 text-blue-700 ring-blue-200',
	Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
	Cancelled: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export default function LabOrders() {
	const [orders, setOrders] = useState([]);
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('All');
	const [notice, setNotice] = useState('');

	const filteredOrders = useMemo(() => {
		const term = query.trim().toLowerCase();
		return orders.filter((order) => {
			const matches = [order.id, order.patient, order.patientId, order.test, order.department]
				.some((value) => String(value ?? '').toLowerCase().includes(term));
			return matches && (filter === 'All' || order.status === filter);
		});
	}, [orders, query, filter]);

	const updateStatus = (id, status) => {
		setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
		setNotice(`${id} updated to ${status}.`);
	};

	const metrics = [
		['Total orders', orders.length, 'text-slate-900'],
		['Pending', orders.filter((order) => order.status === 'Pending').length, 'text-amber-700'],
		['In progress', orders.filter((order) => order.status === 'In progress').length, 'text-blue-700'],
		['Completed', orders.filter((order) => order.status === 'Completed').length, 'text-emerald-700'],
	];

	return (
		<main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Laboratory management</p>
						<h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Lab orders</h1>
						<p className="mt-2 text-sm text-slate-500">Review test requests and track the laboratory queue.</p>
					</div>
					<button type="button" disabled className="cursor-not-allowed rounded-lg bg-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600" title="Connect a lab orders API to create orders">+ New lab order</button>
				</header>

				{notice && <div role="status" className="mb-5 flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')} className="ml-4 font-bold">×</button></div>}

				<section aria-label="Order summary" className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
					{metrics.map(([label, value, color]) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p></article>)}
				</section>

				<section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="text-lg font-semibold text-slate-900">Order queue</h2>
						<div className="flex flex-col gap-3 sm:flex-row">
							<label htmlFor="lab-order-search" className="sr-only">Search orders</label>
							<input id="lab-order-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient, test, or order" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-72" />
							<label htmlFor="lab-order-filter" className="sr-only">Filter by status</label>
							<select id="lab-order-filter" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"><option>All</option><option>Pending</option><option>In progress</option><option>Completed</option><option>Cancelled</option></select>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[760px] text-left text-sm">
							<thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{['Order / patient', 'Test', 'Department', 'Date ordered', 'Priority', 'Status', 'Update'].map((heading) => <th key={heading} scope="col" className="px-5 py-3 font-semibold">{heading}</th>)}</tr></thead>
							<tbody className="divide-y divide-slate-100">
								{filteredOrders.map((order) => <tr key={order.id} className="hover:bg-slate-50/70">
									<td className="px-5 py-4"><p className="font-semibold text-slate-900">{order.id}</p><p className="mt-1 text-slate-600">{order.patient}</p><p className="text-xs text-slate-400">{order.patientId}</p></td>
									<td className="px-5 py-4 font-medium">{order.test}</td><td className="px-5 py-4 text-slate-600">{order.department}</td>
									<td className="whitespace-nowrap px-5 py-4 text-slate-600">{new Date(`${order.date}T00:00:00`).toLocaleDateString()}</td>
									<td className="px-5 py-4"><span className={order.priority === 'Routine' ? 'text-slate-600' : 'font-semibold text-rose-700'}>{order.priority}</span></td>
									<td className="px-5 py-4"><span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[order.status]}`}>{order.status}</span></td>
									<td className="px-5 py-4"><label htmlFor={`status-${order.id}`} className="sr-only">Update {order.id} status</label><select id={`status-${order.id}`} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs"><option>Pending</option><option>In progress</option><option>Completed</option><option>Cancelled</option></select></td>
								</tr>)}
								{filteredOrders.length === 0 && <tr><td colSpan="7" className="px-5 py-12 text-center text-slate-500">{orders.length === 0 ? 'No lab orders are available. Connect a lab orders API to load real records.' : 'No orders match your search or status filter.'}</td></tr>}
							</tbody>
						</table>
					</div>
					<footer className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500">Showing {filteredOrders.length} of {orders.length} orders</footer>
				</section>
			</div>
		</main>
	);
}

