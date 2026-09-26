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

  return (
    <div className="appointment-actions">
      {(status === APPOINTMENT_STATUS.SCHEDULED ||
        status === APPOINTMENT_STATUS.CONFIRMED) && (
        <Button
          type="button"
          onClick={() => onComplete?.(id)}
          disabled={loading}
        >
          Complete
        </Button>
      )}

      {status === APPOINTMENT_STATUS.SCHEDULED && (
        <Button
          type="button"
          onClick={() => onConfirm?.(id)}
          disabled={loading}
        >
          Confirm
        </Button>
      )}

      {status !== APPOINTMENT_STATUS.CANCELLED &&
        status !== APPOINTMENT_STATUS.COMPLETED && (
          <Button
            type="button"
            onClick={() => onCancel?.(id)}
            disabled={loading}
          >
            Cancel
          </Button>
        )}

      <Button
        type="button"
        onClick={() => onDelete?.(id)}
        disabled={loading}
      >
        Delete
      </Button>
    </div>
  );
};

export default AppointmentActions;
