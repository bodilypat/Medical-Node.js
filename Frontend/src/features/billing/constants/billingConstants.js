/* ********************************************************* */
/* File: #src/features/billing/constants/billingConstants.js */ 
/* ********************************************************* */

export const INVOICE_STATUS = Object.freeze({
  DRAFT: "draft",
  ISSUED: "issued",
  PARTIALLY_PAID: "partially_paid",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
});

// Allowed lifecycle transitions keep invoice updates consistent across the UI.
export const INVOICE_STATUS_TRANSITIONS = Object.freeze({
  [INVOICE_STATUS.DRAFT]: Object.freeze([INVOICE_STATUS.ISSUED, INVOICE_STATUS.CANCELLED]),
  [INVOICE_STATUS.ISSUED]: Object.freeze([
    INVOICE_STATUS.PARTIALLY_PAID,
    INVOICE_STATUS.PAID,
    INVOICE_STATUS.OVERDUE,
    INVOICE_STATUS.CANCELLED,
  ]),
  [INVOICE_STATUS.PARTIALLY_PAID]: Object.freeze([
    INVOICE_STATUS.PAID,
    INVOICE_STATUS.OVERDUE,
    INVOICE_STATUS.CANCELLED,
  ]),
  [INVOICE_STATUS.OVERDUE]: Object.freeze([
    INVOICE_STATUS.PARTIALLY_PAID,
    INVOICE_STATUS.PAID,
    INVOICE_STATUS.CANCELLED,
  ]),
  [INVOICE_STATUS.PAID]: Object.freeze([]),
  [INVOICE_STATUS.CANCELLED]: Object.freeze([]),
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
});

export const PAYMENT_METHOD = Object.freeze({
  CASH: "cash",
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
  INSURANCE: "insurance",
});

export const PAYMENT_METHOD_LABELS = Object.freeze({
  [PAYMENT_METHOD.CASH]: "Cash",
  [PAYMENT_METHOD.CARD]: "Card",
  [PAYMENT_METHOD.BANK_TRANSFER]: "Bank transfer",
  [PAYMENT_METHOD.INSURANCE]: "Insurance",
});
