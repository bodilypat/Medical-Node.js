/* ****************************************************************** */
/* File: #src/features/admin/components/dashboard/RevenueOverview.jsx */
/* ****************************************************************** */

import { useMemo, useState } from 'react';

const revenueByRange = {
	'7 days': [
		{ label: 'Mon', value: 4200 }, { label: 'Tue', value: 5800 },
		{ label: 'Wed', value: 4900 }, { label: 'Thu', value: 7100 },
		{ label: 'Fri', value: 6400 }, { label: 'Sat', value: 8300 },
		{ label: 'Sun', value: 7600 },
	],
	'30 days': [
		{ label: 'Week 1', value: 21400 }, { label: 'Week 2', value: 27800 },
		{ label: 'Week 3', value: 24600 }, { label: 'Week 4', value: 32900 },
	],
	'12 months': [
		{ label: 'Jan', value: 22400 }, { label: 'Feb', value: 25800 },
		{ label: 'Mar', value: 23700 }, { label: 'Apr', value: 29400 },
		{ label: 'May', value: 27100 }, { label: 'Jun', value: 33800 },
		{ label: 'Jul', value: 31500 }, { label: 'Aug', value: 36200 },
		{ label: 'Sep', value: 32900 }, { label: 'Oct', value: 39400 },
		{ label: 'Nov', value: 37100 }, { label: 'Dec', value: 42800 },
	],
};

const formatCurrency = (amount) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency', currency: 'USD', maximumFractionDigits: 0,
	}).format(amount);

