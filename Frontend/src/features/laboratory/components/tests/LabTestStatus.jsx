/* ***************************************************************** */
/* File: #src/features/laboratory/components/tests/LabTestStatus.jsx */
/* ***************************************************************** */

const STATUS_STYLES = {
	pending: 'bg-yellow-100 text-yellow-800',
	collected: 'bg-blue-100 text-blue-800',
	processing: 'bg-indigo-100 text-indigo-800',
	completed: 'bg-green-100 text-green-800',
	cancelled: 'bg-gray-100 text-gray-700',
	rejected: 'bg-red-100 text-red-800',
};

function formatStatus(status) {
	return String(status || 'pending')
		.trim()
		.replace(/[_-]+/g, ' ')
		.replace(/\b\w/g, (character) => character.toUpperCase());
}

/** Render a normalized status badge for a laboratory test. */
export default function LabTestStatus({ status = 'pending', className = '' }) {
	const key = String(status).trim().toLowerCase().replace(/[\s-]+/g, '_');
	const style = STATUS_STYLES[key] || 'bg-gray-100 text-gray-700';

	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style} ${className}`.trim()}
			role="status"
		>
			{formatStatus(status)}
		</span>
	);
}
