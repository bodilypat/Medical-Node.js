/* ****************************************************** */
/* File: #src/features/billing/components/InvoiceCard.jsx */
/* ****************************************************** */

const currencyFormatter = (currency) => {
	try {
		return new Intl.NumberFormat(undefined, { style: "currency", currency });
	} catch {
		return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}
};

const formatDate = (value) => {
	if (!value) return "—";
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? "—"
		: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
};

export default function InvoiceCard({ invoice, onView, onDownload, className = "" }) {
	if (!invoice) return null;

	const number = invoice.invoiceNumber ?? invoice.number ?? invoice.id ?? "—";
	const status = invoice.status ?? "Pending";
	const amount = invoice.total ?? invoice.amount ?? 0;
	const currency = invoice.currency ?? "USD";
	const formatter = currencyFormatter(currency);
	const statusModifier = String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-");

	return (
		<article className={`invoice-card ${className}`.trim()} aria-label={`Invoice ${number}`}>
			<header className="invoice-card__header">
				<div>
					<p className="invoice-card__eyebrow">Invoice</p>
					<h2 className="invoice-card__number">#{number}</h2>
				</div>
				<span className={`invoice-card__status invoice-card__status--${statusModifier}`}>
					{status}
				</span>
			</header>

			<dl className="invoice-card__details">
				{(invoice.patientName || invoice.patientId) && (
					<div>
						<dt>Patient</dt>
						<dd>{invoice.patientName ?? `Patient ${invoice.patientId}`}</dd>
					</div>
				)}
				{(invoice.service || invoice.description) && (
					<div>
						<dt>Service</dt>
						<dd>{invoice.service ?? invoice.description}</dd>
					</div>
				)}
				<div>
					<dt>Issued</dt>
					<dd>{formatDate(invoice.issueDate ?? invoice.createdAt)}</dd>
				</div>
				<div>
					<dt>Due</dt>
					<dd>{formatDate(invoice.dueDate)}</dd>
				</div>
			</dl>

			<footer className="invoice-card__footer">
				<strong className="invoice-card__total">{formatter.format(Number(amount) || 0)}</strong>
				<div className="invoice-card__actions">
					{onView && <button type="button" onClick={() => onView(invoice)}>View</button>}
					{onDownload && (
						<button type="button" onClick={() => onDownload(invoice)}>Download</button>
					)}
				</div>
			</footer>
		</article>
	);
}
