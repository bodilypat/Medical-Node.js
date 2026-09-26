/* ******************************************************** */
/* File: #src/features/pharmacy/services/pharmacyService.js */ 
/* ******************************************************** */

import { api } from "../../../services/api";

export const getMedicines = (params) =>
  api.get("/pharmacy/medicines", { params });

export const getMedicine = (id) =>
  api.get(`/pharmacy/medicines/${id}`);

export const createMedicine = (data) =>
  api.post("/pharmacy/medicines", data);

export const updateMedicine = (id, data) =>
  api.put(`/pharmacy/medicines/${id}`, data);

export const deleteMedicine = (id) =>
  api.delete(`/pharmacy/medicines/${id}`);

export const getInventory = (params) =>
  api.get("/pharmacy/inventory", { params });

export const adjustStock = (id, data) =>
  api.post(`/pharmacy/inventory/${id}/adjust`, data);

export const getInventoryItem = (id) =>
  api.get(`/pharmacy/inventory/${id}`);

export const getPrescriptionQueue = (params) =>
  api.get("/pharmacy/prescriptions", { params });

export const dispensePrescription = (id, data) =>
  api.post(`/pharmacy/prescriptions/${id}/dispense`, data);

export const getPrescription = (id) =>
  api.get(`/pharmacy/prescriptions/${id}`);

export const getPharmacyOrders = (params) =>
  api.get("/pharmacy/orders", { params });

export const getPharmacyOrder = (id) =>
  api.get(`/pharmacy/orders/${id}`);

export const updatePharmacyOrderStatus = (id, status) =>
  api.patch(`/pharmacy/orders/${id}/status`, { status });
