/* ****************************************************************** */
/* File: #src/features/appointments/components/AppointmentActions.jsx */ 
/* ****************************************************************** */

import Button from "../../../components/ui/Button";

import {
  APPOINTMENT_STATUS,
} from "../constants/appointmentConstants";

const AppointmentActions = ({
  appointment,
  onConfirm,
  onCancel,
  onComplete,
  onDelete,
  loading = false,
}) => {
  if (!appointment) {
    return null;
  }

  const { status, id } = appointment;
  const isScheduled = status === APPOINTMENT_STATUS.SCHEDULED;
  const isActive =
    status !== APPOINTMENT_STATUS.CANCELLED &&
    status !== APPOINTMENT_STATUS.COMPLETED;
  const canComplete =
    isScheduled || status === APPOINTMENT_STATUS.CONFIRMED;

  return (
    <div className="appointment-actions" aria-label="Appointment actions">
      {canComplete && (
        <Button
          type="button"
          onClick={() => onComplete?.(id)}
          disabled={loading}
          aria-label="Complete appointment"
        >
          Complete
        </Button>
      )}

      {isScheduled && (
        <Button
          type="button"
          onClick={() => onConfirm?.(id)}
          disabled={loading}
          aria-label="Confirm appointment"
        >
          Confirm
        </Button>
      )}

      {isActive && (
          <Button
            type="button"
            onClick={() => onCancel?.(id)}
            disabled={loading}
            aria-label="Cancel appointment"
          >
            Cancel
          </Button>
      )}

      <Button
        type="button"
        onClick={() => onDelete?.(id)}
        disabled={loading}
        aria-label="Delete appointment"
      >
        Delete
      </Button>
    </div>
  );
};

export default AppointmentActions;
