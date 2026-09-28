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
  const fullName = (person) =>
    [person?.firstName, person?.lastName]
      .filter((part) => typeof part === "string" && part.trim())
      .join(" ") || "-";
  const displayValue = (value) =>
    value == null || (typeof value === "string" && !value.trim())
      ? "-"
      : value;
  const status = record.status || "Unknown";

  return (
    <section className="medical-record-details" aria-label="Medical record details">
      <header>
        <div>
          <h2>Medical Record</h2>

          <p>
            {displayValue(record.recordDate)}
          </p>
        </div>

        <Badge
          variant={status === "ACTIVE" ? "success" : "secondary"}
        >
          {status}
        </Badge>
      </header>

      <dl>
        <dt>Patient</dt>
        <dd>
          {fullName(patient)}
        </dd>

        <dt>Doctor</dt>
        <dd>
          {fullName(doctor)}
        </dd>

        <dt>Record Type</dt>
        <dd>{displayValue(record.type)}</dd>

        <dt>Chief Complaint</dt>
        <dd>
          {displayValue(record.chiefComplaint)}
        </dd>

        <dt>Symptoms</dt>
        <dd>{displayValue(record.symptoms)}</dd>

        <dt>Clinical Notes</dt>
        <dd>
          {displayValue(record.clinicalNotes)}
        </dd>

        <dt>Treatment Plan</dt>
        <dd>
          {displayValue(record.treatmentPlan)}
        </dd>

        <dt>Follow-up Date</dt>
        <dd>
          {displayValue(record.followUpDate)}
        </dd>
      </dl>
    </section>
  );
};

export default MedicalRecordDetails;
