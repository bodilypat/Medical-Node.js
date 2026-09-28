/* **************************************************************** */
/* File: #src/features/appointments/components/AppointmentTable.jsx */ 
/* **************************************************************** */

import Spinner from "../../../components/ui/Spinner";
import EmptyState from "../../../components/ui/EmptyState";

import AppointmentStatus from "./AppointmentStatus";

const AppointmentTable = ({
  appointments = [],
  loading = false,
  onView,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (!appointments.length) {
    return (
      <EmptyState
        title="No appointments found"
        description="There are no appointments matching your criteria."
      />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment, index) => {
            const patient = appointment.patient;
            const doctor = appointment.doctor;
            const patientName = [patient?.firstName, patient?.lastName]
              .filter(Boolean)
              .join(" ");
            const doctorName = [doctor?.firstName, doctor?.lastName]
              .filter(Boolean)
              .join(" ");

            return (
              <tr key={appointment.id ?? appointment._id ?? index}>
                <td>{patientName || "-"}</td>

                <td>{doctorName || "-"}</td>

                <td>
                  {appointment.appointmentDate || "-"}
                </td>

                <td>
                  {appointment.appointmentTime || "-"}
                </td>

                <td>{appointment.type || "-"}</td>

                <td>
                  <AppointmentStatus
                    status={appointment.status}
                  />
                </td>

                <td>
                  <button
                    type="button"
                    disabled={!onView}
                    aria-label={`View appointment for ${patientName || "patient"}`}
                    onClick={() => onView?.(appointment)}
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

export default AppointmentTable;
