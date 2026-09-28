/* ********************************************* */
/* File: #src/features/admin/pages/Dashboard.jsx */
/* ********************************************* */

import { useEffect, useMemo, useState } from 'react';

function Dashboard() {
	const [query, setQuery] = useState('');
	const [period, setPeriod] = useState('This week');
	const [dashboard, setDashboard] = useState({ stats: [], appointments: [], visits: [], departments: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		const controller = new AbortController();
		(async () => {
			setLoading(true);
			setError('');
			try {
				const response = await fetch(`/api/admin/dashboard?period=${encodeURIComponent(period)}`, { credentials: 'include', signal: controller.signal });
				if (!response.ok) throw new Error(`Dashboard request failed (${response.status})`);
				const data = await response.json();
				setDashboard({ stats: data.stats || [], appointments: data.appointments || [], visits: data.visits || [], departments: data.departments || [] });
			} catch (requestError) {
				if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load dashboard data.');
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		})();
		return () => controller.abort();
	}, [period]);
	const { stats, appointments: allAppointments, visits, departments } = dashboard;
	const appointments = useMemo(
		() => allAppointments.filter((appointment) =>
			`${appointment.patient} ${appointment.doctor} ${appointment.department} ${appointment.id}`
				.toLowerCase().includes(query.toLowerCase()),
		),
		[allAppointments, query],
	);

	return (
		<main className="admin-dashboard">
			<style>{`
				.admin-dashboard{--ink:#17233b;--muted:#7b879b;--line:#e9edf4;--blue:#4263eb;min-height:100vh;padding:32px;background:#f6f8fc;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-sizing:border-box}
				.admin-dashboard *{box-sizing:border-box}.dash-wrap{max-width:1440px;margin:auto}.dash-header{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.dash-header h1{font-size:27px;letter-spacing:-.6px;margin:0 0 7px}.dash-header p{color:var(--muted);margin:0;font-size:14px}.dash-actions{display:flex;gap:10px;align-items:center}.dash-date,.dash-primary{border:1px solid var(--line);background:#fff;border-radius:9px;padding:10px 14px;color:#35425b;font-weight:600;font-size:13px}.dash-primary{background:var(--blue);color:#fff;border-color:var(--blue);cursor:pointer}.dash-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px}.dash-card{background:#fff;border:1px solid var(--line);border-radius:13px;padding:20px;box-shadow:0 3px 12px #1b315008}.stat-top{display:flex;align-items:center;justify-content:space-between;color:var(--muted);font-size:13px}.stat-icon{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-size:20px;font-weight:700}.stat-icon.blue{background:#eef2ff;color:#4263eb}.stat-icon.violet{background:#f3edff;color:#8554d8}.stat-icon.green{background:#e8f8f1;color:#21966a}.stat-icon.orange{background:#fff2e6;color:#e98935}.stat-value{font-size:27px;font-weight:700;margin:17px 0 7px;letter-spacing:-.6px}.stat-change{font-size:12px;color:#21966a;font-weight:600}.stat-change span{color:var(--muted);font-weight:400;margin-left:4px}.dash-lower{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(280px,1fr);gap:17px;margin-top:18px}.card-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.card-heading h2{font-size:16px;margin:0}.card-heading p{font-size:12px;color:var(--muted);margin:5px 0 0}.period-select{border:1px solid var(--line);background:#fff;padding:8px 10px;border-radius:7px;color:#536078;font-size:12px}.chart{height:210px;display:flex;align-items:flex-end;gap:15px;padding:20px 10px 0;border-bottom:1px solid var(--line);background:repeating-linear-gradient(to bottom,transparent 0,transparent 51px,#f0f2f7 52px)}.bar-column{height:100%;flex:1;display:flex;align-items:center;justify-content:flex-end;flex-direction:column;gap:9px;color:var(--muted);font-size:11px}.bar{width:min(34px,75%);min-height:8px;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,#7790ff,#4263eb)}.chart-legend{display:flex;justify-content:space-between;color:var(--muted);font-size:12px;margin-top:14px}.legend-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--blue);margin-right:7px}.department-list{display:grid;gap:17px}.department-row{display:grid;grid-template-columns:1fr auto;gap:9px;font-size:12px;color:#4b5870}.department-row strong{color:var(--ink)}.track{grid-column:1/3;height:7px;border-radius:9px;background:#f0f2f7;overflow:hidden}.track span{display:block;height:100%;border-radius:9px;background:var(--blue)}.department-row:nth-child(2) .track span{background:#8b63df}.department-row:nth-child(3) .track span{background:#2eb489}.department-row:nth-child(4) .track span{background:#f19a4b}.appointments{margin-top:18px;padding:0;overflow:hidden}.appointments .card-heading{padding:21px 22px 0}.search-field{width:210px;border:1px solid var(--line);border-radius:8px;padding:9px 11px;font-size:12px;outline:none}.search-field:focus{border-color:#9aabff}.table-scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;text-align:left;white-space:nowrap}th{font-size:11px;text-transform:uppercase;letter-spacing:.45px;color:#909bad;font-weight:600;background:#fafbfe}th,td{padding:13px 22px;border-bottom:1px solid #f0f2f7}td{font-size:12px;color:#4d5a71}td:first-child{font-weight:600;color:#35425b}.patient-name{font-weight:600;color:var(--ink);font-size:13px}.status{display:inline-block;padding:5px 9px;border-radius:20px;font-size:11px;font-weight:600;background:#edf8f3;color:#21966a}.status.pending{background:#fff5e8;color:#cb8021}.status.cancelled{background:#fff0f0;color:#d45151}.status.checked-in{background:#eef2ff;color:#4263eb}.empty-row{text-align:center;color:var(--muted);padding:26px}.dash-footer{padding:14px 22px;color:var(--muted);font-size:12px}.dash-footer strong{color:#35425b}@media(max-width:900px){.admin-dashboard{padding:22px}.dash-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dash-lower{grid-template-columns:1fr}}@media(max-width:560px){.admin-dashboard{padding:16px}.dash-header{align-items:flex-start;flex-direction:column}.dash-actions{width:100%}.dash-date,.dash-primary{flex:1}.dash-grid{gap:10px}.dash-card{padding:15px}.stat-value{font-size:23px}.appointments .card-heading{align-items:flex-start;flex-direction:column;gap:14px}.search-field{width:100%}.chart{gap:7px;padding-left:0;padding-right:0}}
			`}</style>
			<div className="dash-wrap">
				<header className="dash-header">
					<div><h1>Dashboard</h1><p>Welcome back. Here’s what’s happening at your facility today.</p></div>
					<div className="dash-actions"><span className="dash-date">☷ &nbsp; Tuesday, October 24, 2024</span><button className="dash-primary" type="button" onClick={() => window.print()}>▤ &nbsp; Export report</button></div>
				</header>

				<section className="dash-grid" aria-label="Key metrics">
					{stats.map((stat) => <article className="dash-card" key={stat.label}>
						<div className="stat-top"><span>{stat.label}</span><span className={`stat-icon ${stat.color}`}>{stat.icon}</span></div>
						<div className="stat-value">{stat.value}</div>
						<div className="stat-change">↗ {stat.change}<span>{stat.change.includes('%') ? ' vs. last month' : ' currently on duty'}</span></div>
					</article>)}
				</section>

				<section className="dash-lower">
					<article className="dash-card">
						<div className="card-heading"><div><h2>Patient visits</h2><p>Overview of patient visits this week</p></div>
							<select className="period-select" value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Chart period"><option>This week</option><option>This month</option><option>This year</option></select>
						</div>
						<div className="chart" role="img" aria-label="Bar chart showing patient visits from Monday to Sunday">
							{visits.map((day, index) => <div className="bar-column" key={day.label || index}><div className="bar" style={{ height: `${Math.min(100, Number(day.value) || 0)}%` }} /><span>{day.label}</span></div>)}
						</div>
						<div className="chart-legend"><span><i className="legend-dot" />Patient visits</span><span><strong>{visits.reduce((sum, day) => sum + (Number(day.value) || 0), 0)}</strong> total</span></div>
					</article>

					<article className="dash-card">
						<div className="card-heading"><div><h2>Department overview</h2><p>Appointments by department</p></div></div>
						<div className="department-list">
							{departments.map(({ name, count, percentage }) => <div className="department-row" key={name}><span>{name}</span><strong>{count}</strong><div className="track"><span style={{ width: `${Math.min(100, Number(percentage) || 0)}%` }} /></div></div>)}
						</div>
					</article>
				</section>

				<section className="dash-card appointments">
					<div className="card-heading"><div><h2>Today’s appointments</h2><p>Manage and track scheduled appointments</p></div><input className="search-field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search appointments..." aria-label="Search appointments" /></div>
					{error && <p role="alert" style={{ padding: '0 22px', color: '#d45151' }}>{error}</p>}
					<div className="table-scroll"><table><thead><tr><th>Appointment</th><th>Patient</th><th>Doctor</th><th>Department</th><th>Time</th><th>Status</th></tr></thead>
						<tbody>{loading ? <tr><td className="empty-row" colSpan="6">Loading appointments…</td></tr> : appointments.length ? appointments.map((appointment) => <tr key={appointment.id}><td>{appointment.id}</td><td><span className="patient-name">{appointment.patient}</span></td><td>{appointment.doctor}</td><td>{appointment.department}</td><td>{appointment.time}</td><td><span className={`status ${(appointment.status || '').toLowerCase().replace(' ', '-')}`}>{appointment.status}</span></td></tr>) : <tr><td className="empty-row" colSpan="6">{error || 'No appointments found.'}</td></tr>}</tbody>
					</table></div>
					<div className="dash-footer">Showing <strong>{appointments.length}</strong> appointments</div>
				</section>
			</div>
		</main>
	);
}

export default Dashboard;
