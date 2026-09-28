/* *************************************************** */
/* #src/features/billing/components/PaymentForm.jsx    */
/* *************************************************** */

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

/* Constants */
const DEFAULT_FORM = {
    invoiceId: "",
    amount: "",
    paymentMethod: "cash",
    paymentDate: "",
    referenceNumber: "",
    notes: "",
};

const PAYMENT_METHODS = [
    {
        value: "cash",
        label: "Cash",
    },
    {
        value: "card",
        label: "Credit / Debit Card",
    },
    {
        value: "bank_transfer",
        label: "Bank Transfer",
    },
    {
        value: "check",
        label: "Check",
    },
    {
        value: "insurance",
        label: "Insurance",
    },
    {
        value: "online",
        label: "Online Payment",
    },
    {
        value: "other",
        label: "Other",
    },
];

const MAX_REFERENCE_LENGTH = 100;
const MAX_NOTES_LENGTH = 1000;

/* Helpers */
const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getInvoiceId = (
    invoice
) => {
  return (
        invoice?.id ??
        invoice?.invoiceId
    );
};

const getInvoiceNumber = (
    invoice
) => {
    return (
        invoice?.invoiceNumber ??
        invoice?.invoiceNo ??
        invoice?.number ??
        (invoice?.id
            ? `INV-${invoice.id}`
            : "Invoice")
        );
};

