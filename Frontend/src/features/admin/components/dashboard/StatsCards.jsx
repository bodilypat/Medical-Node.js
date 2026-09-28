/* ************************************************************* */
/* File: #src/features/admin/components/dashboard/StatsCards.jsx */ 
/* ************************************************************* */
import React from 'react';

const cards = [
	{ key: 'patients', label: 'Total Patients', icon: '👥', color: 'blue' },
	{ key: 'appointmentsToday', label: 'Appointments Today', icon: '📅', color: 'violet' },
	{ key: 'availableDoctors', label: 'Available Doctors', icon: '🩺', color: 'emerald' },
	{ key: 'pendingRequests', label: 'Pending Requests', icon: '⏳', color: 'amber' },
];

const aliases = {
	patients: ['totalPatients', 'patientCount'],
	appointmentsToday: ['todayAppointments', 'appointments'],
	availableDoctors: ['doctorsAvailable', 'doctors'],
	pendingRequests: ['pendingAppointments', 'requests'],
};

function readStat(stats, key) {
	if (stats[key] !== undefined && stats[key] !== null) return stats[key];
	for (const alias of aliases[key] || []) {
		if (stats[alias] !== undefined && stats[alias] !== null) return stats[alias];
	}
	return '—';
}

export default function StatsCards({ stats = {}, loading = false, className = '' }) {
	return (
		<section className={className} aria-label="Medical management overview">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{cards.map(({ key, label, icon, color }) => (
					<article
						key={key}
						className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
						aria-busy={loading}
					>
						<span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${color}-50 text-2xl`} aria-hidden="true">
							{icon}
						</span>
						<div>
							<p className="text-sm font-medium text-slate-500">{label}</p>
							{loading ? (
								<span className="mt-2 block h-7 w-14 animate-pulse rounded bg-slate-200" aria-label={`Loading ${label}`} />
							) : (
								<p className="mt-1 text-2xl font-semibold text-slate-900">{readStat(stats, key)}</p>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
