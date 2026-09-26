/* *************************************************************** */
/* File: src/features/prescriptions/components/PrescriptionStatus.jsx */
/* *************************************************************** */

import PropTypes from "prop-types";

const STATUS_CONFIG = {
    ACTIVE: {
        label: "Active",
        className: "success",
        icon: "🟢",
    },

    PENDING: {
        label: "Pending",
        className: "warning",
        icon: "🟡",
    },

    COMPLETED: {
        label: "Completed",
        className: "primary",
        icon: "✅",
    },

    DISPENSED: {
        label: "Dispensed",
        className: "info",
        icon: "💊",
    },

    EXPIRED: {
        label: "Expired",
        className: "danger",
        icon: "⛔",
    },

    CANCELLED: {
        label: "Cancelled",
        className: "secondary",
        icon: "❌",
    },
};

const normalizeStatus = (value) =>
    String(value ?? "PENDING")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/-/g, "_");

const formatStatusLabel = (value) => {
    if (!value) return "Unknown";

    return String(value)
        .trim()
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const PrescriptionStatus = ({
    status,
    showIcon = true,
}) => {
    const normalizedStatus = normalizeStatus(status);
    const config =
        STATUS_CONFIG[normalizedStatus] ??
        {
            label: formatStatusLabel(status ?? "Unknown"),
            className: "secondary",
            icon: "•",
        };

    return (
        <span
            className={`status-badge status-${config.className}`}
            aria-label={`Prescription status: ${config.label}`}
            title={`Prescription status: ${config.label}`}
        >
            {showIcon && (
                <span className="status-icon" aria-hidden="true">
                    {config.icon}
                </span>
            )}

            <span className="status-text">
                {config.label}
            </span>
        </span>
    );
};

PrescriptionStatus.propTypes = {
    status: PropTypes.string,
    showIcon: PropTypes.bool,
};

export default PrescriptionStatus;