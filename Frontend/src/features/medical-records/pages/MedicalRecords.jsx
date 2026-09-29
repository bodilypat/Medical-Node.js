/* ************************************************************ */
/* File: #src/features/medical-records/pages/MedicalRecords.jsx */
/* ************************************************************ */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicalRecordTable from "../components/MedicalRecordTable";
import MedicalRecordFilters from "../components/MedicalRecordFilters";

import useMedicalRecords from "../hooks/useMedicalRecords";

import {
  DEFAULT_MEDICAL_RECORD_FILTERS,
} from "../constants/medicalRecordConstants";

const MedicalRecords = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_MEDICAL_RECORD_FILTERS,
  }));

  const params = useMemo(
    () => ({
      ...filters,
    }),
    [filters]
  );

  const {
    records,
    loading,
    error,
    refetch,
  } = useMedicalRecords(params);

  const resetFilters = () => {
    setFilters({
      ...DEFAULT_MEDICAL_RECORD_FILTERS,
    });
  };

  const handleView = (record) => {
    navigate(
      `/medical-records/${record.id}`
    );
  };

  return (
    <section
      className="medical-records-page"
      aria-labelledby="medical-records-title"
    >
      <header>
        <h1 id="medical-records-title">Medical Records</h1>

        <p>
          Manage patient medical records and
          clinical information.
        </p>

        <button
          type="button"
          className="create-medical-record-button"
          onClick={() =>
            navigate(
              "/medical-records/create"
            )
          }
        >
          Create Medical Record
        </button>
      </header>

      <MedicalRecordFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      {error && (
        <div className="error-state" role="alert">
          <p>{error}</p>

          <button
            type="button"
            onClick={refetch}
            disabled={loading}
          >
            {loading ? "Retrying…" : "Try Again"}
          </button>
        </div>
      )}

      <MedicalRecordTable
        records={records}
        loading={loading}
        onView={handleView}
      />
    </section>
  );
};

export default MedicalRecords;
