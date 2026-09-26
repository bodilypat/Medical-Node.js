/* *********************************************************** */
/* File: src/features/prescriptions/components/PrescriptionTable.jsx */
/* *********************************************************** */

import PropTypes from "prop-types";
import { useMemo } from "react";

import {
    Table,
    TableActions,
} from "../../../components/table";

import {
    PrescriptionStatus,
} from ".";

import {
    prescriptionColumns,
} from "../utils";

const PrescriptionTable = ({
    prescriptions = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
}) => {

    /* ---------------------------------- */
    /* Table Columns                      */
    /* ---------------------------------- */

    const columns = useMemo(
        () => prescriptionColumns(),
        []
    );

    /* ---------------------------------- */
    /* Table Data                         */
    /* ---------------------------------- */

    const rows = useMemo(() => {

        return prescriptions.map(
            (prescription) => ({

                id: prescription.id,

                prescription_no:
                    prescription.prescription_no,

                patient:
                    prescription.patient_name ??
                    prescription.patient?.full_name ??
                    "—",

                doctor:
                    prescription.doctor_name ??
                    prescription.doctor?.full_name ??
                    "—",

                issued_date:
                    prescription.issued_date ?? "—",

                expires_at:
                    prescription.expires_at ?? "—",

                medicines:
                    prescription.items?.length ?? 0,

                status: (
                    <PrescriptionStatus
                        status={prescription.status}
                    />
                ),

                actions: (
                    <TableActions
                        onView={() =>
                            onView?.(prescription)
                        }
                        onEdit={() =>
                            onEdit?.(prescription)
                        }
                        onDelete={() =>
                            onDelete?.(prescription)
                        }
                    />
                ),

            })
        );

    }, [
        prescriptions,
        onView,
        onEdit,
        onDelete,
    ]);

    return (

        <Table

            columns={columns}

            data={rows}

            loading={loading}

            rowKey="id"

            emptyTitle="No prescriptions found"

            emptyDescription={
                "There are no prescriptions matching your search."
            }

        />

    );

};

PrescriptionTable.propTypes = {

    prescriptions: PropTypes.array,

    loading: PropTypes.bool,

    onView: PropTypes.func,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func,

};

export default PrescriptionTable;
