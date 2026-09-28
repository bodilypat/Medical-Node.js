/* ****************************************************************** */
/* File: #src/features/admin/components/dashboard/PatientOverview.jsx */
/* ****************************************************************** */

import React from "react";

const patients = [
	{ id: "PT-10482", name: "Amelia Johnson", age: 34, gender: "Female", condition: "Hypertension", status: "Stable", lastVisit: "Today, 09:30 AM" },
	{ id: "PT-10481", name: "Michael Williams", age: 51, gender: "Male", condition: "Diabetes Type 2", status: "Under review", lastVisit: "Today, 08:15 AM" },
	{ id: "PT-10480", name: "Sophia Brown", age: 28, gender: "Female", condition: "Migraine", status: "Stable", lastVisit: "Yesterday, 04:45 PM" },
	{ id: "PT-10479", name: "Ethan Davis", age: 67, gender: "Male", condition: "Cardiac follow-up", status: "Critical", lastVisit: "Yesterday, 02:20 PM" },
	{ id: "PT-10478", name: "Olivia Miller", age: 42, gender: "Female", condition: "Asthma", status: "Stable", lastVisit: "Mar 18, 11:10 AM" },
];

const initials = (name) => name.split(" ").map((part) => part[0]).join("");

export default function PatientOverview() {
	return (
		<section className="patient-overview" aria-labelledby="patient-overview-title">
			<div className="patient-overview__header">
				<div>
					<p className="patient-overview__eyebrow">Patient management</p>
					<h2 id="patient-overview-title">Patient overview</h2>
					<p className="patient-overview__description">Monitor recently registered patients and their care status.</p>
				</div>
				<button type="button" className="patient-overview__action" onClick={() => window.location.assign("/admin/patients")}>
					View all patients <span aria-hidden="true">→</span>
				</button>
			</div>

			<div className="patient-overview__stats">
				<div><span className="stat-icon stat-icon--blue">♙</span><div><strong>2,846</strong><small>Total patients</small></div></div>
				<div><span className="stat-icon stat-icon--green">＋</span><div><strong>128</strong><small>New this month</small></div></div>
				<div><span className="stat-icon stat-icon--orange">◷</span><div><strong>64</strong><small>Appointments today</small></div></div>
				<div><span className="stat-icon stat-icon--purple">✓</span><div><strong>94.8%</strong><small>Care completion</small></div></div>
			</div>

			<div className="patient-overview__table-wrap">
				<table className="patient-overview__table">
					<caption className="sr-only">Recently active patients</caption>
					<thead><tr><th>Patient</th><th>Age / gender</th><th>Primary condition</th><th>Status</th><th>Last visit</th><th aria-label="Actions" /></tr></thead>
					<tbody>{patients.map((patient) => (
						<tr key={patient.id}>
							<td><div className="patient-name"><span className="patient-avatar">{initials(patient.name)}</span><div><strong>{patient.name}</strong><small>{patient.id}</small></div></div></td>
							<td>{patient.age} yrs <span className="muted">·</span> {patient.gender}</td>
							<td>{patient.condition}</td>
							<td><span className={`status status--${patient.status.toLowerCase().replace(" ", "-")}`}>{patient.status}</span></td>
							<td>{patient.lastVisit}</td>
							<td><button type="button" className="row-menu" aria-label={`Actions for ${patient.name}`}>⋮</button></td>
						</tr>
					))}</tbody>
				</table>
			</div>
			<style>{`.patient-overview{background:#fff;border:1px solid #e8edf3;border-radius:16px;padding:24px;color:#182230;font-family:Inter,system-ui,sans-serif}.patient-overview__header{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}.patient-overview__eyebrow{color:#4778e6;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:0 0 6px}.patient-overview h2{font-size:20px;margin:0 0 5px}.patient-overview__description{color:#7b8794;font-size:13px;margin:0}.patient-overview__action{border:0;background:transparent;color:#4778e6;font-weight:700;cursor:pointer;padding:8px 0}.patient-overview__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:24px 0;border-bottom:1px solid #edf0f4;padding-bottom:22px}.patient-overview__stats>div{display:flex;align-items:center;gap:11px}.stat-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;font-size:19px}.stat-icon--blue{background:#eaf1ff;color:#4778e6}.stat-icon--green{background:#e7f8f0;color:#20a46b}.stat-icon--orange{background:#fff3e5;color:#e99225}.stat-icon--purple{background:#f1eaff;color:#8663d8}.patient-overview__stats strong{display:block;font-size:18px}.patient-overview__stats small,.patient-name small{display:block;color:#8a95a3;font-size:11px;margin-top:3px}.patient-overview__table-wrap{overflow-x:auto}.patient-overview__table{border-collapse:collapse;width:100%;font-size:13px;min-width:760px}.patient-overview__table th{color:#8a95a3;font-size:11px;font-weight:600;text-align:left;padding:0 12px 12px}.patient-overview__table td{border-top:1px solid #f0f2f5;padding:14px 12px;white-space:nowrap}.patient-name{display:flex;align-items:center;gap:10px}.patient-name strong{font-weight:600}.patient-avatar{display:grid;place-items:center;width:32px;height:32px;background:#eaf1ff;border-radius:50%;color:#4778e6;font-size:11px;font-weight:700}.status{border-radius:20px;padding:5px 9px;font-size:11px;font-weight:600}.status--stable{background:#e8f8f0;color:#168957}.status--under-review{background:#fff4df;color:#b87512}.status--critical{background:#ffebed;color:#d34d59}.muted{color:#b4bcc6}.row-menu{background:transparent;border:0;color:#7b8794;font-size:20px;cursor:pointer}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:700px){.patient-overview{padding:18px}.patient-overview__stats{grid-template-columns:repeat(2,1fr)}.patient-overview__header{display:block}.patient-overview__action{margin-top:14px}}`}</style>
		</section>
	);
}
