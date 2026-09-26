/* ******************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordForm.jsx */ 
/* ******************************************************************** */

import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import {
  RECORD_TYPE_OPTIONS,
} from "../constants/medicalRecordConstants";

const MedicalRecordForm = ({
  initialValues = {},
  patients = [],
  doctors = [],
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    patientId: initialValues.patientId || "",
    doctorId: initialValues.doctorId || "",
    recordDate: initialValues.recordDate || "",
    type: initialValues.type || "",
    chiefComplaint:
      initialValues.chiefComplaint || "",
    symptoms: initialValues.symptoms || "",
    clinicalNotes:
      initialValues.clinicalNotes || "",
    treatmentPlan:
      initialValues.treatmentPlan || "",
    followUpDate:
      initialValues.followUpDate || "",
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
      className="medical-record-form"
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
        label="Record Date"
        type="date"
        value={form.recordDate}
        onChange={(event) =>
          update("recordDate", event.target.value)
        }
      />

      <Select
        label="Record Type"
        value={form.type}
        onChange={(event) =>
          update("type", event.target.value)
        }
        options={[
          {
            value: "",
            label: "Select record type",
          },
          ...RECORD_TYPE_OPTIONS,
        ]}
      />

      <div className="form-field">
        <label htmlFor="chiefComplaint">
          Chief Complaint
        </label>

        <textarea
          id="chiefComplaint"
          value={form.chiefComplaint}
          onChange={(event) =>
            update(
              "chiefComplaint",
              event.target.value
            )
          }
          rows={3}
        />
      </div>

      <div className="form-field">
        <label htmlFor="symptoms">
          Symptoms
        </label>

        <textarea
          id="symptoms"
          value={form.symptoms}
          onChange={(event) =>
            update("symptoms", event.target.value)
          }
          rows={4}
        />
      </div>

      <div className="form-field">
        <label htmlFor="clinicalNotes">
          Clinical Notes
        </label>

        <textarea
          id="clinicalNotes"
          value={form.clinicalNotes}
          onChange={(event) =>
            update(
              "clinicalNotes",
              event.target.value
            )
          }
          rows={6}
        />
      </div>

      <div className="form-field">
        <label htmlFor="treatmentPlan">
          Treatment Plan
        </label>

        <textarea
          id="treatmentPlan"
          value={form.treatmentPlan}
          onChange={(event) =>
            update(
              "treatmentPlan",
              event.target.value
            )
          }
          rows={6}
        />
      </div>

      <Input
        label="Follow-up Date"
        type="date"
        value={form.followUpDate}
        onChange={(event) =>
          update(
            "followUpDate",
            event.target.value
          )
        }
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Medical Record"}
      </Button>
    </form>
  );
};

export default MedicalRecordForm;
