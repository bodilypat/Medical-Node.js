/* ******************************************************* */
/* File: #src/features/billing/components/InvoiceTable.jsx */
/* ******************************************************* */
import React from 'react';

const formatCurrency = (amount, currency = 'USD') => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount) || 0);
  } catch {
    return `${currency} ${Number(amount) || 0}`;
  }
};

/** Invoice list for the medical billing module. */
export default function InvoiceTable({ invoices = [], loading = false, onView, onEdit, onDelete }) {
  const [search, setSearch] = React.useState('');
  const filteredInvoices = invoices.filter((invoice) =>
    [invoice.invoiceNumber, invoice.patientName, invoice.status]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search.trim().toLowerCase())),
  );

  return (
    <section className="invoice-table" aria-labelledby="invoice-heading">
      <header className="invoice-table__header">
        <div>
          <h2 id="invoice-heading">Invoices</h2>
          <p>Review patient charges, due dates, and payment status.</p>
        </div>
        <label>
          <span className="sr-only">Search invoices</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search invoices or patients"
          />
        </label>
      </header>

      <div className="invoice-table__overflow">
        <table>
          <thead>
            <tr>
              <th scope="col">Invoice #</th>
              <th scope="col">Patient</th>
              <th scope="col">Issue date</th>
              <th scope="col">Due date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" role="status">Loading invoices…</td></tr>
            ) : filteredInvoices.length === 0 ? (
              <tr><td colSpan="7">{search ? 'No matching invoices.' : 'No invoices available.'}</td></tr>
            ) : filteredInvoices.map((invoice) => (
              <tr key={invoice.id ?? invoice.invoiceNumber}>
                <td>{invoice.invoiceNumber || '—'}</td>
                <td>{invoice.patientName || '—'}</td>
                <td>{invoice.date ? new Date(invoice.date).toLocaleDateString() : '—'}</td>
                <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}</td>
                <td>{formatCurrency(invoice.amount, invoice.currency || 'USD')}</td>
                <td><span className={`invoice-status invoice-status--${String(invoice.status || 'pending').toLowerCase()}`}>{invoice.status || 'Pending'}</span></td>
                <td className="invoice-table__actions">
                  {onView && <button type="button" onClick={() => onView(invoice)}>View</button>}
                  {onEdit && <button type="button" onClick={() => onEdit(invoice)}>Edit</button>}
                  {onDelete && <button type="button" onClick={() => onDelete(invoice)}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
