/* ******************************************************* */
/* File: #src/features/laboratory/pages/CreateLabOrder.jsx */
/* ******************************************************* */

import { useEffect, useState } from 'react';

const inputStyle = {
	boxSizing: 'border-box',
	width: '100%',
	padding: '10px 12px',
	border: '1px solid #cbd5e1',
	borderRadius: 6,
	font: 'inherit',
};

function Field({ label, children }) {
	return <label style={{ display: 'grid', gap: 6, color: '#334155', fontSize: 14 }}><span>{label}</span>{children}</label>;
}

export default function CreateLabOrder() {
	const [tests, setTests] = useState([]);
	const [testsLoading, setTestsLoading] = useState(true);
	const [testsError, setTestsError] = useState('');
	const [patientName, setPatientName] = useState('');
	const [patientId, setPatientId] = useState('');
	const [provider, setProvider] = useState('');
	const [priority, setPriority] = useState('Routine');
	const [collectionDate, setCollectionDate] = useState('');
	const [notes, setNotes] = useState('');
	const [selected, setSelected] = useState([]);
	const [error, setError] = useState('');
	const [createdOrder, setCreatedOrder] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		fetch('/api/laboratory/tests', { signal: controller.signal })
			.then((response) => {
				if (!response.ok) throw new Error('Unable to load available laboratory tests.');
				return response.json();
			})
			.then((data) => {
				if (!Array.isArray(data)) throw new Error('Invalid laboratory tests response.');
				setTests(data);
			})
			.catch((loadError) => {
				if (loadError.name !== 'AbortError') setTestsError(loadError.message || 'Unable to load laboratory tests.');
			})
			.finally(() => { if (!controller.signal.aborted) setTestsLoading(false); });
		return () => controller.abort();
	}, []);

	const toggleTest = (test) => setSelected((current) =>
		current.some((item) => item.id === test.id)
			? current.filter((item) => item.id !== test.id)
			: [...current, test],
	);
	const total = selected.reduce((sum, test) => sum + test.price, 0);

	function submitOrder(event) {
		event.preventDefault();
		if (!patientName.trim() || !patientId.trim() || !provider.trim() || selected.length === 0) {
			setError('Complete the required patient and provider fields and select at least one test.');
			return;
		}
		setError('');
		setSubmitting(true);
		try {
			const response = await fetch('/api/laboratory/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ patientName: patientName.trim(), patientId: patientId.trim(), provider: provider.trim(), priority, collectionDate: collectionDate || null, notes: notes.trim(), testIds: selected.map((test) => test.id) }),
			});
			if (!response.ok) throw new Error('Unable to create the laboratory order.');
			const order = await response.json();
			if (!order.number) throw new Error('The server returned an invalid order.');
			setCreatedOrder({ number: order.number, patient: patientName.trim() });
		} catch (submitError) {
			setError(submitError.message || 'Unable to create the laboratory order.');
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px', color: '#0f172a' }}>
			<header style={{ marginBottom: 24 }}>
				<p style={{ margin: '0 0 6px', color: '#2563eb', fontSize: 13, fontWeight: 700 }}>LABORATORY MANAGEMENT</p>
				<h1 style={{ margin: 0, fontSize: 28 }}>Create lab order</h1>
				<p style={{ color: '#64748b' }}>Request diagnostic tests and provide collection details.</p>
			</header>

			{createdOrder ? (
				<section role="status" style={{ padding: 20, border: '1px solid #86efac', borderRadius: 8, background: '#f0fdf4' }}>
					<h2>Order created</h2>
					<p>Order <strong>{createdOrder.number}</strong> for {createdOrder.patient} has been created with {selected.length} test(s).</p>
					<button type="button" onClick={() => { setCreatedOrder(null); setPatientName(''); setPatientId(''); setProvider(''); setPriority('Routine'); setCollectionDate(''); setNotes(''); setSelected([]); }} style={{ ...inputStyle, width: 'auto', cursor: 'pointer', background: '#fff' }}>Create another order</button>
				</section>
			) : (
				<form onSubmit={submitOrder}>
					<section style={{ padding: 20, marginBottom: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
						<h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Patient information</h2>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
							<Field label="Patient name *"><input required value={patientName} onChange={(e) => setPatientName(e.target.value)} style={inputStyle} autoComplete="name" /></Field>
							<Field label="Patient ID *"><input required value={patientId} onChange={(e) => setPatientId(e.target.value)} style={inputStyle} /></Field>
							<Field label="Ordering provider *"><input required value={provider} onChange={(e) => setProvider(e.target.value)} style={inputStyle} placeholder="Provider name" /></Field>
						</div>
					</section>

					<section style={{ padding: 20, marginBottom: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
						<h2 style={{ margin: '0 0 6px', fontSize: 18 }}>Requested tests</h2>
						<p style={{ margin: '0 0 14px', color: '#64748b', fontSize: 14 }}>Select one or more laboratory tests.</p>
						{testsLoading ? <p role="status">Loading available tests…</p> : testsError ? <p role="alert" style={{ color: '#b91c1c' }}>{testsError}</p> : tests.length === 0 ? <p>No laboratory tests are currently available.</p> : <div style={{ display: 'grid', gap: 8 }}>
							{tests.map((test) => (
								<label key={test.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}>
									<input type="checkbox" checked={selected.some((item) => item.id === test.id)} onChange={() => toggleTest(test)} />
									<span style={{ flex: 1 }}>{test.name}</span><span>${test.price.toFixed(2)}</span>
								</label>
							))}
						</div>}
						{selected.length > 0 && <p style={{ textAlign: 'right', fontWeight: 700 }}>Estimated total: ${total.toFixed(2)}</p>}
					</section>

					<section style={{ padding: 20, marginBottom: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
						<h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Collection details</h2>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
							<Field label="Priority"><select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}><option>Routine</option><option>Urgent</option><option>STAT</option></select></Field>
							<Field label="Collection date"><input type="date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)} style={inputStyle} /></Field>
							<div style={{ gridColumn: '1 / -1' }}><Field label="Clinical notes"><textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Relevant clinical information or special instructions" /></Field></div>
						</div>
					</section>

					{error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
					<button type="submit" disabled={submitting || testsLoading || Boolean(testsError) || tests.length === 0} style={{ padding: '11px 18px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', font: 'inherit', fontWeight: 700, cursor: 'pointer' }}>{submitting ? 'Creating…' : 'Create order'}</button>
				</form>
			)}
		</main>
	);
}
