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
    const config = STATUS_CONFIG[normalizedStatus];
    const label = config?.label ?? formatStatusLabel(status ?? "Unknown");
    const className = config?.className ?? "secondary";
    const icon = config?.icon ?? "•";
    const accessibleLabel = `Prescription status: ${label}`;

    return (
        <span
            className={`status-badge status-${className}`}
            role="status"
            aria-label={accessibleLabel}
            title={accessibleLabel}
        >
            {showIcon && (
                <span className="status-icon" aria-hidden="true">
                    {icon}
                </span>
            )}

            <span className="status-text">
                {label}
            </span>
        </span>
    );
};

PrescriptionStatus.propTypes = {
    status: PropTypes.string,
    showIcon: PropTypes.bool,
};

export default PrescriptionStatus;