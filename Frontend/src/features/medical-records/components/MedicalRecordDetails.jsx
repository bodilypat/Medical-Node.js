/* *********************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordDetails.jsx */ 
/* *********************************************************************** */

import Badge from "../../../components/ui/Badge";

const MedicalRecordDetails = ({
  record,
}) => {
  if (!record) {
    return null;
  }

  const patient = record.patient;
  const doctor = record.doctor;

  return (
    <section className="medical-record-details">
      <header>
        <div>
          <h2>Medical Record</h2>

          <p>
            {record.recordDate || "-"}
          </p>
        </div>

        <Badge
          variant={
            record.status === "ACTIVE"
              ? "success"
              : "secondary"
          }
        >
          {record.status || "Unknown"}
        </Badge>
      </header>

      <dl>
        <dt>Patient</dt>
        <dd>
          {patient?.firstName}{" "}
          {patient?.lastName}
        </dd>

        <dt>Doctor</dt>
        <dd>
          {doctor?.firstName}{" "}
          {doctor?.lastName}
        </dd>

        <dt>Record Type</dt>
        <dd>{record.type || "-"}</dd>

        <dt>Chief Complaint</dt>
        <dd>
          {record.chiefComplaint || "-"}
        </dd>

        <dt>Symptoms</dt>
        <dd>{record.symptoms || "-"}</dd>

        <dt>Clinical Notes</dt>
        <dd>
          {record.clinicalNotes || "-"}
        </dd>

        <dt>Treatment Plan</dt>
        <dd>
          {record.treatmentPlan || "-"}
        </dd>

        <dt>Follow-up Date</dt>
        <dd>
          {record.followUpDate || "-"}
        </dd>
      </dl>
    </section>
  );
};

export default MedicalRecordDetails;
