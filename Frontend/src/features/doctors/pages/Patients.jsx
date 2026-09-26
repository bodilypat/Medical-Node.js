/* ********************************************** */
/* File: #src/features/doctors/pages/Patients.jsx */ 
/* ********************************************** */

import { useMemo, useState } from "react";

import PatientSearch from "../components/patients/PatientSearch";
import PatientTable from "../components/patients/PatientTable";
import useDoctorPatients from "../hooks/useDoctorPatients";

const Patients = () => {
  const [search, setSearch] = useState("");

  const params = useMemo(
    () => ({
      search,
    }),
    [search]
  );

  const {
    patients,
    loading,
    error,
    refetch,
  } = useDoctorPatients(params);

  if (error) {
    return (
      <section>
        <h1>My Patients</h1>
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="doctor-patients-page">
      <header>
        <h1>My Patients</h1>
        <p>Patients assigned to your care.</p>
      </header>

      <PatientSearch
        value={search}
        onChange={setSearch}
      />

      <PatientTable
        patients={patients}
        loading={loading}
      />
    </section>
  );
};

export default Patients;
