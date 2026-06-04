/* src/features/patients/components/billing/OutstandingBalanceCard.jsx */
import {
    AlertTriangle,
    CheckCircle,
    Receipt,
    CalendarDays,
} from "lucide-react";

function OutstandingBalanceCard({
    balance = 0,
    overdueAmount = 0,
    unpaidInvoices = 0,
    nextDueDate,
}) {
    const hasBalance = balance > 0;

    return (
        <div 
            className={`
                rounded-2xl border p-6 shadow-sm 
                ${
                    hasBalance 
                        ? "border-red-200 bg-red-50"
                        : "border-green-200 bg-green-50"
                }
            `}
        >

            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold">OutStanding Balance</h2>

                    <p className="mt-2 text-4xl font-bold">
                        ${balance.toLocaleString()}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                        Current unpaid balance for this patient.
                    </p>
                </div>

                {hasBalance ? (
                    <AlertTriangle 
                        size={34}
                        className="text-red-600"
                    />
                    ) : (
                        <CheckCircle2 
                            size={34}
                            className="text-green-600"
                        />
                )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white p-4">
                    <div className="flex items-center gap-2">
                        <Receipt size={16} />
                            <span className="text-sm text-slate-500">Unpaid Invoices</span>
                    </div>
                            
                    <p className="mt-2 text-xl font-semibold">{unpaidInvoice}</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} />
                        <span className="text-sm text-slate-500">OverDue Amount</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-red-600">${overdueAmount.toLocaleString()}</p>
                </div>

                <div className="rounded-xl bg-white p-4">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span className="text-sm text-slate-500">Next Due Date</span>
                    </div>

                    <p className="m-2 text-xl font-semibold">{nextDueDate || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default OutstandingBalanceCard;



