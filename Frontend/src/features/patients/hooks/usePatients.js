/* ************************************************ */
/* File: src/features/patients/hooks/usePatients.js */
/* ************************************************ */

import { useCallback, useEffect, useState } from "react";

import {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
} from "../services/patient.service";

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch all patients */
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getPatients();
            const data = response?.data ?? response ?? [];

            setPatients(data);
            return data;
        } catch (err) {
            console.error("Failed to fetch patients:", err);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch patients.";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /* Create patient */
    const addPatient = useCallback(
        async (patientData) => {
            setLoading(true);
            setError(null);

            try {
                const response = await createPatient(patientData);

                // Refresh list after creation
                await fetchPatients();

                return response;
            } catch (err) {
                console.error("Failed to create patient:", err);

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to create patient.";

                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchPatients]
    );

    /* Update patient */
    const editPatient = useCallback(
        async (id, patientData) => {
            setLoading(true);
            setError(null);

            try {
                const response = await updatePatient(id, patientData);

                await fetchPatients();

                return response;
            } catch (err) {
                console.error("Failed to update patient:", err);

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to update patient.";

                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchPatients]
    );

    /* Delete patient */
    const removePatient = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            await deletePatient(id);

            // Optimistic update
            setPatients((prev) =>
                prev.filter((patient) => patient.id !== id)
            );
        } catch (err) {
            console.error("Failed to delete patient:", err);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to delete patient.";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /* Initial load */
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return {
        // State
        patients,
        loading,
        error,

        // Actions
        fetchPatients,
        addPatient,
        editPatient,
        removePatient,
    };
};
