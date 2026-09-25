/* ******************************************** */
/* File: #src/components/navigation/Sidebar.jsx */ 
/* ******************************************** */

import { NavLink } from 'react-router-dom';

const links = [
	{ label: 'Dashboard', to: '/dashboard' },
	{ label: 'Patients', to: '/patients' },
	{ label: 'Appointments', to: '/appointments' },
	{ label: 'Doctors', to: '/doctors' },
	{ label: 'Departments', to: '/departments' },
	{ label: 'Medical Records', to: '/medical-records' },
	{ label: 'Prescriptions', to: '/prescriptions' },
	{ label: 'Billing', to: '/billing' },
];

export default function Sidebar() {
	return (
		<aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white" aria-label="Sidebar">
			<div className="border-b border-gray-200 px-6 py-5">
				<h1 className="text-lg font-semibold text-gray-900">Medical Management System</h1>
			</div>
			<nav className="flex-1 space-y-1 px-3 py-4">
				{links.map(({ label, to }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`block rounded-md px-3 py-2 text-sm font-medium ${
								isActive
									? 'bg-blue-50 text-blue-700'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
							}`
						}
					>
						{label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}


