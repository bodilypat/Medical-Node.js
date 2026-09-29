/* ******************************************************************* */
/* File: src/features/prescriptions/components/PrescriptionFilters.jsx */
/* ******************************************************************* */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
    PRESCRIPTION_STATUS,
} from "../constants";

const INITIAL_FILTERS = {
    status: "",
    doctor_id: "",
    patient_id: "",
};

const getEmptyFilters = () => ({
    ...INITIAL_FILTERS,
});

const PrescriptionFilter = ({
    filters = INITIAL_FILTERS,
    doctors = [],
    patients = [],
    onChange,
    onClear,
}) => {

    const [localFilters, setLocalFilters] = useState(() => ({
        ...getEmptyFilters(),
        ...filters,
    }));

    /* ---------------------------------- */
    /* Sync external filters              */
    /* ---------------------------------- */
    useEffect(() => {
        setLocalFilters(() => ({
            ...getEmptyFilters(),
            ...filters,
        }));
    }, [filters]);

    /* ---------------------------------- */
    /* Update filter                      */
    /* ---------------------------------- */
    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setLocalFilters((previousFilters) => {
            const updatedFilters = {
                ...previousFilters,
                [name]: value,
            };

            onChange?.(updatedFilters);

            return updatedFilters;
        });
    };

    /* ---------------------------------- */
    /* Clear filters                      */
    /* ---------------------------------- */
    const handleClear = () => {
        const resetFilters = getEmptyFilters();

        setLocalFilters(resetFilters);

        onChange?.(resetFilters);
        onClear?.();
    };

    return (
        <div className="prescription-filter">

            <div className="filter-group">

                {/* Status */}

                <label htmlFor="prescription-status">
                    Status
                </label>
                <select
                    id="prescription-status"
                    name="status"
                    value={localFilters.status ?? ""}
                    onChange={handleChange}
                >
                    <option value="">
                        All Status
                    </option>

                    {PRESCRIPTION_STATUS.map((status) => (
                        <option
                            key={status.value}
                            value={status.value}
                        >
                            {status.label}
                        </option>
                    ))}
                </select>

                {/* Doctor */}

                <label htmlFor="prescription-doctor">
                    Doctor
                </label>
                <select
                    id="prescription-doctor"
                    name="doctor_id"
                    value={localFilters.doctor_id ?? ""}
                    onChange={handleChange}
                >
                    <option value="">
                        All Doctors
                    </option>

                    {doctors.map((doctor) => (
                        <option
                            key={doctor.id}
                            value={String(doctor.id)}
                        >
                            {doctor.full_name || "Unnamed doctor"}
                        </option>
                    ))}
                </select>

                {/* Patient */}

                <label htmlFor="prescription-patient">
                    Patient
                </label>
                <select
                    id="prescription-patient"
                    name="patient_id"
                    value={localFilters.patient_id ?? ""}
                    onChange={handleChange}
                >
                    <option value="">
                        All Patients
                    </option>

                    {patients.map((patient) => (
                        <option
                            key={patient.id}
                            value={String(patient.id)}
                        >
                            {patient.full_name || "Unnamed patient"}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleClear}
                >
                    Clear Filters
                </button>

            </div>

        </div>
    );
};

PrescriptionFilter.propTypes = {

    filters: PropTypes.shape({
        status: PropTypes.string,
        doctor_id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        patient_id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }),

    doctors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            full_name: PropTypes.string.isRequired,
        })
    ),

    patients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            full_name: PropTypes.string.isRequired,
        })
    ),

    onChange: PropTypes.func,
    onClear: PropTypes.func,
};

export default PrescriptionFilter;