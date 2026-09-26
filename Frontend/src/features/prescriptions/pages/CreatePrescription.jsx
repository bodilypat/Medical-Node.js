/* ************************************************************* */
/* File: src/features/prescriptions/pages/CreatePrescription.jsx */
/* ************************************************************* */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    PrescriptionForm,
} from "../components";

import {
    usePrescriptions,
} from "../hooks";

const CreatePrescription = () => {

    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState("");
    const {
        addPrescription,
        loading,
        error,
    } = usePrescriptions();

    /**
     * Create new prescription
     */
    const handleSubmit = async (
        formData
    ) => {

        setSubmitError("");
        try {
            const response =
                await addPrescription(
                    formData
                );
            const prescription =
                response?.data ??
                response;
            if (prescription?.id) {
                navigate(
                    `/prescriptions/${prescription.id}`,
                    {
                        replace: true,
                    }
                );
            } else {
                navigate("/prescriptions", { replace: true });
            }
        } catch (error) {
            console.error(
                "Failed to create prescription:",
                error
            );
            setSubmitError(
                error?.message ?? "Unable to create prescription. Please try again."
            );
        }
    };

    /**
     * Cancel creation
     */
    const handleCancel = () => {
        navigate(
            "/prescriptions"
        );
    };

    return (
        <div className="create-prescription-page">

            <header className="page-header">
                <div>
                    <h1>Create Prescription</h1>
                    <p>
                        Create a new patient
                        prescription with medicines,
                        dosage, and instructions.
                    </p>
                </div>
            </header>

            {(submitError || error) && (
                <div className="error-state">
                    <p>
                        {submitError || error?.message || "Unable to create prescription."}
                    </p>
                </div>
            )}

            <section className="page-content">
                <PrescriptionForm
                    onSubmit={
                        handleSubmit
                    }

                    onCancel={
                        handleCancel
                    }

                    loading={
                        loading
                    }
                />
            </section>
        </div>
    );
};

export default CreatePrescription;
