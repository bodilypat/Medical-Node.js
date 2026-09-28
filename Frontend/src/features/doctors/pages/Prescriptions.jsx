/* *************************************************** */
/* File: #src/features/doctors/pages/Prescriptions.jsx */ 
/* *************************************************** */

import PrescriptionTable from "../components/prescriptions/PrescriptionTable";
import usePrescriptions from "../hooks/usePrescriptions";

const Prescriptions = () => {
  const {
    prescriptions,
    loading,
    error,
    refetch,
  } = usePrescriptions();

  if (error) {
    return (
      <section
        className="doctor-prescriptions-page doctor-prescriptions-page--error"
        aria-labelledby="prescriptions-title"
      >
        <header>
          <h1 id="prescriptions-title">Prescriptions</h1>
          <p role="alert">Unable to load prescriptions: {error}</p>
        </header>

        <button type="button" onClick={refetch} aria-label="Retry loading prescriptions">
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section
      className="doctor-prescriptions-page"
      aria-labelledby="prescriptions-title"
    >
      <header>
        <h1 id="prescriptions-title">Prescriptions</h1>
        <p>Manage prescriptions issued to your patients.</p>
      </header>

      <PrescriptionTable
        prescriptions={prescriptions}
        loading={loading}
      />
    </section>
  );
};

export default Prescriptions;
