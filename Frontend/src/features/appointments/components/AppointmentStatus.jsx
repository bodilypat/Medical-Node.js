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
  const config =
    statusConfig[status] || {
      label: status || "Unknown",
      variant: "secondary",
    };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default AppointmentStatus;
