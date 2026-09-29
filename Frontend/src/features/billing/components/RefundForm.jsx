/* ********************************************************* */
/* #src/features/billing/components/RefundForm.jsx          */
/* ********************************************************* */

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

/* ----------- */
/* Constants   */
/* ----------- */

const DEFAULT_FORM = {
  refundType: "full",
  amount: "",
  reason: "",
  notes: "",
};

const REFUND_REASONS = [
  {
    value: "patient_request",
    label: "Patient Request",
  },
  {
    value: "duplicate_payment",
    label: "Duplicate Payment",
  },
  {
    value: "billing_error",
    label: "Billing Error",
  },
  {
    value: "service_cancelled",
    label: "Service Cancelled",
  },
  {
    value: "overpayment",
    label: "Overpayment",
  },
  {
    value: "insurance_adjustment",
    label: "Insurance Adjustment",
  },
  {
    value: "other",
    label: "Other",
  },
];

const MAX_NOTES_LENGTH = 1000;

/* --------- */
/* Helpers   */
/* --------- */

const toNumber = (
  value,
  fallback = 0
) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : fallback;
};

const formatCurrency = (
  amount,
  currency = "USD"
) => {
  const numericAmount =
    toNumber(amount);

  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
      }
    ).format(
      numericAmount
    );
  } catch {
    return `${currency} ${numericAmount.toFixed(
      2
    )}`;
  }
};

const getPaymentId = (
  payment
) => {
  return (
    payment?.id ??
    payment?.paymentId ??
    ""
  );
};

const getPaymentAmount = (
  payment
) => {
  return toNumber(
    payment?.amount ??
      payment?.paymentAmount ??
      payment?.totalAmount
  );
};

const getRefundedAmount = (
  payment
) => {
  return toNumber(
    payment?.refundedAmount ??
      payment?.refundAmount
  );
};

const getAvailableRefundAmount = (
  payment
) => {
  const amount =
    getPaymentAmount(
      payment
    );

  const refunded =
    getRefundedAmount(
      payment
    );

  return Math.max(
    0,
    amount - refunded
  );
};

const getInvoiceNumber = (
  payment
) => {
  return (
    payment?.invoiceNumber ??
    payment?.invoice
      ?.invoiceNumber ??
    payment?.invoice
      ?.number ??
    (payment?.invoiceId
      ? `INV-${payment.invoiceId}`
      : "—")
  );
};

