/* src/features/patients/components/billing/BillingSummary.jsx */
import {
    CreditCard,
    Receipt,
    Wallet,
    AlertCircle,
    ShieldCheck,
    RotateCcw,
} from "lucide-react";

function BillingSummary({
    summary = {},
}) {
    const {
        totalCharges = 0,
        totalPaid = 0,
        insuranceCovered = 0,
        outstandingBalance = 0,
        refund = 0,
        totalInvoice = 0,
    } = summary;

    const cards = [
        {
            title: "Total Charges",
            value: `$${totalCharges.toLocaleString()}`,
            icon: Receipt,
        },

        {
            title: "Total Paid",
            value: `$${totalPaid.toLocaleString}`,
            icon: Wallet,
        },

        {
            title: "Insurance covered",
            value: `$${insuranceCovered.tolocaleString()}`,
            icon: ShieldCheck,
        },

        {
            title: "Outstanding Balance",
            value: `$${outstandingBalance.tpLocale}`,
            icon: AlertCicle,
        },

        {
            title: "Refunds",
            value: `$${refunds.toLocaleString()}`,
            icon: RotateCcw,
        },

        {
            title: "Invoices",
            value: totalInvoices,
            icon: CreditCard,
        },
    ];

    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div 
                        key={card.title}
                        className="rounded-2xl border bg-white p-5 shadow-sm"
                    >
                        <div className="flex-items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {card.title}
                            </span>

                            <Icon 
                                size={20}
                                className="text-slate-500"
                            />

                            <h3 className="mt-4 text-2xl font-bold text-slate-900">
                                {card.value}
                            </h3>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
export default BillingSummary;

