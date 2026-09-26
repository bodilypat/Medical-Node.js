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
  if (loading) {
    return <Spinner />;
  }

  if (!records.length) {
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
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Type</th>
            <th>Diagnosis</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => {
            const patient = record.patient;
            const doctor = record.doctor;

            return (
              <tr key={record.id}>
                <td>
                  {patient?.firstName}{" "}
                  {patient?.lastName}
                </td>

                <td>
                  {doctor?.firstName}{" "}
                  {doctor?.lastName}
                </td>

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
