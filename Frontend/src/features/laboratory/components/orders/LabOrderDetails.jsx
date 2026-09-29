/* ********************************************************************* */
/* File: #src/features/laboratory/components/orders/LabOrderDetails.jsx  */
/* ********************************************************************* */

import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Edit3,
  FileText,
  FlaskConical,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* --------------------------------------------------------- */
/* Constants                                                  */
/* --------------------------------------------------------- */

const PRIORITY_CONFIG = {
  routine: {
    label: "Routine",
    className:
      "bg-gray-100 text-gray-700 ring-gray-500/20",
  },

  urgent: {
    label: "Urgent",
    className:
      "bg-orange-50 text-orange-700 ring-orange-600/20",
  },

  stat: {
    label: "STAT",
    className:
      "bg-red-50 text-red-700 ring-red-600/20",
  },
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  },

  ordered: {
    label: "Ordered",
    className:
      "bg-blue-50 text-blue-700 ring-blue-600/20",
  },

  collected: {
    label: "Collected",
    className:
      "bg-purple-50 text-purple-700 ring-purple-600/20",
  },

  processing: {
    label: "Processing",
    className:
      "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  },

  result_ready: {
    label: "Results Ready",
    className:
      "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  },

  verified: {
    label: "Verified",
    className:
      "bg-green-50 text-green-700 ring-green-600/20",
  },

  completed: {
    label: "Completed",
    className:
      "bg-green-50 text-green-700 ring-green-600/20",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-50 text-red-700 ring-red-600/20",
  },
};

/* --------------------------------------------------------- */
/* Helpers                                                    */
/* --------------------------------------------------------- */

const formatStatus = (status = "") => {
  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
};

const formatDate = (
  value,
  includeTime = false
) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-US",
    includeTime
      ? {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
  );
};

const getPatientName = (patient) => {
  if (!patient) {
    return "Unknown Patient";
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
    return `Doctor #${doctor.id}`;
  }

  return name.startsWith("Dr.")
    ? name
    : `Dr. ${name}`;
};

const getTestId = (test) => {
  return (
    test?.id ??
    test?.testId ??
    test?.test?.id
  );
};

const getTestName = (test) => {
  return (
    test?.name ||
    test?.testName ||
    test?.test?.name ||
    `Test #${getTestId(test)}`
  );
};

const getTestDescription = (test) => {
  return (
    test?.description ||
    test?.shortDescription ||
    test?.test?.description ||
    ""
  );
};

const getTestCode = (test) => {
  return (
    test?.code ||
    test?.testCode ||
    test?.test?.code ||
    ""
  );
};

const getTestPrice = (test) => {
  const price =
    test?.price ??
    test?.test?.price;

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

  return numericPrice.toFixed(2);
};

const normalizeTests = (order) => {
  if (Array.isArray(order?.tests)) {
    return order.tests;
  }

  if (Array.isArray(order?.labTests)) {
    return order.labTests;
  }

  if (Array.isArray(order?.orderTests)) {
    return order.orderTests;
  }

  return [];
};

const getStatusConfig = (status) => {
  const normalized =
    String(status || "")
      .toLowerCase()
      .replace(/[-\s]/g, "_");

  return (
    STATUS_CONFIG[normalized] || {
      label: formatStatus(status) || "Unknown",
      className:
        "bg-gray-100 text-gray-700 ring-gray-500/20",
    }
  );
};

const getPriorityConfig = (priority) => {
  const normalized =
    String(priority || "routine")
      .toLowerCase();

  return (
    PRIORITY_CONFIG[normalized] ||
    PRIORITY_CONFIG.routine
  );
};

/* --------------------------------------------------------- */
/* Small UI Components                                        */
/* --------------------------------------------------------- */

const Section = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Icon className="h-5 w-5" />
            </div>
          )}

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {title}
            </h2>

            {description && (
              <p className="mt-0.5 text-xs text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {children}
      </div>
    </section>
  );
};

const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
};

