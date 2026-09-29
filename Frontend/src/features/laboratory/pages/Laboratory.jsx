/* *************************************************** */
/* File: #src/features/laboratory/pages/Laboratory.jsx */
/* *************************************************** */

import { useMemo, useState } from 'react';

const seedOrders = [
	{ id: 'LAB-1048', patient: 'Olivia Martin', patientId: 'PT-2041', test: 'Complete blood count', category: 'Hematology', priority: 'Routine', status: 'In progress', ordered: '09:12 AM', provider: 'Dr. Chen' },
	{ id: 'LAB-1047', patient: 'Noah Williams', patientId: 'PT-1873', test: 'Comprehensive metabolic panel', category: 'Chemistry', priority: 'Urgent', status: 'Awaiting collection', ordered: '09:05 AM', provider: 'Dr. Patel' },
	{ id: 'LAB-1046', patient: 'Emma Johnson', patientId: 'PT-2260', test: 'Lipid panel', category: 'Chemistry', priority: 'Routine', status: 'Completed', ordered: '08:48 AM', provider: 'Dr. Chen' },
	{ id: 'LAB-1045', patient: 'Liam Brown', patientId: 'PT-1938', test: 'Urinalysis', category: 'Urinalysis', priority: 'Routine', status: 'Awaiting collection', ordered: '08:36 AM', provider: 'Dr. Lewis' },
	{ id: 'LAB-1044', patient: 'Ava Garcia', patientId: 'PT-2115', test: 'Thyroid stimulating hormone', category: 'Immunology', priority: 'Urgent', status: 'In progress', ordered: '08:21 AM', provider: 'Dr. Patel' },
];

const tabs = ['All orders', 'Awaiting collection', 'In progress', 'Completed'];
const badgeColors = {
	'Awaiting collection': { color: '#965900', background: '#fff2d8' },
	'In progress': { color: '#2458a6', background: '#eaf1ff' },
	Completed: { color: '#16734b', background: '#e5f6ed' },
};

const css = `
	.laboratory { min-height: 100vh; padding: 32px; background: #f6f8fb; color: #202b3c; font-family: Inter, system-ui, sans-serif; }
	.laboratory * { box-sizing: border-box; }
	.lab-container { max-width: 1240px; margin: auto; }
	.lab-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
	.lab-heading h1 { margin: 0; font-size: 30px; letter-spacing: -.04em; }
	.lab-heading p { margin: 7px 0 0; color: #718096; font-size: 14px; }
	.lab-button { border: 1px solid #d9e1eb; border-radius: 8px; padding: 10px 14px; background: white; color: #344256; font: inherit; font-size: 13px; font-weight: 650; cursor: pointer; }
	.lab-button-primary { border-color: #2459a6; background: #2459a6; color: white; }
	.lab-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
	.lab-stat, .lab-orders { border: 1px solid #e4eaf1; border-radius: 11px; background: white; }
	.lab-stat { padding: 17px 19px; }
	.lab-stat-label { color: #718096; font-size: 12px; }
	.lab-stat-value { margin-top: 8px; font-size: 27px; font-weight: 700; }
	.lab-tabs { display: flex; gap: 22px; overflow-x: auto; padding: 0 18px; border-bottom: 1px solid #edf0f4; }
	.lab-tab { padding: 16px 0 13px; border: 0; border-bottom: 2px solid transparent; background: none; color: #718096; font: inherit; font-size: 13px; font-weight: 600; white-space: nowrap; cursor: pointer; }
	.lab-tab.active { border-bottom-color: #2459a6; color: #2459a6; }
	.lab-filters { display: flex; gap: 10px; padding: 14px 18px; }
	.lab-filters input, .lab-filters select, .lab-dialog input, .lab-dialog select { min-height: 38px; padding: 0 10px; border: 1px solid #d9e1eb; border-radius: 7px; background: white; color: #344256; font: inherit; font-size: 13px; }
	.lab-filters input { width: min(330px, 100%); }
	.lab-table-wrap { overflow-x: auto; }
	.lab-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
	.lab-table th { padding: 11px 16px; background: #f9fafc; color: #778497; font-size: 10px; letter-spacing: .06em; text-transform: uppercase; }
	.lab-table td { padding: 14px 16px; border-top: 1px solid #edf0f4; color: #526176; font-size: 12px; }
	.lab-main-text { color: #263449; font-size: 13px; font-weight: 650; }
	.lab-muted { margin-top: 4px; color: #8793a3; font-size: 11px; }
	.lab-id { color: #2459a6; font-weight: 650; }
	.lab-badge { display: inline-block; padding: 5px 9px; border-radius: 16px; font-size: 10px; font-weight: 700; }
	.lab-urgent { color: #a83f38 !important; font-weight: 650; }
	.lab-empty { padding: 36px !important; text-align: center; }
	.lab-footer { padding: 13px 18px; border-top: 1px solid #edf0f4; color: #8793a3; font-size: 11px; }
	.lab-backdrop { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 20px; background: #15223880; }
	.lab-dialog { width: min(440px, 100%); padding: 24px; border-radius: 12px; background: white; box-shadow: 0 20px 60px #14203333; }
	.lab-dialog h2 { margin: 0 0 18px; font-size: 20px; }
	.lab-form { display: grid; gap: 12px; }
	.lab-form label { display: grid; gap: 6px; color: #526176; font-size: 12px; font-weight: 600; }
	.lab-dialog input, .lab-dialog select { width: 100%; }
	.lab-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 8px; }
	@media (max-width: 700px) { .laboratory { padding: 20px 14px; } .lab-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; } .lab-heading { align-items: flex-start; } }
	@media (max-width: 450px) { .lab-heading { flex-direction: column; } .lab-filters { flex-direction: column; } .lab-filters input, .lab-filters select { width: 100%; } }
`;

