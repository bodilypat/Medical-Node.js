/* ********************************************************* */
/* #src/features/billing/components/BillingItemTable.jsx          */
/* ********************************************************* */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


/* Constants */

const DEFAULT_PAGE_SIZE = 10;

const BILLING_STATUSES = {
    draft: {
        label: "Draft",
        className: "status-draft",
    },
    pending: {
        label: "Pending",
        className: "status-pending",
    },
    unpaid: {
        label: "Unpaid",
        className: "status-unpaid",
    },
    partially_paid: {
        label: "Partially Paid",
        className: "status-partially-paid",
    },
    paid: {
        label: "Paid",
        className: "status-paid",
    },
    overdue: {
        label: "Overdue",
        className: "status-overdue",
    },
    cancelled: {
        label: "Cancelled",
        className: "status-cancelled",
    },
    refunded: {
        label: "Refunded",
        className: "status-refunded",
    },
    partially_refunded: {
        label: "Partially Refunded",
        className: "status-partially-refunded",
    },
};

/* Helpers */

const getBillingId = (billing) =>
    billing?.id ??
    billing?.billingId ??
    billing?.invoiceId;

const getInvoiceNumber = (billing) =>
    billing?.invoiceNumber ??
    billing?.invoiceNo ??
    billing?.number ??
    billing?.referenceNumber ??
    `#${getBillingId(billing) ?? "—"}`;

const getPatientName = (billing) => {
    if (billing?.patientName) {
        return billing.patientName;
    }

    if (billing?.patient?.name) {
        return billing.patient.name;
    }

const name = [
    billing?.patient?.firstName,
    billing?.patient?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
        name ||
        (billing?.patientId
            ? `Patient #${billing.patientId}`
            : "—")
    );
};

const getDoctorName = (billing) => {
    if (billing?.doctorName) {
        return billing.doctorName;
    }

    if (billing?.doctor?.name) {
        return billing.doctor.name;
    }

    const name = [
        billing?.doctor?.firstName,
        billing?.doctor?.lastName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    return (
        name ||
        (billing?.doctorId
        ? `Doctor #${billing.doctorId}`
        : "—")
    );
};

const getStatus = (billing) => {
    const status = String(
        billing?.status ??
        billing?.billingStatus ??
        billing?.paymentStatus ??
        "draft"
    ).toLowerCase();

    return (
        BILLING_STATUSES[status] || {
        label: billing?.status || "Unknown",
        className: "status-default",
        }
    );
};

const getAmount = (billing) => {
    const value =
        billing?.total ??
        billing?.grandTotal ??
        billing?.amount ??
        billing?.totalAmount ??
        0;

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;
};

const getCurrency = (billing) =>
    billing?.currency ?? "USD";

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
        ).format(Number(amount) || 0);
        } catch {
            return `${currency} ${(
            Number(amount) || 0
            ).toFixed(2)}`;
        }
};

const formatDate = (value) => {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat(
        undefined,
        {
        year: "numeric",
        month: "short",
        day: "numeric",
        }
    ).format(date);
};

const getDateValue = (billing) =>
    billing?.billingDate ??
    billing?.invoiceDate ??
    billing?.createdAt;

const getDueDate = (billing) =>
    billing?.dueDate ??
    billing?.paymentDueDate;

const isOverdue = (billing) => {
    const status = String(
        billing?.status ??
        billing?.billingStatus ??
        billing?.paymentStatus ??
        ""
    ).toLowerCase();

    if (
        [
        "paid",
        "cancelled",
        "refunded",
        ].includes(status)
    ) {
        return false;
    }

    const dueDate = getDueDate(
        billing
    );

    if (!dueDate) {
        return false;
    }

    const date = new Date(dueDate);

    if (Number.isNaN(date.getTime())) {
        return false;
    }

    return (
        date.getTime() <
        new Date().setHours(
            0,
            0,
            0,
            0
        )
    );
};

/* Component  */

