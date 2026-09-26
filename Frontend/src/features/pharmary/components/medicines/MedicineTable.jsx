/* ***************************************************************** */
/* File: src/features/pharmacy/components/medicine/MedicineTable.jsx */
/* ***************************************************************** */

import PropTypes from "prop-types";

import {
    Table,
    TableActions,
    TableEmpty,
    TableLoading,
} from "../../../components/table";

import { medicineColumns } from "../utils";

const MedicineTable = ({
    medicines = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
    onDispense,
}) => {
    if (loading) {
        return <TableLoading rows={8} columns={medicineColumns.length + 1} />;
    }

    if (medicines.length === 0) {
        return (
            <TableEmpty
                title="No medicines found"
                description="There are no medicines available."
            />
        );
    }

    return (
        <Table>
            <thead>
                <tr>
                    {medicineColumns.map((column) => (
                        <th key={column.key} scope="col">
                            {column.title}
                        </th>
                    ))}

                    <th scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                {medicines.map((medicine) => (
                    <tr key={medicine.id}>
                        {medicineColumns.map((column) => {
                            const value =
                                typeof column.render === "function"
                                    ? column.render(medicine)
                                    : medicine[column.key];

                            return (
                                <td key={column.key} data-label={column.title}>
                                    {value}
                                </td>
                            );
                        })}

                        <td data-label="Actions">
                            <TableActions
                                actions={[
                                    {
                                        label: "View",
                                        variant: "info",
                                        onClick: () => onView?.(medicine),
                                    },
                                    {
                                        label: "Edit",
                                        variant: "primary",
                                        onClick: () => onEdit?.(medicine),
                                    },
                                    {
                                        label: "Dispense",
                                        variant: "success",
                                        onClick: () => onDispense?.(medicine),
                                        disabled:
                                            Number(medicine.stock_quantity) <= 0,
                                    },
                                    {
                                        label: "Delete",
                                        variant: "danger",
                                        onClick: () => onDelete?.(medicine),
                                    },
                                ]}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

MedicineTable.propTypes = {
    medicines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,
            stock_quantity: PropTypes.number,
        })
    ),
    loading: PropTypes.bool,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDispense: PropTypes.func,
};

export default MedicineTable;
