/* ******************************************************** */
/* File: src/features/prescriptions/pages/Prescriptions.jsx */
/* ******************************************************** */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    PrescriptionTable,
    PrescriptionSearch,
    PrescriptionFilter,
    PrescriptionModal,
    PrescriptionForm,
} from "../components";

import {
    usePrescriptions,
} from "../hooks";

const Prescriptions = () => {
    const navigate = useNavigate();

    const {
        prescriptions,
        loading,
        error,
        fetchPrescriptions,
        addPrescription,
        editPrescription,
        removePrescription,
    } = usePrescriptions();

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        status: "",
        doctor_id: "",
        patient_id: "",
    });

    const [selectedPrescription, setSelectedPrescription] =
        useState(null);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    /**
     * Filter prescriptions
     */
    const filteredPrescriptions = useMemo(() => {
        let results = [...prescriptions];

        const keyword = search.trim().toLowerCase();

        if (keyword) {

            results = results.filter(
                (prescription) =>
                    prescription.patient_name
                        ?.toLowerCase()
                        .includes(keyword) ||
                    prescription.doctor_name
                        ?.toLowerCase()
                        .includes(keyword) ||
                    prescription.prescription_no
                        ?.toLowerCase()
                        .includes(keyword)
            );
        }

        if (filters.status) {
            results = results.filter(
                (prescription) =>
                    prescription.status ===
                    filters.status
            );
        }

        if (filters.doctor_id) {
            results = results.filter(
                (prescription) =>
                    String(
                        prescription.doctor_id
                    ) ===
                    String(filters.doctor_id)
            );
        }

        if (filters.patient_id) {
            results = results.filter(
                (prescription) =>
                    String(
                        prescription.patient_id
                    ) ===
                    String(filters.patient_id)
            );
        }

        return results;
    }, [
        prescriptions,
        search,
        filters,
    ]);

    /**
     * Open create dialog
     */
    const handleCreate = () => {
        setSelectedPrescription(null);
        setIsModalOpen(true);
    };

    /**
     * Open edit dialog
     */
    const handleEdit = (
        prescription
    ) => {
        setSelectedPrescription(
            prescription
        );

        setIsModalOpen(true);
    };

    /**
     * View prescription
     */
    const handleView = (
        prescription
    ) => {
        navigate(
            `/prescriptions/${prescription.id}`
        );
    };

    /**
     * Delete prescription
     */
    const handleDelete = async (
        prescription
    ) => {
        try {
            await removePrescription(
                prescription.id
            );
        } catch (error) {
            console.error(
                "Failed to delete prescription:",
                error
            );
        }
    };

    /**
     * Save prescription
     */
    const handleSubmit = async (
        formData
    ) => {
        try {
            if (selectedPrescription) {
                await editPrescription(
                    selectedPrescription.id,
                    formData
                );
            } else {
                await addPrescription(
                    formData
                );
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error(
                "Failed to save prescription:",
                error
            );
        }
    };

    /**
     * Close modal
     */
    const handleClose = () => {
        setSelectedPrescription(null);
        setIsModalOpen(false);
    };

    return (
        <div className="prescriptions-page">

            <header className="page-header">

                <div>
                    <h1>
                        Prescriptions
                    </h1>

                    <p>
                        Manage patient
                        prescriptions.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    aria-label="Create a new prescription"
                    onClick={handleCreate}
                >
                    + New Prescription
                </button>

            </header>

            <section className="page-toolbar">

                <PrescriptionSearch
                    value={search}
                    onChange={setSearch}
                    onClear={() =>
                        setSearch("")
                    }
                />

                <PrescriptionFilter
                    filters={filters}
                    onChange={setFilters}
                />

            </section>

            {loading && (
                <div className="loading-state">
                    Loading prescriptions...
                </div>
            )}

            {error && (
                <div className="error-state">

                    <p>
                        {error?.message ?? error ??
                            "Unable to load prescriptions."}
                    </p>

                    <button
                        type="button"
                        onClick={
                            fetchPrescriptions
                        }
                    >
                        Retry
                    </button>

                </div>
            )}

            {!loading && !error && filteredPrescriptions.length > 0 && (
                <PrescriptionTable
                    prescriptions={filteredPrescriptions}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {!loading && !error && filteredPrescriptions.length === 0 && (
                <div className="empty-state" role="status">
                    <p>
                        {prescriptions.length === 0
                            ? "No prescriptions found."
                            : "No prescriptions match the current search or filters."}
                    </p>

                    {prescriptions.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setFilters({
                                    status: "",
                                    doctor_id: "",
                                    patient_id: "",
                                });
                            }}
                        >
                            Clear search and filters
                        </button>
                    )}
                </div>
            )}

            <PrescriptionModal
                open={isModalOpen}
                title={
                    selectedPrescription
                        ? "Edit Prescription"
                        : "New Prescription"
                }
                onClose={handleClose}
            >
                <PrescriptionForm
                    prescription={
                        selectedPrescription
                    }
                    onSubmit={
                        handleSubmit
                    }
                    onCancel={
                        handleClose
                    }
                />
            </PrescriptionModal>

        </div>
    );
};

export default Prescriptions;
