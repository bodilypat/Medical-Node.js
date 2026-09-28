/* **************************************************************** */
/* File: #src/features/medical-records/components/TreatmentPlan.jsx */ 
/* **************************************************************** */

import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";

const TreatmentPlan = ({
  treatmentPlan = "",
  onSave,
  loading = false,
}) => {
  const savedPlan = typeof treatmentPlan === "string" ? treatmentPlan : "";
  const [value, setValue] =
    useState(savedPlan);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setValue(savedPlan);
    setSaveError("");
  }, [savedPlan]);

  const hasChanges = value.trim() !== savedPlan.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || !onSave || !hasChanges) return;

    setSaveError("");
    try {
      await onSave({ plan: value.trim() });
    } catch {
      setSaveError("Unable to save the treatment plan. Please try again.");
    }
  };

  return (
    <section className="treatment-plan">
      <header>
        <h3>Treatment Plan</h3>
      </header>

      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setSaveError("");
          }}
          aria-label="Treatment plan"
          rows={8}
          placeholder="Enter treatment plan..."
          disabled={loading}
        />

        {saveError && <p role="alert">{saveError}</p>}

        <Button
          type="submit"
          disabled={loading || !hasChanges || !onSave}
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