const BillingTable = ({
    billings = [],
    loading = false,
    selectedIds = [],
    onSelectionChange,
    onView,
    onEdit,
    onDelete,
    onPayment,
    onRefund,
    onRowClick,
    emptyMessage = "No billing records found.",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    total = null,
    totalPages = null,
    onPageChange,
    onPageSizeChange,
    showPagination = true,
    showSelection = true,
    showActions = true,
    showDoctor = true,
}) => {
    const navigate = useNavigate();

    const [
        internalSelectedIds,
        setInternalSelectedIds,
    ] = useState([]);

    const [
        sortConfig,
        setSortConfig,
    ] = useState({
        key: "date",
        direction: "desc",
    });

    const normalizeSelectionId = (value) =>
        value === null || value === undefined
            ? ""
            : String(value);

    const isSameSelectionId = (left, right) =>
        normalizeSelectionId(left) === normalizeSelectionId(right);

  /* Selection */

  const isControlledSelection =
    selectedIds !== undefined &&
    Array.isArray(selectedIds);

  const activeSelectedIds =
    isControlledSelection
      ? selectedIds
      : internalSelectedIds;

  const updateSelection = (
    nextSelection
  ) => {
    if (onSelectionChange) {
      onSelectionChange(
        nextSelection
      );
      return;
    }

    setInternalSelectedIds(
      nextSelection
    );
  };

  const isSelected = (billing) => {
    const id = getBillingId(
      billing
    );

    return activeSelectedIds.some(
      (selectedId) =>
        isSameSelectionId(
          selectedId,
          id
        )
    );
  };

  const handleSelectRow = (
    billing
  ) => {
    const id = getBillingId(
      billing
    );

    if (!id) {
      return;
    }

    const nextSelection =
      isSelected(billing)
        ? activeSelectedIds.filter(
            (selectedId) =>
              !isSameSelectionId(
                selectedId,
                id
              )
          )
        : [
            ...activeSelectedIds,
            id,
          ];

    updateSelection(
      nextSelection
    );
  };

  
  /* Sorting */
  
  const handleSort = (key) => {
    setSortConfig(
      (previous) => ({
        key,
        direction:
          previous.key === key &&
          previous.direction === "asc"
            ? "desc"
            : "asc",
      })
    );
  };

  const sortedBillings =
    useMemo(() => {
      const items = [
        ...billings,
      ];

      items.sort(
        (a, b) => {
          const {
            key,
            direction,
          } = sortConfig;

          let aValue;
          let bValue;

          switch (key) {
            case "invoice":
              aValue =
                getInvoiceNumber(a);
              bValue =
                getInvoiceNumber(b);
              break;

            case "patient":
              aValue =
                getPatientName(a);
              bValue =
                getPatientName(b);
              break;

            case "doctor":
              aValue =
                getDoctorName(a);
              bValue =
                getDoctorName(b);
              break;

            case "amount":
              aValue =
                getAmount(a);
              bValue =
                getAmount(b);
              break;

            case "status":
              aValue =
                getStatus(a).label;
              bValue =
                getStatus(b).label;
              break;

            case "dueDate":
              aValue = getDueDate(a)
                ? new Date(
                    getDueDate(a)
                  ).getTime()
                : 0;

              bValue = getDueDate(b)
                ? new Date(
                    getDueDate(b)
                  ).getTime()
                : 0;
              break;

            case "date":
            default:
              aValue =
                getDateValue(a)
                  ? new Date(
                      getDateValue(a)
                    ).getTime()
                  : 0;

              bValue =
                getDateValue(b)
                  ? new Date(
                      getDateValue(b)
                    ).getTime()
                  : 0;
              break;
          }

          if (
            typeof aValue ===
              "number" &&
            typeof bValue ===
              "number"
          ) {
            return direction ===
              "asc"
              ? aValue - bValue
              : bValue - aValue;
          }

          return direction === "asc"
            ? String(
                aValue
              ).localeCompare(
                String(bValue)
              )
            : String(
                bValue
              ).localeCompare(
                String(aValue)
              );
        }
      );

      return items;
    }, [billings, sortConfig]);

    /* Select all */
 
  const allVisibleSelected =
    sortedBillings.length > 0 &&
    sortedBillings.every(
      (billing) =>
        isSelected(billing)
    );

  const handleSelectAll = () => {
    if (allVisibleSelected) {
      const visibleIds =
        sortedBillings.map(
          getBillingId
        );

      updateSelection(
        activeSelectedIds.filter(
          (selectedId) =>
            !visibleIds.some(
              (id) =>
                String(id) ===
                String(selectedId)
            )
        )
      );

      return;
    }

    const newIds =
      sortedBillings
        .map(getBillingId)
        .filter(Boolean);

    const mergedIds = [
      ...activeSelectedIds,
    ];

    newIds.forEach((id) => {
      if (
        !mergedIds.some(
          (existingId) =>
            String(existingId) ===
            String(id)
        )
      ) {
        mergedIds.push(id);
      }
    });

    updateSelection(
      mergedIds
    );
  };

    /* Actions */
 
const handleView = (
    billing
) => {
    if (onView) {
        onView(billing);
        return;
    }

    const id = getBillingId(
        billing
    );

    if (id) {
        navigate(
            `/billing/${id}`
        );
    }
  };

const handleEdit = (
        billing
) => {
    if (onEdit) {
        onEdit(billing);
        return;
    }

    const id = getBillingId(
        billing
    );

    if (id) {
        navigate(
            `/billing/${id}/edit`
        );
    }
};

const handlePayment = (
    billing
  ) => {
    if (onPayment) {
        onPayment(billing);
        return;
    }

    const id = getBillingId(
        billing
    );

    if (id) {
        navigate(
            `/billing/${id}/payment`
        );
    }
};

const handleRowClick = (
    event,
    billing
  ) => {
    if (
        event.target.closest(
            "button"
        ) ||
        event.target.closest(
            "input"
        ) ||
        event.target.closest(
            "a"
        )
    ) {
        return;
    }

    if (onRowClick) {
        onRowClick(billing);
        return;
    }

    handleView(billing);
};

    /* Pagination */

const calculatedTotal =
    total !== null
        ? total
        : billings.length;

const calculatedTotalPages =
    totalPages !== null
        ? totalPages
        : Math.max(
              1,
            Math.ceil(
            calculatedTotal /
                pageSize
            )
        );

    const firstItem =
        calculatedTotal === 0
        ? 0
        : (page - 1) * pageSize + 1;

    const lastItem =
        Math.min(
            page * pageSize,
            calculatedTotal
        );

    const canPrevious =
        page > 1;

    const canNext =
        page < calculatedTotalPages;

    /* Sort indicator */


const SortIndicator = ({
    column,
}) => {
    if (
        sortConfig.key !== column
    ) {
      return (
        <span
            className="sort-indicator"
            aria-hidden="true"
        >
          ↕
        </span>
    );
}

    return (
        <span
            className="sort-indicator active"
            aria-hidden="true"
        >
            {sortConfig.direction ===
                "asc"
                ? "↑"
                : "↓"}
      </span>
    );
};

  /* Loading */

  if (loading) {
    return (
        <div
            className="billing-table-container"
            aria-busy="true"
        >
            <div className="table-loading">
                <div className="loading-spinner" />

                    <span>
                        Loading billing records...
                    </span>
                </div>
            </div>
        );
    }

  /* Empty state */
  
    if (!sortedBillings.length) {
        return (
            <div className="billing-table-container">
                <div className="empty-state">
                    <div
                        className="empty-state-icon"
                        aria-hidden="true"
                    >
                        $
                    </div>

                    <h3>No Billing Records</h3>

                    <p>{emptyMessage}</p>
                </div>
            </div>
        );
    }

  /* Render */
    return (
        <div className="billing-table-container">
            {/* Desktop Table */}

            <div className="table-responsive">
                <table className="billing-table">
                    <thead>
                        <tr>
                            {showSelection && (
                            <th className="selection-column">
                                <input
                                    type="checkbox"
                                    checked={
                                    allVisibleSelected
                                    }
                                    onChange={
                                    handleSelectAll
                                    }
                                    aria-label="Select all billing records"
                                />
                            </th>
                        )}

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "invoice"
                                        )
                                    }
                                >
                                    Invoice
                                    <SortIndicator column="invoice" />
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "patient"
                                        )
                                    }
                                >
                                    Patient
                                    <SortIndicator column="patient" />
                                </button>
                            </th>

                        {showDoctor && (
                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                    handleSort(
                                        "doctor"
                                    )
                                    }
                                >
                                    Doctor
                                    <SortIndicator column="doctor" />
                                </button>
                            </th>
                        )}

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "date"
                                        )
                                    }
                                >
                                    Billing Date
                                    <SortIndicator column="date" />
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "dueDate"
                                        )
                                    }
                                >
                                    Due Date
                                    <SortIndicator column="dueDate" />
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "amount"
                                        )
                                    }
                                >
                                    Amount
                                    <SortIndicator column="amount" />
                                </button>
                            </th>

                            <th>
                                <button
                                    type="button"
                                    className="table-sort-button"
                                    onClick={() =>
                                        handleSort(
                                        "status"
                                        )
                                    }
                                >
                                    Status
                                    <SortIndicator column="status" />
                                </button>
                            </th>

                            {showActions && (
                            <th className="actions-column">
                                Actions
                            </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedBillings.map(
                        (billing) => {
                            const id =
                            getBillingId(
                                billing
                            );

                            const status =
                            getStatus(
                                billing
                            );

                            const overdue =
                            isOverdue(
                                billing
                            );

                        return (
                        <tr
                            key={id}
                            className={
                            isSelected(
                                billing
                            )
                                ? "selected"
                                : ""
                            }
                            onClick={(event) =>
                            handleRowClick(
                                event,
                                billing
                            )
                            }
                        >
                        {showSelection && (
                            <td className="selection-column">
                                <input
                                    type="checkbox"
                                    checked={isSelected(
                                        billing
                                    )}
                                    onChange={() =>
                                        handleSelectRow(
                                        billing
                                        )
                                    }
                                    aria-label={`Select invoice ${getInvoiceNumber(
                                        billing
                                    )}`}
                                />
                            </td>
                        )}

                            <td>
                                <button
                                    type="button"
                                    className="invoice-number-link"
                                    onClick={() =>
                                    handleView(
                                        billing
                                    )
                                    }
                                >
                                    {getInvoiceNumber(
                                    billing
                                    )}
                                </button>
                            </td>

                            <td>
                                <div className="patient-cell">
                                    <strong>
                                        {getPatientName(
                                            billing
                                        )}
                                    </strong>

                                    {billing.patientNumber && (
                                        <small>
                                            {
                                            billing.patientNumber
                                            }
                                        </small>
                                    )}

                                    {!billing.patientNumber &&
                                        billing
                                        .patient
                                        ?.patientNumber && (
                                        <small>
                                            {
                                                billing
                                                .patient
                                                .patientNumber
                                            }
                                        </small>
                                    )}
                                </div>
                            </td>

                            {showDoctor && (
                            <td>
                                {getDoctorName(
                                    billing
                                )}
                            </td>
                            )}

                            <td>
                                {formatDate(
                                    getDateValue(
                                    billing
                                    )
                                )}
                            </td>

                            <td>
                                <span
                                    className={
                                    overdue
                                        ? "overdue-date"
                                        : ""
                                    }
                                >
                                    {formatDate(
                                    getDueDate(
                                        billing
                                    )
                                    )}
                                </span>

                                {overdue && (
                                    <small className="overdue-label">
                                    Overdue
                                    </small>
                                )}
                            </td>

                            <td className="amount-cell">
                                <strong>
                                    {formatCurrency(
                                    getAmount(
                                        billing
                                    ),
                                    getCurrency(
                                        billing
                                    )
                                    )}
                                </strong>
                            </td>

                            <td>
                                <span
                                    className={`status-badge ${status.className}`}
                                >
                                    {status.label}
                                </span>
                            </td>

                        {showActions && (
                        <td className="actions-column">
                            <div className="table-actions">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={() =>
                                    handleView(
                                        billing
                                    )
                                    }
                                    title="View billing"
                                >
                                    View
                                </button>

                            {onEdit && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={() =>
                                        handleEdit(
                                        billing
                                        )
                                    }
                                >
                                    Edit
                                </button>
                            )}

                            {onPayment && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        handlePayment(
                                        billing
                                        )
                                    }
                                >
                                    Payment
                                </button>
                            )}

                            {onRefund && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-warning"
                                    onClick={() =>
                                        onRefund(
                                        billing
                                        )
                                    }
                                >
                                    Refund
                                </button>
                            )}

                            {onDelete && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        onDelete(
                                        billing
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              }
            )}
            </tbody>
        </table>
    </div>

      {/* Mobile Cards */}

      <div className="billing-mobile-list">
        {sortedBillings.map(
          (billing) => {
            const id =
              getBillingId(
                billing
              );

            const status =
              getStatus(
                billing
              );

            const overdue =
              isOverdue(
                billing
              );

            return (
              <article
                key={id}
                className={`billing-mobile-card ${
                  isSelected(
                    billing
                  )
                    ? "selected"
                    : ""
                }`}
              >
                <div className="billing-mobile-card-header">
                  {showSelection && (
                    <input
                      type="checkbox"
                      checked={isSelected(
                        billing
                      )}
                      onChange={() =>
                        handleSelectRow(
                          billing
                        )
                      }
                      aria-label={`Select invoice ${getInvoiceNumber(
                        billing
                      )}`}
                    />
                  )}

                  <button
                    type="button"
                    className="invoice-number-link"
                    onClick={() =>
                      handleView(
                        billing
                      )
                    }
                  >
                    {getInvoiceNumber(
                      billing
                    )}
                  </button>

                  <span
                    className={`status-badge ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="billing-mobile-card-body">
                  <div className="billing-mobile-field">
                    <span>
                      Patient
                    </span>

                    <strong>
                      {getPatientName(
                        billing
                      )}
                    </strong>
                  </div>

                  {showDoctor && (
                    <div className="billing-mobile-field">
                      <span>
                        Doctor
                      </span>

                      <strong>
                        {getDoctorName(
                          billing
                        )}
                      </strong>
                    </div>
                  )}

                  <div className="billing-mobile-field">
                    <span>
                      Billing Date
                    </span>

                    <strong>
                      {formatDate(
                        getDateValue(
                          billing
                        )
                      )}
                    </strong>
                  </div>

                  <div className="billing-mobile-field">
                    <span>
                      Due Date
                    </span>

                    <strong
                      className={
                        overdue
                          ? "overdue-date"
                          : ""
                      }
                    >
                      {formatDate(
                        getDueDate(
                          billing
                        )
                      )}
                    </strong>
                  </div>

                  <div className="billing-mobile-field billing-mobile-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      {formatCurrency(
                        getAmount(
                          billing
                        ),
                        getCurrency(
                          billing
                        )
                      )}
                    </strong>
                  </div>
                </div>

                {showActions && (
                  <div className="billing-mobile-card-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() =>
                        handleView(
                          billing
                        )
                      }
                    >
                      View
                    </button>

                    {onEdit && (
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          handleEdit(
                            billing
                          )
                        }
                      >
                        Edit
                      </button>
                    )}

                    {onPayment && (
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          handlePayment(
                            billing
                          )
                        }
                      >
                        Payment
                      </button>
                    )}

                    {onRefund && (
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          onRefund(
                            billing
                          )
                        }
                      >
                        Refund
                      </button>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          onDelete(
                            billing
                          )
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>

      {/* Pagination */}

      {showPagination &&
        calculatedTotal > 0 && (
            <div className="table-pagination">
                <div className="pagination-info">
                    Showing{" "}
                    <strong>
                        {firstItem}
                    </strong>{" "}
                    to{" "}
                    <strong>
                        {lastItem}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {calculatedTotal}
                    </strong>{" "}
                    records
                </div>

            <div className="pagination-controls">
              {onPageSizeChange && (
                <label className="page-size-control">
                    <span>
                        Per page
                    </span>

                    <select
                        value={
                        pageSize
                        }
                        onChange={(
                        event
                        ) =>
                        onPageSizeChange(
                            Number(
                            event
                                .target
                                .value
                            )
                        )
                        }
                    >
                        <option value="5">
                        5
                        </option>

                        <option value="10">
                        10
                        </option>

                        <option value="20">
                        20
                        </option>

                        <option value="50">
                        50
                        </option>

                        <option value="100">
                        100
                        </option>
                    </select>
                </label>
            )}

                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    disabled={
                        !canPrevious ||
                        !onPageChange
                    }
                    onClick={() =>
                        onPageChange?.(
                            page - 1
                        )
                    }
                    aria-label="Previous page"
                >
                    Previous
                </button>

                <span className="pagination-current">
                    Page{" "}
                    <strong>
                        {page}
                    </strong>{" "}
                        of{" "}
                    <strong>
                        {calculatedTotalPages}
                    </strong>
                </span>

                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    disabled={
                    !canNext ||
                    !onPageChange
                    }
                    onClick={() =>
                    onPageChange?.(
                        page + 1
                    )
                    }
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default BillingTable;
