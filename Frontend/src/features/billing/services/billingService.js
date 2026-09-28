* ****************************************************** */
/* File: #src/features/billing/services/billingService.js */ 
/* ****************************************************** */

import api from "../../../services/api";

/* Invoices */

export const getInvoices = async (params = {}) => {
  const response = await api.get("/billing/invoices", {
    params,
  });

  return response.data;
};

export const getInvoice = async (invoiceId) => {
  const response = await api.get(
    `/billing/invoices/${invoiceId}`
  );

  return response.data;
};

export const createInvoice = async (data) => {
  const response = await api.post(
    "/billing/invoices",
    data
  );

  return response.data;
};

export const updateInvoice = async (invoiceId, data) => {
  const response = await api.put(
    `/billing/invoices/${invoiceId}`,
    data
  );

  return response.data;
};

export const cancelInvoice = async (invoiceId) => {
  const response = await api.patch(
    `/billing/invoices/${invoiceId}/cancel`
  );

  return response.data;
};


/* Payments */

export const getPayments = async (params = {}) => {
  const response = await api.get("/billing/payments", {
    params,
  });

  return response.data;
};

export const getPayment = async (paymentId) => {
  const response = await api.get(
    `/billing/payments/${paymentId}`
  );

  return response.data;
};

export const createPayment = async (data) => {
  const response = await api.post(
    "/billing/payments",
    data
  );

  return response.data;
};

export const updatePayment = async (paymentId, data) => {
  const response = await api.put(
    `/billing/payments/${encodeURIComponent(paymentId)}`,
    data
  );

  return response.data;
};


/* Refunds */

export const createRefund = async (data) => {
  const response = await api.post(
    "/billing/refunds",
    data
  );

  return response.data;
};

export const getRefunds = async (params = {}) => {
  const response = await api.get("/billing/refunds", {
    params,
  });

  return response.data;
};

export const getRefund = async (refundId) => {
  const response = await api.get(
    `/billing/refunds/${encodeURIComponent(refundId)}`
  );

  return response.data;
};


/* Patient billing */

export const getPatientBilling = async (patientId) => {
  const response = await api.get(
    `/patients/${patientId}/billing`
  );

  return response.data;
};