const getPatientName = (
    invoice
) => {
    if (!invoice) {
        return "";
    }

    if (
        invoice.patientName
    ) {
        return invoice.patientName;
    }

    const patient =
        invoice.patient;

    if (!patient) {
        return "";
    }

    if (patient.name) {
        return patient.name;
    }

    return [
        patient.firstName,
        patient.lastName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();
    };

    const toNumber = (
        value,
        fallback = 0
    ) => {

        if (
            value === "" ||
            value === null ||
            value === undefined
        ) {
            return fallback;
        }

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
};

const getInvoiceTotal = (
    invoice
) => {
    return toNumber(
        invoice?.total ??
        invoice?.grandTotal ??
        invoice?.amount ??
        invoice?.totalAmount
    );
};

const getAmountPaid = (
    invoice
) => {
    return toNumber(
        invoice?.amountPaid ??
        invoice?.paidAmount ??
        invoice?.totalPaid
    );
};

const getBalanceDue = (
    invoice
) => {
    if (
        invoice?.balanceDue !==
        undefined &&
        invoice?.balanceDue !==
        null
    ) {
        return Math.max(
            0,
            toNumber(invoice.balanceDue)
        );
    }

    return Math.max(
        0,
        getInvoiceTotal(invoice) -
        getAmountPaid(invoice)
    );
};

const formatCurrency = (
    amount,
    currency = "USD"
) => {
    try {
        return new Intl.NumberFormat(
        undefined,
        {
            style: "currency",
            currency,
        }
        ).format(
        toNumber(amount)
        );
    } catch {
        return `${currency} ${toNumber(
        amount
        ).toFixed(2)}`;
    }
};

const mapPaymentToForm = (
    payment
) => {
    if (!payment) {
        return {
        ...DEFAULT_FORM,
        paymentDate: getToday(),
        };
    }

  return {
        invoiceId:
        payment.invoiceId ??
        payment.invoice?.id ??
        "",

        amount:
        payment.amount ??
        payment.paymentAmount ??
        "",

        paymentMethod:
        payment.paymentMethod ??
        payment.method ??
        "cash",

        paymentDate:
        payment.paymentDate ??
        payment.date ??
        payment.createdAt ??
        getToday(),

        referenceNumber:
        payment.referenceNumber ??
        payment.reference ??
        "",

        notes:
        payment.notes ??
        "",
    };
};

/* Component */

const PaymentForm = ({
    payment = null,
    invoices = [],
    selectedInvoice = null,
    onSubmit,
    onCancel,
    loading = false,
    mode = "create",
    currency = "USD",
}) => {
    const navigate = useNavigate();

    const isEditMode =
        mode === "edit" ||
        Boolean(payment);

    const [formData, setFormData] =
        useState(
        DEFAULT_FORM
        );

    const [errors, setErrors] =
        useState({});

    const [submitError, setSubmitError] =
        useState("");

    /* Initialize */


    useEffect(() => {
    const initialData = mapPaymentToForm(payment);

    if (
        !payment &&
        selectedInvoice
    ) {
        initialData.invoiceId = getInvoiceId(selectedInvoice);
    }

        setFormData(initialData);
        setErrors({});
        setSubmitError("");
    }, [
        payment,
        selectedInvoice,
]);

 /* Selected invoice */

const currentInvoice =
    useMemo(() => {
        if (selectedInvoice && String(getInvoiceId(selectedInvoice)) === String(formData.invoiceId)) {
            return selectedInvoice;
        }

        return invoices.find(
            (invoice) => String(getInvoiceId(invoice)) === String(formData.invoiceId)
        );
    }, [
        selectedInvoice,
        invoices,
        formData.invoiceId,
    ]);

const invoiceBalance =
    currentInvoice
        ? getBalanceDue(
            currentInvoice
            )
        : 0;

/* Input handler */
  
const handleChange = (
    event
) => {
    const {
        name,
        value,
    } = event.target;

    setFormData(
        (previous) => ({
            ...previous,
            [name]: value,
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
};

/* Invoice selection */
  
const handleInvoiceChange = (
    event
) => {
    const invoiceId =
        event.target.value;

    const invoice =
        invoices.find(
            (item) =>
            String(
                getInvoiceId(item)
            ) ===
            String(invoiceId)
        );

        setFormData(
        (previous) => ({
            ...previous,
            invoiceId,
            amount:
            invoice &&
            getBalanceDue(
                invoice
            ) > 0
                ? getBalanceDue(
                    invoice
                )
                : previous.amount,
        })
    );

    setErrors(
      (previous) => {
            const next = {
            ...previous,
            };

            delete next.invoiceId;
            delete next.amount;

            return next;
        }
    );
};

  /* Set full balance */

  const handlePayFullBalance =
    () => {
      if (!currentInvoice) {
        return;
      }

      setFormData(
        (previous) => ({
          ...previous,
          amount:
            invoiceBalance.toFixed(
              2
            ),
        })
      );

      if (errors.amount) {
        setErrors(
          (previous) => {
            const next = {
              ...previous,
            };

            delete next.amount;

            return next;
          }
        );
      }
    };

 
  /* Validation */

  const validate = () => {
    const validationErrors =
      {};

    if (
      !formData.invoiceId
    ) {
      validationErrors.invoiceId =
        "Please select an invoice.";
    }

    const amount =
      toNumber(
        formData.amount,
        NaN
      );

    if (
      Number.isNaN(amount)
    ) {
      validationErrors.amount =
        "Please enter a valid payment amount.";
    } else if (
      amount <= 0
    ) {
      validationErrors.amount =
        "Payment amount must be greater than zero.";
    } else if (
      currentInvoice &&
      !isEditMode &&
      amount >
        invoiceBalance
    ) {
      validationErrors.amount =
        `Payment cannot exceed the remaining balance of ${formatCurrency(
          invoiceBalance,
          currency
        )}.`;
    }

    if (
      !formData.paymentMethod
    ) {
      validationErrors.paymentMethod =
        "Please select a payment method.";
    }

    if (
      !formData.paymentDate
    ) {
      validationErrors.paymentDate =
        "Please select a payment date.";
    }

    if (
      formData.referenceNumber
        .length >
      MAX_REFERENCE_LENGTH
    ) {
      validationErrors.referenceNumber =
        `Reference number cannot exceed ${MAX_REFERENCE_LENGTH} characters.`;
    }

    if (
      formData.notes.length >
      MAX_NOTES_LENGTH
    ) {
      validationErrors.notes =
        `Notes cannot exceed ${MAX_NOTES_LENGTH} characters.`;
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

  /* Submit */


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = {
      invoiceId:
        formData.invoiceId,

      amount: toNumber(
        formData.amount
      ),

      paymentMethod:
        formData.paymentMethod,

      paymentDate:
        formData.paymentDate,

      referenceNumber:
        formData.referenceNumber.trim(),

      notes:
        formData.notes.trim(),
    };

    try {
      await onSubmit?.(
        payload
      );
    } catch (error) {
      console.error(
        "Failed to save payment:",
        error
      );

      setSubmitError(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Unable to save the payment. Please try again."
      );
    }
  };

  /* Cancel */
 
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate(
      "/billing/payments"
    );
  };

  
  /* Render */
 
  return (
    <form
      className="payment-form"
      onSubmit={
        handleSubmit
      }
      noValidate
    >
      {/* ------------------------------------------------- */}
      {/* Header                                             */}
      {/* ------------------------------------------------- */}

      <div className="form-header">
        <div>
          <h2>
            {isEditMode
              ? "Edit Payment"
              : "Record Payment"}
          </h2>

          <p>
            {isEditMode
              ? "Update the payment information below."
              : "Record a payment against an outstanding invoice."}
          </p>
        </div>
      </div>

      {/* -------------- */}
      {/* Submit Error   */}
      {/* -------------- */}

      {submitError && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* --------------------- */}
      {/* Invoice Information   */}
      {/* --------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Invoice
          </h3>

          <p>
            Select the invoice that this
            payment should be applied to.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="invoiceId">
            Invoice{" "}
            <span className="required">
              *
            </span>
          </label>

          <select
            id="invoiceId"
            name="invoiceId"
            value={
              formData.invoiceId
            }
            onChange={
              handleInvoiceChange
            }
            disabled={
              loading ||
              Boolean(
                selectedInvoice
              )
            }
            className={
              errors.invoiceId
                ? "input-error"
                : ""
            }
          >
            <option value="">
              Select invoice
            </option>

            {invoices.map(
              (invoice) => {
                const invoiceId =
                  getInvoiceId(
                    invoice
                  );

                const balance =
                  getBalanceDue(
                    invoice
                  );

                return (
                  <option
                    key={
                      invoiceId
                    }
                    value={
                      invoiceId
                    }
                  >
                    {getInvoiceNumber(
                      invoice
                    )}
                    {" — "}
                    {getPatientName(
                      invoice
                    ) ||
                      "Patient"}
                    {" — "}
                    Balance:{" "}
                    {formatCurrency(
                      balance,
                      invoice.currency ||
                        currency
                    )}
                  </option>
                );
              }
            )}
          </select>

          {errors.invoiceId && (
            <span className="field-error">
              {
                errors.invoiceId
              }
            </span>
          )}
        </div>

        {/* Invoice Summary */}

        {currentInvoice && (
          <div className="payment-invoice-summary">
            <div className="summary-card">
              <span className="summary-label">
                Invoice
              </span>

              <strong>
                {getInvoiceNumber(
                  currentInvoice
                )}
              </strong>
            </div>

            <div className="summary-card">
              <span className="summary-label">
                Patient
              </span>

              <strong>
                {getPatientName(
                  currentInvoice
                ) ||
                  "—"}
              </strong>
            </div>

            <div className="summary-card">
              <span className="summary-label">
                Invoice Total
              </span>

              <strong>
                {formatCurrency(
                  getInvoiceTotal(
                    currentInvoice
                  ),
                  currentInvoice.currency ||
                    currency
                )}
              </strong>
            </div>

            <div className="summary-card">
              <span className="summary-label">
                Amount Paid
              </span>

              <strong>
                {formatCurrency(
                  getAmountPaid(
                    currentInvoice
                  ),
                  currentInvoice.currency ||
                    currency
                )}
              </strong>
            </div>

            <div className="summary-card summary-card-highlight">
              <span className="summary-label">
                Balance Due
              </span>

              <strong>
                {formatCurrency(
                  invoiceBalance,
                  currentInvoice.currency ||
                    currency
                )}
              </strong>
            </div>
          </div>
        )}
      </section>

      {/* ---------------- */}
      {/* Payment Details  */}
      {/* ---------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Payment Details
          </h3>

          <p>
            Enter the amount and payment method
            used for this transaction.
          </p>
        </div>

        <div className="form-grid">
          {/* Amount */}

          <div className="form-group">
            <label htmlFor="amount">
              Payment Amount{" "}
              <span className="required">
                *
              </span>
            </label>

            <div className="input-with-prefix">
              <span className="input-prefix">
                $
              </span>

              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={
                  formData.amount
                }
                onChange={
                  handleChange
                }
                placeholder="0.00"
                disabled={loading}
                className={
                  errors.amount
                    ? "input-error"
                    : ""
                }
              />
            </div>

            {currentInvoice &&
              invoiceBalance >
                0 && (
                <button
                  type="button"
                  className="btn btn-link btn-sm"
                  onClick={
                    handlePayFullBalance
                  }
                  disabled={
                    loading
                  }
                >
                  Pay full balance (
                  {formatCurrency(
                    invoiceBalance,
                    currentInvoice.currency ||
                      currency
                  )}
                  )
                </button>
              )}

            {errors.amount && (
              <span className="field-error">
                {
                  errors.amount
                }
              </span>
            )}
          </div>

          {/* Payment Method */}

          <div className="form-group">
            <label htmlFor="paymentMethod">
              Payment Method{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={
                formData.paymentMethod
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className={
                errors.paymentMethod
                  ? "input-error"
                  : ""
              }
            >
              {PAYMENT_METHODS.map(
                (method) => (
                  <option
                    key={
                      method.value
                    }
                    value={
                      method.value
                    }
                  >
                    {
                      method.label
                    }
                  </option>
                )
              )}
            </select>

            {errors.paymentMethod && (
              <span className="field-error">
                {
                  errors.paymentMethod
                }
              </span>
            )}
          </div>

          {/* Payment Date */}

          <div className="form-group">
            <label htmlFor="paymentDate">
              Payment Date{" "}
              <span className="required">
                *
              </span>
            </label>

            <input
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={
                formData.paymentDate
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className={
                errors.paymentDate
                  ? "input-error"
                  : ""
              }
            />

            {errors.paymentDate && (
              <span className="field-error">
                {
                  errors.paymentDate
                }
              </span>
            )}
          </div>

          {/* Reference */}

          <div className="form-group">
            <label htmlFor="referenceNumber">
              Reference Number
            </label>

            <input
              id="referenceNumber"
              name="referenceNumber"
              type="text"
              value={
                formData.referenceNumber
              }
              onChange={
                handleChange
              }
              placeholder="Transaction, receipt, or reference number"
              maxLength={
                MAX_REFERENCE_LENGTH
              }
              disabled={loading}
              className={
                errors.referenceNumber
                  ? "input-error"
                  : ""
              }
            />

            <div className="input-meta">
              <span>
                Optional transaction
                reference.
              </span>

              <span>
                {
                  formData
                    .referenceNumber
                    .length
                }
                /
                {
                  MAX_REFERENCE_LENGTH
                }
              </span>
            </div>

            {errors.referenceNumber && (
              <span className="field-error">
                {
                  errors.referenceNumber
                }
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ------- */}
      {/* Notes   */}
      {/* ------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Additional Information
          </h3>

          <p>
            Add any notes or transaction details
            that should be retained with the payment.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            placeholder="Add payment notes..."
            maxLength={
              MAX_NOTES_LENGTH
            }
            disabled={loading}
            className={
              errors.notes
                ? "input-error"
                : ""
            }
          />

          <div className="input-meta">
            <span>
              Optional payment
              information.
            </span>

            <span>
              {
                formData.notes
                  .length
              }
              /
              {
                MAX_NOTES_LENGTH
              }
            </span>
          </div>

          {errors.notes && (
            <span className="field-error">
              {errors.notes}
            </span>
          )}
        </div>
      </section>

      {/* ----------------- */}
      {/* Payment Preview   */}
      {/* ----------------- */}

      {currentInvoice &&
        formData.amount && (
          <section className="form-section">
            <div className="payment-preview">
              <div>
                <span>
                  Payment
                </span>

                <strong>
                  {formatCurrency(
                    formData.amount,
                    currentInvoice.currency ||
                      currency
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Remaining After Payment
                </span>

                <strong>
                  {formatCurrency(
                    Math.max(
                      0,
                      invoiceBalance -
                        toNumber(
                          formData.amount
                        )
                    ),
                    currentInvoice.currency ||
                      currency
                  )}
                </strong>
              </div>
            </div>
          </section>
        )}

      {/* -------------- */}
      {/* Form Actions   */}
      {/* -------------- */}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={
            handleCancel
          }
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
              : "Recording..."
            : isEditMode
            ? "Update Payment"
            : "Record Payment"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
