/* ********************************************************** */
/* #src/features/laboratory/components/tests/LabTestTable.jsx */
/* ********************************************************** */

import { useMemo } from "react";

/* --------------------------------------------------------- */
/* Helpers                                                    */
/* --------------------------------------------------------- */

const normalizeText = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
};

const formatCurrency = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const getTestId = (test) => {
  return test?.id ?? test?.testId;
};

const getTestName = (test) => {
  const name = normalizeText(
    test?.name ?? test?.testName
  );

  if (name) {
    return name;
  }

  const id = getTestId(test);
  return id ? `Test #${id}` : "Unnamed Test";
};

const getTestCode = (test) => {
  return normalizeText(
    test?.code ??
      test?.testCode ??
      test?.labTestCode
  );
};

const getDescription = (test) => {
  return normalizeText(
    test?.description ??
      test?.shortDescription
  );
};

const getPrice = (test) => {
  const price =
    test?.price ??
    test?.cost ??
    test?.amount;

  if (
    price === undefined ||
    price === null ||
    price === ""
  ) {
    return null;
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return null;
  }

  return numericPrice;
};

const getTurnaroundTime = (test) => {
  return normalizeText(
    test?.turnaroundTime ??
      test?.turnaround_time ??
      test?.tat ??
      test?.processingTime
  );
};

const getSpecimenType = (test) => {
  return normalizeText(
    test?.specimenType ??
      test?.specimen_type ??
      test?.specimen
  );
};

const getCategory = (test) => {
  const category =
    test?.category?.name ??
    test?.categoryName ??
    test?.category;

  if (typeof category === "object" && category !== null) {
    return normalizeText(category.name ?? category.label ?? "");
  }

  return normalizeText(category);
};

const getPreparation = (test) => {
  return normalizeText(
    test?.preparation ??
      test?.patientPreparation ??
      test?.preparationInstructions
  );
};

const getReferenceRange = (test) => {
  return normalizeText(
    test?.referenceRange ??
      test?.reference_range
  );
};

const getStatus = (test) => {
  if (
    test?.isActive === false ||
    test?.active === false
  ) {
    return {
      label: "Inactive",
      className:
        "bg-gray-100 text-gray-700",
    };
  }

  const status = String(
    test?.status || "active"
  ).toLowerCase();

  switch (status) {
    case "inactive":
    case "disabled":
    case "archived":
    case "suspended":
      return {
        label: "Inactive",
        className:
          "bg-gray-100 text-gray-700",
      };

    case "pending":
      return {
        label: "Pending",
        className:
          "bg-yellow-100 text-yellow-700",
      };

    case "active":
    default:
      return {
        label: "Active",
        className:
          "bg-green-100 text-green-700",
      };
  }
};

/* --------------------------------------------------------- */
/* Component                                                   */
/* --------------------------------------------------------- */

