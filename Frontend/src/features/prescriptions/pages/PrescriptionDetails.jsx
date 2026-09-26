/* ************************************************************** */
/* File: src/features/prescriptions/pages/PrescriptionDetails.jsx */
/* ************************************************************** */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    PrescriptionProfile,
    PrescriptionStatus,
    PrescriptionPreview,
} from "../components";

import {
    usePrescription,
} from "../hooks";

const PrescriptionDetails = () => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const navigate = useNavigate();
    const {
        prescriptionId,
    } = useParams();

    const {
        prescription,
        loading,
        error,
        refreshPrescription,
        removePrescription,
    } = usePrescription(
        prescriptionId
    );

    /**
     * Navigate to edit page
     */
    const handleEdit = () => {
        navigate(
            `/prescriptions/${prescriptionId}/edit`
        );
    };

    /**
     * Delete prescription
     */
    const handleDelete = async () => {
        if (deleting) {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this prescription?"
            );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setDeleteError("");
        try {

            await removePrescription();

            navigate(
                "/prescriptions",
                {
                    replace: true,
                }
            );

        } catch (error) {
            console.error(
                "Failed to delete prescription:",
                error
            );
            setDeleteError(
                error.message ?? "Unable to delete prescription. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    };

    /**
     * Print prescription
     */
    const handlePrint = () => {
        navigate(
            `/prescriptions/${prescriptionId}/print`
        );
    };

    if (loading) {
        return (
            <div className="prescription-details-page">

                <div className="loading-state">
                    Loading prescription...
                </div>

            </div>
        );
    }

    if (error) {
        return (
            <div className="prescription-details-page">

                <div className="error-state">

                    <h3>Unable to load prescription</h3>
                    <p>
                        {
                            error.message ??
                            "Something went wrong."
                        }
                    </p>

                    <button
                        type="button"
                        onClick={
                            refreshPrescription
                        }
                    >
                        Retry
                    </button>

                </div>

            </div>
        );
    }

    if (!prescription) {
        return (
            <div className="prescription-details-page">

                <div className="empty-state">

                    <h3>Prescription not found</h3>
                    <p>
                        The requested prescription
                        does not exist.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/prescriptions"
                            )
                        }
                    >
                        Back to Prescriptions
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="prescription-details-page">

            <header className="page-header">
                <div>
                    <h1>Prescription Details</h1>
                    <p>
                        View prescription
                        information and medicines.
                    </p>
                </div>

                <div className="page-actions">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={
                            handlePrint
                        }
                    >
                        Print
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={
                            handleEdit
                        }
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={
                            handleDelete
                        }
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>

                </div>
            </header>

            {deleteError && (
                <div className="error-state" role="alert">
                    {deleteError}
                </div>
            )}

            <section className="prescription-summary">

                <div className="card">

                    <div className="card-header">

                        <h2>Prescription Information</h2>
                        <PrescriptionStatus
                            status={
                                prescription.status
                            }
                        />

                    </div>

                    <div className="card-body">

                        <div className="info-grid">

                            <div>
                                <label>Prescription No</label>
                                <p>
                                    {
                                        prescription.prescription_no
                                    }
                                </p>
                            </div>

                            <div>
                                <label>Date</label>
                                <p>
                                    {
                                        prescription.date
                                    }
                                </p>
                            </div>

                            <div>
                                <label>Doctor</label>
                                <p>
                                    {
                                        prescription.doctor_name
                                    }
                                </p>
                            </div>

                            <div>
                                <label>Patient</label>
                                <p>
                                    {
                                        prescription.patient_name
                                    }
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            <section className="prescription-content">
                <PrescriptionProfile
                    prescription={
                        prescription
                    }
                />
            </section>

            <section className="prescription-preview">
                <PrescriptionPreview
                    prescription={
                        prescription
                    }
                />
            </section>
        </div>
    );
};
export default PrescriptionDetails;
