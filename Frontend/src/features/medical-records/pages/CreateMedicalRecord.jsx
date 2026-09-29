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
    if (loading) return;

    try {
      const result = await createMedicalRecord(data);
      const record = result?.data?.record ?? result?.data ?? result;
      const recordId = record?.id ?? record?._id;

      if (recordId) {
        navigate(`/medical-records/${recordId}`);
      } else {
        navigate("/medical-records");
      }
    } catch {
      // Error is exposed through the hook.
    }
  };

  return (
    <main className="create-medical-record-page">
      <header>
        <h1>Create Medical Record</h1>

        <p id="create-medical-record-description">
          Create a new clinical record for a patient.
        </p>
      </header>

      {error && (
        <div className="error-state" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      <MedicalRecordForm
        onSubmit={handleSubmit}
        loading={loading}
        aria-describedby="create-medical-record-description"
      />
    </main>
  );
};

export default CreateMedicalRecord;
