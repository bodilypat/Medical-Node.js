/* **************************************************************** */
/* File: src/features/pharmacy/components/medicine/MedicineForm.jsx */
/* **************************************************************** */

import {
    useEffect,
    useState,
} from "react";

import PropTypes from "prop-types";

import {
    medicineValidation,
} from "../utils";

import {
    MEDICINE_CATEGORIES,
    DOSAGE_FORMS,
} from "../constants";

const INITIAL_FORM_STATE = {

    name: "",
    generic_name: "",
    category: "",
    dosage_form: "",
    strength: "",
    manufacturer: "",
    barcode: "",
    sku: "",
    batch_number: "",
    supplier_id: "",
    description: "",
    active_ingredient: "",
    storage_condition: "",
    unit_price: "",
    stock_quantity: "",
    minimum_stock: "",
    expiry_date: "",
    prescription_required: false,

};

const MedicineForm = ({
    initialValues,
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const [formData, setFormData] = useState(
        INITIAL_FORM_STATE
    );

    const [errors, setErrors] = useState({});

    /* ---------------------------- */
    /* Initialize form              */
    /* ---------------------------- */
    useEffect(() => {

        if (initialValues) {

            setFormData({
                ...INITIAL_FORM_STATE,
                ...initialValues,
            });

        } else {

            setFormData(INITIAL_FORM_STATE);

        }

        setErrors({});
    }, [initialValues]);

    /* ---------------------------- */
    /* Handle input change          */
    /* ---------------------------- */
    const handleChange = ({
        target,
    }) => {

        const {
            name,
            value,
            type,
            checked,
        } = target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: null,
            }));
        }
    };

    /* ---------------------------- */
    /* Submit                       */
    /* ---------------------------- */

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        const validationErrors =
            medicineValidation(
                formData
            );

        if (
            Object.keys(validationErrors)
                .length
        ) {

            setErrors(
                validationErrors
            );
            return;
        }

        setErrors({});

        const payload = {

            ...formData,

            unit_price:
                Number(
                    formData.unit_price
                ),
            stock_quantity:
                Number(
                    formData.stock_quantity
                ),
            minimum_stock:
                Number(
                    formData.minimum_stock
                ),
        };

        await onSubmit(
            payload
        );

    };

    return (

        <form
            className="medicine-form"
            onSubmit={handleSubmit}
        >

            {/* Basic Information */}
            <section className="form-section">

                <h2>Medicine Information</h2>

                <div className="form-grid">

                    <FormInput
                        label="Medicine Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        autoComplete="off"
                        required
                    />

                    <FormInput
                        label="Generic Name"
                        name="generic_name"
                        value={formData.generic_name}
                        onChange={handleChange}
                    />

                    <FormSelect
                        label="Category"
                        name="category"
                        value={formData.category}
                        options={MEDICINE_CATEGORIES}
                        onChange={handleChange}
                        error={errors.category}
                        required
                    />

                    <FormSelect
                        label="Dosage Form"
                        name="dosage_form"
                        value={formData.dosage_form}
                        options={DOSAGE_FORMS}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Strength"
                        name="strength"
                        value={formData.strength}
                        onChange={handleChange}
                        placeholder="500mg"
                    />

                    <FormInput
                        label="Manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                    />

                </div>

            </section>

            {/* Inventory Information */}
            <section className="form-section">

                <h2>Inventory</h2>

                <div className="form-grid">

                    <FormInput
                        label="Batch Number"
                        name="batch_number"
                        value={formData.batch_number}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Barcode"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Stock Quantity"
                        type="number"
                        name="stock_quantity"
                        value={formData.stock_quantity}
                        onChange={handleChange}
                        min="0"
                        step="1"
                    />

                    <FormInput
                        label="Minimum Stock"
                        type="number"
                        name="minimum_stock"
                        value={formData.minimum_stock}
                        onChange={handleChange}
                        min="0"
                        step="1"
                    />

                    <FormInput
                        label="Expiry Date"
                        type="date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                    />

                </div>

            </section>

            {/* Pricing */}
            <section className="form-section">

                <h2>Pricing</h2>
                <FormInput
                    label="Unit Price"
                    type="number"
                    step="0.01"
                    name="unit_price"
                    value={formData.unit_price}
                    onChange={handleChange}
                    min="0"
                />
            </section>

            {/* Additional Information */}
            <section className="form-section">

                <h2>Additional Details</h2>
                <FormTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <FormTextarea
                    label="Storage Condition"
                    name="storage_condition"
                    value={formData.storage_condition}
                    onChange={handleChange}
                />

                <FormTextarea
                    label="Active Ingredient"
                    name="active_ingredient"
                    value={formData.active_ingredient}
                    onChange={handleChange}
                />

                <label className="checkbox-field">
                    <input
                        type="checkbox"
                        name="prescription_required"
                        checked={
                            formData.prescription_required
                        }
                        onChange={handleChange}
                    />
                    Prescription Required
                </label>

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
                    {
                        loading
                            ? "Saving..."
                            : "Save Medicine"
                    }
                </button>
            </footer>
        </form>
    );
};

/* ------------------------------------------------ */
/* Reusable Inputs                                  */
/* ------------------------------------------------ */
const FormInput = ({
    label,
    error,
    ...props
}) => (

    <div className="form-field">

        <label>{label}</label>

        <input
            {...props}
        />
        {
            error && (
                <small className="error-text">
                    {error}
                </small>
            )
        }

    </div>
);

const FormSelect = ({
    label,
    options = [],
    error,
    ...props
}) => (

    <div className="form-field">

        <label>{label}</label>

        <select
            {...props}
        >
            <option value="">Select</option>
            {
                options.map(
                    (item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    )
                )
            }

        </select>
        {
            error && (
                <small className="error-text">
                    {error}
                </small>
            )
        }

    </div>
);

const FormTextarea = ({
    label,
    ...props
}) => (

    <div className="form-field">

        <label>
            {label}
        </label>

        <textarea
            rows="4"
            {...props}
        />

    </div>
);

MedicineForm.propTypes = {

    initialValues:
        PropTypes.object,

    onSubmit:
        PropTypes.func.isRequired,

    onCancel:
        PropTypes.func.isRequired,

    loading:
        PropTypes.bool,

};

export default MedicineForm;