/* *************************************************************** */
/* File: #src/features/appointments/components/AppointmentForm.jsx */ 
/* *************************************************************** */

import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import {
  APPOINTMENT_TYPE_OPTIONS,
} from "../constants/appointmentConstants";

const AppointmentForm = ({
  initialValues = {},
  patients = [],
  doctors = [],
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    patientId: initialValues.patientId || "",
    doctorId: initialValues.doctorId || "",
    appointmentDate:
      initialValues.appointmentDate || "",
    appointmentTime:
      initialValues.appointmentTime || "",
    type: initialValues.type || "",
    reason: initialValues.reason || "",
    notes: initialValues.notes || "",
  });

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit?.(form);
  };

  return (
    <form
      className="appointment-form"
      onSubmit={handleSubmit}
    >
      <Select
        label="Patient"
        value={form.patientId}
        onChange={(event) =>
          update("patientId", event.target.value)
        }
        options={[
          {
            value: "",
            label: "Select patient",
          },
          ...patients.map((patient) => ({
            value: patient.id,
            label: `${patient.firstName} ${patient.lastName}`,
          })),
        ]}
      />

      <Select
        label="Doctor"
        value={form.doctorId}
        onChange={(event) =>
          update("doctorId", event.target.value)
        }
        options={[
          {
            value: "",
            label: "Select doctor",
          },
          ...doctors.map((doctor) => ({
            value: doctor.id,
            label: `Dr. ${doctor.firstName} ${doctor.lastName}`,
          })),
        ]}
      />

      <Input
        label="Date"
        type="date"
        value={form.appointmentDate}
        onChange={(event) =>
          update(
            "appointmentDate",
            event.target.value
          )
        }
      />

      <Input
        label="Time"
        type="time"
        value={form.appointmentTime}
        onChange={(event) =>
          update(
            "appointmentTime",
            event.target.value
          )
        }
      />

      <Select
        label="Appointment Type"
        value={form.type}
        onChange={(event) =>
          update("type", event.target.value)
        }
        options={[
          {
            value: "",
            label: "Select appointment type",
          },
          ...APPOINTMENT_TYPE_OPTIONS,
        ]}
      />

      <Input
        label="Reason"
        value={form.reason}
        onChange={(event) =>
          update("reason", event.target.value)
        }
        placeholder="Reason for appointment"
      />

      <Input
        label="Notes"
        value={form.notes}
        onChange={(event) =>
          update("notes", event.target.value)
        }
        placeholder="Additional notes"
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Appointment"}
      </Button>
    </form>
  );
};

export default AppointmentForm;
