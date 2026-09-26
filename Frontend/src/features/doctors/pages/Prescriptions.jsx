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
      <section>
        <h1>Prescriptions</h1>
        <p>{error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="doctor-prescriptions-page">
      <header>
        <h1>Prescriptions</h1>
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
