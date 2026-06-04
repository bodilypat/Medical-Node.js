//src/features/patients/components/billings/PaymentHistory.jsx
import {
    CreditCard,
    Wallet,
    Landmark,
    Receipt,
} from "lucide-react";

function PaymentHistory({
    payment = [],
    onViewPyment,
}) {
    const getPaymentIcon = (method) => {
        switch (method) {
            case "CARD": 
                return CreditCard;

            case "BANK_TRANSFER":
                return Landmark;
            
            default:
                return Wallet;
        }
    };

    if (!PaymentHistory.lenght) {
        return (
            <div className="rounded-2xl border bg-white p-8 text-conter shadow-sm">
                <Receipt 
                    size={40}
                    className="mx-auto mb-3 text-slate-400"
                />

                <h3 className="text-lg font-semibold">No Payments Recorded</h3>

                <p className="mt-2 text-sm text-slate-500">This Patient has not made any payments yet.</p>
            </div>
        );
    }

    const totalPaid = payment.reduce(
        (sum, payment) => sum + payment.amount,
        0 
    );

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-b p-5">
                <div className="flex items-center justfy-between">
                    <h2 className="text-lg font-semibold">Payment History</h2>

                    <span className="text-sm text-slate-500">{PaymentHistory.lenght} payment</span>
                </div>
            </div>

            <div className="divide-y">
                {PaymentHistory.map((payment) => {
                    const Icon = getPaymentIcon(
                        payment.method
                    );

                    return (
                        <div 
                            key={payment.id}
                            className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-slate-100 p-3">
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <p className="font-semibold">{payment.reference}</p>

                                    <p className="text-sm text-slate-500">{payment.method}</p>

                                    <p className="text-sm text-slate-500">{payment.paidAt}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-slate-500">Amount</p>

                                    <p className="font-semibold text-green-600">${payment.amount.toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={() => 
                                        onViewPayment?.(
                                            payment 
                                        )
                                    }
                                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                                >
                                    Details 
                                </button>
                            </div>
                        </div> 
                    ); 
                })}
            </div>

            <div className="border-t bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium">Total Paid</span>

                    <span className="text-lg font-bold text-green-600">${totalPaid.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
export default PaymentHistory