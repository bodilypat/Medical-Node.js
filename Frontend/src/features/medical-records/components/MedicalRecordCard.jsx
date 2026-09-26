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

  return (
    <article
      className="medical-record-card"
      onClick={() => onClick?.(record)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <header className="medical-record-card__header">
        <div>
          <h3>
            {patient?.firstName}{" "}
            {patient?.lastName}
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
          {doctor?.firstName} {doctor?.lastName}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {record?.type || "-"}
        </p>

        <p>
          <strong>Diagnosis:</strong>{" "}
          {record?.diagnoses?.[0]?.diagnosis ||
            record?.diagnosis ||
            "-"}
        </p>
      </div>
    </article>
  );
};

export default MedicalRecordCard;
