/* ************************************************************ */
/* File: #src/features/admin/components/reports/ReportChart.jsx */
/* ************************************************************ */

import { useMemo } from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const DEFAULT_SERIES = [
	{ key: 'patients', label: 'Patients', color: '#2563eb' },
	{ key: 'appointments', label: 'Appointments', color: '#16a34a' },
];

/** Reusable activity chart for the admin medical-management dashboard. */
export default function ReportChart({
	data = [],
	title = 'Medical activity',
	xKey = 'date',
	series = DEFAULT_SERIES,
	height = 320,
	loading = false,
	emptyMessage = 'No report data available.',
}) {
	const validSeries = useMemo(
		() => series.filter((item) => item?.key && item?.label),
		[series],
	);

	return (
		<section className="report-chart" aria-label={title}>
			<h2 className="report-chart__title">{title}</h2>
			{loading ? (
				<div className="report-chart__status" role="status" aria-live="polite">
					Loading report…
				</div>
			) : !Array.isArray(data) || data.length === 0 || validSeries.length === 0 ? (
				<div className="report-chart__status" role="status">
					{emptyMessage}
				</div>
			) : (
				<div className="report-chart__canvas" style={{ width: '100%', height }}>
					<ResponsiveContainer>
						<LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
							<CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
							<XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
							<YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
							<Tooltip />
							<Legend />
							{validSeries.map((item) => (
								<Line
									key={item.key}
									type="monotone"
									dataKey={item.key}
									name={item.label}
									stroke={item.color || '#2563eb'}
									strokeWidth={2}
									dot={false}
									activeDot={{ r: 5 }}
								/>
							))}
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</section>
	);
}
