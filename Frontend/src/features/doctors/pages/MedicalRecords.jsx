/* **************************************************** */
/* File: #src/features/doctors/pages/MedicalRecords.jsx */ 
/* **************************************************** */

import { useState } from "react";

import MedicalRecordTable from "../components/medical-records/MedicalRecordTable";
import useMedicalRecords from "../hooks/useMedicalRecords";

const MedicalRecords = () => {
  const [patientId, setPatientId] = useState("");
  const [searchedPatientId, setSearchedPatientId] = useState("");

  const {
    records,
    loading,
    error,
    refetch,
  } = useMedicalRecords(searchedPatientId);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchedPatientId(patientId.trim());
  };

  return (
    <section className="doctor-medical-records-page">
      <header>
        <h1>Medical Records</h1>
        <p>Review and manage patient medical records.</p>
      </header>

      <form onSubmit={handleSearch}>
        <label htmlFor="patientId">Patient ID</label>

        <input
          id="patientId"
          value={patientId}
          onChange={(event) => setPatientId(event.target.value)}
          placeholder="Enter patient ID"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !patientId.trim()}>
          {loading ? "Searching…" : "Search records"}
        </button>
      </form>

      {error && (
        <div>
          <p role="alert">{error}</p>

          <button type="button" onClick={refetch} disabled={loading}>
            Try Again
          </button>
        </div>
      )}

      <MedicalRecordTable
        records={records}
        loading={loading}
      />
    </section>
  );
};

export default MedicalRecords;