const LabTest = ({
  test = null,

  /* Selection */

  selected = false,
  selectable = false,
  onSelect,

  /* Actions */

  onEdit,
  onDelete,
  onView,

  /* State */

  loading = false,
  disabled = false,

  /* Display */

  compact = false,
  showDescription = true,
  showPrice = true,
  showStatus = true,
  showCategory = true,
  showSpecimen = true,
  showTurnaround = true,
  showPreparation = false,
  showReferenceRange = false,

  className = "",
}) => {
  const testName = getTestName(test);
  const testCode = getTestCode(test);
  const description = getDescription(test);
  const price = getPrice(test);
  const turnaroundTime =
    getTurnaroundTime(test);
  const specimenType =
    getSpecimenType(test);
  const category = getCategory(test);
  const preparation = getPreparation(test);
  const referenceRange =
    getReferenceRange(test);

  const status = useMemo(
    () => getStatus(test),
    [test]
  );

  const isDisabled =
    disabled || loading;

  /* ------------------------------------------------------- */
  /* Selection handler                                       */
  /* ------------------------------------------------------- */

  const handleSelect = () => {
    if (
      isDisabled ||
      !selectable ||
      !test
    ) {
      return;
    }

    onSelect?.(test);
  };

  /* ------------------------------------------------------- */
  /* Render                                                   */
  /* ------------------------------------------------------- */

  if (!test) {
    return (
      <div
        className={`rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 ${className}`}
      >
        Laboratory test information is unavailable.
      </div>
    );
  }

  /* ------------------------------------------------------- */
  /* Compact view                                             */
  /* ------------------------------------------------------- */

  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 rounded-lg border ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white"
        } p-3 transition ${className}`}
      >
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={handleSelect}
            disabled={isDisabled}
            aria-label={`Select ${testName}`}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {testName}
            </h3>

            {testCode && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {testCode}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-1 truncate text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>

        {showPrice && price !== null && (
          <span className="whitespace-nowrap text-sm font-semibold text-gray-900">
            ${price}
          </span>
        )}

        {onView && (
          <button
            type="button"
            onClick={() => onView(test)}
            disabled={isDisabled}
            className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            View
          </button>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------- */
  /* Full view                                                */
  /* ------------------------------------------------------- */

  return (
    <article
      className={`overflow-hidden rounded-xl border ${
        selected
          ? "border-blue-500 ring-1 ring-blue-500"
          : "border-gray-200"
      } bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      {/* ------------------------------------------------- */}
      {/* Header                                             */}
      {/* ------------------------------------------------- */}

      <div
        className={`flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-start sm:justify-between ${
          selected
            ? "bg-blue-50/50"
            : ""
        }`}
      >
        <div className="flex min-w-0 items-start gap-3">
          {selectable && (
            <div className="pt-1">
              <input
                type="checkbox"
                checked={selected}
                onChange={handleSelect}
                disabled={isDisabled}
                aria-label={`Select ${testName}`}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {testName}
              </h3>

              {testCode && (
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  {testCode}
                </span>
              )}

              {showStatus && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              )}
            </div>

            {showCategory &&
              category && (
                <p className="mt-1 text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {category}
                  </span>
                </p>
              )}
          </div>
        </div>

        {showPrice &&
          price !== null && (
            <div className="shrink-0">
              <div className="text-right">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Price
                </span>

                <div className="text-xl font-bold text-gray-900">
                  ${price}
                </div>
              </div>
            </div>
          )}
      </div>

      {/* ------------------------------------------------- */}
      {/* Description                                        */}
      {/* ------------------------------------------------- */}

      {showDescription &&
        description && (
          <div className="border-b border-gray-100 px-5 py-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-800">
              Description
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              {description}
            </p>
          </div>
        )}

      {/* ------------------------------------------------- */}
      {/* Test Information                                  */}
      {/* ------------------------------------------------- */}

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {showSpecimen &&
          specimenType && (
            <InfoItem
              label="Specimen"
              value={specimenType}
            />
          )}

        {showTurnaround &&
          turnaroundTime && (
            <InfoItem
              label="Turnaround Time"
              value={turnaroundTime}
            />
          )}

        {showReferenceRange &&
          referenceRange && (
            <InfoItem
              label="Reference Range"
              value={referenceRange}
            />
          )}
      </div>

      {/* ------------------------------------------------- */}
      {/* Preparation                                       */}
      {/* ------------------------------------------------- */}

      {showPreparation &&
        preparation && (
          <div className="mx-5 mb-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h4 className="text-sm font-semibold text-blue-900">
              Patient Preparation
            </h4>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              {preparation}
            </p>
          </div>
        )}

      {/* ------------------------------------------------- */}
      {/* Actions                                           */}
      {/* ------------------------------------------------- */}

      {(onView ||
        onEdit ||
        onDelete) && (
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3">
          {onView && (
            <button
              type="button"
              onClick={() =>
                onView(test)
              }
              disabled={isDisabled}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              View
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              onClick={() =>
                onEdit(test)
              }
              disabled={isDisabled}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() =>
                onDelete(test)
              }
              disabled={isDisabled}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
};

/* --------------------------------------------------------- */
/* Information Item                                           */
/* --------------------------------------------------------- */

const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </dt>

      <dd className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </dd>
    </div>
  );
};

export default LabTest;