export default function Laboratory() {
	const [orders, setOrders] = useState(seedOrders);
	const [tab, setTab] = useState('All orders');
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('All categories');
	const [formOpen, setFormOpen] = useState(false);
	const [form, setForm] = useState({ patient: '', patientId: '', test: '', category: 'Chemistry', priority: 'Routine', provider: '' });

	const filteredOrders = useMemo(() => orders.filter((order) => {
		const query = search.trim().toLowerCase();
		const textMatch = [order.id, order.patient, order.patientId, order.test, order.provider].some((value) => value.toLowerCase().includes(query));
		return (tab === 'All orders' || order.status === tab) && textMatch && (category === 'All categories' || order.category === category);
	}), [orders, tab, search, category]);

	const count = (status) => orders.filter((order) => order.status === status).length;

	function submitOrder(event) {
		event.preventDefault();
		const id = `LAB-${1049 + Math.max(0, orders.length - seedOrders.length)}`;
		setOrders((current) => [{ ...form, id, ordered: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'Awaiting collection' }, ...current]);
		setForm({ patient: '', patientId: '', test: '', category: 'Chemistry', priority: 'Routine', provider: '' });
		setFormOpen(false);
	}

	function advanceStatus(id) {
		setOrders((current) => current.map((order) => order.id !== id ? order : { ...order, status: order.status === 'Awaiting collection' ? 'In progress' : 'Completed' }));
	}

	return <>
		<style>{css}</style>
		<main className="laboratory"><div className="lab-container">
			<header className="lab-heading"><div><h1>Laboratory</h1><p>Manage test orders, specimen collection, and results.</p></div><button className="lab-button lab-button-primary" type="button" onClick={() => setFormOpen(true)}>＋ New lab order</button></header>

			<section className="lab-stats" aria-label="Laboratory overview">
				<article className="lab-stat"><div className="lab-stat-label">Total orders today</div><div className="lab-stat-value">{orders.length}</div></article>
				<article className="lab-stat"><div className="lab-stat-label">Awaiting collection</div><div className="lab-stat-value">{count('Awaiting collection')}</div></article>
				<article className="lab-stat"><div className="lab-stat-label">In progress</div><div className="lab-stat-value">{count('In progress')}</div></article>
				<article className="lab-stat"><div className="lab-stat-label">Completed</div><div className="lab-stat-value">{count('Completed')}</div></article>
			</section>

			<section className="lab-orders" aria-label="Laboratory orders">
				<nav className="lab-tabs" aria-label="Filter orders by status">{tabs.map((item) => <button key={item} type="button" className={`lab-tab${tab === item ? ' active' : ''}`} aria-pressed={tab === item} onClick={() => setTab(item)}>{item}</button>)}</nav>
				<div className="lab-filters"><input type="search" aria-label="Search orders" placeholder="Search patient, test, or order ID…" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>{['All categories', 'Chemistry', 'Hematology', 'Immunology', 'Urinalysis'].map((item) => <option key={item}>{item}</option>)}</select></div>
				<div className="lab-table-wrap"><table className="lab-table"><thead><tr><th>Order ID</th><th>Patient</th><th>Test</th><th>Priority</th><th>Status</th><th>Ordered</th><th>Provider</th><th>Action</th></tr></thead>
					<tbody>{filteredOrders.length ? filteredOrders.map((order) => <tr key={order.id}>
						<td className="lab-id">{order.id}</td><td><div className="lab-main-text">{order.patient}</div><div className="lab-muted">{order.patientId || '—'}</div></td>
						<td><div className="lab-main-text">{order.test}</div><div className="lab-muted">{order.category}</div></td><td className={order.priority === 'Urgent' ? 'lab-urgent' : ''}>{order.priority}</td>
						<td><span className="lab-badge" style={badgeColors[order.status]}>{order.status}</span></td><td>{order.ordered}</td><td>{order.provider || '—'}</td>
						<td>{order.status !== 'Completed' && <button className="lab-button" type="button" onClick={() => advanceStatus(order.id)}>{order.status === 'Awaiting collection' ? 'Start' : 'Complete'}</button>}</td>
					</tr>) : <tr><td className="lab-empty" colSpan="8">No orders match your filters.</td></tr>}</tbody>
				</table></div>
				<footer className="lab-footer">Showing {filteredOrders.length} of {orders.length} orders</footer>
			</section>
		</div></main>

		{formOpen && <div className="lab-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}><section className="lab-dialog" role="dialog" aria-modal="true" aria-labelledby="lab-dialog-title">
			<h2 id="lab-dialog-title">Create lab order</h2><form className="lab-form" onSubmit={submitOrder}>
				<label>Patient name<input required value={form.patient} onChange={(event) => setForm({ ...form, patient: event.target.value })} /></label>
				<label>Patient ID<input value={form.patientId} onChange={(event) => setForm({ ...form, patientId: event.target.value })} /></label>
				<label>Test name<input required value={form.test} onChange={(event) => setForm({ ...form, test: event.target.value })} /></label>
				<label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{['Chemistry', 'Hematology', 'Immunology', 'Urinalysis'].map((item) => <option key={item}>{item}</option>)}</select></label>
				<label>Priority<select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}><option>Routine</option><option>Urgent</option></select></label>
				<label>Ordering provider<input value={form.provider} onChange={(event) => setForm({ ...form, provider: event.target.value })} /></label>
				<div className="lab-actions"><button className="lab-button" type="button" onClick={() => setFormOpen(false)}>Cancel</button><button className="lab-button lab-button-primary" type="submit">Create order</button></div>
			</form>
		</section></div>}
	</>;
}
