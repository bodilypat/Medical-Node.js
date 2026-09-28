/* ********************************************************************* */
/* File: #src/features/admin/components/dashboard/RecentAppointments.jsx */
/* ********************************************************************* */

import React from 'react';

const sampleAppointments = [
	{ id: 'APT-2048', patient: 'Olivia Martin', doctor: 'Dr. Ethan Carter', department: 'Cardiology', time: 'Today, 9:30 AM', status: 'Confirmed' },
	{ id: 'APT-2047', patient: 'Noah Wilson', doctor: 'Dr. Sophia Patel', department: 'Neurology', time: 'Today, 10:15 AM', status: 'Checked in' },
	{ id: 'APT-2046', patient: 'Ava Thompson', doctor: 'Dr. Liam Brooks', department: 'Pediatrics', time: 'Today, 11:00 AM', status: 'Pending' },
	{ id: 'APT-2045', patient: 'James Anderson', doctor: 'Dr. Mia Chen', department: 'Orthopedics', time: 'Today, 1:30 PM', status: 'Confirmed' },
];

const statusClasses = {
	Confirmed: 'bg-green-100 text-green-800',
	'Checked in': 'bg-blue-100 text-blue-800',
	Pending: 'bg-amber-100 text-amber-800',
	Cancelled: 'bg-red-100 text-red-800',
};

export default function RecentAppointments({ appointments = sampleAppointments, onViewAll }) {
	return (
		<section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" aria-labelledby="recent-appointments-heading">
			<header className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4">
				<div>
					<h2 id="recent-appointments-heading" className="text-lg font-semibold text-gray-900">Recent appointments</h2>
					<p className="mt-1 text-sm text-gray-500">Manage and review upcoming patient visits</p>
				</div>
				{onViewAll && (
					<button type="button" onClick={onViewAll} className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
						View all
					</button>
				)}
			</header>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-100 text-left">
					<thead className="bg-gray-50">
						<tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
							<th scope="col" className="px-5 py-3">Patient</th>
							<th scope="col" className="px-5 py-3">Doctor</th>
							<th scope="col" className="px-5 py-3">Department</th>
							<th scope="col" className="px-5 py-3">Date &amp; time</th>
							<th scope="col" className="px-5 py-3">Status</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{appointments.length === 0 ? (
							<tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-500">No recent appointments.</td></tr>
						) : appointments.map((appointment) => (
							<tr key={appointment.id} className="transition-colors hover:bg-gray-50">
								<td className="whitespace-nowrap px-5 py-4">
									<div className="font-medium text-gray-900">{appointment.patient}</div>
									<div className="mt-1 text-xs text-gray-500">{appointment.id}</div>
								</td>
								<td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">{appointment.doctor}</td>
								<td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">{appointment.department}</td>
								<td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">{appointment.time}</td>
								<td className="whitespace-nowrap px-5 py-4">
									<span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[appointment.status] || 'bg-gray-100 text-gray-700'}`}>
										{appointment.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
