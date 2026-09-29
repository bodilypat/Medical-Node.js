/* *************************************************************** */
/* File: #src/features/laboratory/components/tests/LabTestCard.jsx */
/* *************************************************************** */

const STATUS_CLASS = {
	pending: 'bg-amber-100 text-amber-800',
	processing: 'bg-blue-100 text-blue-800',
	completed: 'bg-green-100 text-green-800',
	cancelled: 'bg-gray-100 text-gray-700',
};

/** Displays a laboratory test and its available management actions. */
export default function LabTestCard({ test, onView, onEdit, onDelete }) {
	if (!test) return null;

	const title = test.name || test.testName || 'Laboratory test';
	const status = String(test.status || 'pending').toLowerCase();
	const actions = [
		onView && { label: 'View', handler: () => onView(test), style: 'text-blue-700 hover:bg-blue-50' },
		onEdit && { label: 'Edit', handler: () => onEdit(test), style: 'text-gray-700 hover:bg-gray-100' },
		onDelete && { label: 'Delete', handler: () => onDelete(test.id, test), style: 'text-red-700 hover:bg-red-50' },
	].filter(Boolean);

	return (
		<article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<header className="flex items-start justify-between gap-3">
				<div>
					<h3 className="text-base font-semibold text-gray-900">{title}</h3>
					{test.code && <p className="mt-1 text-sm text-gray-500">Code: {test.code}</p>}
				</div>
				<span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_CLASS[status] || STATUS_CLASS.pending}`}>
					{status}
				</span>
			</header>

			{test.description && <p className="mt-3 text-sm text-gray-600">{test.description}</p>}

			<dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
				{test.category && <div><dt className="text-gray-500">Category</dt><dd className="font-medium text-gray-800">{test.category}</dd></div>}
				{test.price != null && <div><dt className="text-gray-500">Price</dt><dd className="font-medium text-gray-800">{test.currency || '$'}{test.price}</dd></div>}
				{test.turnaroundTime && <div><dt className="text-gray-500">Turnaround</dt><dd className="font-medium text-gray-800">{test.turnaroundTime}</dd></div>}
			</dl>

			{actions.length > 0 && (
				<footer className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
					{actions.map(({ label, handler, style }) => (
						<button key={label} type="button" onClick={handler} className={`rounded-md px-3 py-2 text-sm font-medium ${style}`}>
							{label}
						</button>
					))}
				</footer>
			)}
		</article>
	);
}
