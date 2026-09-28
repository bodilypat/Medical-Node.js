/* ****************************************************************** */
/* File: src/features/pharmacy/components/medicine/MedicineFilter.jsx */
/* ****************************************************************** */

import PropTypes from "prop-types";

import {
    MEDICINE_CATEGORIES,
    MEDICINE_STATUSES,
    DOSAGE_FORMS,
    STOCK_STATUSES,
} from "../constants";

const DEFAULT_FILTERS = {
    category: "",
    status: "",
    dosageForm: "",
    stockStatus: "",
};

const MedicineFilter = ({
    filters = DEFAULT_FILTERS,
    onChange,
    onClear,
}) => {
    // Keep selects controlled even when the parent supplies only some filters.
    const currentFilters = {
        ...DEFAULT_FILTERS,
        ...filters,
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;

        onChange?.({
            ...currentFilters,
            [name]: value,
        });
    };

    const handleClear = () => {
        onClear?.();
    };

    return (
        <div className="medicine-filter">

            <div className="medicine-filter__group">

                {/* Category */}
                <div className="medicine-filter__field">
                    <label htmlFor="medicine-category">
                        Category
                    </label>

                    <select
                        id="medicine-category"
                        name="category"
                        value={currentFilters.category}
                        onChange={handleChange}
                    >
                        <option value="">
                            All Categories
                        </option>

                        {MEDICINE_CATEGORIES.map((category) => (
                            <option
                                key={category.value}
                                value={category.value}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className="medicine-filter__field">
                    <label htmlFor="medicine-status">
                        Status
                    </label>

                    <select
                        id="medicine-status"
                        name="status"
                        value={currentFilters.status}
                        onChange={handleChange}
                    >
                        <option value="">
                            All Status
                        </option>

                        {MEDICINE_STATUSES.map((status) => (
                            <option
                                key={status.value}
                                value={status.value}
                            >
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dosage Form */}
                <div className="medicine-filter__field">
                    <label htmlFor="medicine-dosage-form">
                        Dosage Form
                    </label>

                    <select
                        id="medicine-dosage-form"
                        name="dosageForm"
                        value={currentFilters.dosageForm}
                        onChange={handleChange}
                    >
                        <option value="">
                            All Forms
                        </option>

                        {DOSAGE_FORMS.map((form) => (
                            <option
                                key={form.value}
                                value={form.value}
                            >
                                {form.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stock Status */}
                <div className="medicine-filter__field">
                    <label htmlFor="medicine-stock-status">
                        Stock
                    </label>

                    <select
                        id="medicine-stock-status"
                        name="stockStatus"
                        value={currentFilters.stockStatus}
                        onChange={handleChange}
                    >
                        <option value="">
                            All Stock
                        </option>

                        {STOCK_STATUSES.map((status) => (
                            <option
                                key={status.value}
                                value={status.value}
                            >
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="medicine-filter__actions">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClear}
                >
                    Clear Filters
                </button>
            </div>

        </div>
    );
};

MedicineFilter.propTypes = {
    filters: PropTypes.shape({
        category: PropTypes.string,
        status: PropTypes.string,
        dosageForm: PropTypes.string,
        stockStatus: PropTypes.string,
    }),
    onChange: PropTypes.func,
    onClear: PropTypes.func,
};

export default MedicineFilter;