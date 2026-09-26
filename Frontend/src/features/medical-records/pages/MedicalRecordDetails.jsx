/* ****************************************************************** */
/* File: #src/features/medical-records/pages/MedicalRecordDetails.jsx */ 
/* ****************************************************************** */

import { useNavigate, useParams } from "react-router-dom";

import MedicalRecordDetailsView from "../components/MedicalRecordDetails";
import ClinicalNotes from "../components/ClinicalNotes";
import TreatmentPlan from "../components/TreatmentPlan";
import RecordTimeline from "../components/RecordTimeline";

import useMedicalRecord from "../hooks/useMedicalRecord";
import useMedicalRecordActions from "../hooks/useMedicalRecordActions";

const MedicalRecordDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    record,
    loading,
    error,
    refetch,
  } = useMedicalRecord(id);

  const {
    archiveRecord,
    restoreRecord,
    addClinicalNote,
    addTreatmentPlan,
    deleteRecord,
    loading: actionLoading,
    error: actionError,
  } = useMedicalRecordActions();

  const handleArchive = async () => {
    await archiveRecord(id);
    await refetch();
  };

  const handleRestore = async () => {
    await restoreRecord(id);
    await refetch();
  };

  const handleDelete = async () => {
    await deleteRecord(id);
    navigate("/medical-records");
  };

  const handleAddNote = async (data) => {
    await addClinicalNote(id, data);
    await refetch();
  };

  const handleSaveTreatmentPlan = async (
    data
  ) => {
    await addTreatmentPlan(id, data);
    await refetch();
  };

  if (loading) {
    return <div>Loading medical record...</div>;
  }

  if (error) {
    return (
      <section>
        <h1>Medical Record</h1>

        <p>{error}</p>

        <button
          type="button"
          onClick={refetch}
        >
          Try Again
        </button>
      </section>
    );
  }

  if (!record) {
    return <p>Medical record not found.</p>;
  }

  return (
    <section className="medical-record-details-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <MedicalRecordDetailsView
        record={record}
      />

      {actionError && (
        <p className="error-message">
          {actionError}
        </p>
      )}

      <div className="medical-record-actions">
        {record.status === "ACTIVE" ? (
          <button
            type="button"
            onClick={handleArchive}
            disabled={actionLoading}
          >
            Archive Record
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRestore}
            disabled={actionLoading}
          >
            Restore Record
          </button>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={actionLoading}
        >
          Delete Record
        </button>
      </div>

      <ClinicalNotes
        notes={record.clinicalNotesList || []}
        onAdd={handleAddNote}
        loading={actionLoading}
      />

      <TreatmentPlan
        treatmentPlan={record.treatmentPlan || ""}
        onSave={handleSaveTreatmentPlan}
        loading={actionLoading}
      />

      <RecordTimeline
        events={record.timeline || []}
      />
    </section>
  );
};

export default MedicalRecordDetailsPage;
