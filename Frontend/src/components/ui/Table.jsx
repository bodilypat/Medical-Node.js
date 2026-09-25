/* ********************************** */
/* File: #src/components/ui/Table.jsx */ 
/* ********************************** */

const getCellValue = (row, column) => {
	if (typeof column.render === "function") {
		return column.render(row[column.accessor], row);
	}

	return column.accessor
		?.split(".")
		.reduce((value, key) => value?.[key], row);
};

export default function Table({
	columns = [],
	data = [],
	loading = false,
	emptyMessage = "No records found.",
	rowKey = "id",
	className = "",
}) {
	return (
		<div className={`w-full overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
			<table className="w-full border-collapse text-left text-sm">
				<thead className="bg-gray-50 text-gray-600">
					<tr>
						{columns.map((column) => (
							<th
								key={column.accessor ?? column.header}
								scope="col"
								className={`px-4 py-3 font-semibold ${column.className ?? ""}`}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{loading ? (
						<tr>
							<td colSpan={Math.max(columns.length, 1)} className="px-4 py-8 text-center text-gray-500">
								Loading...
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr>
							<td colSpan={Math.max(columns.length, 1)} className="px-4 py-8 text-center text-gray-500">
								{emptyMessage}
							</td>
						</tr>
					) : (
						data.map((row, index) => (
							<tr key={row[rowKey] ?? index} className="hover:bg-gray-50">
								{columns.map((column) => (
									<td
										key={column.accessor ?? column.header}
										className={`px-4 py-3 text-gray-700 ${column.className ?? ""}`}
									>
										{getCellValue(row, column) ?? "—"}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
