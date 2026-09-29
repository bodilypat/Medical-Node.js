/* ********************************************************* */
/* #src/features/laboratory/components/reports/LabReport.jsx          */
/* ********************************************************* */

import { useMemo } from "react";

/* --------------------------------------------------------- */
/* Constants                                                  */
/* --------------------------------------------------------- */

const STATUS_LABELS = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  verified: "Verified",
  cancelled: "Cancelled",
};

const ABNORMALITY_LABELS = {
  normal: "Normal",
  low: "Low",
  high: "High",
  critical_low: "Critical Low",
  critical_high: "Critical High",
  abnormal: "Abnormal",
};

const PRIORITY_LABELS = {
  routine: "Routine",
  urgent: "Urgent",
  stat: "STAT",
};

/* --------------------------------------------------------- */
/* Helpers                                                    */
/* --------------------------------------------------------- */

const getPatientName = (patient) => {
  if (!patient) {
    return "—";
  }

  if (patient.name) {
    return patient.name;
  }

  const name = [
    patient.firstName,
    patient.middleName,
    patient.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || `Patient #${patient.id ?? "—"}`;
};

const getDoctorName = (doctor) => {
  if (!doctor) {
    return "—";
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
    return `Doctor #${doctor.id ?? "—"}`;
  }

  return name.startsWith("Dr.")
    ? name
    : `Dr. ${name}`;
};

const getTestId = (test) => {
  if (!test) {
    return null;
  }

  return (
    test.id ??
    test.testId ??
    test.labTestId ??
    test.test?.id
  );
};

const getTestName = (test) => {
  if (!test) {
    return "Laboratory Test";
  }

  return (
    test.testName ||
    test.name ||
    test.test?.name ||
    `Test #${getTestId(test) ?? "—"}`
  );
};

const getTestCode = (test) => {
  if (!test) {
    return "";
  }

  return (
    test.testCode ||
    test.code ||
    test.test?.code ||
    ""
  );
};

const getResultValue = (result) => {
  if (!result) {
    return "—";
  }

  const value =
    result.value ??
    result.resultValue ??
    result.result;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return String(value);
};

const getUnit = (result, test) => {
  return (
    result?.unit ||
    result?.units ||
    result?.resultUnit ||
    test?.unit ||
    test?.units ||
    test?.test?.unit ||
    ""
  );
};

const getReferenceRange = (
  result,
  test
) => {
  if (result?.referenceRange) {
    return result.referenceRange;
  }

  if (result?.reference_range) {
    return result.reference_range;
  }

  if (test?.referenceRange) {
    return test.referenceRange;
  }

  if (test?.reference_range) {
    return test.reference_range;
  }

  const minimum =
    result?.referenceMin ??
    test?.referenceMin ??
    test?.normalMin;

  const maximum =
    result?.referenceMax ??
    test?.referenceMax ??
    test?.normalMax;

  if (
    minimum !== undefined &&
    minimum !== null &&
    maximum !== undefined &&
    maximum !== null
  ) {
    return `${minimum} - ${maximum}`;
  }

  return "—";
};

const getStatus = (result) => {
  return (
    result?.status ||
    "pending"
  );
};

const getAbnormality = (result) => {
  return (
    result?.abnormality ||
    result?.flag ||
    "normal"
  );
};

const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
};

const formatDateTime = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

const getStatusLabel = (status) => {
  return (
    STATUS_LABELS[status] ||
    status ||
    "Pending"
  );
};

const getAbnormalityLabel = (
  abnormality
) => {
  return (
    ABNORMALITY_LABELS[abnormality] ||
    abnormality ||
    "Normal"
  );
};

const getPriorityLabel = (
  priority
) => {
  return (
    PRIORITY_LABELS[priority] ||
    priority ||
    "Routine"
  );
};

const isCritical = (abnormality) => {
  return [
    "critical_low",
    "critical_high",
  ].includes(abnormality);
};

const isAbnormal = (abnormality) => {
  return abnormality !== "normal";
};

/* --------------------------------------------------------- */
/* Normalize report data                                      */
/* --------------------------------------------------------- */

