/* ********************************************************* */
/* File: #src/features/billing/components/BillingSummary.jsx */ 
/* ********************************************************* */

import PropTypes from "prop-types";
import {
    FileText,
    CircleDollarSign,
    CheckCircle2,
    Clock3,
    RotateCcw,
} from "lucide-react";

const summaryItems = [
    {
        key: "totalInvoices",
        label: "Total Invoices",
        icon: FileText,
        color: "blue",
        format: (value) => Number(value || 0).toLocaleString(),
    },
    {
        key: "totalAmount",
        label: "Total Amount",
        icon: CircleDollarSign,
        color: "indigo",
        format: formatCurrency,
    },
    {
        key: "paidAmount",
        label: "Paid Amount",
        icon: CheckCircle2,
        color: "green",
        format: formatCurrency,
    },
    {
        key: "outstandingAmount",
        label: "Outstanding",
        icon: Clock3,
        color: "orange",
        format: formatCurrency,
    },
    {
        key: "refundedAmount",
        label: "Refunded",
        icon: RotateCcw,
        color: "red",
        format: formatCurrency,
    },
];

function formatCurrency(value) {
    const amount = Number(value);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number.isFinite(amount) ? amount : 0);
}

const colorClasses = {
    blue: {
        icon: "bg-blue-100 text-blue-600",
    },
    indigo: {
        icon: "bg-indigo-100 text-indigo-600",
    },
    green: {
        icon: "bg-green-100 text-green-600",
    },
    orange: {
        icon: "bg-orange-100 text-orange-600",
    },
    red: {
        icon: "bg-red-100 text-red-600",
    },
};

function BillingSummary({ data = {}, loading = false }) {
    if (loading) {
        return (
            <div
                aria-label="Loading billing summary"
                aria-busy="true"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
            >
                {summaryItems.map((item) => (
                    <div
                        key={item.key}
                        aria-hidden="true"
                        className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="h-10 w-10 rounded-lg bg-gray-200" />
                            <div className="h-4 w-16 rounded bg-gray-200" />
                        </div>

                        <div className="mt-4 h-7 w-24 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-28 rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section
            aria-label="Billing summary"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
            {summaryItems.map((item) => {
                const Icon = item.icon;
                const colors = colorClasses[item.color];

                return (
                    <div
                        key={item.key}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon}`}
                            >
                                <Icon size={20} />
                            </div>
                        </div>

                        <p className="mt-4 text-2xl font-bold text-gray-900">{item.format(data[item.key])}</p>

                        <p className="mt-1 text-sm text-gray-500">{item.label}</p>
                    </div>
                );
            })}
        </section>
    );
}

BillingSummary.propTypes = {
    data: PropTypes.shape({
        totalInvoices: PropTypes.number,
        totalAmount: PropTypes.number,
        paidAmount: PropTypes.number,
        outstandingAmount: PropTypes.number,
        refundedAmount: PropTypes.number,
    }),
    loading: PropTypes.bool,
};

export default BillingSummary;
