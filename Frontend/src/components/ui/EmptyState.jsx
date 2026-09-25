/* *************************************** */
/* File: #src/components/ui/EmptyState.jsx */ 
/* *************************************** */

import React from 'react';

/**
 * Reusable empty state for pages and lists in the medical management system.
 */
const EmptyState = ({
	icon,
	title = 'No records found',
	message = 'There is nothing to display yet.',
	action,
	className = '',
}) => (
	<section
		className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center ${className}`}
		role="status"
	>
		{icon && (
			<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
				{icon}
			</div>
		)}
		<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
		{message && <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>}
		{action && <div className="mt-5">{action}</div>}
	</section>
);

export default EmptyState;