const normalizeResults = (
  results = [],
  tests = []
) => {
  const sourceResults =
    Array.isArray(results)
      ? results
      : [];

  const sourceTests =
    Array.isArray(tests)
      ? tests
      : [];

  if (sourceResults.length > 0) {
    return sourceResults.map(
      (result, index) => {
        const resultTestId =
          result?.testId ??
          result?.labTestId ??
          result?.test?.id;

        const test =
          resultTestId == null
            ? null
            : sourceTests.find(
                (item) =>
                  getTestId(item) != null &&
                  String(getTestId(item)) ===
                    String(resultTestId)
              ) || null;

        return {
          ...result,
          testId: resultTestId ?? result?.testId,
          testName:
            result?.testName ||
            result?.name ||
            result?.test?.name,
          testCode:
            result?.testCode ||
            result?.test?.code,
          _test: test,
          _index: index,
        };
      }
    );
  }

  return sourceTests.map(
    (test, index) => ({
      _test: test,
      _index: index,
      testId: getTestId(test),
      testName: getTestName(test),
      value: "",
      unit: getUnit({}, test),
      referenceRange:
        getReferenceRange({}, test),
      status: "pending",
      abnormality: "normal",
      comments: "",
      verified: false,
    })
  );
};

/* --------------------------------------------------------- */
/* Component                                                   */
/* --------------------------------------------------------- */

