/* ***************************************************************** */
/* File: #src/features/medical-records/pages/CreateMedicalRecord.jsx */ 
/* ***************************************************************** */

import { useNavigate } from "react-router-dom";

import MedicalRecordForm from "../components/MedicalRecordForm";
import useCreateMedicalRecord from "../hooks/useCreateMedicalRecord";

const CreateMedicalRecord = () => {
  const navigate = useNavigate();

  const {
    createMedicalRecord,
    loading,
    error,
  } = useCreateMedicalRecord();

  const handleSubmit = async (data) => {
    try {
      const result =
        await createMedicalRecord(data);

      const record = result?.data ?? result;

      if (record?.id) {
        navigate(
          `/medical-records/${record.id}`
        );
      } else {
        navigate("/medical-records");
      }
    } catch {
      // Error is exposed through the hook.
    }
  };

  return (
    <section className="create-medical-record-page">
      <header>
        <h1>Create Medical Record</h1>

        <p>
          Create a new clinical record for a
          patient.
        </p>
      </header>

      {error && (
        <div className="error-state">
          {error}
        </div>
      )}

      <MedicalRecordForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </section>
  );
};

export default CreateMedicalRecord;
