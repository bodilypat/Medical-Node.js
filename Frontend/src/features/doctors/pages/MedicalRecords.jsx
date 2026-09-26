/* **************************************************** */
/* File: #src/features/doctors/pages/MedicalRecords.jsx */ 
/* **************************************************** */

import { useState } from "react";

import MedicalRecordTable from "../components/medical-records/MedicalRecordTable";
import useMedicalRecords from "../hooks/useMedicalRecords";

const MedicalRecords = () => {
  const [patientId, setPatientId] = useState("");

  const {
    records,
    loading,
    error,
    refetch,
  } = useMedicalRecords(patientId);

  return (
    <section className="doctor-medical-records-page">
      <header>
        <h1>Medical Records</h1>
        <p>Review and manage patient medical records.</p>
      </header>

      <div>
        <label htmlFor="patientId">Patient ID</label>

        <input
          id="patientId"
          value={patientId}
          onChange={(event) =>
            setPatientId(event.target.value)
          }
          placeholder="Enter patient ID"
        />
      </div>

      {error && (
        <div>
          <p>{error}</p>

          <button type="button" onClick={refetch}>
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
