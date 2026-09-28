/* ********************************************************************* */
/* File: #src/features/medical-records/components/MedicalRecordTable.jsx */ 
/* ********************************************************************* */


import Spinner from "../../../components/ui/Spinner";
import EmptyState from "../../../components/ui/EmptyState";
import Badge from "../../../components/ui/Badge";

const MedicalRecordTable = ({
  records = [],
  loading = false,
  onView,
}) => {
  const medicalRecords = Array.isArray(records) ? records : [];

  if (loading) {
    return <Spinner />;
  }

  if (!medicalRecords.length) {
    return (
      <EmptyState
        title="No medical records found"
        description="There are no medical records matching your criteria."
      />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="medical-record-table">
        <caption>Medical records</caption>
        <thead>
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Doctor</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Diagnosis</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {medicalRecords.map((record, index) => {
            const patient = record.patient;
            const doctor = record.doctor;
            const patientName = [patient?.firstName, patient?.lastName]
              .filter(Boolean)
              .join(" ");
            const doctorName = [doctor?.firstName, doctor?.lastName]
              .filter(Boolean)
              .join(" ");

            return (
              <tr key={record.id ?? `record-${index}`}>
                <td>{patientName || "-"}</td>

                <td>{doctorName || "-"}</td>

                <td>
                  {record.recordDate || "-"}
                </td>

                <td>{record.type || "-"}</td>

                <td>
                  {record.diagnoses?.[0]?.diagnosis ||
                    record.diagnosis ||
                    "-"}
                </td>

                <td>
                  <Badge
                    variant={
                      record.status === "ACTIVE"
                        ? "success"
                        : record.status === "ARCHIVED"
                          ? "secondary"
                          : "warning"
                    }
                  >
                    {record.status || "Unknown"}
                  </Badge>
                </td>

                <td>
                  <button
                    type="button"
                    aria-label={`View medical record for ${patientName || "unknown patient"}`}
                    onClick={() => onView?.(record)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordTable;