const Badge = ({
  children,
  className,
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
};

/* --------------------------------------------------------- */
/* Component                                                   */
/* --------------------------------------------------------- */

const LabOrderDetails = ({
  order,
  onEdit,
  onCollect,
  onViewResults,
  onViewReport,
  onCancel,
  loading = false,
}) => {
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <ClipboardList className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Laboratory order not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The laboratory order information is unavailable.
        </p>
      </div>
    );
  }

  const tests = normalizeTests(order);

  const statusConfig =
    getStatusConfig(order.status);

  const priorityConfig =
    getPriorityConfig(order.priority);

  const patient =
    order.patient || null;

  const doctor =
    order.doctor || null;

  const orderNumber =
    order.orderNumber ||
    order.orderNo ||
    order.orderId ||
    `LAB-${order.id}`;

  const patientName =
    getPatientName(patient);

  const doctorName =
    getDoctorName(doctor);

  const isCancelled =
    String(order.status || "")
      .toLowerCase() ===
    "cancelled";

  const isVerified =
    ["verified", "completed"].includes(
      String(order.status || "").toLowerCase()
    );

  const canEdit =
    !isCancelled &&
    !isVerified;

  const canCollect =
    !isCancelled &&
    ![
      "collected",
      "processing",
      "result_ready",
      "verified",
      "completed",
    ].includes(
      String(order.status || "").toLowerCase()
    );

  const canViewResults =
    [
      "result_ready",
      "verified",
      "completed",
    ].includes(
      String(order.status || "").toLowerCase()
    );

  const handleEdit = () => {
    if (onEdit) {
      onEdit(order);
      return;
    }

    navigate(
      `/laboratory/orders/${order.id}/edit`
    );
  };

  const handleCollect = () => {
    if (onCollect) {
      onCollect(order);
      return;
    }

    navigate(
      `/laboratory/orders/${order.id}/collect`
    );
  };

  const handleResults = () => {
    if (onViewResults) {
      onViewResults(order);
      return;
    }

    navigate(
      `/laboratory/orders/${order.id}/results`
    );
  };

  const handleReport = () => {
    if (onViewReport) {
      onViewReport(order);
      return;
    }

    navigate(
      `/laboratory/orders/${order.id}/report`
    );
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(order);
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------- */}
      {/* Header                                            */}
      {/* ------------------------------------------------- */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-600 p-3 text-white">
              <FlaskConical className="h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Laboratory Order
                </h1>

                <Badge
                  className={
                    statusConfig.className
                  }
                >
                  {statusConfig.label}
                </Badge>

                <Badge
                  className={
                    priorityConfig.className
                  }
                >
                  {priorityConfig.label}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Order number{" "}
                <span className="font-semibold text-gray-800">
                  {orderNumber}
                </span>
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-2">
            {canEdit && (
              <button
                type="button"
                onClick={handleEdit}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </button>
            )}

            {canCollect && (
              <button
                type="button"
                onClick={handleCollect}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FlaskConical className="h-4 w-4" />
                Collect Sample
              </button>
            )}

            {canViewResults && (
              <button
                type="button"
                onClick={handleResults}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileText className="h-4 w-4" />
                Results
              </button>
            )}

            {isVerified && (
              <button
                type="button"
                onClick={handleReport}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileText className="h-4 w-4" />
                Report
              </button>
            )}
          </div>
        </div>

        {/* Order summary */}

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-200 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            label="Order Date"
            value={formatDate(
              order.orderDate ||
                order.createdAt,
              true
            )}
          />

          <InfoItem
            label="Priority"
            value={priorityConfig.label}
          />

          <InfoItem
            label="Number of Tests"
            value={tests.length}
          />

          <InfoItem
            label="Last Updated"
            value={formatDate(
              order.updatedAt,
              true
            )}
          />
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* Cancelled Notice                                  */}
      {/* ------------------------------------------------- */}

      {isCancelled && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <h3 className="text-sm font-semibold text-red-800">
              This laboratory order has been cancelled.
            </h3>

            {(order.cancelledAt ||
              order.cancellationReason) && (
              <p className="mt-1 text-xs leading-5 text-red-700">
                {order.cancellationReason
                  ? `Reason: ${order.cancellationReason}`
                  : `Cancelled: ${formatDate(
                      order.cancelledAt,
                      true
                    )}`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* Patient Information                               */}
      {/* ------------------------------------------------- */}

      <Section
        title="Patient Information"
        description="Patient associated with this laboratory order."
        icon={UserRound}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            label="Patient Name"
            value={patientName}
          />

          <InfoItem
            label="Patient ID"
            value={
              patient?.patientNumber ||
              patient?.id ||
              order.patientId
            }
          />

          <InfoItem
            label="Date of Birth"
            value={formatDate(
              patient?.dateOfBirth ||
                patient?.dob
            )}
          />

          <InfoItem
            label="Gender"
            value={patient?.gender}
          />

          <InfoItem
            label="Phone"
            value={
              patient?.phone ||
              patient?.phoneNumber
            }
          />

          <InfoItem
            label="Email"
            value={patient?.email}
          />

          <InfoItem
            label="Ordering Doctor"
            value={doctorName}
          />

          <InfoItem
            label="Department"
            value={
              doctor?.department ||
              order.department
            }
          />
        </div>
      </Section>

      {/* ------------------------------------------------- */}
      {/* Tests                                             */}
      {/* ------------------------------------------------- */}

      <Section
        title="Laboratory Tests"
        description="Tests included in this laboratory order."
        icon={FlaskConical}
      >
        {tests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <p className="text-sm text-gray-500">
              No laboratory tests have been added to this order.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map(
              (test, index) => {
                const testId =
                  getTestId(test) ??
                  index;

                const testName =
                  getTestName(test);

                const testDescription =
                  getTestDescription(
                    test
                  );

                const testCode =
                  getTestCode(test);

                const testPrice =
                  getTestPrice(test);

                return (
                  <div
                    key={testId}
                    className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {testName}
                          </h3>

                          {testCode && (
                            <p className="mt-0.5 text-xs text-gray-400">
                              Test Code:{" "}
                              {testCode}
                            </p>
                          )}

                          {testDescription && (
                            <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500">
                              {
                                testDescription
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {testPrice !==
                        null && (
                        <span className="text-sm font-semibold text-gray-900">
                          ${testPrice}
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </Section>

      {/* ------------------------------------------------- */}
      {/* Clinical Information                              */}
      {/* ------------------------------------------------- */}

      <Section
        title="Clinical Information"
        description="Clinical information supplied with the laboratory order."
        icon={ClipboardList}
      >
        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Clinical Indication
            </p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {order.clinicalIndication ||
                  order.clinical_indication ||
                  "No clinical indication provided."}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Diagnosis
            </p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {order.diagnosis ||
                  "No diagnosis provided."}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Notes
            </p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {order.notes ||
                  "No additional notes."}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------- */}
      {/* Sample Collection                                 */}
      {/* ------------------------------------------------- */}

      <Section
        title="Sample Collection"
        description="Specimen collection and laboratory processing information."
        icon={Clock3}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            label="Collection Status"
            value={
              order.collection
                ?.status ||
              order.collectionStatus ||
              ([
                "collected",
                "processing",
                "result_ready",
                "verified",
                "completed",
              ].includes(
                String(
                  order.status || ""
                ).toLowerCase()
              )
                ? "Collected"
                : "Not Collected")
            }
          />

          <InfoItem
            label="Collected At"
            value={formatDate(
              order.collection
                ?.collectedAt ||
                order.sampleCollectedAt,
              true
            )}
          />

          <InfoItem
            label="Collected By"
            value={
              order.collection
                ?.collectedBy?.name ||
              order.collectedBy?.name ||
              order.collectedByName
            }
          />

          <InfoItem
            label="Specimen"
            value={
              order.collection
                ?.specimenType ||
              order.specimenType
            }
          />
        </div>

        {(order.collection
          ?.notes ||
          order.collectionNotes) && (
          <div className="mt-5 rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Collection Notes
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {order.collection
                ?.notes ||
                order.collectionNotes}
            </p>
          </div>
        )}
      </Section>

      {/* ------------------------------------------------- */}
      {/* Processing Timeline                               */}
      {/* ------------------------------------------------- */}

      <Section
        title="Order Timeline"
        description="Important events in the laboratory workflow."
        icon={CalendarDays}
      >
        <div className="space-y-0">
          <TimelineItem
            title="Order Created"
            date={
              order.orderDate ||
              order.createdAt
            }
            description="Laboratory order was created."
            completed
          />

          <TimelineItem
            title="Sample Collected"
            date={
              order.collection
                ?.collectedAt ||
              order.sampleCollectedAt
            }
            description="Patient specimen was collected."
            completed={
              Boolean(
                order.collection
                  ?.collectedAt ||
                  order.sampleCollectedAt
              )
            }
          />

          <TimelineItem
            title="Processing"
            date={
              order.processingStartedAt
            }
            description="Laboratory processing started."
            completed={Boolean(
              order.processingStartedAt
            )}
          />

          <TimelineItem
            title="Results Ready"
            date={
              order.resultsReadyAt
            }
            description="Laboratory results became available."
            completed={
              Boolean(
                order.resultsReadyAt
              ) ||
              [
                "result_ready",
                "verified",
                "completed",
              ].includes(
                String(
                  order.status || ""
                ).toLowerCase()
              )
            }
          />

          <TimelineItem
            title="Results Verified"
            date={
              order.verifiedAt
            }
            description="Laboratory results were verified."
            completed={
              Boolean(
                order.verifiedAt
              ) || isVerified
            }
            last
          />
        </div>
      </Section>

      {/* ------------------------------------------------- */}
      {/* Verification                                     */}
      {/* ------------------------------------------------- */}

      {isVerified && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-900">
                Laboratory Results Verified
              </h3>

              <p className="mt-1 text-xs leading-5 text-green-800">
                The results associated with this order have been verified
                and the laboratory report is available.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Verified At"
                  value={formatDate(
                    order.verifiedAt,
                    true
                  )}
                />

                <InfoItem
                  label="Verified By"
                  value={
                    order.verifiedBy
                      ?.name ||
                    order.verifiedByName ||
                    "Laboratory"
                  }
                />
              </div>

              <button
                type="button"
                onClick={handleReport}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                View Laboratory Report
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* Footer Actions                                    */}
      {/* ------------------------------------------------- */}

      {canEdit && onCancel && (
        <div className="flex justify-end border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <AlertCircle className="h-4 w-4" />
            Cancel Laboratory Order
          </button>
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------- */
/* Timeline Item                                              */
/* --------------------------------------------------------- */

const TimelineItem = ({
  title,
  date,
  description,
  completed = false,
  last = false,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            completed
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {completed ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Clock3 className="h-4 w-4" />
          )}
        </div>

        {!last && (
          <div
            className={`mt-1 h-12 w-px ${
              completed
                ? "bg-green-200"
                : "bg-gray-200"
            }`}
          />
        )}
      </div>

      <div className="pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`text-sm font-semibold ${
              completed
                ? "text-gray-900"
                : "text-gray-500"
            }`}
          >
            {title}
          </h3>

          {date && (
            <span className="text-xs text-gray-400">
              {formatDate(date, true)}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LabOrderDetails;
