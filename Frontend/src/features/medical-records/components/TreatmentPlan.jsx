/* **************************************************************** */
/* File: #src/features/medical-records/components/TreatmentPlan.jsx */ 
/* **************************************************************** */

import { useState } from "react";

import Button from "../../../components/ui/Button";

const TreatmentPlan = ({
  treatmentPlan = "",
  onSave,
  loading = false,
}) => {
  const [value, setValue] =
    useState(treatmentPlan);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSave?.({
      plan: value.trim(),
    });
  };

  return (
    <section className="treatment-plan">
      <header>
        <h3>Treatment Plan</h3>
      </header>

      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          rows={8}
          placeholder="Enter treatment plan..."
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Treatment Plan"}
        </Button>
      </form>
    </section>
  );
};

export default TreatmentPlan;
