/* ******************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordCard.jsx */ 
/* ******************************************************************** */

import Badge from "../../../components/ui/Badge";

const MedicalRecordCard = ({
  record,
  onClick,
}) => {
  const patient = record?.patient;
  const doctor = record?.doctor;
  const patientName = [patient?.firstName, patient?.lastName]
    .filter(Boolean)
    .join(" ") || "Unknown patient";
  const doctorName = [doctor?.firstName, doctor?.lastName]
    .filter(Boolean)
    .join(" ") || "-";
  const diagnosis =
    record?.diagnoses?.[0]?.diagnosis || record?.diagnosis || "-";

  const handleKeyDown = (event) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(record);
    }
  };

  return (
    <article
      className="medical-record-card"
      onClick={() => onClick?.(record)}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Open medical record for ${patientName}` : undefined}
    >
      <header className="medical-record-card__header">
        <div>
          <h3>
            {patientName}
          </h3>

          <span>
            {record?.recordDate || "-"}
          </span>
        </div>

        <Badge
          variant={
            record?.status === "ACTIVE"
              ? "success"
              : "secondary"
          }
        >
          {record?.status || "Unknown"}
        </Badge>
      </header>

      <div className="medical-record-card__body">
        <p>
          <strong>Doctor:</strong>{" "}
          {doctorName}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {record?.type || "-"}
        </p>

        <p>
          <strong>Diagnosis:</strong>{" "}
          {diagnosis}
        </p>
      </div>
    </article>
  );
};

export default MedicalRecordCard;
