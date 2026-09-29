/* ************************************************************ */
/* #src/features/laboratory/components/orders/LabOrderForm.jsx  */
/* ************************************************************ */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* --------------------------------------------------------- */
/* Constants                                                  */
/* --------------------------------------------------------- */

const DEFAULT_FORM = {
  patientId: "",
  doctorId: "",
  priority: "routine",
  clinicalIndication: "",
  diagnosis: "",
  notes: "",
  tests: [],
};

const LAB_ORDER_PRIORITIES = [
  {
    value: "routine",
    label: "Routine",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "stat",
    label: "STAT",
  },
];

const MAX_NOTES_LENGTH = 2000;
const MAX_CLINICAL_INDICATION_LENGTH = 500;
const MAX_DIAGNOSIS_LENGTH = 500;

/* --------------------------------------------------------- */
/* Helpers                                                    */
/* --------------------------------------------------------- */

const getPatientName = (patient) => {
  if (!patient) {
    return "";
  }

  if (patient.name) {
    return patient.name;
  }

  const name = [
    patient.firstName,
    patient.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || `Patient #${patient.id}`;
};

const getDoctorName = (doctor) => {
  if (!doctor) {
    return "";
  }

  if (doctor.name) {
    return doctor.name.startsWith("Dr.")
      ? doctor.name
      : `Dr. ${doctor.name}`;
  }

  const name = [
    doctor.firstName,
    doctor.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!name) {
    return `Doctor #${doctor.id}`;
  }

  return name.startsWith("Dr.")
    ? name
    : `Dr. ${name}`;
};

const getTestId = (test) => {
  return test?.id ?? test?.testId;
};

const getTestName = (test) => {
  return (
    test?.name ||
    test?.testName ||
    `Test #${getTestId(test)}`
  );
};

const getTestDescription = (test) => {
  return (
    test?.description ||
    test?.shortDescription ||
    ""
  );
};

const getTestPrice = (test) => {
  if (
    test?.price === undefined ||
    test?.price === null
  ) {
    return null;
  }

  const numericPrice = Number(test.price);

  if (Number.isNaN(numericPrice)) {
    return null;
  }

  return numericPrice.toFixed(2);
};

const normalizeTests = (tests = []) => {
  const seen = new Set();

  return tests.reduce((accumulator, test) => {
    const normalizedValue =
      typeof test === "string" ||
      typeof test === "number"
        ? String(test)
        : String(getTestId(test) ?? "");

    if (!normalizedValue || seen.has(normalizedValue)) {
      return accumulator;
    }

    seen.add(normalizedValue);
    accumulator.push(normalizedValue);

    return accumulator;
  }, []);
};

const mapOrderToForm = (order) => {
  if (!order) {
    return {
      ...DEFAULT_FORM,
      tests: [],
    };
  }

  return {
    patientId:
      order.patientId ??
      order.patient?.id ??
      "",

    doctorId:
      order.doctorId ??
      order.doctor?.id ??
      "",

    priority:
      order.priority ??
      "routine",

    clinicalIndication:
      order.clinicalIndication ??
      order.clinical_indication ??
      "",

    diagnosis:
      order.diagnosis ??
      "",

    notes:
      order.notes ??
      "",

    tests: normalizeTests(
      order.tests ||
        order.labTests ||
        []
    ),
  };
};

/* --------------------------------------------------------- */
/* Component                                                   */
/* --------------------------------------------------------- */

const LabOrderForm = ({
  order = null,
  patients = [],
  doctors = [],
  labTests = [],
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) => {
  const navigate = useNavigate();

  const isEditMode =
    mode === "edit" || Boolean(order);

  const [formData, setFormData] = useState(
    DEFAULT_FORM
  );

  const [errors, setErrors] = useState({});

  const [submitError, setSubmitError] =
    useState("");

  const [testSearch, setTestSearch] =
    useState("");

  /* ------------------------------------------------------- */
  /* Initialize form                                          */
  /* ------------------------------------------------------- */

  useEffect(() => {
    setFormData(mapOrderToForm(order));
    setErrors({});
    setSubmitError("");
  }, [order]);

  /* ------------------------------------------------------- */
  /* Filter lab tests                                         */
  /* ------------------------------------------------------- */

  const filteredLabTests = useMemo(() => {
    const search = testSearch
      .trim()
      .toLowerCase();

    if (!search) {
      return labTests;
    }

    return labTests.filter((test) => {
      const name = getTestName(test)
        .toLowerCase();

      const description =
        getTestDescription(test)
          .toLowerCase();

      const code = String(
        test.code ||
          test.testCode ||
          ""
      ).toLowerCase();

      return (
        name.includes(search) ||
        description.includes(search) ||
        code.includes(search)
      );
    });
  }, [labTests, testSearch]);

  /* ------------------------------------------------------- */
  /* Selected tests                                           */
  /* ------------------------------------------------------- */

  const selectedTests = useMemo(() => {
    return formData.tests
      .map((testId) =>
        labTests.find(
          (test) =>
            String(getTestId(test)) ===
            String(testId)
        )
      )
      .filter(Boolean);
  }, [formData.tests, labTests]);

  /* ------------------------------------------------------- */
  /* Input handler                                            */
  /* ------------------------------------------------------- */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next[name];

        return next;
      });
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /* ------------------------------------------------------- */
  /* Test selection                                           */
  /* ------------------------------------------------------- */

  const handleTestToggle = (test) => {
    const testId = getTestId(test);

    if (!testId) {
      return;
    }

    const normalizedId = String(testId);

    setFormData((previous) => {
      const alreadySelected =
        previous.tests.some(
          (id) =>
            String(id) === normalizedId
        );

      return {
        ...previous,
        tests: alreadySelected
          ? previous.tests.filter(
              (id) =>
                String(id) !== normalizedId
            )
          : [
              ...previous.tests,
              normalizedId,
            ],
      };
    });

    if (errors.tests) {
      setErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next.tests;

        return next;
      });
    }
  };

  const handleRemoveTest = (testId) => {
    setFormData((previous) => ({
      ...previous,
      tests: previous.tests.filter(
        (id) =>
          String(id) !== String(testId)
      ),
    }));
  };

  /* ------------------------------------------------------- */
  /* Validation                                               */
  /* ------------------------------------------------------- */

  const validate = () => {
    const validationErrors = {};

    if (!formData.patientId) {
      validationErrors.patientId =
        "Please select a patient.";
    }

    if (!formData.doctorId) {
      validationErrors.doctorId =
        "Please select the ordering doctor.";
    }

    if (!formData.tests.length) {
      validationErrors.tests =
        "Please select at least one laboratory test.";
    }

    if (
      formData.clinicalIndication.length >
      MAX_CLINICAL_INDICATION_LENGTH
    ) {
      validationErrors.clinicalIndication =
        `Clinical indication cannot exceed ${MAX_CLINICAL_INDICATION_LENGTH} characters.`;
    }

    if (
      formData.diagnosis.length >
      MAX_DIAGNOSIS_LENGTH
    ) {
      validationErrors.diagnosis =
        `Diagnosis cannot exceed ${MAX_DIAGNOSIS_LENGTH} characters.`;
    }

    if (
      formData.notes.length >
      MAX_NOTES_LENGTH
    ) {
      validationErrors.notes =
        `Notes cannot exceed ${MAX_NOTES_LENGTH} characters.`;
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length ===
      0
    );
  };

  /* ------------------------------------------------------- */
  /* Submit                                                   */
  /* ------------------------------------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = {
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      priority: formData.priority,
      tests: formData.tests,
      clinicalIndication:
        formData.clinicalIndication.trim(),
      diagnosis:
        formData.diagnosis.trim(),
      notes:
        formData.notes.trim(),
    };

    try {
      await onSubmit?.(payload);
    } catch (error) {
      console.error(
        "Failed to save laboratory order:",
        error
      );

      setSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save the laboratory order. Please try again."
      );
    }
  };

  /* ------------------------------------------------------- */
  /* Cancel                                                   */
  /* ------------------------------------------------------- */

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/laboratory");
  };

  /* ------------------------------------------------------- */
  /* Render                                                    */
  /* ------------------------------------------------------- */

  return (
    <form
      className="lab-order-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* ------------------------------------------------- */}
      {/* Header                                             */}
      {/* ------------------------------------------------- */}

      <div className="form-header">
        <div>
          <h2>
            {isEditMode
              ? "Edit Laboratory Order"
              : "Create Laboratory Order"}
          </h2>

          <p>
            {isEditMode
              ? "Update the laboratory order information below."
              : "Enter the patient, test, and clinical information for this order."}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* Submit Error                                       */}
      {/* ------------------------------------------------- */}

      {submitError && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* Patient & Doctor                                  */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>Order Information</h3>

          <p>
            Select the patient and healthcare
            provider responsible for the order.
          </p>
        </div>

        <div className="form-grid">
          {/* Patient */}

          <div className="form-group">
            <label htmlFor="patientId">
              Patient{" "}
              <span className="required">*</span>
            </label>

            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.patientId
                  ? "input-error"
                  : ""
              }
            >
              <option value="">
                Select patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {getPatientName(patient)}
                  {patient.patientNumber
                    ? ` — ${patient.patientNumber}`
                    : ""}
                </option>
              ))}
            </select>

            {errors.patientId && (
              <span className="field-error">
                {errors.patientId}
              </span>
            )}
          </div>

          {/* Doctor */}

          <div className="form-group">
            <label htmlFor="doctorId">
              Ordering Doctor{" "}
              <span className="required">*</span>
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.doctorId
                  ? "input-error"
                  : ""
              }
            >
              <option value="">
                Select doctor
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {getDoctorName(doctor)}
                  {doctor.specialization
                    ? ` — ${doctor.specialization}`
                    : ""}
                </option>
              ))}
            </select>

            {errors.doctorId && (
              <span className="field-error">
                {errors.doctorId}
              </span>
            )}
          </div>

          {/* Priority */}

          <div className="form-group">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={loading}
            >
              {LAB_ORDER_PRIORITIES.map(
                (priority) => (
                  <option
                    key={priority.value}
                    value={priority.value}
                  >
                    {priority.label}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Laboratory Tests                                  */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Laboratory Tests{" "}
            <span className="required">*</span>
          </h3>

          <p>
            Select one or more tests to include
            in this laboratory order.
          </p>
        </div>

        {/* Test Search */}

        <div className="form-group">
          <label htmlFor="labTestSearch">
            Search Tests
          </label>

          <input
            id="labTestSearch"
            type="search"
            value={testSearch}
            onChange={(event) =>
              setTestSearch(
                event.target.value
              )
            }
            placeholder="Search by test name or code..."
            disabled={loading}
          />
        </div>

        {/* Test List */}

        <div className="lab-test-selector">
          {filteredLabTests.length === 0 ? (
            <div className="empty-state">
              <p>
                No laboratory tests found.
              </p>
            </div>
          ) : (
            <div className="lab-test-list">
              {filteredLabTests.map(
                (test) => {
                  const testId =
                    getTestId(test);

                  const selected =
                    formData.tests.some(
                      (id) =>
                        String(id) ===
                        String(testId)
                    );

                  return (
                    <label
                      key={testId}
                      className={`lab-test-option ${
                        selected
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleTestToggle(test)
                        }
                        disabled={loading}
                      />

                      <div className="lab-test-info">
                        <div className="lab-test-name">
                          {getTestName(test)}
                        </div>

                        {test.code && (
                          <div className="lab-test-code">
                            Code: {test.code}
                          </div>
                        )}

                        {getTestDescription(
                          test
                        ) && (
                          <div className="lab-test-description">
                            {getTestDescription(
                              test
                            )}
                          </div>
                        )}
                      </div>

                      {getTestPrice(test) && (
                        <span className="lab-test-price">
                          ${getTestPrice(test)}
                        </span>
                      )}
                    </label>
                  );
                }
              )}
            </div>
          )}
        </div>

        {errors.tests && (
          <span className="field-error">
            {errors.tests}
          </span>
        )}

        {/* Selected Tests */}

        {selectedTests.length > 0 && (
          <div className="selected-tests">
            <div className="selected-tests-header">
              <h4>
                Selected Tests (
                {selectedTests.length})
              </h4>
            </div>

            <div className="selected-test-list">
              {selectedTests.map((test) => {
                const testId =
                  getTestId(test);

                return (
                  <div
                    key={testId}
                    className="selected-test-item"
                  >
                    <span>
                      {getTestName(test)}
                    </span>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleRemoveTest(
                          testId
                        )
                      }
                      disabled={loading}
                      aria-label={`Remove ${getTestName(
                        test
                      )}`}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------- */}
      {/* Clinical Information                              */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>Clinical Information</h3>

          <p>
            Provide information that may help
            the laboratory process the order.
          </p>
        </div>

        {/* Clinical Indication */}

        <div className="form-group">
          <label htmlFor="clinicalIndication">
            Clinical Indication
          </label>

          <textarea
            id="clinicalIndication"
            name="clinicalIndication"
            rows={4}
            value={
              formData.clinicalIndication
            }
            onChange={handleChange}
            placeholder="Describe the clinical reason for ordering these tests..."
            maxLength={
              MAX_CLINICAL_INDICATION_LENGTH
            }
            disabled={loading}
            className={
              errors.clinicalIndication
                ? "input-error"
                : ""
            }
          />

          <div className="input-meta">
            <span>
              {errors.clinicalIndication ? (
                <span className="field-error">
                  {errors.clinicalIndication}
                </span>
              ) : (
                "Optional clinical information."
              )}
            </span>

            <span>
              {
                formData.clinicalIndication
                  .length
              }
              /
              {MAX_CLINICAL_INDICATION_LENGTH}
            </span>
          </div>
        </div>

        {/* Diagnosis */}

        <div className="form-group">
          <label htmlFor="diagnosis">
            Diagnosis
          </label>

          <textarea
            id="diagnosis"
            name="diagnosis"
            rows={3}
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Enter the relevant diagnosis or suspected condition..."
            maxLength={
              MAX_DIAGNOSIS_LENGTH
            }
            disabled={loading}
            className={
              errors.diagnosis
                ? "input-error"
                : ""
            }
          />

          <div className="input-meta">
            <span>
              {errors.diagnosis ? (
                <span className="field-error">
                  {errors.diagnosis}
                </span>
              ) : (
                "Optional diagnosis information."
              )}
            </span>

            <span>
              {formData.diagnosis.length}/
              {MAX_DIAGNOSIS_LENGTH}
            </span>
          </div>
        </div>

        {/* Notes */}

        <div className="form-group">
          <label htmlFor="notes">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add additional instructions or notes..."
            maxLength={MAX_NOTES_LENGTH}
            disabled={loading}
            className={
              errors.notes
                ? "input-error"
                : ""
            }
          />

          <div className="input-meta">
            <span>
              Optional additional information.
            </span>

            <span>
              {formData.notes.length}/
              {MAX_NOTES_LENGTH}
            </span>
          </div>

          {errors.notes && (
            <span className="field-error">
              {errors.notes}
            </span>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Form Actions                                      */}
      {/* ------------------------------------------------- */}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update Lab Order"
            : "Create Lab Order"}
        </button>
      </div>
    </form>
  );
};

export default LabOrderForm;
