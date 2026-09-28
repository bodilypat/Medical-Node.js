/* ******************************************* */
/* File: #src/features/admin/pages/Reports.jsx */
/* ******************************************* */

import { useMemo, useState } from 'react';

export default function Reports() {
	const reportsData = [];
	const [category, setCategory] = useState('All reports');
	const [search, setSearch] = useState('');
	const [message, setMessage] = useState('');
	const categories = ['All reports', 'Operations', 'Patients', 'Finance', 'Inventory'];
	const reports = useMemo(() => reportsData.filter((report) => {
		const matchesCategory = category === 'All reports' || report.category === category;
		const matchesSearch = `${report.name} ${report.detail} ${report.category}`.toLowerCase().includes(search.trim().toLowerCase());
		return matchesCategory && matchesSearch;
	}), [category, search]);

	const exportCsv = (reportName) => {
		if (!reportsData.length) {
			setMessage('No report data is available to export.');
			return;
		}
		const rows = [['Report', 'Category', 'Description', 'Last updated'], ...reports
			.filter((report) => !reportName || report.name === reportName)
			.map((report) => [report.name, report.category, report.detail, report.updated])];
		const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
		const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
		const link = document.createElement('a');
		link.href = url;
		link.download = `${(reportName || 'medical-center-reports').toLowerCase().replaceAll(' ', '-')}.csv`;
		link.click();
		URL.revokeObjectURL(url);
		setMessage(`${reportName || 'Reports'} exported.`);
		window.setTimeout(() => setMessage(''), 2500);
	};

	return (
		<main className="admin-reports">
			<style>{`
				.admin-reports{max-width:1160px;margin:0 auto;padding:32px;color:#182536;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
				.admin-reports *{box-sizing:border-box}.ar-header{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:25px}
				.ar-kicker{margin:0 0 7px;color:#718096;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
				.ar-title{margin:0;font-size:30px;line-height:1.2}.ar-subtitle{margin:8px 0 0;color:#6c7b8e;font-size:14px}
				.ar-button{border:1px solid #d8e1ea;border-radius:8px;padding:10px 14px;background:#fff;color:#26384b;font-size:13px;font-weight:650;cursor:pointer}
				.ar-button:hover{background:#f5f8fb}.ar-button-primary{background:#176b62;border-color:#176b62;color:#fff}.ar-button-primary:hover{background:#12584f}
				.ar-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:22px}.ar-stat,.ar-card{border:1px solid #e1e7ee;border-radius:11px;background:#fff}
				.ar-stat{padding:17px 19px}.ar-stat-label{display:block;color:#6c7b8e;font-size:13px}.ar-stat strong{display:block;margin-top:8px;font-size:25px}.ar-stat small{display:block;margin-top:4px;color:#78879a;font-size:12px}
				.ar-card{overflow:hidden}.ar-tools{display:flex;align-items:center;gap:11px;padding:15px;border-bottom:1px solid #e9edf2;flex-wrap:wrap}
				.ar-search{flex:1;min-width:200px}.ar-search input,.ar-select{height:39px;border:1px solid #dce3eb;border-radius:7px;padding:0 11px;background:#fff;color:#26384b;font:inherit;font-size:13px}
				.ar-search input{width:100%}.ar-select{min-width:145px}.ar-tabs{display:flex;gap:4px;padding:0 15px;border-bottom:1px solid #e9edf2;overflow:auto}
				.ar-tab{border:0;border-bottom:2px solid transparent;background:transparent;padding:12px;color:#6c7b8e;font-size:13px;white-space:nowrap;cursor:pointer}
				.ar-tab[aria-selected=true]{border-bottom-color:#176b62;color:#176b62;font-weight:700}.ar-table-wrap{overflow-x:auto}
				.ar-table{width:100%;min-width:650px;border-collapse:collapse;text-align:left}.ar-table th{padding:12px 15px;background:#f8fafc;color:#69798d;font-size:11px;letter-spacing:.05em;text-transform:uppercase}
				.ar-table td{padding:14px 15px;border-top:1px solid #edf0f4;color:#58687c;font-size:13px}.ar-table tr:hover td{background:#fbfcfd}
				.ar-report-name{color:#203247!important;font-weight:650}.ar-detail{display:block;margin-top:4px;color:#78879a;font-weight:400;font-size:12px}
				.ar-status{display:inline-block;padding:4px 9px;border-radius:20px;background:#e8f5f1;color:#176b62;font-size:11px;font-weight:700}
				.ar-export{border:0;background:none;color:#176b62;font-weight:700;cursor:pointer}.ar-empty{text-align:center;padding:35px!important}
				.ar-footer{display:flex;justify-content:space-between;gap:10px;padding:13px 15px;border-top:1px solid #edf0f4;color:#718096;font-size:12px}
				.ar-message{position:fixed;right:22px;bottom:22px;padding:12px 16px;border-radius:8px;background:#173b37;color:white;box-shadow:0 6px 24px #14223533;font-size:13px}
				@media(max-width:640px){.admin-reports{padding:20px 14px}.ar-header{flex-direction:column}.ar-stats{grid-template-columns:1fr}.ar-title{font-size:26px}.ar-footer{flex-direction:column}}
			`}</style>
			<header className="ar-header">
				<div><p className="ar-kicker">Administration / Analytics</p><h1 className="ar-title">Reports</h1><p className="ar-subtitle">Review activity and performance across your medical center.</p></div>
				<button className="ar-button ar-button-primary" type="button" onClick={() => exportCsv()}>↓ &nbsp; Export reports</button>
			</header>
			<section className="ar-stats" aria-label="Reports overview">
				<article className="ar-stat"><span className="ar-stat-label">Available reports</span><strong>{reportsData.length}</strong><small>Currently available</small></article>
				<article className="ar-stat"><span className="ar-stat-label">Reports generated</span><strong>—</strong><small>Generation data unavailable</small></article>
				<article className="ar-stat"><span className="ar-stat-label">Last data refresh</span><strong style={{ fontSize: 20 }}>—</strong><small>Refresh information unavailable</small></article>
			</section>
			<section className="ar-card" aria-label="Medical center reports">
				<div className="ar-tools">
					<label className="ar-search"><input type="search" placeholder="Search reports..." aria-label="Search reports" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
					<button className="ar-button" type="button" onClick={() => setSearch(search.trim())}>Apply filters</button>
				</div>
				<div className="ar-tabs" role="tablist" aria-label="Report categories">{categories.map((item) => <button key={item} className="ar-tab" role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
				<div className="ar-table-wrap"><table className="ar-table"><thead><tr><th>Report</th><th>Category</th><th>Last updated</th><th>Status</th><th>Action</th></tr></thead><tbody>
					{reports.length ? reports.map((report) => <tr key={report.name}><td className="ar-report-name">{report.name}<span className="ar-detail">{report.detail}</span></td><td>{report.category}</td><td>{report.updated || '—'}</td><td><span className="ar-status">Ready</span></td><td><button className="ar-export" type="button" onClick={() => exportCsv(report.name)}>Export ↗</button></td></tr>) : <tr><td className="ar-empty" colSpan="5">{search || category !== 'All reports' ? 'No reports match your filters.' : 'No reports available.'}</td></tr>}
				</tbody></table></div>
				<footer className="ar-footer"><span>Showing {reports.length} of {reportsData.length} reports</span><span>Data is securely handled in accordance with clinic policies.</span></footer>
			</section>
			{message && <div className="ar-message" role="status">{message}</div>}
		</main>
	);
}
