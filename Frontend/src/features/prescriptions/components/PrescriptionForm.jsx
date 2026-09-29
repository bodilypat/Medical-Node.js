/* **************************************************************** */
/* File: src/features/prescriptions/components/PrescriptionForm.jsx */
/* **************************************************************** */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
    MedicineSelector,
    PatientSelector,
    DoctorSelector,
} from ".";

import {
    validatePrescription,
} from "../utils";

const INITIAL_FORM = {

    patient_id: "",
    doctor_id: "",
    diagnosis: "",
    notes: "",
    status: "ACTIVE",
    issued_date: new Date().toISOString().slice(0, 10),
    expires_at: "",
    items: [
        {
            medicine_id: "",
            dosage: "",
            frequency: "",
            duration: "",
            quantity: 1,
            instructions: "",
        },
    ],
};

const PrescriptionForm = ({
    initialValues,
    loading = false,
    onSubmit,
    onCancel,
}) => {

    const [formData, setFormData] = useState(() => ({
        ...INITIAL_FORM,
        items: INITIAL_FORM.items.map((item) => ({ ...item })),
    }));
    const [errors, setErrors] = useState({});

    const createEmptyItem = () => ({
        medicine_id: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: 1,
        instructions: "",
    });

    useEffect(() => {
        if (initialValues) {

            setFormData({
                ...INITIAL_FORM,
                ...initialValues,
                items: initialValues.items?.length
                    ? initialValues.items.map((item) => ({ ...createEmptyItem(), ...item }))
                    : [createEmptyItem()],
            });
            setErrors({});
        } else {
            setFormData({ ...INITIAL_FORM, items: [createEmptyItem()] });
            setErrors({});
        }

    }, [initialValues]);

    /* ---------------------------------- */
    /* Basic field                        */
    /* ---------------------------------- */
    const handleChange = ({
        target,
    }) => {

        const {
            name,
            value,
        } = target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));

    };


    /* ---------------------------------- */
    /* Prescription Item                  */
    /* ---------------------------------- */
    const handleItemChange = (
        index,
        field,
        value
    ) => {

        setFormData((previous) => {
            const items = [...previous.items];
            items[index] = {
                ...items[index],
                [field]: value,
            };
            return {
                ...previous,
                items,
            };
        });
        setErrors((previous) => ({ ...previous, items: undefined }));
    };

    /* ---------------------------------- */
    /* Add Medicine                       */
    /* ---------------------------------- */
    const addMedicine = () => {

        setFormData((previous) => ({
            ...previous,
            items: [
                ...previous.items,
                createEmptyItem(),
            ],
        }));
    };

    /* ---------------------------------- */
    /* Remove Medicine                    */
    /* ---------------------------------- */
    const removeMedicine = (
        index
    ) => {

        setFormData((previous) => ({
            ...previous,
            items:
                previous.items.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    /* ---------------------------------- */
    /* Submit                             */
    /* ---------------------------------- */
    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();
        const validationErrors =
            validatePrescription(
                formData
            );

        if (
            Object.keys(validationErrors).length
        ) {

            setErrors(validationErrors);
            return;
        }
        setErrors({});
        await onSubmit?.(formData);
    };

    return (
        <form
            className="prescription-form"
            onSubmit={handleSubmit}
        >

            {/* Patient */}
            <section className="form-section">

                <h3>Patient Information</h3>
                <PatientSelector
                    value={formData.patient_id}
                    onChange={(value) =>
                        setFormData((previous) => ({
                            ...previous,
                            patient_id: value,
                        }))
                    }
                />
                {errors.patient_id && (
                    <small className="error-text">
                        {errors.patient_id}
                    </small>
                )}

            </section>

            {/* Doctor */}
            <section className="form-section">

                <h3>Doctor Information</h3>
                <DoctorSelector
                    value={formData.doctor_id}
                    onChange={(value) =>
                        setFormData((previous) => ({
                            ...previous,
                            doctor_id: value,
                        }))
                    }
                />
                {errors.doctor_id && (
                    <small className="error-text">
                        {errors.doctor_id}
                    </small>
                )}

            </section>

            {/* Diagnosis */}
            <section className="form-section">

                <h3>Diagnosis</h3>
                <textarea
                    name="diagnosis"
                    rows="3"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.diagnosis)}
                />
                {errors.diagnosis && <small className="error-text">{errors.diagnosis}</small>}

            </section>

            {/* Medicines */}
            <section className="form-section">

                <div className="section-header">
                    <h3>
                        Medicines
                    </h3>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={addMedicine}
                        disabled={loading}
                    >
                        + Add Medicine
                    </button>
                </div>

                {formData.items.map((
                    item,
                    index
                ) => (

                    <div
                        key={item.id ?? `${index}-${item.medicine_id}`}
                        className="prescription-item"
                    >
                        <MedicineSelector
                            value={item.medicine_id}
                            aria-label={`Medicine ${index + 1}`}
                            onChange={(value) =>
                                handleItemChange(
                                    index,
                                    "medicine_id",
                                    value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Dosage"
                            aria-label={`Dosage for medicine ${index + 1}`}
                            value={item.dosage}
                            onChange={(event) =>
                                handleItemChange(
                                    index,
                                    "dosage",
                                    event.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Frequency"
                            aria-label={`Frequency for medicine ${index + 1}`}
                            value={item.frequency}
                            onChange={(event) =>
                                handleItemChange(
                                    index,
                                    "frequency",
                                    event.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Duration"
                            aria-label={`Duration for medicine ${index + 1}`}
                            value={item.duration}
                            onChange={(event) =>
                                handleItemChange(
                                    index,
                                    "duration",
                                    event.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            min="1"
                            placeholder="Quantity"
                            aria-label={`Quantity for medicine ${index + 1}`}
                            value={item.quantity}
                            onChange={(event) =>
                                handleItemChange(
                                    index,
                                    "quantity",
                                    Number(event.target.value)
                                )
                            }
                        />

                        <textarea
                            rows="2"
                            placeholder="Instructions"
                            aria-label={`Instructions for medicine ${index + 1}`}
                            value={item.instructions}
                            onChange={(event) =>
                                handleItemChange(
                                    index,
                                    "instructions",
                                    event.target.value
                                )
                            }
                        />

                        {formData.items.length > 1 && (

                            <button
                                type="button"
                                className="btn btn-danger"
                                disabled={loading}
                                onClick={() =>
                                    removeMedicine(index)
                                }
                            >
                                Remove
                            </button>

                        )}

                    </div>

                ))}

            </section>

            {/* Dates */}
            <section className="form-grid">

                <div className="form-field">

                    <label htmlFor="prescription-issued-date">Issued Date</label>
                    <input
                        id="prescription-issued-date"
                        type="date"
                        name="issued_date"
                        value={formData.issued_date}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-field">

                    <label htmlFor="prescription-expires-at">Expiry Date</label>
                    <input
                        id="prescription-expires-at"
                        type="date"
                        name="expires_at"
                        value={formData.expires_at}
                        onChange={handleChange}
                    />

                </div>

            </section>

            {/* Notes */}
            <section className="form-section">
                <label htmlFor="prescription-notes">Notes</label>
                <textarea
                    id="prescription-notes"
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </section>

            {/* Actions */}
            <footer className="form-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save Prescription"}
                </button>
            </footer>
        </form>
    );
};

PrescriptionForm.propTypes = {
    initialValues: PropTypes.object,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,

};

export default PrescriptionForm;

