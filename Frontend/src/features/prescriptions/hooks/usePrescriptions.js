/* ************************************************************ */
/* File: src/features/prescriptions/hooks/usePrescriptions.js   */
/* ************************************************************ */

import { useCallback, useEffect, useState } from "react";
import prescriptionService from "../services/prescription.service";

const usePrescriptions = () => {

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const prescriptionId = (prescription) =>
        prescription?.id ?? prescription?._id;

    const unwrapResponse = (response) =>
        response?.data?.data ?? response?.data ?? response;

    /* ---------------------------------- */
    /* Load Prescriptions                 */
    /* ---------------------------------- */
    const fetchPrescriptions = useCallback(
        async (params = {}) => {

            setLoading(true);
            setError(null);

            try {
                const response =
                    await prescriptionService.getAll(
                        params
                    );
                const result = unwrapResponse(response);
                const data = Array.isArray(result)
                    ? result
                    : Array.isArray(result?.prescriptions)
                        ? result.prescriptions
                        : [];
                setPrescriptions(data);
                return data;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Get Prescription                   */
    /* ---------------------------------- */
    const getPrescription = useCallback(
        async (id) => {
            return await prescriptionService.getById(
                id
            );
        },
        []
    );

    /* ---------------------------------- */
    /* Create Prescription                */
    /* ---------------------------------- */
    const createPrescription = useCallback(
        async (payload) => {
            setLoading(true);
            setError(null);
            try {
                const response =
                    await prescriptionService.create(
                        payload
                    );
                const created = unwrapResponse(response);
                const createdId = prescriptionId(created);
                setPrescriptions((previous) => [
                    created,
                    ...previous.filter(
                        (item) => prescriptionId(item) !== createdId
                    ),
                ]);
                return created;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);

            }
        },
        []
    );

    /* ---------------------------------- */
    /* Update Prescription                */
    /* ---------------------------------- */
    const editPrescription = useCallback(
        async (
            id,
            payload
        ) => {
            setLoading(true);
            setError(null);
            try {
                const response =
                    await prescriptionService.update(
                        id,
                        payload
                    );
                const updated = unwrapResponse(response);
                const updatedId = prescriptionId(updated) ?? id;
                setPrescriptions((previous) => {
                    const exists = previous.some(
                        (item) => prescriptionId(item) === id
                    );
                    return exists
                        ? previous.map((item) =>
                            prescriptionId(item) === id ||
                            prescriptionId(item) === updatedId
                                ? updated
                                : item
                        )
                        : [updated, ...previous];
                });
                return updated;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Delete Prescription                */
    /* ---------------------------------- */
    const removePrescription = useCallback(
        async (id) => {
            setLoading(true);
            setError(null);
            try {
                await prescriptionService.remove(
                    id
                );
                setPrescriptions((previous) =>
                    previous.filter(
                        (item) =>
                            prescriptionId(item) !== id
                    )
                );
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Refresh                            */
    /* ---------------------------------- */
    const refresh = useCallback(
        () => fetchPrescriptions(),
        [fetchPrescriptions]
    );

    /* ---------------------------------- */
    /* Initial Load                       */
    /* ---------------------------------- */
    useEffect(() => {
        fetchPrescriptions();
    }, [fetchPrescriptions]);

    return {
        prescriptions,
        loading,
        error,
        fetchPrescriptions,
        refresh,
        getPrescription,
        createPrescription,
        editPrescription,
        removePrescription,
    };

};

export default usePrescriptions;