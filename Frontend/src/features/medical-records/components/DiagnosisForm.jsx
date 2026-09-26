/* **************************************************************** */
/* File: #src/features/medical-records/components/DiagnosisForm.jsx */ 
/* **************************************************************** */

import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import {
  DIAGNOSIS_TYPE_OPTIONS,
} from "../constants/medicalRecordConstants";

const DiagnosisForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  onCancel,
}) => {
  const [form, setForm] = useState({
    diagnosis: initialValues.diagnosis || "",
    code: initialValues.code || "",
    type:
      initialValues.type ||
      DIAGNOSIS_TYPE_OPTIONS[0].value,
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
      className="diagnosis-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Diagnosis"
        value={form.diagnosis}
        onChange={(event) =>
          update("diagnosis", event.target.value)
        }
        placeholder="Enter diagnosis"
      />

      <Input
        label="Diagnosis Code"
        value={form.code}
        onChange={(event) =>
          update("code", event.target.value)
        }
        placeholder="e.g. ICD-10 code"
      />

      <Select
        label="Diagnosis Type"
        value={form.type}
        onChange={(event) =>
          update("type", event.target.value)
        }
        options={DIAGNOSIS_TYPE_OPTIONS}
      />

      <div className="form-field">
        <label htmlFor="diagnosis-notes">
          Notes
        </label>

        <textarea
          id="diagnosis-notes"
          value={form.notes}
          onChange={(event) =>
            update("notes", event.target.value)
          }
          rows={4}
        />
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Diagnosis"}
        </Button>

        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default DiagnosisForm;
