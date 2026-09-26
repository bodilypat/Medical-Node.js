/* *********************************************************** */
/* File: #src/features/pharmacy/constants/pharmacyConstants.js */ 
/* *********************************************************** */

export const MEDICINE_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
});

export const STOCK_STATUS = Object.freeze({
  IN_STOCK: "IN_STOCK",
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
});

export const DISPENSING_STATUS = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  DISPENSED: "DISPENSED",
  CANCELLED: "CANCELLED",
});

export const PHARMACY_ORDER_STATUS = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const MEDICINE_STATUS_VALUES = Object.freeze(Object.values(MEDICINE_STATUS));
export const STOCK_STATUS_VALUES = Object.freeze(Object.values(STOCK_STATUS));
export const DISPENSING_STATUS_VALUES = Object.freeze(Object.values(DISPENSING_STATUS));
export const PHARMACY_ORDER_STATUS_VALUES = Object.freeze(
  Object.values(PHARMACY_ORDER_STATUS),
);
