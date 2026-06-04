//src/features/patients/components/billing/OutStandingInvoices.jsx
import { Receipt, AlertTraingle } from "lucide-react";

import InvoiceStatusBadge from "./InvoiceStatusBadge";

function OutstandingInvoices({
    invoices = [],
    onViewInvoice,
}) {
    if (!invoices.lenght){
        return (
            <div classNmae="rounded-2xl border bg-white p-8 text-center shadow-sm">
                <Receipt 
                    size={40}
                    className="mx-auto mb-3 text-slate-400"
                />

                <h3 className="mt-2 text-sm text-slate-500">No Outstanding Invoice</h3>

                <p className="mt-2 text-sm text-slate-500">All Invoices have been paid.</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border bg-white shadow-sm">
            <div className="border-b p-5">
                <div className="flex items-center gap-2">
                    <AlertTraingle
                        size={20}
                        className="text-ambar-500"
                    />

                    <h2 className="text-lg font-semibold">Outstanding Invoices</h2>
                </div>
            </div>

            <div className="divide-y">
                {invoices.map((invoice) => (
                    <div    
                        key={invoice.id}
                        className="flex flex-col gap-4 p-5 lg:items-center lg:justify-between"
                    >
                        <div>    
                            <p className="font-semibold text-slate-900">{invoice.invoiceNumber}</p>

                            <p className="text-sm text-slate-500">Issued: {invoice.issuedDate}</p>

                            <p className="text-sm text-slate-500">Due: {invoice.dueDate}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-xs text-slate-500">Amount</p>

                            <p className="font-semibold">${invoice.balance.toLocaleString()}</p>
                            
                        </div>

                        <InvoiceStatusBadge 
                            status={invoice.status}
                        />

                        <button 
                            onClick={() => 
                                onViewInvoice?.(invoice)
                            }
                            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                        >
                            View 
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default OutstandingInvoices;