export default function RevenueOverview() {
	const [range, setRange] = useState('30 days');
	const chartData = revenueByRange[range];
	const chart = useMemo(() => {
		const width = 720;
		const height = 230;
		const top = 16;
		const bottom = 28;
		const max = Math.ceil(Math.max(...chartData.map(({ value }) => value)) / 10000) * 10000;
		const points = chartData.map(({ value }, index) => ({
			x: chartData.length === 1 ? width / 2 : (index / (chartData.length - 1)) * width,
			y: top + (1 - value / max) * (height - top - bottom),
		}));
		return {
			points,
			line: points.map(({ x, y }) => `${x},${y}`).join(' '),
			area: `0,${height - bottom} ${points.map(({ x, y }) => `${x},${y}`).join(' ')} ${width},${height - bottom}`,
			max,
			width,
			height,
			bottom,
		};
	}, [chartData]);

	const total = chartData.reduce((sum, item) => sum + item.value, 0);
	const average = Math.round(total / chartData.length);

	return (
		<section className="revenue-overview" aria-labelledby="revenue-overview-title">
			<style>{`
				.revenue-overview{--revenue-ink:#172b4d;--revenue-muted:#718096;--revenue-line:#e8edf3;--revenue-blue:#3978f6;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--revenue-ink);background:#fff;border:1px solid #edf0f5;border-radius:16px;padding:24px;box-shadow:0 4px 18px rgba(31,51,82,.04)}
				.revenue-overview *{box-sizing:border-box}.revenue-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}.revenue-title{margin:0;font-size:18px;font-weight:700;letter-spacing:-.3px}.revenue-subtitle{margin:6px 0 0;color:var(--revenue-muted);font-size:13px}.revenue-ranges{display:flex;gap:4px;padding:4px;background:#f4f6fa;border-radius:9px}.revenue-range{border:0;background:transparent;color:#718096;border-radius:6px;padding:8px 11px;font-size:12px;font-weight:600;cursor:pointer}.revenue-range[aria-pressed="true"]{background:#fff;color:var(--revenue-blue);box-shadow:0 1px 4px #152c4b14}.revenue-stats{display:flex;gap:36px;margin:25px 0 10px}.revenue-stat-label{color:var(--revenue-muted);font-size:12px}.revenue-stat-value{margin-top:5px;font-size:22px;line-height:1.2;font-weight:700;letter-spacing:-.5px}.revenue-stat-change{margin-left:8px;color:#169b71;font-size:11px;font-weight:600;letter-spacing:0}.revenue-chart{width:100%;overflow:hidden}.revenue-chart svg{display:block;width:100%;height:auto;overflow:visible}.revenue-grid{stroke:var(--revenue-line);stroke-dasharray:3 5}.revenue-axis-label{fill:#9aa6b5;font-size:11px}.revenue-tooltip-dot{fill:#fff;stroke:var(--revenue-blue);stroke-width:3}.revenue-footer{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding-top:18px;margin-top:10px;border-top:1px solid var(--revenue-line)}.revenue-footer-item{display:flex;align-items:center;gap:9px;color:#65748b;font-size:12px}.revenue-dot{width:9px;height:9px;border-radius:50%;background:var(--revenue-blue);flex:none}.revenue-dot.teal{background:#24b6a3}.revenue-dot.purple{background:#9a7cf8}.revenue-footer strong{display:block;margin-top:3px;color:var(--revenue-ink);font-size:14px}.revenue-overview button:focus-visible{outline:2px solid var(--revenue-blue);outline-offset:2px}@media(max-width:560px){.revenue-overview{padding:18px}.revenue-stats{gap:20px}.revenue-stat-value{font-size:19px}.revenue-footer{grid-template-columns:1fr;gap:14px}.revenue-range{padding:7px 8px}}
			`}</style>
			<header className="revenue-header">
				<div>
					<h2 className="revenue-title" id="revenue-overview-title">Revenue overview</h2>
					<p className="revenue-subtitle">Track your clinic's financial performance</p>
				</div>
				<div className="revenue-ranges" role="group" aria-label="Revenue date range">
					{Object.keys(revenueByRange).map((option) => (
						<button
							className="revenue-range"
							type="button"
							key={option}
							aria-pressed={range === option}
							onClick={() => setRange(option)}
						>
							{option}
						</button>
					))}
				</div>
			</header>

			<div className="revenue-stats">
				<div>
					<div className="revenue-stat-label">Total revenue</div>
					<div className="revenue-stat-value">{formatCurrency(total)}<span className="revenue-stat-change">↑ 12.8%</span></div>
				</div>
				<div>
					<div className="revenue-stat-label">Average per {range === '7 days' ? 'day' : range === '30 days' ? 'week' : 'month'}</div>
					<div className="revenue-stat-value">{formatCurrency(average)}</div>
				</div>
			</div>

			<div className="revenue-chart">
				<svg viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label={`Revenue chart for the last ${range}`}>
					<defs>
						<linearGradient id="revenue-area-gradient" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stopColor="#3978f6" stopOpacity=".2" />
							<stop offset="100%" stopColor="#3978f6" stopOpacity="0" />
						</linearGradient>
					</defs>
					{[0, 1, 2, 3].map((step) => {
						const y = 16 + (step / 3) * (chart.height - 44);
						return <line key={step} className="revenue-grid" x1="0" x2={chart.width} y1={y} y2={y} />;
					})}
					<polygon points={chart.area} fill="url(#revenue-area-gradient)" />
					<polyline points={chart.line} fill="none" stroke="#3978f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
					{chart.points.map(({ x, y }, index) => (
						<circle className="revenue-tooltip-dot" key={chartData[index].label} cx={x} cy={y} r="4" />
					))}
					{chartData.map(({ label }, index) => {
						const x = chartData.length === 1 ? chart.width / 2 : (index / (chartData.length - 1)) * chart.width;
						return <text className="revenue-axis-label" key={label} x={x} y={chart.height - 4} textAnchor={index === 0 ? 'start' : index === chartData.length - 1 ? 'end' : 'middle'}>{label}</text>;
					})}
				</svg>
			</div>

			<div className="revenue-footer" aria-label="Revenue by payment source">
				<div className="revenue-footer-item"><span className="revenue-dot" /><span>Consultations<strong>{formatCurrency(Math.round(total * 0.56))}</strong></span></div>
				<div className="revenue-footer-item"><span className="revenue-dot teal" /><span>Procedures<strong>{formatCurrency(Math.round(total * 0.29))}</strong></span></div>
				<div className="revenue-footer-item"><span className="revenue-dot purple" /><span>Other services<strong>{formatCurrency(Math.round(total * 0.15))}</strong></span></div>
			</div>
		</section>
	);
}