const getPatientName = (
  payment
) => {
  if (
    payment?.patientName
  ) {
    return payment.patientName;
  }

  const patient =
    payment?.patient ||
    payment?.invoice
      ?.patient;

  if (!patient) {
    return "—";
  }

  if (patient.name) {
    return patient.name;
  }

  return (
    [
      patient.firstName,
      patient.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim() || "—"
  );
};

const mapRefundToForm = (
  refund
) => {
  if (!refund) {
    return {
      ...DEFAULT_FORM,
    };
  }

  return {
    refundType:
      refund.refundType ||
      refund.type ||
      "full",

    amount:
      refund.amount ??
      refund.refundAmount ??
      "",

    reason:
      refund.reason ||
      "",

    notes:
      refund.notes == null
        ? ""
        : String(refund.notes),
  };
};

/* ----------- */
/* Component   */
/* ----------- */

const RefundForm = ({
  payment = null,
  refund = null,

  onSubmit,
  onCancel,

  loading = false,
  error = "",

  currency = "USD",

  requireConfirmation = true,

  submitLabel = "Process Refund",
  cancelLabel = "Cancel",
}) => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState(
      mapRefundToForm(
        refund
      )
    );

  const [errors, setErrors] =
    useState({});

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    confirmed,
    setConfirmed,
  ] = useState(false);

  /* --------------------- */
  /* Payment calculations  */
  /* --------------------- */

  const paymentAmount =
    useMemo(
      () =>
        getPaymentAmount(
          payment
        ),
      [payment]
    );

  const refundedAmount =
    useMemo(
      () =>
        getRefundedAmount(
          payment
        ),
      [payment]
    );

  const availableRefundAmount =
    useMemo(
      () =>
        getAvailableRefundAmount(
          payment
        ),
      [payment]
    );

  const selectedRefundAmount =
    useMemo(() => {
      if (
        formData.refundType ===
        "full"
      ) {
        return availableRefundAmount;
      }

      return toNumber(
        formData.amount
      );
    }, [
      formData.refundType,
      formData.amount,
      availableRefundAmount,
    ]);

  const remainingAmount =
    Math.max(
      0,
      availableRefundAmount -
        selectedRefundAmount
    );

  /* ----------- */
  /* Initialize  */
  /* ----------- */

  useEffect(() => {
    setFormData(
      mapRefundToForm(
        refund
      )
    );

    setErrors({});
    setSubmitError("");
    setConfirmed(false);
  }, [refund]);

  /* -------------- */
  /* Input handler  */
  /* -------------- */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    if (errors[name]) {
      setErrors(
        (previous) => {
          const next = {
            ...previous,
          };

          delete next[name];

          return next;
        }
      );
    }

    if (submitError) {
      setSubmitError("");
    }

    if (
      name ===
      "refundType"
    ) {
      setConfirmed(false);

      if (
        value === "full"
      ) {
        setFormData(
          (previous) => ({
            ...previous,
            refundType:
              value,
            amount:
              availableRefundAmount,
          })
        );
      }
    }
  };

  /* Validation  */
  const validate = () => {
    const validationErrors =
      {};

    if (!payment || !getPaymentId(payment)) {
      validationErrors.payment =
        "A valid payment is required to process a refund.";
    }

    if (
      availableRefundAmount <=
      0
    ) {
      validationErrors.amount =
        "There is no refundable amount remaining for this payment.";
    }

    if (
      formData.refundType ===
      "partial"
    ) {
      const amount =
        toNumber(
          formData.amount
        );

      if (
        !formData.amount &&
        formData.amount !==
          0
      ) {
        validationErrors.amount =
          "Please enter a refund amount.";
      } else if (
        amount <= 0
      ) {
        validationErrors.amount =
          "Refund amount must be greater than zero.";
      } else if (
        amount >
        availableRefundAmount
      ) {
        validationErrors.amount = `Refund cannot exceed the available refundable amount of ${formatCurrency(
          availableRefundAmount,
          currency
        )}.`;
      }
    } else if (
      formData.refundType !== "full"
    ) {
      validationErrors.refundType =
        "Please select a valid refund type.";
    }

    if (
      !formData.reason
    ) {
      validationErrors.reason =
        "Please select a refund reason.";
    }

    if (
      formData.notes.length >
      MAX_NOTES_LENGTH
    ) {
      validationErrors.notes = `Notes cannot exceed ${MAX_NOTES_LENGTH} characters.`;
    }

    if (
      requireConfirmation &&
      !confirmed
    ) {
      validationErrors.confirmation =
        "Please confirm that you want to process this refund.";
    }

    setErrors(
      validationErrors
    );

    return (
      Object.keys(
        validationErrors
      ).length === 0
    );
  };

  /* Submit   */
  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      setSubmitError("");

      if (!validate()) {
        return;
      }

      const refundAmount =
        formData.refundType ===
        "full"
          ? availableRefundAmount
          : toNumber(
              formData.amount
            );

      const payload = {
        paymentId:
          getPaymentId(
            payment
          ),

        refundType:
          formData.refundType,

        amount:
          refundAmount,

        reason:
          formData.reason,

        notes:
          formData.notes.trim(),
      };

      try {
        await onSubmit?.(
          payload
        );
      } catch (submitException) {
        console.error(
          "Failed to process refund:",
          submitException
        );

        setSubmitError(
          submitException
            ?.response
            ?.data
            ?.message ||
            submitException?.message ||
            "Unable to process the refund. Please try again."
        );
      }
    };

  /* Cancel */
  const handleCancel =
    () => {
      if (onCancel) {
        onCancel();
        return;
      }

      const paymentId =
        getPaymentId(
          payment
        );

      if (paymentId) {
        navigate(
          `/billing/payments/${paymentId}`
        );
        return;
      }

      navigate(
        "/billing"
      );
    };

  /* Render */
  return (
    <form
      className="refund-form"
      onSubmit={
        handleSubmit
      }
      noValidate
    >
      {/* --------- */}
      {/*  Header   */}
      {/* --------- */}

      <div className="form-header">
        <div>

          <h2>Process Refund</h2>
          <p>
            Refund a completed payment
            and record the reason for the
            transaction.
          </p>

        </div>
      </div>

      {/* --------*/}
      {/*  Error  */}
      {/* --------*/}

      {(error ||
        submitError) && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError ||
            error}
        </div>
      )}

      {/* ----------------- */}
      {/*  Payment Summary  */}
      {/* ----------------- */}

      <section className="form-section">
        <div className="form-section-header">

          <h3>Payment Information</h3>
          <p>
            Review the payment before
            processing the refund.
          </p>
        </div>

        <div className="refund-payment-summary">
          <div className="summary-item">

            <span>Payment ID</span>
            <strong>
              {getPaymentId(
                payment
              ) || "—"}
            </strong>
        </div>

        <div className="summary-item">
            <span>Invoice</span>
            <strong>
              {getInvoiceNumber(
                payment
              )}
            </strong>
        </div>

        <div className="summary-item">

            <span>Patient</span>
            <strong>
                {getPatientName(
                    payment
                )}
            </strong>
        </div>

        <div className="summary-item">
            <span>Original Payment</span>
            <strong>
                {formatCurrency(
                    paymentAmount,
                    currency
                )}
            </strong>
        </div>

        <div className="summary-item">
            
            <span>Already Refunded</span>
            <strong>
                {formatCurrency(
                    refundedAmount,
                    currency
                )}
            </strong>

        </div>

        <div className="summary-item highlight">

            <span>Available to Refund</span>
            <strong>
                {formatCurrency(
                    availableRefundAmount,
                    currency
                )}
            </strong>
          </div>

        </div>

        {errors.payment && (
            <span className="field-error">
                {errors.payment}
            </span>
            )}
        </section>

        {/* -------------- */}
        {/* Refund Details   */}
        {/* ---------------- */}

        <section className="form-section">
            <div className="form-section-header">
                <h3>Refund Details</h3>

                <p>
                    Select whether you want to issue
                    a full or partial refund.
                </p>
            </div>

            {/* Refund Type */}
            <div className="refund-type-options">
                <label
                    className={`refund-type-option ${
                    formData.refundType ===
                        "full"
                        ? "selected"
                        : ""
                    }`}
                >
                    <input
                        type="radio"
                        name="refundType"
                        value="full"
                        checked={
                            formData.refundType ===
                            "full"
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading ||
                            availableRefundAmount <=
                            0
                        }
                    />

                    <div>
                        <strong>Full Refund</strong>
                        <span>
                            Refund the entire remaining
                            refundable amount.
                        </span>
                    </div>

                    <strong className="refund-option-amount">
                        {formatCurrency(
                            availableRefundAmount,
                            currency
                        )}
                    </strong>
                </label>

                <label
                    className={`refund-type-option ${
                    formData.refundType ===
                        "partial"
                        ? "selected"
                        : ""
                    }`}
                >
                <input
                    type="radio"
                    name="refundType"
                    value="partial"
                    checked={
                        formData.refundType ===
                        "partial"
                    }
                    onChange={
                        handleChange
                    }
                        disabled={
                        loading ||
                        availableRefundAmount <= 0
                    }
                    />

                <div>
            
                    <strong>Partial Refund</strong>
                    <span>
                        Enter a specific amount to
                        refund.
                    </span>
                </div>
            </label>
        </div>

        {/* Amount */}
        {formData.refundType === "partial" && (
            <div className="form-group">
                <label htmlFor="refundAmount">Refund Amount{" "}
                    <span className="required">*</span>
                </label>

                <div className="input-with-prefix">
                    <span>{currency}</span>

                    <input
                        id="refundAmount"
                        name="amount"
                        type="number"
                        min="0.01"
                        max={availableRefundAmount}
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        disabled={
                            loading ||
                            availableRefundAmount <= 0
                        }
                        className={
                            errors.amount
                                ? "input-error"
                                : ""
                        }
                    />
                </div>

                <div className="input-meta">
                    <span>
                        Maximum refundable:
                            {" "}
                            {formatCurrency(
                                availableRefundAmount,
                                currency
                            )}
                    </span>

                    <span>
                            Remaining after refund:
                            {" "}
                            {formatCurrency(
                            remainingAmount,
                            currency
                        )}
                    </span>
                </div>

                {errors.amount && (
                    <span className="field-error">
                        {
                            errors.amount
                        }
                    </span>
                )}
            </div>
        )}

        {/* Refund Reason */}

        <div className="form-group">
            <label htmlFor="refundReason">
                Refund Reason{" "}
                <span className="required">
                *
                </span>
            </label>

            <select
                id="refundReason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                disabled={loading}
                className={
                    errors.reason
                        ? "input-error"
                        : ""
                }
            >
                <option value="">Select a reason</option>

                {REFUND_REASONS.map(
                    (reason) => (
                <option
                    key={reason.value}
                    value={reason.value}
                >
                    {reason.label}
                </option>
                )
            )}
            </select>

            {errors.reason && (
                <span className="field-error">{errors.reason}</span>
            )}
        </div>

        {/* Notes */}
        <div className="form-group">
            <label htmlFor="refundNotes">Notes</label>

            <textarea
                id="refundNotes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                maxLength={MAX_NOTES_LENGTH}
                placeholder="Add any additional information about this refund..."
                disabled={loading}
                className={
                        errors.notes
                            ? "input-error"
                            : ""
                    }
            />

            <div className="input-meta">
                <span>Optional refund notes.</span>

                <span>
                    {
                        formData.notes
                        .length
                    }
                    /
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

    {/* Refund Confirmation */}
    <section className="form-section refund-confirmation">
        <div className="refund-confirmation-summary">
            <span>Refund amount</span>

            <strong>
                {formatCurrency(
                    selectedRefundAmount,
                    currency
                )}
            </strong>
        </div>

        {requireConfirmation && (
            <div className="form-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="confirmation"
                        checked={
                            confirmed
                        }
                        onChange={(event) => {
                            setConfirmed(
                                event.target
                                .checked
                            );

                            if (errors.confirmation) {
                                setErrors(
                                    (
                                        previous
                                    ) => {
                                        const next ={
                                            ...previous,
                                        };

                                            delete next.confirmation;

                                            return next;
                                        }
                                    );
                                }
                            }}
                            disabled={
                                loading
                            }
                    />

                        <span>
                            I confirm that I want to
                            process this refund for{" "}
                            <strong>
                                {formatCurrency(
                                    selectedRefundAmount,
                                    currency
                                )}
                            </strong>
                                .
                            </span>
                        </label>

                        {errors.confirmation && (
                        <span className="field-error">
                            {
                                errors.confirmation
                            }
                        </span>
                        )}
                    </div>
                )}
            </section>

      
            {/* Actions  */}
            <div className="form-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                        disabled={loading}
                >
                    {cancelLabel}
                </button>

                <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={
                        loading ||
                        availableRefundAmount <=
                        0
                    }
                >
                    {loading
                        ? "Processing..."
                        : submitLabel}
                </button>
            </div>
        </form>
    );
};

export default RefundForm;