const LabReport = ({
  order = null,
  patient = null,
  doctor = null,
  results = [],
  tests = [],
  laboratory = null,
  report = null,
  loading = false,
  onPrint,
  onClose,
  showActions = true,
}) => {
  /* ------------------------------------------------------- */
  /* Resolve data                                             */
  /* ------------------------------------------------------- */

  const reportData = report || {};

  const resolvedOrder =
    order ||
    reportData.order ||
    null;

  const resolvedPatient =
    patient ||
    reportData.patient ||
    resolvedOrder?.patient ||
    null;

  const resolvedDoctor =
    doctor ||
    reportData.doctor ||
    resolvedOrder?.doctor ||
    null;

  const resolvedResults =
    reportData.results ||
    results ||
    [];

  const resolvedTests =
    reportData.tests ||
    tests ||
    [];

  const resolvedLaboratory =
    laboratory ||
    reportData.laboratory ||
    reportData.lab ||
    null;

  /* ------------------------------------------------------- */
  /* Results                                                  */
  /* ------------------------------------------------------- */

  const normalizedResults = useMemo(
    () =>
      normalizeResults(
        resolvedResults,
        resolvedTests
      ),
    [resolvedResults, resolvedTests]
  );

  const summary = useMemo(() => {
    const total =
      normalizedResults.length;

    const completed =
      normalizedResults.filter(
        (result) =>
          result.status ===
            "completed" ||
          result.status === "verified"
      ).length;

    const verified =
      normalizedResults.filter(
        (result) =>
          result.verified ||
          result.status === "verified"
      ).length;

    const abnormal =
      normalizedResults.filter(
        (result) =>
          isAbnormal(
            getAbnormality(result)
          )
      ).length;

    const critical =
      normalizedResults.filter(
        (result) =>
          isCritical(
            getAbnormality(result)
          )
      ).length;

    return {
      total,
      completed,
      verified,
      abnormal,
      critical,
    };
  }, [normalizedResults]);

  /* ------------------------------------------------------- */
  /* Print                                                    */
  /* ------------------------------------------------------- */

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }

    window.print();
  };

  /* ------------------------------------------------------- */
  /* Loading                                                  */
  /* ------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-3 text-sm text-gray-500">
            Loading laboratory report...
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------- */
  /* Render                                                    */
  /* ------------------------------------------------------- */

  return (
    <div className="lab-report">
      {/* ------------------------------------------------- */}
      {/* Actions                                           */}
      {/* ------------------------------------------------- */}

      {showActions && (
        <div className="mb-5 flex flex-wrap justify-end gap-3 print:hidden">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Print Report
          </button>
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* Report Container                                  */}
      {/* ------------------------------------------------- */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm print:overflow-visible print:rounded-none print:border-0 print:shadow-none">
        {/* ------------------------------------------------ */}
        {/* Header                                            */}
        {/* ------------------------------------------------ */}

        <header className="border-b border-gray-200 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                {resolvedLaboratory?.logo && (
                  <img
                    src={
                      resolvedLaboratory.logo
                    }
                    alt={
                      resolvedLaboratory.name ||
                      "Laboratory"
                    }
                    className="h-14 w-14 rounded-lg object-contain"
                  />
                )}

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {resolvedLaboratory?.name ||
                      "Medical Laboratory"}
                  </h1>

                  {resolvedLaboratory?.address && (
                    <p className="mt-1 text-sm text-gray-500">
                      {
                        resolvedLaboratory.address
                      }
                    </p>
                  )}

                  {(resolvedLaboratory?.phone ||
                    resolvedLaboratory?.email) && (
                    <p className="mt-1 text-xs text-gray-500">
                      {
                        resolvedLaboratory.phone
                      }

                      {resolvedLaboratory.phone &&
                        resolvedLaboratory.email &&
                        " • "}

                      {
                        resolvedLaboratory.email
                      }
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Laboratory Report
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Diagnostic laboratory results
                </p>
              </div>
            </div>

            <div className="min-w-[190px] text-left sm:text-right">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Report Number
              </div>

              <div className="mt-1 text-sm font-semibold text-gray-900">
                {reportData.reportNumber ||
                  reportData.reportNo ||
                  resolvedOrder?.reportNumber ||
                  `LAB-RPT-${resolvedOrder?.id ?? "—"}`}
              </div>

              <div className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                Report Date
              </div>

              <div className="mt-1 text-sm text-gray-700">
                {formatDate(
                  reportData.reportDate ||
                    reportData.createdAt ||
                    resolvedOrder?.createdAt ||
                    new Date()
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------ */}
        {/* Patient Information                              */}
        {/* ------------------------------------------------ */}

        <section className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Patient Information
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              label="Patient Name"
              value={getPatientName(
                resolvedPatient
              )}
            />

            <InfoItem
              label="Patient ID"
              value={
                resolvedPatient?.patientNumber ||
                resolvedPatient?.patientId ||
                resolvedPatient?.id ||
                "—"
              }
            />

            <InfoItem
              label="Date of Birth"
              value={formatDate(
                resolvedPatient?.dateOfBirth ||
                  resolvedPatient?.dob
              )}
            />

            <InfoItem
              label="Gender"
              value={
                resolvedPatient?.gender ||
                resolvedPatient?.sex ||
                "—"
              }
            />
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Order Information                                */}
        {/* ------------------------------------------------ */}

        <section className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Order Information
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              label="Order Number"
              value={
                resolvedOrder?.orderNumber ||
                resolvedOrder?.orderNo ||
                resolvedOrder?.id ||
                "—"
              }
            />

            <InfoItem
              label="Ordering Doctor"
              value={getDoctorName(
                resolvedDoctor
              )}
            />

            <InfoItem
              label="Priority"
              value={getPriorityLabel(
                resolvedOrder?.priority
              )}
            />

            <InfoItem
              label="Order Date"
              value={formatDateTime(
                resolvedOrder?.createdAt ||
                  resolvedOrder?.orderedAt ||
                  resolvedOrder?.orderDate
              )}
            />
          </div>

          {(resolvedOrder?.clinicalIndication ||
            resolvedOrder?.clinical_indication) && (
            <div className="mt-5">
              <InfoItem
                label="Clinical Indication"
                value={
                  resolvedOrder.clinicalIndication ||
                  resolvedOrder
                    .clinical_indication
                }
              />
            </div>
          )}

          {resolvedOrder?.diagnosis && (
            <div className="mt-4">
              <InfoItem
                label="Diagnosis"
                value={
                  resolvedOrder.diagnosis
                }
              />
            </div>
          )}
        </section>

        {/* ------------------------------------------------ */}
        {/* Result Summary                                    */}
        {/* ------------------------------------------------ */}

        <section className="border-b border-gray-200 px-6 py-5 sm:px-8 print:hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <SummaryCard
              label="Total Tests"
              value={summary.total}
              color="gray"
            />

            <SummaryCard
              label="Completed"
              value={summary.completed}
              color="green"
            />

            <SummaryCard
              label="Verified"
              value={summary.verified}
              color="blue"
            />

            <SummaryCard
              label="Abnormal"
              value={summary.abnormal}
              color="yellow"
            />

            <SummaryCard
              label="Critical"
              value={summary.critical}
              color="red"
            />
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Laboratory Results                               */}
        {/* ------------------------------------------------ */}

        <section className="px-6 py-6 sm:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Laboratory Results
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Results are shown with their applicable reference ranges.
              </p>
            </div>

            <div className="hidden text-right text-xs text-gray-400 sm:block">
              <div>
                Normal results are not flagged.
              </div>
              <div>
                Abnormal and critical results require clinical review.
              </div>
            </div>
          </div>

          {normalizedResults.length ===
          0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
              <p className="text-sm font-medium text-gray-700">
                No laboratory results available.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Results will appear here once they have been entered.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Test
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Result
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Unit
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Reference Range
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Flag
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {normalizedResults.map(
                    (result, index) => {
                      const abnormality =
                        getAbnormality(
                          result
                        );

                      const critical =
                        isCritical(
                          abnormality
                        );

                      const abnormal =
                        isAbnormal(
                          abnormality
                        );

                      const test =
                        result._test;

                      return (
                        <tr
                          key={
                            result.id ??
                            `${getTestId(test) ?? result.testId ?? "test"}-${index}`
                          }
                          className={
                            critical
                              ? "bg-red-50"
                              : abnormal
                              ? "bg-yellow-50/40"
                              : ""
                          }
                        >
                          {/* Test */}

                          <td className="px-4 py-4 align-top">
                            <div className="font-medium text-gray-900">
                              {getTestName(
                                result
                              ) !==
                              "Laboratory Test"
                                ? getTestName(
                                    result
                                  )
                                : getTestName(
                                    test
                                  )}
                            </div>

                            {(getTestCode(
                              result
                            ) ||
                              getTestCode(
                                test
                              )) && (
                              <div className="mt-1 text-xs text-gray-500">
                                Code:{" "}
                                {getTestCode(
                                  result
                                ) ||
                                  getTestCode(
                                    test
                                  )}
                              </div>
                            )}
                          </td>

                          {/* Result */}

                          <td className="px-4 py-4 align-top">
                            <span
                              className={`font-semibold ${
                                critical
                                  ? "text-red-700"
                                  : abnormal
                                  ? "text-yellow-800"
                                  : "text-gray-900"
                              }`}
                            >
                              {getResultValue(
                                result
                              )}
                            </span>
                          </td>

                          {/* Unit */}

                          <td className="px-4 py-4 align-top text-sm text-gray-600">
                            {getUnit(
                              result,
                              test
                            ) || "—"}
                          </td>

                          {/* Reference */}

                          <td className="px-4 py-4 align-top text-sm text-gray-600">
                            {getReferenceRange(
                              result,
                              test
                            )}
                          </td>

                          {/* Flag */}

                          <td className="px-4 py-4 align-top">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                critical
                                  ? "bg-red-100 text-red-700"
                                  : abnormal
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {getAbnormalityLabel(
                                abnormality
                              )}
                            </span>
                          </td>

                          {/* Status */}

                          <td className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-700">
                              {getStatusLabel(
                                getStatus(
                                  result
                                )
                              )}
                            </span>

                            {result.verified && (
                              <div className="mt-1 text-xs font-medium text-blue-600">
                                Verified
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ------------------------------------------------ */}
        {/* Result Comments                                   */}
        {/* ------------------------------------------------ */}

        {normalizedResults.some(
          (result) =>
            result.comments ||
            result.comment
        ) && (
          <section className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Laboratory Comments
            </h3>

            <div className="space-y-4">
              {normalizedResults
                .filter(
                  (result) =>
                    result.comments ||
                    result.comment
                )
                .map(
                  (
                    result,
                    index
                  ) => (
                    <div
                      key={
                        result.id ??
                        `comment-${index}`
                      }
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="mb-2 text-sm font-semibold text-gray-800">
                        {getTestName(
                          result
                        )}
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                        {result.comments ||
                          result.comment}
                      </p>
                    </div>
                  )
                )}
            </div>
          </section>
        )}

        {/* ------------------------------------------------ */}
        {/* Clinical Interpretation                           */}
        {/* ------------------------------------------------ */}

        {reportData.interpretation && (
          <section className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Clinical Interpretation
            </h3>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {
                  reportData.interpretation
                }
              </p>
            </div>
          </section>
        )}

        {/* ------------------------------------------------ */}
        {/* Notes                                             */}
        {/* ------------------------------------------------ */}

        {resolvedOrder?.notes && (
          <section className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Order Notes
            </h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
              {resolvedOrder.notes}
            </p>
          </section>
        )}

        {/* ------------------------------------------------ */}
        {/* Verification                                      */}
        {/* ------------------------------------------------ */}

        <section className="border-t border-gray-200 px-6 py-6 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Report Status
              </h3>

              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    summary.verified ===
                    summary.total &&
                    summary.total > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {summary.verified ===
                    summary.total &&
                  summary.total > 0
                    ? "Verified"
                    : "Pending Verification"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Verified By
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-800">
                {reportData.verifiedBy?.name ||
                  reportData.verifiedByName ||
                  "—"}
              </p>

              {(reportData.verifiedAt ||
                reportData.verifiedBy) && (
                <p className="mt-1 text-xs text-gray-500">
                  {formatDateTime(
                    reportData.verifiedAt
                  )}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Footer                                            */}
        {/* ------------------------------------------------ */}

        <footer className="border-t border-gray-200 bg-gray-50 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-2 text-xs leading-5 text-gray-500 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-medium text-gray-600">
                Laboratory Report
              </p>

              <p>
                This report contains laboratory
                findings associated with the
                referenced order.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p>
                Generated:{" "}
                {formatDateTime(
                  reportData.generatedAt ||
                    new Date()
                )}
              </p>

              {reportData.reportNumber && (
                <p>
                  Report:{" "}
                  {
                    reportData.reportNumber
                  }
                </p>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* ------------------------------------------------- */}
      {/* Print Styles                                      */}
      {/* ------------------------------------------------- */}

      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 12mm;
            }

            body {
              background: #ffffff !important;
            }

            .lab-report {
              width: 100%;
              color: #111827;
            }

            .lab-report table {
              page-break-inside: auto;
            }

            .lab-report tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }

            .lab-report section,
            .lab-report header,
            .lab-report footer {
              break-inside: avoid;
            }

            .lab-report .print\\:hidden {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

/* --------------------------------------------------------- */
/* Info Item                                                  */
/* --------------------------------------------------------- */

const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-medium text-gray-800">
        {value || "—"}
      </div>
    </div>
  );
};

/* --------------------------------------------------------- */
/* Summary Card                                               */
/* --------------------------------------------------------- */

const SummaryCard = ({
  label,
  value,
  color = "gray",
}) => {
  const styles = {
    gray: {
      wrapper:
        "border-gray-200 bg-gray-50",
      label: "text-gray-500",
      value: "text-gray-900",
    },

    green: {
      wrapper:
        "border-green-200 bg-green-50",
      label: "text-green-600",
      value: "text-green-700",
    },

    blue: {
      wrapper:
        "border-blue-200 bg-blue-50",
      label: "text-blue-600",
      value: "text-blue-700",
    },

    yellow: {
      wrapper:
        "border-yellow-200 bg-yellow-50",
      label: "text-yellow-600",
      value: "text-yellow-700",
    },

    red: {
      wrapper:
        "border-red-200 bg-red-50",
      label: "text-red-600",
      value: "text-red-700",
    },
  };

  const selected =
    styles[color] || styles.gray;

  return (
    <div
      className={`rounded-lg border px-4 py-3 ${selected.wrapper}`}
    >
      <div
        className={`text-xs font-medium ${selected.label}`}
      >
        {label}
      </div>

      <div
        className={`mt-1 text-xl font-bold ${selected.value}`}
      >
        {value}
      </div>
    </div>
  );
};

export default LabReport;
