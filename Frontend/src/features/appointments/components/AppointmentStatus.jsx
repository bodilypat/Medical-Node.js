/* ***************************************************************** */
/* File: #src/features/appointments/components/AppointmentStatus.jsx */
/* ***************************************************************** */

import Badge from "../../../components/ui/Badge";

import {
  APPOINTMENT_STATUS,
} from "../constants/appointmentConstants";

const statusConfig = {
  [APPOINTMENT_STATUS.SCHEDULED]: {
    label: "Scheduled",
    variant: "warning",
  },
  [APPOINTMENT_STATUS.CONFIRMED]: {
    label: "Confirmed",
    variant: "info",
  },
  [APPOINTMENT_STATUS.COMPLETED]: {
    label: "Completed",
    variant: "success",
  },
  [APPOINTMENT_STATUS.CANCELLED]: {
    label: "Cancelled",
    variant: "danger",
  },
  [APPOINTMENT_STATUS.NO_SHOW]: {
    label: "No Show",
    variant: "secondary",
  },
};

const AppointmentStatus = ({ status }) => {
  const normalizedStatus =
    typeof status === "string" ? status.trim().toUpperCase() : "";
  const matchedStatus = Object.keys(statusConfig).find(
    (key) => key.toUpperCase() === normalizedStatus,
  );
  const config = matchedStatus
    ? statusConfig[matchedStatus]
    : {
        label: typeof status === "string" && status.trim() ? status.trim() : "Unknown",
        variant: "secondary",
      };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default AppointmentStatus;
